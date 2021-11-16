const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json())

const database = {
    users: [
        {
            id: "1",
            name: "John",
            email: "john@gmail.com",
            password: "cookies",
            entries: 0,
            joined: new Date()
        },
        {
            id: "2",
            name: "Sally",
            email: "sally@gmail.com",
            password: "bannanas",
            entries: 0,
            joined: new Date()
        },

    ]
}

app.get("/", (req, res) => {
    res.send("app is working");
})

app.post("/signin", (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){
            res.json("success");
    } else {
        res.status(400).json("username or password invalid");
    }
})

app.listen(3001, () => {
    console.log("app is listening on port 3001")
})