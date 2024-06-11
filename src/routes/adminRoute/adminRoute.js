const { registerAdmin, loginAdmin, getAdminProfile
, updateAdminProfile, deleteProfile } = require("../../controller/adminController/adminController");
const authentication = require("../../middleware/authentication");

const router = require("express").Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/:id", authentication, getAdminProfile);
router.put("/update/profile",authentication, updateAdminProfile);
router.put("/delete/profile",authentication, deleteProfile)
module.exports = router;