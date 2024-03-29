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
    res.json(database.users);
})

app.post("/signin", (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){
            res.json("success");
    } else {
        res.status(400).json("username or password invalid");
    }
})

app.post("/register", (req, res) => {
    const { email, password, name} = req.body;
    database.users.push({
        id: "3",
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
})

app.get("/profile/:id", (req, res) => {
    const { id } = req.params;
    let found = false
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        } 
    })
    if (!found) {
        res.status(400).json('not found')
    }
})

app.put("/image", (req, res) => {
    const { id } = req.body;
    let found = false
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        } 
    })
    if (!found) {
        res.status(400).json('not found')
    }
})

app.listen(3001, () => {
    console.log("app is listening on port 3001")
})