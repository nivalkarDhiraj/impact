const Sequelize = require("sequelize");
const config = require("../config/db.config");
const db = {};

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
	host: config.HOST,
	dialect: config.dialect,
	pool: {
		max: config.pool.max,
		min: config.pool.min,
		acquire: config.pool.acquire,
		idle: config.pool.idle,
	},
	define: {
		freezeTableName: false,
	},
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Student = require("./student.js")(sequelize, Sequelize);

// Object.keys(db).forEach((modelName) => {
// 	if ("associate" in db[modelName]) {
// 		db[modelName].associate(db);
// 	}
// });

module.exports = db;
