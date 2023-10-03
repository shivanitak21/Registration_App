const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
// MongoDB connection
mongoose.connect("mongodb://localhost/registrationapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("User", {
  firstName: String,
  lastName: String,
  email: String,
  country: String,
  state: String,
  city: String,
  gender: String,
  dateOfBirth: String,
  age: Number,
});

app.use(bodyParser.json());

// Registration endpoint
app.post("/register", async (req, res) => {
  try {
    const { email } = req.body;
    

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already registered with this email" });
    }

    // Create a new user
    const newUser = new User(req.body);

    // Calculate age from date of birth (assuming dateOfBirth is provided)
    if (req.body.dateOfBirth) {
      const today = new Date();
      const dob = new Date(req.body.dateOfBirth);
      const age = today.getFullYear() - dob.getFullYear();
      newUser.age = age;
    }

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
