const mongoose = require("mongoose");
const createError = require("http-errors");
const Admin = require("../../model/admin_model/adminMode");
const { hashPassword, createtoken, comparePassword } = require("../../helper/helper");

class AdminController {
    constructor() {}

    /* Admin Registration */
    async registerAdmin(req, res, next) {
        try {
           const {name, email, password} = req.body;
           if(!name || !email || !password) {
            throw createError.BadRequest({message: "Invalid register request"});
           } 
           const admin = await Admin.findOne({email: email});
           if(admin) {
            throw createError.BadRequest({message: "Email already taken"})
           } else {
            /* Hash user password */
            const hash = await hashPassword(password);

            const adminObj = Admin({
                _id: new mongoose.Types.ObjectId(),
                name, email, password: hash,
            });
            const adminData = await adminObj.save();
            /* create token for admin */
            const token = await createtoken(adminData);
            return res.status(201).json({message: "Admin successfully registered", status: 201, admin: adminData, token: token});
           }
        } catch (error) {
            next(error)
        }
    }

    /* Admin Login */
    async loginAdmin(req, res, next) {
        try {
            const {email, password} = req.body;
            if(!email || !password) {
             throw createError.BadRequest({message: "Invalid register request"});
            } 
            const admin = await Admin.findOne({email: email});
            if(!admin) {
                throw createError.BadRequest({message: "User with same email address does not exists"});
            } 
            /* Compare password */
            const result = await comparePassword(password, admin);
            console.log(result)
            if(!result) {
                throw createError.BadRequest({message: "Password did not matched"})
            }
            /* create token for admin */
            const token = await createtoken(admin);
            return res.status(201).json({message: "Admin successfully loggedIn", status: 201, admin: admin, token: token});

        } catch (error) {
            next(error)
        }
    }

    /* Get admin profile */
    async getAdminProfile(req, res, next) {
        try {
           if(!req.params.id) {
            throw createError.BadRequest({message: 'No user id found'})
           }
           const profile  = await Admin.findOne({$and: [{_id: req.params.id}, {status: 'active'}]}).select("-password");
           return res.status(200).json({status: 200, data: profile})
        } catch (error) {
            next(error)
        }
    }

    /* Update admin profile */
    async updateAdminProfile(req, res, next) {
        try {
           const updateAdmin = await Admin.findByIdAndUpdate(req.user.id, req.body, {new: true});
           return res.status(200).json({message: "Admin profile data has been updated", status: 200, data: updateAdmin});
        } catch (error) {
            next(error)
        }
    }

    /* Delete admin profile */
    async deleteProfile(req, res, next) {
        try{
            const deletedUser = await Admin.findByIdAndUpdate(req.user.id, {$set: {status: "delete"}}, {new: true});
            return res.status(200).json({message: 'Admin profile has been deleted', status: 200, data: deletedUser})
        }
        catch(error) {
            next(error)
        }
    }
}
module.exports = new AdminController();