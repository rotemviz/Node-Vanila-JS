const express = require("express");
const uuid = require("uuid");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors({
    origin: "*",
}))

app.use(express.json());

const users =  [{ id: 1, firstName: "Jane", lastName: "Doe", age: 30}, 
                { id: 2, firstName: "John", lastName: "Doe", age: 29},
                { id: 3, firstName: "Jonny", lastName: "Doe", age: 12}];

app.get("/all", (req, res) => {
    res.json(users);
});

app.post("/create", (req, res) => {
    const fullName = req.body.fullName.split(" ");
    const newUser = {
        id: uuid.v4(),
        firstName: fullName[0],
        lastName: fullName[1],
        age: parseInt(req.body.age)
    }
    users.push(newUser);
    res.json(users);
})

app.get("/oneUser/:id", (req, res) => {
    const {id} = req.params;
    const user = users.find(user => user.id == id);
    if(user === undefined)
        return res.status(400).send("user doesn't exists");
    res.status(200).json(user);
})

const PORT = 4040;
app.listen(PORT, () => console.log(`Running on ${PORT}`));