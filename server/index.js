const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { 
    getCompliment,
    getFortune,
    secretPost,
    getSecrets,
    deleteSecret,
    codeSecret,
    deCodeSecret} = require('./controller')

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune)

app.get("/api/secrets", getSecrets)
app.post("/api/secrets/:secret", secretPost)
app.put("/api/secrets/:secret", codeSecret)
app.put("/api/secrets/:secret", deCodeSecret)


app.delete("/api/secrets/:index", deleteSecret)

app.listen(4000, () => console.log("Server running on 4000"));


