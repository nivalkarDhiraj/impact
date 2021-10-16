module.exports = (sequelize, Sequelize) => {
	const Student = sequelize.define("student", {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			allowNull: false,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		age: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
        mark1: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
        mark2: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
        mark3: {
			type: Sequelize.INTEGER,
			allowNull: false,
		}
	});

	return Student;
};
