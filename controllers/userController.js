const User = require('../models/user');

exports.get_user = async (req, res, next) => {
    try {
        const foundUser = await User.findById(req.params.id);
        if (!foundUser) throw new Error('No user Found');
        res.status(200).json(foundUser);
    } catch (err) {
        next(err);
    }
};
