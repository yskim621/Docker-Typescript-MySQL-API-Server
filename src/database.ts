import * as mysql from 'mysql2';
import Memo from './interfaces/Memo.interface'
import * as dotenv from 'dotenv';
import users from "./interfaces/user";
dotenv.config();

// create pool
const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: "root",
    port: 3306,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.DATABASE_NAME,
});


pool.getConnection((err, connection) => {
    if (err) {
        console.log('Database connection failed')
        console.log(err)
    } else if (connection) {
        console.log('Database connected');
        connection.release();
    }
});

export async function createUser(id: string, pw: string, phone: string) {
    const [rows] = await pool.promise().query(`
        INSERT INTO users (id, pw, phone)
        VALUES ('${id}', '${pw}', '${phone}');
    `);
    return rows;
}

export async function getAllUsers(): Promise<users[]> {
    const [rows]: any = await pool.promise().query(`
        SELECT * FROM users;
    `);
    return rows;
}

export async function getUser(id: string) {
    // console.log('database.ts >> getUser() call!!!!!!!!!!!!!!!!~~~~~~~~~~~~~~~~~');
    const [rows] = await pool.promise().query(`
        SELECT * 
        FROM users
        WHERE id = '${id}';
    `);
    return rows[0];
}

export async function updateUser(id: string, phone: string) {
    await pool.promise().query(`
        UPDATE users
        SET phone ='${phone}'
        WHERE id='${id}'
        ;
    `);
}

export async function deleteUser(id: string) {
    await pool.promise().query(`
        DELETE FROM users
        WHERE id= '${id}';
    `);
}

// export async function postMessage(content: string) {
//     const [rows] = await pool.promise().query(`
//         INSERT INTO Memo (content)
//         VALUES ('${content}');
//     `);
//     return rows;
// }






