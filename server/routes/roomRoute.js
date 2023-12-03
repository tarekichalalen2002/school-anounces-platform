const express = require("express");
const roomCtrl = require("../controller/roomCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();


router.post("/add-room", roomCtrl.createRoom);
router.post("/add-students-toRoom", roomCtrl.addStudentsToRoom);
router.get("/get-all-room", roomCtrl.getallRooms);
router.get("/get-room/:id", roomCtrl.getaRoom);
router.delete("/delete-room/:id", roomCtrl.deleteaRoom);

module.exports = router;

