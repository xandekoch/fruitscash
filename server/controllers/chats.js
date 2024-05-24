import mongoose from "mongoose";
import Chat from '../models/Chat.js';
import Message from "../models/Message.js";
import User from "../models/User.js";

/* CREATE */
export const createChat = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { senderId, receiverId } = req.body;

        // Cria o novo chat
        const newChat = new Chat({ members: [senderId, receiverId] });
        await newChat.save({ session });

        // Atualiza os arrays de chats dos usuários
        const sender = await User.findById(senderId).session(session);
        const receiver = await User.findById(receiverId).session(session);

        sender.chats.push(newChat._id);
        receiver.chats.push(newChat._id);

        await sender.save({ session });
        await receiver.save({ session });

        // Confirma a transação
        await session.commitTransaction();
        
        res.status(201).json(newChat);
    } catch (err) {
        // Em caso de erro, aborta a transação
        await session.abortTransaction();
        res.status(409).json({ error: err.message });
    } finally {
        session.endSession();
    }
}

export const createMessage = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { chatId, senderId, receiverId, type, text, filePath, responseTo } = req.body;

        // Cria uma nova mensagem
        const newMessage = new Message({
            chatId,
            senderId,
            receiverId,
            type,
            text,
            filePath,
            responseTo
        });

        // Salva a mensagem no banco de dados
        await newMessage.save({ session });

        // Atualiza o array de mensagens do chat correspondente
        await Chat.findByIdAndUpdate(chatId, { $push: { messages: newMessage._id } }, { session });

        // Confirma a transação
        await session.commitTransaction();

        res.status(201).json(newMessage);
    } catch (err) {
        // Em caso de erro, aborta a transação
        await session.abortTransaction();
        res.status(400).json({ error: err.message });
    } finally {
        session.endSession();
    }
}

/* READ */
export const getChats = async (req, res) => {
    try {
        const { userId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Encontra os chats em que o usuário está envolvido
        const chats = await Chat.find({ members: userId })
            .sort({ updatedAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate({
                path: 'members',
                select: 'username name picturePath -_id', // Seleciona os campos desejados dos membros, excluindo o _id
                match: { _id: { $ne: mongoose.Types.ObjectId(userId) } } // Exclui o próprio usuário da lista de membros
            })
            .populate({
                path: 'messages',
                options: { sort: { createdAt: -1 }, limit: 1 } // Ordena as mensagens pelo createdAt e retorna apenas a mais recente
            });

        res.status(200).json(chats);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const messages = await Message.find({ chatId })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .select('senderId type text filePath responseTo isSeen isLiked isEdited');

        res.status(200).json(messages);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

/* UPDATE */
export const seeMessage = async (req, res) => {
    try {
        const { messageId } = req.params;

        const message = await Message.findByIdAndUpdate(messageId, { isSeen: true }, { new: true });

        res.status(200).json(message);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const likeMessage = async (req, res) => {
    try {
        const { messageId } = req.params;

        const message = await Message.findByIdAndUpdate(messageId, { isLiked: true }, { new: true });

        res.status(200).json(message);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const editMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const { text } = req.body;

        const message = await Message.findByIdAndUpdate(messageId, { text, isEdited: true }, { new: true });

        res.status(200).json(message);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

/* DELETE */
export const deleteMessage = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { messageId } = req.params;

        // Encontra a mensagem pelo ID
        const message = await Message.findById(messageId);

        // Remove a mensagem do array messages do chat correspondente
        await Chat.findByIdAndUpdate(message.chatId, { $pull: { messages: messageId } }, { session });

        // Remove a mensagem pelo ID
        await Message.findByIdAndRemove(messageId, { session });

        // Confirma a transação
        await session.commitTransaction();

        res.status(200).json({ message: "Message deleted successfully" });
    } catch (err) {
        // Em caso de erro, aborta a transação
        await session.abortTransaction();
        res.status(400).json({ error: err.message });
    } finally {
        session.endSession();
    }
}