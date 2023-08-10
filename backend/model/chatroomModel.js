const mongoose = require('mongoose');

const chatroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  chatroomID: {type: String, required: true}, 
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const Chatroom = mongoose.model('Chatroom', chatroomSchema);

module.exports = Chatroom;