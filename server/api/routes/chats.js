const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

// Include models
const Chat = require('../../models/chat');
const Message = require('../../models/message');
const User = require('../../models/user');

router.get('/', checkAuth, (req, res, next) => {
    Chat.find()
        .populate({ path: 'members' })
        .exec()
        .then(chats => {
            return res.status(200).json({
                status: 'success',
                data: {
                    chats: chats,
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
            return res.status(500).json({
                status: 'error',
                code: '500',
                message: 'Something is wrong. Please try again later'
            })
        });
});

router.post('/:chatId/members', checkAuth, (req, res, next) => {
    let thisChat = null;
    let memberUser = null;
    let alreadyExists = false;
    Chat.findById(req.params.chatId).exec()
        .then(chat => {
            thisChat = chat;
            if (chat.members.filter(member => member == req.body.newMemberUserId).length > 0) {
                alreadyExists = true;
            } else {
                chat.members.push(req.body.newMemberUserId);
                return chat.save();
            }
        })
        .then(result => {
            return User.findById(req.body.newMemberUserId).exec();
        })
        .then(user => {
            memberUser = user;
            const data = {
                'alreadyExists': alreadyExists,
                'user': memberUser
            };
            return res.status(200).json({
                status: 'success',
                code: '200',
                data: data
            });
        })
        .catch(err => {
            return res.status(500).json({
                status: 'error',
                code: '500',
                message: 'Something is wrong. Please try again later.'
            });
        });
});

router.delete('/:chatId/members/:memberId', checkAuth, (req, res, next) => {
    if (req.params.chatId !== '0') {
        let thisChat = null;
        Chat.findById(req.params.chatId).exec()
            .then(chat => {
                thisChat = chat;
                const updatedChatMembers = chat.members.filter(member => {
                    return member.toString() !== req.params.memberId;
                });

                chat.members = updatedChatMembers;
                return chat.save();
            })
            .then(result => {
                return res.status(200).json({
                    status: 'success',
                    code: '200',
                    data: {}
                });
            })
            .catch(err => {
                return res.status(500).json({
                    status: 'error',
                    code: '500',
                    message: 'Something is wrong. Please try again later.'
                });
            });
    } else {
        let allChatsWithUser = [];
        let memberUser = null;
        Chat.find().exec()
            .then(chats => {
                allChats = chats;
                var count = 0;
                allChats.forEach(function(chat) {
                    const updatedChatMembers = chat.members.filter(member => {
                        return member.toString() !== req.params.memberId;
                    });
                    if (chat.members.length !== updatedChatMembers.length) {
                        allChatsWithUser.push(chat);
                    }
                    chat.members = updatedChatMembers;
                    chat.save(function(err) {
                        count++;
                        if (count === chats.length) {
                            return;
                        }
                    });
                });
            })
            .then(result => {
                return res.status(200).json({
                    status: 'success',
                    code: '200',
                    data: {}
                });
            })
            .catch(err => {
                return res.status(500).json({
                    status: 'error',
                    code: '500',
                    message: 'Something is wrong. Please try again later.'
                });
            });
    }
});

module.exports = router;
