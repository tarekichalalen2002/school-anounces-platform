const Room = require('../models/roomModel')
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require('../utils/validateMongodbId');




exports.createRoom = asyncHandler(async (req, res) => {
    try {
      const { name , students , roomadmin} = req.body;

      const existingRoom = await Room.findOne({ name: name });
      if (existingRoom) {
        return res.status(400).json({ error: 'Room with the same name already exists' });
      }

      const newRoom = new Room({ name: name, students: students, roomadmin: roomadmin });
      await newRoom.save();

      res.status(200).json({ message: 'Room created successfully', room: newRoom });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

exports.getallRooms = asyncHandler(async (req, res) => {
    try {
      const getRooms = await Room.find();
      res.json(getRooms);
    } catch (error) {
      throw new Error(error);
    }
  });



exports.deleteaRoom = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
  
    try {
      const deleteaRoom = await Room.findByIdAndDelete(id);
      res.json({
        deleteaRoom,
      });
    } catch (error) {
      throw new Error(error);
    }
  });


exports.getaRoom = asyncHandler(async(req,res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        const getaRoom = await Room.findById(id);
        res.json({ getaRoom,});
} catch (error) {
    throw new Error(error);
}
}); 

exports.addStudentsToRoom = async (req, res) => {
    try {
      const { roomId, studentIds } = req.body;
  
      const room = await Room.findById(roomId);
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
  
      const uniqueStudentIds = [...new Set(studentIds)];
  
      const newStudentIds = uniqueStudentIds.filter(
        (studentId) => !room.students.includes(studentId)
      );

      room.students.push(...newStudentIds);
  
      const updatedRoom = await room.save();
  
      res.status(200).json({
        message: 'Students added to the room successfully',
        room: updatedRoom,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };