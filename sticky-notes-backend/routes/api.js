var express = require('express');
const { getNotes, inserNote, updateNote, deleteNote } = require('../business-logic');
const { print } = require('../utils');
var router = express.Router();

const endpoint = '/notes';

router.get(endpoint, async function(req, res, next) {
  try {
    res.status(200).json(await getNotes());
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'something blew up' });
  }
});

router.post(endpoint, async function(req, res, next) {
  try {
    res.status(200).json(await inserNote(req.body));
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'something blew up' });
  }
});

router.put(endpoint, async function(req, res, next) {
  try {
    res.status(200).json(await updateNote(req.body));
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'something blew up' });
  }
});

router.delete(endpoint, async function(req, res, next) {
  try {
    res.status(200).json(await deleteNote(+req.query.id));
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'something blew up' });
  }
});

module.exports = router;
