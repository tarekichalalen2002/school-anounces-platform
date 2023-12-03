const express = require("express");
const userCtrl = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const upload = require('../middlewares/upload');
const router = express.Router();



router.put("/password", authMiddleware, userCtrl.updatePassword);
router.post("/login", userCtrl.loginUserCtrl);
router.post("/admin-login", userCtrl.loginAdmin);
router.post("/add-user", userCtrl.addUser);
router.post('/add-from-csv', upload.single('csvFile'), userCtrl.addUsersFromCSV);
router.get("/all-users", userCtrl.getallUser);
router.get("/refresh", userCtrl.handleRefreshToken);
router.get("/logout", userCtrl.logout);


router.get("/:id",   userCtrl.getaUser);
router.delete("/:id",authMiddleware,
isAdmin, userCtrl.deleteaUser);

router.put("/edit-user", authMiddleware, userCtrl.updatedUser);
router.put("/block-user/:id", authMiddleware, isAdmin, userCtrl.blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, userCtrl.unblockUser);

module.exports = router;
