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

exports.add_friend = async (req, res, next) => {
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
