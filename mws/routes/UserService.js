const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

/* GET users listing. */
router.get('/', validateToken, async function(req, res, next) {
  try{
    const allUsers = (await User.find()).filter( user => user.username === res.username );
    res.status(200).json( allUsers );
  }catch(err){
    res.status(500).json({ message: err.message });
  }
});
/* GET specific user listing. */
router.get('/:username', validateToken, async function(req, res, next) {
  try{
    const user = await User.findOne({ username: req.params.username});
    res.status(200).json( user );
  }catch(err){
    res.status(500).json({ message: err.message });
  }
});

/* POST create user */
router.post('/', checkUser, async(req, res)=>{
  // res.status(400).json({ message: 'User already exists.'}
  const hashedPassword = await bcrypt.hash( req.body.password, 10);

  const user = new User({
    username: req.body.username,
    password: hashedPassword,
    address: req.body.address,
    skills: req.body.skills
  });
  
  try{
    const newUser = await user.save();
    res.status(201).json({ message: "Successfully created user.", newUser});
  }catch(err){
    res.status(500).json({ message: err.message });
  }

});

/* DELETE remove user */
router.delete('/', findUser, async(req, res)=>{
  try{
    const user = await User.deleteOne({ username: req.body.username });
    res.status(200).json({ message: "Successfully deleted user."});
  }catch(err){
    res.status(500).json({ message: err.message });
  }
});


/* POST login user */
router.post("/login", findUser, async(req, res)=>{
  try{
    const isAuthentic = await bcrypt.compare( req.body.password, res.user.password);
    if(!isAuthentic) return res.status(401).json({ message: "Authentication failed."});
    let user = res.user;
    const accessToken = await jwt.sign( { user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h'} );
    res.status(200).json({ accessToken: accessToken, username: res.user.username});
  }catch(err){
    res.status(500).json({message: err.message});
  }
});

/* PING */
router.get("/ping", validateToken, (req, res)=>{
  res.status(200).json({ message: "Ping success."});
});

/* Middleware */

async function checkUser(req, res, next){
  try{
    const user = await User.findOne({ username: req.body.username });
    if(user != null){
      return res.status(400).json({ message: "User already exists."});
    }
    next();
  }catch(err){
    return res.status(400).json({ message: err.message });
  }
}

async function findUser(req, res, next){
  
  try{
    const user = await User.findOne({ username: req.body.username });
    if(user == null) return res.status(404).json({ message: "User not found."});
    res.user = user;
  }catch(err){
    return res.status(500).json({ message: err.message });
  }
  next();
}

async function validateToken(req, res, next){
  const authHeaders = req.headers['authorization'];
  const accessToken = authHeaders && authHeaders.split(" ")[1];

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload)=>{
    if(err) return res.status(403).json({message: err.message});
    res.username = payload.user.username;
    next();
  });
}
module.exports = router;
