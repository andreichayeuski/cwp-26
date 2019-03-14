const express = require('express');

module.exports = (
    userService,
    teamService,
    workPeriodService,
) => {
    const router = express.Router();

    //defining cntroller
    const userController = require('./user')(
        userService
    );
    const teamController = require('./team')(
        teamService
    );
    const workPeriodController = require('./workPeriod')(
        workPeriodService
    );

    //defining routers
    router.use('/users', userController);
    router.use('/teams', teamController);
    router.use('/teams', workPeriodController);

    return router;
};