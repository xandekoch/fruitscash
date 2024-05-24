import mongoose from "mongoose";
import Post from '../models/Post.js';
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
    try {
        const { userId, type, description, isPrivate } = req.body;
        const filePath = req.filePath;
        const newPost = new Post({ userId, type, description, filePath, isPrivate });
        const user = await User.findById(userId).select('posts');

        user.posts.push(newPost._id);
        await newPost.save();
        await user.save();

        res.status(201).json(newPost);
    } catch (err) {
        res.status(409).json({ error: err.message });
        console.log(err)
    }
}

/* READ */
export const getPostsFromUser = async (req, res) => {
    try {
        const { id } = req.params;
        const page = parseInt(req.query.page) || 1; // número da página
        const limit = parseInt(req.query.limit) || 10; // número de posts por página

        const user = await User.findById(id).select('posts');
        const posts = await Post.find({ _id: { $in: user.posts } })
            .sort({ createdAt: -1 }) // Os mais novos primeiro
            .skip((page - 1) * limit) // pula os posts das páginas anteriores
            .limit(limit) // limita o número de posts retornados
            .select('type filePath isPrivate'); // seleciona apenas os campos desejados

        res.status(200).json(posts); // Se for um [] vázio, no front eu faço parar de chamar a API pra n ficar infinitamente
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export const getPrivatePostsFromUser = async (req, res) => {
    try {
        const { id } = req.params;
        const page = parseInt(req.query.page) || 1; // número da página
        const limit = parseInt(req.query.limit) || 9; // número de posts por página

        const user = await User.findById(id);
        const posts = await Post.find({ _id: { $in: user.privatePosts } })
            .sort({ createdAt: -1 }) // Ordena os posts pelo campo 'createdAt' em ordem decrescente (os mais novos primeiro)
            .skip((page - 1) * limit) // pula os posts das páginas anteriores
            .limit(limit); // limita o número de posts retornados

        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export const getLikedPosts = async (req, res) => {
    try {
        const { id } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const user = await User.findById(id);
        const posts = await Post.find({ _id: { $in: user.likedPosts } })
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export const getSavedPosts = async (req, res) => {
    try {
        const { id } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const user = await User.findById(id);
        const posts = await Post.find({ _id: { $in: user.savedPosts } })
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

/* UPDATE */
export const addRemoveLikedPost = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { id, postId } = req.params;
        const operation = req.body.operation;

        const user = await User.findById(id).session(session);
        const post = await Post.findById(postId).session(session);

        if (operation === "like") {
            user.likedPosts.push(postId);
            post.likes += 1;
            await post.save({ session });
            await user.save({ session });
            await session.commitTransaction();
            res.status(200).json({ message: "Post liked successfully" });
        } else if (operation === "removeLike") {
            user.likedPosts = user.likedPosts.filter((post) => post !== postId);
            post.likes -= 1;
            await post.save({ session });
            await user.save({ session });
            await session.commitTransaction();
            res.status(200).json({ message: "Like removed successfully" });
        }
    } catch (err) {
        await session.abortTransaction();
        res.status(404).json({ error: err.message });
    } finally {
        session.endSession();
    }
}

export const addRemoveSavedPost = async (req, res) => {
    try {
        const { id, postId } = req.params;
        const operation = req.body.operation;

        const user = await User.findById(id);

        if (operation === "save") {
            user.savedPosts.push(postId);
            await user.save();
            res.status(200).json({ message: "Post saved successfully" });
        } else if (operation === "removeSave") {
            user.savedPosts = user.savedPosts.filter((post) => post !== postId);
            await user.save();
            res.status(200).json({ message: "Post unsaved successfully" });
        }
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

/* DELETE */
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { postId } = req.body;

        const user = await User.findById(id);
        user.posts = user.posts.filter((post) => post !== postId);
        await user.save();

        await Post.findByIdAndDelete(postId);

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

/* COMMENTS */
export const addComment = async (req, res) => {
    const { id, postId } = req.params;
    const { content } = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const post = await Post.findById(postId).session(session);

        const newComment = new Comment({ userId: id, postId, content });
        await newComment.save({ session });

        post.comments.push(newComment._id);
        await post.save({ session });

        await session.commitTransaction();

        res.status(201).json(newComment);
    } catch (err) {
        await session.abortTransaction();
        res.status(404).json({ error: err.message });
    } finally {
        session.endSession();
    }
}

export const editComment = async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;
    try {
        const updatedComment = await Comment.findByIdAndUpdate(commentId, { content }, { new: true });

        if (!updatedComment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const deletedComment = await Comment.findByIdAndDelete(commentId).session(session);

        if (!deletedComment) {
            await session.abortTransaction();
            return res.status(404).json({ error: "Comment not found" });
        }

        const post = await Post.findById(deletedComment.postId).session(session);
        post.comments.pull(deletedComment._id);
        await post.save({ session });

        await session.commitTransaction();

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
        await session.abortTransaction();
        res.status(500).json({ error: err.message });
    } finally {
        session.endSession();
    }
}