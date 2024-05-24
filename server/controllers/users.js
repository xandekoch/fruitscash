import mongoose from "mongoose";
import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
    try {
        if (req.method === 'OPTIONS') { return res.status(200).json(({ body: "OK" })) }
        const { userIdOrUsername } = req.params;

        // Verificar se o parâmetro é um ID do MongoDB válido
        const isMongoId = /^[0-9a-fA-F]{24}$/.test(userIdOrUsername);

        let user;
        if (isMongoId) {
            user = await User.findById(userIdOrUsername);
        } else {
            user = await User.findOne({ username: userIdOrUsername });
        }

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const formattedUser = {
            username: user.username,
            id: user._id,
            name: user.name,
            verified: user.verified,
            picturePath: user.picturePath,
            bio: user.bio,
            location: user.location,
            postsCount : user.posts.length,
            followersCount: user.followers.length,
            followingCount: user.following.length
        };

        res.status(200).json(formattedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const searchUsers = async (req, res) => {
    try {
        const search = req.query.search;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const regex = new RegExp(search, 'i');

        const users = await User.aggregate([
            {
                $match: {
                    $or: [
                        { username: { $regex: regex } },
                        { name: { $regex: regex } }
                    ]
                }
            },
            {
                $project: {
                    _id: 1,
                    username: 1,
                    name: 1,
                    picturePath: 1,
                    followersCount: { $size: "$followers" }
                }
            },
            {
                $sort: { followersCount: -1, username: 1 }
            },
            {
                $skip: (page - 1) * limit
            },
            {
                $limit: limit
            }
        ]);

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const checkFollowing = async (req, res) => {
    try {
        const { userId } = req.params;
        const { userToCheckId } = req.query;

        // Encontre o usuário atual pelo ID
        const user = await User.findById(userId);

        // Verifique se o ID do usuário que você deseja verificar está presente no array following do usuário atual
        const isFollowing = user.following.includes(userToCheckId);
        console.log(isFollowing)

        // Retorne true se o usuário está seguindo o outro, caso contrário, retorne false
        res.status(200).json({ isFollowing });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export const getUserFollowersIng = async (req, res) => {
    try {
        const myUserId = req.query.myUserId;
        const userFollowing = await User.findById(myUserId).select('following');
        const followingIds = userFollowing.following;
        const { username } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const seeFollow = req.query.seeFollow;
        const search = req.query.search;

        console.log(page, limit, search);

        const user = await User.findOne({ username: username }).select(seeFollow);
        let followersIng;

        if (seeFollow === 'followers') {
            followersIng = await User.find({ _id: { $in: user.followers } })
                .sort({ username: 1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .select('_id username name picturePath');
        } else if (seeFollow === 'following') {
            followersIng = await User.find({ _id: { $in: user.following } })
                .sort({ username: 1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .select('_id username name picturePath');
        }

        // Se houver uma string de pesquisa, adicione a lógica de pesquisa
        if (search) {
            const regex = new RegExp(search, 'i');
            followersIng = followersIng.filter(followerIng =>
                regex.test(followerIng.username) || regex.test(followerIng.name)
            );
        }

        // Adicione a verificação de seguimento para cada usuário retornado
        const followersIngWithFollowBool = followersIng.map(followerIng => {
            const isFollowing = followingIds.includes(followerIng._id);
            return { ...followerIng._doc, doIFollow: isFollowing };
        });

        res.status(200).json(followersIngWithFollowBool);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export const getUserFollowing = async (req, res) => {
    try {
        const myUserId = req.query.myUserId;
        const userFollowing = await User.findById(myUserId).select('following');
        const followingIds = userFollowing.following;
        const { username } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const user = await User.findOne({ username: username }).select('following');
        const followings = await User.find({ _id: { $in: user.following } })
            .sort({ username: 1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .select('_id username name picturePath');

        // Adicione a verificação de seguimento para cada usuário retornado
        const followingsWithFollowBool = followings.map(following => {
            const isFollowing = followingIds.includes(following._id);
            return { ...following._doc, doIFollow: isFollowing };
        });


        res.status(200).json(followingsWithFollowBool);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

/* UPDATE */
export const addRemoveFollowing = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { id } = req.params;
        const { operation, userToFollowId } = req.query;
        console.log(operation)
        console.log(userToFollowId)

        const user = await User.findById(id);
        const userToFollow = await User.findById(userToFollowId);

        // Segue
        if (operation === "add") {
            if (user.following.includes(userToFollowId)) {
                await session.abortTransaction();
                res.status(400).json("User already follows this user");
                return;
            }
            await user.updateOne({ $push: { following: userToFollowId } }, { session });
            await userToFollow.updateOne({ $push: { followers: id } }, { session });
            await session.commitTransaction();
            res.status(200).json("User has been followed");
            // Deixa de seguir
        } else if (operation === "remove") {
            if (!user.following.includes(userToFollowId)) {
                await session.abortTransaction();
                res.status(400).json("User already doesn't follow this user");
                return;
            }
            await user.updateOne({ $pull: { following: userToFollowId } }, { session });
            await userToFollow.updateOne({ $pull: { followers: id } }, { session });
            await session.commitTransaction();
            res.status(200).json("User has been unfollowed");
            // Operação inválida
        } else {
            await session.abortTransaction();
            res.status(400).json("Invalid operation");
        }
    } catch (err) {
        await session.abortTransaction();
        res.status(500).json({ error: err.message });
    } finally {
        session.endSession();
    }
}

export const editProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const filePath = req.filePath;
        const { username, name, bio } = req.body;

        const updateFields = {};
        if (username) updateFields.username = username;
        if (name) updateFields.name = name;
        if (bio) updateFields.bio = bio;
        if (filePath) updateFields.picturePath = filePath;

        const user = await User.findByIdAndUpdate(userId, updateFields, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}