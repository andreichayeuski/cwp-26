module.exports = (Sequelize, sequelize) => {
    return sequelize.define('Team', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
        },
        logo: {
            type: Sequelize.STRING,
        }
    });
};