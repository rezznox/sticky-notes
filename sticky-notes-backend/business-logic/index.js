const { omit, head, prop } = require("ramda");
const { db } = require("../knex");
const { print } = require("../utils");

const conn = db();

exports.conn = conn;

exports.calculateNewPosition = (position) => {
  const rest = position.substring(0, position.length - 1),
    last = position.substring(position.length - 1);
  return last === 'z' ? `${rest}${last}a` : `${rest}${String.fromCharCode(last.charCodeAt(0) + 1)}`;
}

exports.getNotes = async () => {
  return await conn.from('notes').orderBy('position', 'desc');
}

exports.inserNote = async (body) => {
  const maxPosition = prop('max', head(await conn.max('position').from('notes'))),
    position = exports.calculateNewPosition(print(maxPosition)),
    result = await conn.insert({
      text: 'New note',
      x: 0,
      y: 0,
      ...body,
      position})
      .from('notes');
  return result;
}

exports.updateNote = async (body) => {
  return await conn.from('notes').where({id: body.id}).update(omit(['id'], {...body, updated_at: new Date()}));
}

exports.deleteNote = async (id) => {
  await conn.from('notes').where({id}).del();
}
