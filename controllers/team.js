const CrudController = require('./crud');

class TeamController extends CrudController {
    constructor(teamService) {
        super(teamService);
        this.addUser = this.addUser.bind(this);
        this.removeUser = this.removeUser.bind(this);

        this.routes['/:id/users/:userId'] = [
            { method: 'post', cb: this.addUser },
            { method: 'delete', cb: this.removeUser }
        ];
        this.registerRoutes();
    }
    async addUser(req, res) {
        let teamId = parseInt(req.params.id);
        let userId = parseInt(req.params.userId);
        res.status(200).json( 
            await this.service.addUser(teamId, userId)
        );
    }
    async removeUser(req, res) {
        let teamId = parseInt(req.params.id);
        let userId = parseInt(req.params.userId);
        res.json(
            await this.service.removeUser(teamId, userId)
        );
    }
}

module.exports = (teamService) => {
    const controller = new TeamController(teamService);
    return controller.router;
};