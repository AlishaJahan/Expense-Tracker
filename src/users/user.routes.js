import { Router } from "express";
import { deleteUser, getAllUsers, getUserByEmail, getUserById, registerUser, updateUsers } from "./user.controller.js";
import { loginUser, logoutUser } from "./auth.controller.js";

const router = Router();

//authRoute
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

//userRoutes
router.get('/email/search', getUserByEmail);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.patch('/:id', updateUsers);
router.delete('/:id',deleteUser);

export default router;