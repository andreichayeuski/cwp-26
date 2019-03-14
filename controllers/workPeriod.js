const CrudController = require('./crud');

class WorkPeriodController extends CrudController{
    constructor(workPeriodService){
        super(workPeriodService);

        this.calcCoupleWorkPeriod = this.calcCoupleWorkPeriod.bind(this);       

        for(let route in this.routes){
            this.routes['/:teamId/users/:userId/work-periods' + route] = this.routes[route];
            delete this.routes[route];
        }

        this.routes['/:teamId/users/:userId1/couple-work-periods/:userId2'] = [
            {method: 'get', cb: this.calcCoupleWorkPeriod}
          ];

        this.registerRoutes();
        console.log(this.routes);
    }

    async create(req, res){
        req.body.teamId = parseInt(req.params.teamId);
        req.body.userId = parseInt(req.params.userId);
        await super.create(req, res);        
    }

    async update(req, res){
        req.body.teamId = parseInt(req.params.teamId);
        req.body.userId = parseInt(req.params.userId);
        await super.update(req, res);        
    }

    async calcCoupleWorkPeriod (req, res) {
        let teamId = parseInt(req.params.teamId);
        let userId1 = parseInt(req.params.userId1);
        let userId2 = parseInt(req.params.userId2);
        let data = await this.service.getCommonWorkHours(
            userId1,
            userId2,
            teamId
        );
        res.json(data);
    }
}

module.exports = (workPeriodService) => {
    const controller = new WorkPeriodController(workPeriodService);
    return controller.router;
};