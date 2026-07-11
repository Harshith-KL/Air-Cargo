const bcrypt = require("bcryptjs");
const {createUser, findUserByEmail, findUserById } = require("../repositories/user.repository");
const {generateToken} = require("../utils/jwt");
const {createOrganization} = require("../repositories/organization.repository");

const registerUser = async(userData) => {
    const {fullName, contactNumber, email, password, organizationName, organizationAddress} = userData;
    if(!fullName || !contactNumber || !email || !password || !organizationName || !organizationAddress){
        throw new Error("All fields required");
    }

    const existingUser = await findUserByEmail(email);
    if(existingUser){
        throw new Error("User with this email already exists");
    }

    const organization = await createOrganization({
        organizationName,
        organizationAddress,
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({
        fullName,
        contactNumber,
        email,
        password: hashedPassword,
        organizationId: organization._id
    });

    const token = generateToken({
        userId: user._id,
        email: user.email,
        role: user.role,
        organizationId: user.organizationId._id.toString(),

    });
    // return user;
    return {
        token,
        user: {
            _id: user._id,
            fullName: user.fullName,
            contactNumber: user.contactNumber,
            email: user.email,
            role: user.role,
            organization: organization,
        }
    };
};

const loginUser = async(userData) => {
    const {email, password} = userData;
    if(!email || !password){
        throw new Error("All Fields are required");
    }
    const user = await findUserByEmail(email);
    if(!user){
        throw new Error("Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        throw new Error("Mismatching. Please check your email and password");
    }
    const token = generateToken({
        userId: user._id,
        email: user.email,
        role: user.role,
        organizationId: user.organizationId._id.toString(),
    })
    return {
        token,
        user: {
            _id: user._id,
            fullName: user.fullName,
            contactNumber: user.contactNumber,
            email: user.email,
            role: user.role,
            organization: user.organizationId,
        }
    }
};

const getProfile = async(userId) => {
    const user = await findUserById(userId);
    if(!user){
        throw new Error("User not found");
    }
    return {
        _id: user._id,
        fullName: user.fullName,
        contactNumber: user.contactNumber,
        email: user.email,
        role: user.role,
        organization: user.organizationId,
    };
};

module.exports = {registerUser, loginUser, getProfile, };