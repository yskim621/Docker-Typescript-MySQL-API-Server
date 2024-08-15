import * as jwt from 'jsonwebtoken';

import * as db from '../database';
import userMngt from '../interfaces/user';

async function createUser(id: string, pw: string, phone: string) {
    await db.createUser(id, pw, phone);

    return;
}

async function getUsers(token: string) {

    const users: userMngt[] = await db.getAllUsers();
    console.log(users);

    return users;
}

async function getUser(id: string, token: string) {

    const user: userMngt = await db.getUser(id);
    console.log(user);

    return user;
}

async function updateUser(id: string, phone: string, token: string) {

    await db.updateUser(id, phone);

    const user: userMngt = await db.getUser(id);

    return user;
}

async function deleteUser(id: string, token: string) {

    await db.deleteUser(id);

    return;
}


async function checkDuplicatedId(id: string) {
    const user: userMngt = await db.getUser(id);
    console.log('user: ' + user);

    return !user;
}

export default {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    checkDuplicatedId
}