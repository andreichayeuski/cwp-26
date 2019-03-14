const CrudController = require('./crud');

class UserController extends CrudController {
    constructor(userService) {
        super(userService);

        this.validate = this.validate.bind(this);
        this.routes['/:id/validation'] = [{method: 'get', cb: this.validate}];

        this.registerRoutes();
    }

    async validate(req, res){
        let id = parseInt(req.params.id);
        res.json(
            await this.service.validate(id, req.query.token)
        )
    }
}

module.exports = (userService) => { 
    const controller = new UserController(userService);
    return controller.router;
};