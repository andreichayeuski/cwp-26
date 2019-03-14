const CrudService = require('./crud');

class TeamService extends CrudService {
    constructor(teams, users, workPeriods) {
        super(teams);
        this.users = users;
        this.workPeriods = workPeriods;
    }
    async addUser(teamId, userId) {
        const user = await this.users.findByPk(userId);
        if (user) {
            const team = await this.read(teamId);
            if (team) {
                team.addUser(user);
                return team;
            } else {
                throw new Error('Invalid team id');
            }
        } else {
            throw new Error('User is not found/validated');
        }

    }
    async removeUser(teamId, userId) {
        const user = await this.users.findByPk(userId);
        const team = await this.read(teamId);

        if (user && team) {
            team.removeUser(user);
            return team;
        } else {
            throw new Error('User/team is not found');
        }
    }
}

module.exports = TeamService;