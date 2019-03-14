module.exports = (Sequelize, sequelize) => {
    return sequelize.define('UsersTeams', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }
    });
};