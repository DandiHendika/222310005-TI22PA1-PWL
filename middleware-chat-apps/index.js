require('dotenv').config();
const express = require('express');
const cors = require("cors");

const app = express();
const PORT = process.env.API_PORT;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`server app is listening on http://localhost:${PORT}`);
});

const db_mysql = require("./models");
db_mysql.sequelize.sync();

const userRoute = require("./routes/UserRoute");
app.use("/api/users", userRoute);

// app.post('/login', (req, res) => {
//     res.send(' telah berhasil masuk!');
// });

// app.put("/users/:id", (req, res) => {
//     const userId = req.params.id;
//     res.send(`User dengan ID: ${userId} berhasil di update`);
// });

// app.delete("/users/:id", (req, res) => {
//     const userId = req.params.id;
//     res.send(`User dengan ID: ${userId} berhasil di hapus`);
// });
