const express = require("express");
const cors = require("cors");
const db = require("./models");
require("dotenv").config();
const app = express(); 
const port = process.env.PORT || 3000;

const studentRouter = require("./routes/student");

app.use(cors());
app.use(express.json());
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
// 	console.log("Drop and re-sync db.");
// });

app.use("/students", studentRouter);

app.get("/", (req, res) => {
	res.json({ message: "Welcome!" });
});

app.listen(port, () => {
	console.log("listening on port ", port);
});
