import sqlite3 from "sqlite3";
import { open } from "sqlite"; // Wrapper for sqlite3 that supports Promises

const db = await open({
    filename: "../database/db.sqlite3",
    driver: sqlite3.Database
});

export default db;
