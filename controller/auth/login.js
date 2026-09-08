import { getUserByEmail } from "../../database/models/pemilik_hidroponik.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    return res.status(401).json({
      status: "error",
      message: "Email and password are required!",
      token: null,
    });
  }

  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(401).json({
      status: "error",
      message: "Email not found!",
      token: null,
    });
  }

  if (email === user.email && password === user.password) {
    const token = jwt.sign(
      { userId: user.id_pemilik },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.EXPIRED_JWT_TOKEN,
      }
    );

    return res.status(200).json({
      status: "success",
      message: "Login successful!",
      token,
      data: {
        id: user.id_pemilik,
        name: user.name,
        email: user.email,
      },
    });
  }

  return res.status(401).json({
    status: "error",
    message: "Incorrect password!",
    token: null,
  });
};