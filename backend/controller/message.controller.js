import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    // console.log("message sent and it was sent by", req.params.id);

    try {
        const {message} = req.body;
        const {id: receiverId} = req.params; // destructured it we have 
        // alt 
        // const id = req.user.id; 
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: {$all : [senderId, receiverId]},
        });

        // if users are sending message for the first time to another user
        // we would find no previous conversation
        // so we create a new one;
        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        // await conversation.save();
        // await newMessage.save();

        // these two will run in parallel because of promise
        await Promise.all([conversation.save(), newMessage.save()]);
        
        // SOCKET IO FUNCTIONALITY WILL GO HERE
        // const receiverSocketId = getReceiverSocketId(receiverId);
        // if(receiverSocketId){
        //     // io.to(<socket_id>).emit() is used to send events to a specific client
        //     io.to(receiverSocketId).emit("newMessage", newMessage);
        // }

        const receiverSocketId = getReceiverSocketId(receiverId);
        const senderSocketId = getReceiverSocketId(senderId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        if (senderSocketId) {
          io.to(senderSocketId).emit("newMessage", newMessage);
        }


        res.status(201).json(newMessage); // yahan maine ise {newMessage} object ki tarah bhej diya tha
        // this created a lot of problems
        /*Why is newMessage appearing on the frontend?

You are sending the newly created message back to the frontend as { newMessage: messageObject }. This causes the message object to be wrapped in newMessage, hence why the frontend is expecting message.newMessage instead of directly accessing message.
Potential Fix: If you don't want to wrap the message in newMessage, modify the response like this:

js
Copy code
res.status(201).json(newMessage);
This will return the message object directly, allowing your frontend to handle it as a flat structure. */


    } catch (error) {
        console.log("Error in sendMessage control ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};

export const getMessages = async (req, res) => {
    try {
        const {id: userToChatWithId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants:{$all:[senderId, userToChatWithId]},
        }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES USING POPULATE METHOD OF MONGOOSE;
        
        if(!conversation){
            return res.status(200).json({});
        }

        const messages = conversation.messages;
        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessage control ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}