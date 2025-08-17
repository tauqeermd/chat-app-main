import mongoose from "mongoose";

const conversationSchema = mongoose.Schema({
    participants: [{ // will store user ids here
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    messages:[{ // will store message ids here
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: []
    }]
}, {timestamps: true});

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;