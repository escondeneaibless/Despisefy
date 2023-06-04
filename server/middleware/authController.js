const User = require('../models/User');
const Role = require('../models/Role');
const express = require("express");
const mysql = require("mysql2");
const app = express();
const pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    database: "itgid_nodecourse",
    password: "",
});

class authController {
    async registration(req, res) {
        try {

        } catch (e) {

        }
    }
    async login(req, res) {
        try {

        } catch (e) {

        }
    }
    async view(req, res) {
        try {
            const userRole = new Role();
            const adminRole = new Role({ value: "ADMIN" });

            pool.query("SELECT INTO roles (role) VALUES (?)", ["Admin"], (req, res) => {
                
            })
            res.json('server work')
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = new authController();