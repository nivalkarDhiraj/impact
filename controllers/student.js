const db = require("../models");
const { Student } = db;
const { Op } = require("sequelize");
const path = require("path");
const fs = require("fs");
let csv = require("fast-csv");
const PASSING_MARKS = 40;

module.exports.upload = async (req, res) => {
	try {
		let stream = fs.createReadStream(path.join(__dirname, "..", "uploads", req.file.filename));
		csv
			.parseStream(stream, { headers: true })
			.on("data", async (row) => {
				const {
					id,
					name,
					age,
					mark1,
					mark2,
					mark3 } = row;

				let student = await Student.findAll({ where: { id: id } });
				if (student.length > 0) return;

				const newStudent = new Student({
					id,
					name,
					age,
					mark1,
					mark2,
					mark3,
				});

				await newStudent.save();
			})
			.on("end", function () {
				fs.unlink(path.join(__dirname, "..", "uploads", req.file.filename), () => { }); //removing temporary file
				res.send({ message: "Data inserted successfully" });
			});

	} catch (err) {
		fs.unlink(path.join(__dirname, "..", "uploads", req.file.filename), () => { }); //removing temporary file
		res.status(500).send({ error: "Something went wrong" });
		console.log(err);
	}
};

module.exports.getById = async (req, res) => {
	try {
		const { id } = req.params;
		const student = await Student.findByPk(id);
		if (
			student.mark1 < PASSING_MARKS ||
			student.mark2 < PASSING_MARKS ||
			student.mark3 < PASSING_MARKS
		) {
			res.send({ result: "failed" });
		} else {
			res.send({ result: "passed" });
		}
	} catch (err) {
		res.status(500).send({ error: "Something went wrong" });
		console.log(err);
	}
};

module.exports.getByResult = async (req, res) => {
	try {
		const { resultStatus } = req.query;

		if (resultStatus === "passed") {
			const students = await Student.findAll({
				where: {
					mark1: { [Op.gte]: PASSING_MARKS },
					mark2: { [Op.gte]: PASSING_MARKS },
					mark3: { [Op.gte]: PASSING_MARKS },
				},
			});

			res.send(students);

		} else if (resultStatus === "failed") {
			const students = await Student.findAll({
				where: {
					[Op.or]: [
						{ mark1: { [Op.lt]: PASSING_MARKS } },
						{ mark2: { [Op.lt]: PASSING_MARKS } },
						{ mark3: { [Op.lt]: PASSING_MARKS } },
					],
				},
			});

			res.send(students);

		} else if (resultStatus === undefined) {
			const students = await Student.findAll();
			res.send(students);

		} else {
			res.status(400).send({ error: "Query param is wrong" });
		}
	} catch (err) {
		res.status(500).send({ error: "Something went wrong" });
		console.log(err);
	}
};
