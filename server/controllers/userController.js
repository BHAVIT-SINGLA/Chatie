const User= require("../models/userModel");
const bcrypt =require("bcrypt");


module.exports.register = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const usernameCheck = await User.findOne({ username });
      if (usernameCheck)
        return res.json({ msg: "Username already used", status: false });
      const emailCheck = await User.findOne({ email });
      if (emailCheck)
        return res.json({ msg: "Email already used", status: false });
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        username,
        password: hashedPassword,
      });
      user.password=undefined;
      return res.json({ status: true, user });
    } catch (ex) {
      next(ex);
    }
  };
  module.exports.login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user)
        return res.json({ msg: "Incorrect Username or Password", status: false });
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.json({ msg: "Incorrect Username or Password", status: false });
        user.password=undefined;
      return res.json({ status: true, user });
    } catch (ex) {
      next(ex);
    }
  };
  module.exports.setAvatar = async (req, res, next) => {
    
      const userId = req.params.id;
      console.log(req.body.avatarImage)
       const user=await User.findByIdAndUpdate(
        userId,
        {
          isAvatarImageSet: true,
          avatarImage:  req.body.avatarImage,
        }, { new: true })
        console.log(user);
        user.password=undefined;
        return res.json({
         user
        })
    } 
  module.exports.getAllUsers = async (req, res, next) => {
    try {
      const users = await User.find({ _id: { $ne: req.params.id } }).select([
        "email",
        "username",
        "avatarImage",
        "_id",
      ]);
      return res.json(users);
    } catch (ex) {
      next(ex);
    }
  };
  module.exports.logout = async(req,res,next) =>
  {
      await User.deleteOne({_id:req.params.id});
      return res.json({status: 200});
  }
  
  