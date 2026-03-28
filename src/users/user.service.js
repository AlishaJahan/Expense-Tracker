import { db } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';


export const createUser = async (name, email, password) => {
    const id = uuidv4();
    const query = `INSERT INTO users (id,name,email,password) VALUES (?,?,?,?)`;
    const [result] = await db.execute(query, [id, name, email, password]);
    return { result, id };
}

export const findUserByEmail = async (email) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    const [result] = await db.execute(query, [email]);
    return result[0];
}

export const findUserById = async (id) => {
    const query = `SELECT * FROM users WHERE id = ?`;
    const [result] = await db.execute(query, [id]);
    return result[0];
}

export const getAllUser = async () => {
    const query = `SELECT * FROM users`;
    const [result] = await db.execute(query);
    return result;
}

export const updateUser = async (id, updates) => {
    const fields = [];
    const values = [];

    for (let key in updates) {
        fields.push(`${key} = ?`);
        values.push(updates[key])
    }

    values.push(id);

    const query = `UPDATE users SET ${fields.join(", ")} WHERE id = ? `;
    const [result] = await db.execute(query, values);
    return result;
}

//delete user

export const deleteUser = async (id) => {
    const query = `DELETE FROM users WHERE id = ?`;
    const [result] = await db.query(query,[id]);
    return result;
}