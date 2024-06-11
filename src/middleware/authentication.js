const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = async (req, res, next) => {
    try {
      const token = req.headers['x-access-token'];
      if(!token) {
        throw createError.BadGateway({message: "Token is not present"})
      } 
      const verify = await jwt.verify(token, process.env.TOKEN_KEY);
      req.user = verify;
      next();
    } catch (error) {
      next(error)  
    }
}