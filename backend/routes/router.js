const express = require('express');
const router = express.Router();
const userController = require('../controller/userController'); // Adjust the path as needed

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.put('/update/:id', userController.updateUser);

module.exports = router;
