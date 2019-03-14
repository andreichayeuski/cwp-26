const CrudService = require('./crud');

class UserService extends CrudService{
    constructor(repository){
        super(repository);
    }

    async validate(userId, validationToken){
        let user = await this.read(userId);
        if (user.validationToken === validationToken){
            user.update({validated: true});
            return {status: 200, msg: 'OK'};
        }
        else{
            return {status: 400, msg: 'token error'};
        }
    }
}

module.exports = UserService; 