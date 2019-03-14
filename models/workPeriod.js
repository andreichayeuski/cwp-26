module.exports = (Sequelize, sequelize) => {
    return sequelize.define('WorkPeriod', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        from: {
            type: Sequelize.STRING,
        },
        to: {
            type: Sequelize.STRING,
        },
        weekDays: {
            type: Sequelize.STRING,
        },
        userId: {
            type: Sequelize.INTEGER,
            unique: 'user_team',
        },
        teamId: {
            type: Sequelize.INTEGER,
            unique: 'user_team',
        }
    });
};
