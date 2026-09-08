import {
  getUserByEmail,
  createUser,
} from "../../database/models/pemilik_hidroponik.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const userAlreadyRegistered = await getUserByEmail(email);

  if (userAlreadyRegistered != null) {
    return res.status(400).json({
      status: "error",
      message: "Email is already in use!",
      data: null,
    });
  }

  const userCreated = await createUser(name, email, password);

  if (userCreated && userCreated.affectedRows > 0) {
    const user = await getUserByEmail(email);

    return res.status(200).json({
      status: "success",
      message: "Registration successful!",
      data: {
        id: user.id_pemilik,
        name: user.name,
        email: user.email,
      },
    });
  }

  return res.status(400).json({
    status: "error",
    message: "Registration failed!",
    data: null,
  });
};