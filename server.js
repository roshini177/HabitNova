const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
app.use(cors());
app.use(express.json());

// Load Firebase Admin SDK key
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Middleware to verify Firebase token sent as "Authorization: Bearer <token>"
async function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send("Unauthorized");
    }

    const idToken = authHeader.split(" ")[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).send("Invalid Token");
    }
}

// Protected route
app.get("/dashboard-data", verifyToken, (req, res) => {
    res.send({
        message: "Secure data from Node.js backend",
        user: req.user.email
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
