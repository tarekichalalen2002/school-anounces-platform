const User = require('../models/userModel');
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshtoken");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const csv = require('csvtojson');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const io = require('../index'); 







// Use passport for Google authentication
passport.use(new GoogleStrategy({
  clientID: '759759818799-cb33i7mgtc2159cio27r0cgr4g571ao6.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:3000/api/user/auth/google/callback',
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      user = new User({
        firstname: profile.name.givenName,
        lastname: profile.name.familyName,
        email: profile.emails[0].value,
        googleId: profile.id,
      });
      await user.save();
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

exports.googleLogin = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

exports.googleLoginCallback = passport.authenticate('google', {
  failureRedirect: '/login', 
  session: false,
}), (req, res) => {
  
  const allowedDomain = 'estin'; 

  if (req.user.email.endsWith(`@${allowedDomain}`)) {
    const token = generateToken(req.user._id);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    return res.redirect(`/dashboard?token=${token}`);
  } else {
    return res.status(403).json({ error: 'Invalid email domain' });
  }
};



exports.loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
      const updateuser = await User.findByIdAndUpdate(
        findUser.id,
        
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      res.json({
        _id: findUser?._id,
        firstname: findUser?.firstname,
        lastname: findUser?.lastname,
        email: findUser?.email,
        mobile: findUser?.mobile,
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  });
  

  exports.loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const findAdmin = await User.findOne({ email });
    if (findAdmin.role !== "admin") throw new Error("Not Authorised");
    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
      const refreshToken = await generateRefreshToken(findAdmin?._id);
      const updateuser = await User.findByIdAndUpdate(
        findAdmin.id,
        {
          refreshToken: refreshToken,
        },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      res.json({
        _id: findAdmin?._id,
        firstname: findAdmin?.firstname,
        lastname: findAdmin?.lastname,
        email: findAdmin?.email,
        mobile: findAdmin?.mobile,
        token: generateToken(findAdmin?._id),
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  });


  exports.handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error(" No Refresh token present in db or not matched");
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err || user.id !== decoded.id) {
        throw new Error("There is something wrong with refresh token");
      }
      const accessToken = generateToken(user?._id);
      res.json({ accessToken });
    });
  });
  
  
  
  exports.logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      return res.sendStatus(204); 
    }
    await User.findOneAndUpdate(refreshToken, {
      refreshToken: "",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    res.sendStatus(204); 
  });
  
  
  
  exports.updatedUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
          firstname: req?.body?.firstname,
          lastname: req?.body?.lastname,
          email: req?.body?.email,
          mobile: req?.body?.mobile,
        },
        {
          new: true,
        }
      );
      res.json(updatedUser);
    } catch (error) {
      throw new Error(error);
    }
  });

  exports.getallUser = asyncHandler(async (req, res) => {
    try {
      const getUsers = await User.find();
      res.json(getUsers);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  
  
  exports.getaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
  
    try {
      const getaUser = await User.findById(id);
      res.json({
        getaUser,
      });
    } catch (error) {
      throw new Error(error);
    }
  });


  exports.deleteaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
  
    try {
      const deleteaUser = await User.findByIdAndDelete(id);
      res.json({
        deleteaUser,
      });
    } catch (error) {
      throw new Error(error);
    }
  });
  
  exports.blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
  
    try {
      const blockusr = await User.findByIdAndUpdate(
        id,
        {
          isBlocked: true,
        },
        {
          new: true,
        }
      );
      res.json(blockusr);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  exports.unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
  
    try {
      const unblock = await User.findByIdAndUpdate(
        id,
        {
          isBlocked: false,
        },
        {
          new: true,
        }
      );
      res.json({
        message: "User UnBlocked",
      });
    } catch (error) {
      throw new Error(error);
    }
  });
  
  exports.updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    validateMongoDbId(_id);
    const user = await User.findById(_id);
    if (password) {
      user.password = password;
      const updatedPassword = await user.save();
      res.json(updatedPassword);
    } else {
      res.json(user);
    }
  });
  
  


  exports.addUsersFromCSV = asyncHandler(async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Aucun fichier n\'a été téléchargé.' });
      }

      const csvBuffer = req.file.buffer.toString();
      const jsonArray = await csv().fromString(csvBuffer);

      await User.insertMany(jsonArray);

      res.status(201).json({ message: 'Utilisateurs ajoutés avec succès depuis le fichier CSV.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  exports.addUser = asyncHandler(async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  exports.createRoomRequest = asyncHandler(async (req, res) => {
    try {
      const { roomName } = req.body;
      const userId = req.user._id;
      const username = `${req.user.firstname} ${req.user.lastname}`;
  
      
      const user = await User.findById(userId).populate('currentRoom');
      if (user.currentRoom) {
        return res.status(400).json({ error: 'You are already in a room' });
      }
  
    
      const room = new Room({
        name: roomName,
        roomadmin: userId,
        isPending: true,
      });
  
      await room.save();
  
      
      io.emit('createRoomRequest', { roomName, userId, username });
  
      res.status(201).json({ message: 'Room creation request sent successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  exports.handleRoomCreationRequest = asyncHandler(async (req, res) => {
    try {
      const { roomName, userId, approve } = req.body;
      
      const room = await Room.findOne({
        name: roomName,
        roomadmin: userId,
        isPending: true,
      });
  
      if (!room) {
        return res.status(404).json({ error: 'Room creation request not found' });
      }
  
      
      if (approve) {
        
        room.isPending = false;
        await room.save();
      } else {
        
        await room.remove();
      }
  
      io.to(userId).emit('roomCreationResponse', { roomName, approve });
  
      res.status(200).json({ message: 'Room creation request handled successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
