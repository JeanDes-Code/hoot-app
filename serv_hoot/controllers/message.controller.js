const MessageModel = require('../models/message.model')

module.exports.createMessage = async (req, res) => {
    const newMessage = new MessageModel(req.body);
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports.readMessage = async (req, res) => {
    try {
        const messages = await MessageModel.find({
            conversationId: req.params.conversationId
        })
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
}