const Room = require("../models/roomModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const io = require("../index");

exports.createDefaultRoom = asyncHandler(async (req, res) => {
  try {
    const { _id: roomadmin } = req.user;
    const { name } = req.body;
    const existingRoom = await Room.findOne({ name: name });
    if (existingRoom) {
      return res
        .status(400)
        .json({ error: "Room with the same name already exists" });
    }
    const newRoom = new Room({
      name: name,
      roomadmin: roomadmin,
      isGeneral: true,
      isPending: false,
    });
    await newRoom.save();
    res
      .status(200)
      .json({ message: "Room created successfully", room: newRoom });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

exports.createRoom = asyncHandler(async (req, res) => {
  try {
    const { _id: roomadmin } = req.user;
    validateMongoDbId(roomadmin);
    const { name } = req.body;
    const students = [roomadmin];

    const existingRoom = await Room.findOne({ name: name });
    if (existingRoom) {
      return res
        .status(400)
        .json({ error: "Room with the same name already exists" });
    }

    const newRoom = new Room({
      name: name,
      students: students,
      roomadmin: roomadmin,
    });
    await newRoom.save();
    res
      .status(200)
      .json({ message: "Room created successfully", room: newRoom });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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

exports.getaRoom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const getaRoom = await Room.findById(id);
    res.json({ getaRoom });
  } catch (error) {
    throw new Error(error);
  }
});

exports.addStudentsToRoom = async (req, res) => {
  try {
    const { roomId, studentIds } = req.body;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    const uniqueStudentIds = [...new Set(studentIds)];

    const newStudentIds = uniqueStudentIds.filter(
      (studentId) => !room.students.includes(studentId)
    );

    room.students.push(...newStudentIds);

    const updatedRoom = await room.save();

    res.status(200).json({
      message: "Students added to the room successfully",
      room: updatedRoom,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { roomId, message, messageType, threadId } = req.body;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    const senderId = req.user._id;
    const senderName = `${req.user.firstname} ${req.user.lastname}`;

    const newMessage = {
      sender: {
        id: senderId,
        name: senderName,
      },
      content: message,
      timestamp: new Date(),
      type: messageType,
      threadId,
    };

    // io.to(roomId).emit("newMessage", newMessage);

    room.messages.push(JSON.stringify(JSON.stringify(newMessage)));
    const updatedRoom = await room.save();


    res.status(200).json({
      message: "Message sent successfully",
      room: updatedRoom,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.handleResponse = async (req, res) => {
  try {
    const { roomId, messageId, response, threadId } = req.body;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    const message = room.messages.id(messageId);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    // Check if the current user is the sender of the original 'objet perdu' message
    const senderId = req.user._id;
    if (message.sender.id.toString() !== senderId) {
      return res.status(403).json({ error: "Permission denied" });
    }

    message.responses.push({
      sender: senderId,
      content: response,
      timestamp: new Date(),
      threadId,
    });

    const updatedRoom = await room.save();

    io.to(senderId).emit("messageResponse", {
      messageId,
      response,
      threadId,
    });

    res.status(200).json({
      message: "Response added successfully",
      room: updatedRoom,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserRooms = async (req, res) => {
  try {
    const { _id } = req.user;
    validateMongoDbId(_id);
    const userRooms = await Room.find({ students: { $in: [_id] } });
    const generalRooms = await Room.find({ isGeneral: true });
    const allRooms = [...userRooms, ...generalRooms];
    const rooms = allRooms.map((room) => {
      const latestMessage =
        room.messages.length > 0
          ? room.messages[room.messages.length - 1]
          : null;
      const { students, messages, ...roomWithoutStudentsAndMessages } =
        room.toObject();
      return {
        ...roomWithoutStudentsAndMessages,
        lastMessage: latestMessage,
      };
    });
    res.status(200).json({ rooms });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRoomMessages = async (req, res) => {
  try {
    const { id, index } = req.params;
    validateMongoDbId(id);
    const room = await Room.findById(id);
    // const messages = room.messages.slice(index * 10);
    const messages = room.messages;
    console.log(messages);
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
