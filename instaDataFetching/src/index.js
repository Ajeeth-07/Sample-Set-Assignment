const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Is server running???");
})


app.listen(3000, () => {
    console.log("Server connected to port 3000");
});