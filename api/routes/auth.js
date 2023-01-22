const router = require("express").Router();
const User = require("../modal/user");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {
  try {
    // Hidding the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create New User
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save user & Respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("User Not Found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("Wrong Password");

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
