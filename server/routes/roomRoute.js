const express = require("express");
const roomCtrl = require("../controller/roomCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/add-default-room", authMiddleware, roomCtrl.createDefaultRoom);
router.post("/add-room", authMiddleware, roomCtrl.createRoom);
router.post("/send-message", authMiddleware, roomCtrl.sendMessage);
router.post("/handle-response", authMiddleware, roomCtrl.handleResponse);
router.post("/add-students-toRoom", roomCtrl.addStudentsToRoom);
router.get("/get-all-room", roomCtrl.getallRooms);
router.get("/get-room/:id", roomCtrl.getaRoom);
router.delete("/delete-room/:id", roomCtrl.deleteaRoom);
router.get("/get-user-rooms", authMiddleware, roomCtrl.getUserRooms);
router.get(
  "/get-room-messages/:id/:index",
  authMiddleware,
  roomCtrl.getRoomMessages
);

module.exports = router;
