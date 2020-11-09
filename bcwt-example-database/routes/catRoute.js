'use strict';
// catRoute
const express = require('express');
const multer = require('multer');
const catController = require('../controllers/catController');
const router = express.Router();
const {body} = require('express-validator');

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.includes('image')) {
    return cb(null, false, new Error('not an image'));
  }
  else cb(null,true)
};

const upload = multer({dest: 'uploads/', fileFilter});

const injectFile = (req, res, next) => {
  if (req.file) {
    req.body.type = req.file.mimetype;
  }
  next();
};

router.get('/', catController.cat_list_get);
router.post('/',
    upload.single('cat'),
    injectFile,
    [
      body('name', 'min length 3 chars').isLength({min: 3}),
      body('age', 'must be a number').isLength({min: 1}).isNumeric(),
      body('weight', 'must be a number').isLength({min: 1}).isNumeric(),
      body('owner', 'required').isLength({min: 1}).isNumeric(),
      body('type', 'file req').contains('image'),
    ],
    catController.cat_create);

router.get('/:id', catController.cat_get_by_id);
router.put('/',
    [
      body('name', 'min length 3 chars').isLength({min: 3}),
      body('age', 'must be a number').isLength({min: 1}).isNumeric(),
      body('weight', 'must be a number').isLength({min: 1}).isNumeric(),
      body('owner', 'required').isLength({min: 1}).isNumeric(),
    ],
    catController.cat_update);
router.delete('/:id', catController.cat_delete);

module.exports = router;
