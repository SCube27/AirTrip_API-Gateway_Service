const CrudRepository = require('./crudRepository');
const { User } = require('../models/index');

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async getUserbyUsername(username) {
        const user = await User.findOne({ where: {username: username} });
        return user
    }
}

module.exports = UserRepository;