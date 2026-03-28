import { createUser, deleteUser as deleteUserInService, findUserByEmail, findUserById, getAllUser, updateUser } from "./user.service.js";
import { hashPassword } from "../utils/hash.js";

// RegisterAPI
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await findUserByEmail(email);
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await hashPassword(password);
    await createUser(name, email, hashedPassword);
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// getUser
export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUser();
    return res.status(200).json({ data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

//findUserById

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

//findUserByEmail
export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

//updateUsers
export const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    if (updates.password) {
      updates.password = await hashPassword(updates.password);
    }
    const result = await updateUser(id, updates);
    if (!result.affectedRows) {
      return res.status(404).json({ message: "User not found" })
    }
    return res.status(200).json({ message: "User updated successfully" })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

//deleteUser
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteUserInService(id);
    if (!result.affectedRows) {
      return res.status(404).json({ message: "User not found" })
    }
    return res.status(200).json({ message: "User deleted successfully" })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}