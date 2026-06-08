const db = require("../config/db");
const bcrypt = require("bcrypt");

// REGISTER
exports.register = (req, res) => {
    const { username, contact, password } = req.body;

    if (!username || !contact || !password) {
        return res.json({ message: "All fields are required" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = "INSERT INTO users (username, contact, password) VALUES (?, ?, ?)";

    db.query(sql, [username, contact, hashedPassword], (err, result) => {
        if (err) {
            return res.json({ message: "Error registering user", error: err });
        }
        return res.json({ message: "User registered successfully" });
    });
};


// LOGIN
exports.login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({ message: "All fields are required" });
    }

    const sql = "SELECT * FROM users WHERE username = ?";

    db.query(sql, [username], (err, result) => {
        if (err) {
            return res.json({ message: "Error logging in", error: err });
        }

        if (result.length === 0) {
            return res.json({ message: "User not found" });
        }

        const user = result[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.json({ message: "Password check error" });
            }

            if (!isMatch) {
                return res.json({ message: "Incorrect password" });
            }

            return res.json({ message: "Login successful" });
        });
    });
};