import jwt from "jsonwebtoken";
import { getUserById } from "../../database/models/pemilik_hidroponik.js";

export const verify = async (req, res) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Access denied",
      data: null,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await getUserById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Token is valid",
      data: {
        id: user.id_pemilik,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Invalid token",
      data: null,
    });
  }
};