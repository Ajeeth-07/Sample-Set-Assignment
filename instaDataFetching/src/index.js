const express = require("express");
const app = express();


app.get("/", (req, res) => {
    res.send("is server running???");
});


app.listen(3000, ()=>{
    console.log("Server running on port 3000");
})