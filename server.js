const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParse = require('body-parser');
const YAML = require('yamljs');
//services
const UserService = require('./services/user');
const TeamService = require('./services/team');
const WorkPeriodService = require('./services/workPeriod');

module.exports = (db, config) => {
    const app = express();
    //services
    const userService = new UserService(
        db.users
    );
    const teamService = new TeamService(
        db.teams, db.users
    );
    const workPeriodService = new WorkPeriodService(
        db.workPeriods,
        db.users
    );

    //controllers
    const apiController = require('./controllers/api')(
        userService,
        teamService,
        workPeriodService,
    );

    //Mounting
    app.use(express.static('public'));
    app.use(cookieParser());

    app.use(bodyParse.json());
    app.use((req, res, next) => {
        if (req.headers.accept === 'yaml') {
            req.setEncoding('utf8');
            let body = '';

            req.on('data', (data) => {
                body += data;
            });

            req.on('end', () => {
                req.body = YAML.parse(body);
                next();
            });
        } else {
            next();
        }
    });
    app.use('/api', apiController);

    return app;
};
