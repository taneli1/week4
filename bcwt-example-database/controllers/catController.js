'use strict';
// catController
const catModel = require('../models/catModel');
const { validationResult} = require('express-validator');

const cats = catModel.cats;

const cat_list_get = async (req, res) => {
  const cats = await catModel.getAllCats();
  res.json(cats);
};

const cat_get_by_id = async (req, res) => {
  console.log('catController: http get cat with path param', req.params);
  const cat = await catModel.getCat(req.params.id);
  res.json(cat);
}

const cat_create = async (req, res) => {
  //here we will create a cat with data comming from req...
  console.log('catController cat_create', req.body, req.file);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  const id = await catModel.insertCat(req);
  const cat = await catModel.getCat(id);
  res.send(cat);
}

const cat_update = async (req, res) => {
  const updateOk = await catModel.updateCat(req);
  res.json(`{ message : updated... ${updateOk}"}`);
};

const cat_delete = async (req, res) => {
  const cat = await catModel.deleteCat(req.params.id);
  res.json(cat);
};

module.exports = {
  cat_list_get,
  cat_get_by_id,
  cat_create,
  cat_update,
  cat_delete
};
