const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createError = require("http-errors");

class Helper {
    constructor() {}

    async hashPassword(password) {
        try {
           const hashPassword = await bcrypt.hash(password, 10);
           return hashPassword; 
        } catch (error) {
            throw createError.BadRequest({message: error.message})
        }
    }

    async createtoken(user) {
        try {
            const token = await jwt.sign({id: user._id}, process.env.TOKEN_KEY, {expiresIn: "365d"});
            return token;
        } catch (error) {
            throw createError.BadRequest({message: error.message})
        }
    }

    async comparePassword(password, admin) {
        try {
           const result = await bcrypt.compare(password, admin.password);
           return result
        } catch (error) {
           throw createError.BadRequest({message: error.message}) 
        }
    }
}
module.exports = new Helper()