const { Sequelize } = require('sequelize');

const database = "winlaptop"
const username = "root"
const password = ""

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(database, username, password, {
    host: 'localhost',
    dialect: "mysql",/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    logging: false
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB
