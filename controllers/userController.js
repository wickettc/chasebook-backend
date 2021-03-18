const User = require('../models/user');

exports.get_user = async (req, res, next) => {
    try {
        const foundUser = await User.findById(req.params.id)
            // .populate('friends')
            .populate('friendrequests');
        // may have to change the reference in userSchema to user to make the above work
        if (!foundUser) throw new Error('No user Found');
        res.status(200).json(foundUser);
    } catch (err) {
        next(err);
    }
};

exports.send_request = async (req, res, next) => {
    try {
        const { curUserID, reqUserID } = req.body;
        const friendRequest = await User.findByIdAndUpdate(
            reqUserID,
            { $addToSet: { friendrequests: curUserID } },
            { new: true },
            (err) => {
                if (err) next(err);
            }
        );
        if (!friendRequest) throw new Error('Friend Request could not be sent');
        res.status(200).json(friendRequest);
    } catch (err) {
        next(err);
    }
};

exports.accept_request = async (req, res, next) => {
    try {
        const { curUserID, reqUserID } = req.body;
        const acceptRequest = await User.findByIdAndUpdate(
            curUserID,
            { $pull: { friendrequests: reqUserID } },
            { new: true },
            (err) => {
                if (err) next(err);
            }
        );
        if (!acceptRequest)
            throw new Error('Friend Request could not be accepted');
        const addFriend1 = await User.findByIdAndUpdate(
            curUserID,
            { $addToSet: { friends: reqUserID } },
            { new: true },
            (err) => {
                if (err) next(err);
            }
        );
        const addFriend2 = await User.findByIdAndUpdate(
            reqUserID,
            { $addToSet: { friends: curUserID } },
            { new: true },
            (err) => {
                if (err) next(err);
            }
        );
        if (!addFriend1 || !addFriend2)
            throw new Error('Friend could not be added');
        res.status(200).json({ acceptRequest, addFriend1, addFriend2 });
    } catch (err) {
        next(err);
    }
};

exports.deny_request = async (req, res, next) => {
    try {
        const { curUserID, reqUserID } = req.body;
        const denyRequest = await User.findByIdAndUpdate(
            curUserID,
            { $pull: { friendrequests: reqUserID } },
            { new: true },
            (err) => {
                if (err) next(err);
            }
        );
        if (!denyRequest) throw new Error('Friend Request could not denied');
        res.status(200).json(denyRequest);
    } catch (err) {
        next(err);
    }
};
