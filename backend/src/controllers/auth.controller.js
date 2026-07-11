const {registerUser, loginUser, getProfile} = require("../services/auth.service");

const signUp = async(req, res) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json({
            success: true,
            message: "User regsitered Successfully",
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const signIn = async(req, res) => {
    try {
        const user = await loginUser(req.body);
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: user,
        });        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const profile = async(req, res) => {
    try {
        const user = await getProfile(req.user.userId);
        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {signUp, signIn, profile};