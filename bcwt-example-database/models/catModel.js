'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    const [rows] = await promisePool.execute('SELECT cat_id, wop_cat.name, age , weight, owner, filename, user_id, wop_user.name AS ownername FROM wop_cat LEFT JOIN wop_user ON owner = user_id');
    return rows;
  } catch (e) {
    console.error('catModel:', e.message);
  }
};

const getCat = async (id) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    console.log('catModel getCat', id);
    const [rows] = await promisePool.execute('SELECT * FROM wop_cat WHERE cat_id = ?', [id]);
    return rows[0];
  } catch (e) {
    console.error('catModel:', e.message);
  }
};

const insertCat = async (req) => {
  try {
    const [rows] = await promisePool.execute('INSERT INTO wop_cat (name, age, weight, owner, filename) VALUES (?, ?, ?, ?, ?);',
      [req.body.name, req.body.age, req.body.weight, req.body.owner, req.file.filename]);
    console.log('catModel insert:', rows);
    return rows.insertId;
  } catch (e) {
    console.error('catModel insertCat:', e);
    return 0;
  }
}; 

const updateCat = async (id, req) => {
  try {
    const [rows] = await promisePool.execute('UPDATE wop_cat SET name = ?, age = ?, weight = ?, owner = ? WHERE cat_id = ?;',
    [req.body.name, req.body.age, req.body.weight, req.body.owner, req.body.id]);
    console.log('catModel update:', rows);
    return rows.affectedRows === 1;
  } catch (e) {
    return false;
  }
};

const deleteCat = async (id) => {
  try {
    console.log('catModel delete');
    const [rows] = await promisePool.execute('DELETE FROM wop_cat WHERE cat_id = ?', [id]);
    return rows;
  } catch (e) {
    console.error('delete:', e.message);
  }
}

module.exports = {
  getAllCats,
  getCat,
  insertCat,
  updateCat,
  deleteCat
};
