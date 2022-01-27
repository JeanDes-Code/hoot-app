const ConversationModel = require('../models/conversation.model');

module.exports.createConversation = async (req, res) => {
    const newConversation = new ConversationModel ({
        members: [req.body.senderId, req.body.receiverId],
    });
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    }catch(err){
        res.status(500).json(err)
    }
};

module.exports.readConversation = async (req, res) => {
    try {
        const conversation = await ConversationModel.find({
            members: { $in:[req.params.userId] }
        })
        res.status(200).json(conversation);
    }catch(err){
        res.status(500).json(err)
    }
}