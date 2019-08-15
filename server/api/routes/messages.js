const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

// Include models
const Message = require('../../models/message');

router.get('/chats/:chatId', checkAuth, (req, res, next) => {
    Message.find({'chat': req.params.chatId})
        .populate('createdBy', ['_id', 'email', 'firstName', 'lastName', 'role'])
        .exec()
        .then(messages => {
            res.status(200).json({
                status: 'success',
                code: '200',
                data: {
                    messages: messages,
                    user: {
                        _id: req.userData._id,
                        firstName: req.userData.firstName,
                        lastName: req.userData.lastName,
                        email: req.userData.email,
                        role: req.userData.role
                    }
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 'error',
                code: '500',
                message: 'Something is wrong. Please try again later.'
            });
        });
});

router.post('/chats/:chatId', checkAuth, (req, res, next) => {

    // TODO: if the user is not a member of this chat, handling error.

    const newMessage = new Message();
    newMessage._id = new mongoose.Types.ObjectId();
    newMessage.body = req.body.messageBody;
    newMessage.createdBy = req.userData._id;
    newMessage.createdAt = new Date();
    newMessage.chat = req.params.chatId;

    newMessage.save()
        .then(result => {
            res.status(201).json({
                status: 'success',
                code: '201',
                data: {
                    message: {
                        _id: newMessage._id,
                        createdAt: newMessage.createdAt,
                        body: newMessage.body,
                        chat: newMessage.chat,
                        createdBy: {
                            _id: req.userData._id,
                            email: req.userData.email,
                            firstName: req.userData.firstName,
                            lastName: req.userData.lastName,
                            role: req.userData.role
                        }
                    },
                    user: {
                        _id: req.userData._id,
                        firstName: req.userData.firstName,
                        lastName: req.userData.lastName,
                        email: req.userData.email,
                        role: req.userData.role
                    }
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 'error',
                code: '500',
                message: 'Something is wrong. Please try again later.'
            });
        });

});

module.exports = router;
