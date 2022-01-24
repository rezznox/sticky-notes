const knexLib = require('knex');
const { delay } = require('../utils');
const notesSeed = require('./seed');

const dbConfig = {
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  pool: { min: 2, max: 10 }
};

const createNotesTable = async (db) => {
  await db.schema.createTable('notes', function (table) {
    table.increments();
    table.integer('x').unsigned().notNullable();
    table.integer('y').unsigned().notNullable();
    table.string('position').notNullable();
    table.string('text');
    table.timestamp('created_at', { useTz: true }).defaultTo(db.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(db.fn.now());
  });
}

const insertDefaultNotes = async (db) => {
  const rows = notesSeed;
  const chunkSize = notesSeed.length;
  await db.batchInsert('notes', rows, chunkSize);
}

exports.initializeDBConnection = () => (new Promise(async (resolve) => {
  while (true) {
    const db = knexLib(dbConfig);
    try {
      const result = await db.select().from('notes').where({ position: 'aaaa' }).timeout(1000, { cancel: true });
      result.length === 0 && insertDefaultNotes(db);
      resolve(db);
      return;
    } catch (e) {
      if (e.code === '42P01') {
        createNotesTable(db);
      } else {
        console.log('retrying db connection');
      }
      await delay(2000);
    }
  }
}));

exports.db = () => knexLib(dbConfig);