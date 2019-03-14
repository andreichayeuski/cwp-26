module.exports = (Sequelize, sequelize) => {
    return sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        timezone: {
            type: Sequelize.STRING,
        },
        validated: {
            type: Sequelize.BOOLEAN
        },
        validationToken: {
            type: Sequelize.STRING,
        }
    });
};