const express = require('express');
const jwt = require('jsonwebtoken');
const userRoutes = express.Router();
const upload = require('../config/storage');
const UserController = require('../controllers/user.controller');

/* GET all users listing. */
userRoutes.get('/', UserController.getAllUsers);

userRoutes.post('/:username/search', UserController.searchUsers);

userRoutes.get('/me', checkAuthenticated, UserController.getLoggedUser);

userRoutes.post('/me', checkAuthenticated, UserController.updateUser);

userRoutes.post('/login', UserController.logInUser);

userRoutes.post('/logout', UserController.logOutUser);

userRoutes.post('/add', UserController.createUser);

/* GET users listing. */
userRoutes.get('/:username', UserController.getUsers);

userRoutes.post('/:username/upload', upload.single('file'), UserController.userUploadFile);

userRoutes.delete('/delete/:username', UserController.removeUser);


function checkAuthenticated(req, res, next) {
    if (!req.header('Authorization')) {
        return res.send({message: 'Unauthorized request. Missing authentication header'});
    }
    let token = req.header('Authorization').split(' ')[1];
    let payload = jwt.decode(token, '123abc1234');

    if (!payload) {
        return res.sendFile({message: 'Unauthorized request. Authentication header is invalid'});
    }

    req.user = payload;

    next();
}

module.exports = userRoutes;
