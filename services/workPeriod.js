const CrudService = require('./crud');
const datesHelper = require('../helpers/dates');

class WorkPeriodService extends CrudService {
    constructor(workPeriod, users) {
        super(workPeriod);
        this.users = users;
    }

    async getCommonWorkHours(userId1, userId2, teamId) {
        if (Number.isInteger(teamId) && Number.isInteger(userId1) && Number.isInteger(userId2)) {
            const user1 = await this.users.findByPk(userId1);
            const user2 = await this.users.findByPk(userId2);

            const workPeriod1 = await this.repository.findOne({
                where: {
                    teamId,
                    userId: userId1
                },
                raw: true
            });

            const workPeriod2 = await this.repository.findOne({
                where: {
                    teamId,
                    userId: userId2
                },
                raw: true
            });

            user1.workPeriod = workPeriod1;
            user2.workPeriod = workPeriod2;

            return datesHelper.getCommonWorkHours(user1, user2);
        } else {
            throw new Error('getCommonWorkHours error');
        }
    }
}

module.exports = WorkPeriodService;