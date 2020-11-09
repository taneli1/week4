'use strict';
// userRoute
const express = require('express');
const userController = require('../controllers/userController');
const {body} = require('express-validator');
const router = express.Router();

router.get('/', userController.user_list_get);
router.post('/',
    [
      body('email', 'not valid email address').isEmail(),
      body('name', 'min length 3 chars').isLength({min: 3}),
      body('passwd', 'min length 8 chars and one uppercase letter')
          .matches('(?=.*[A-Z]).{8,}')
    ],
    userController.user_create);

router.get('/:id', userController.user_get_by_id);
router.put('/:id', userController.user_update);
router.delete('/:id', userController.user_delete);

module.exports = router;
