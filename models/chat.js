const mongoose = require("mongoose");



const chatSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type:String,
        required: true
    },
    msg: {
        type: String,
        maxLength: 50
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

chatSchema.pre("save", function (next) {
    if (!this.created_at) {
        this.created_at = new Date();
    }
    next();
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;