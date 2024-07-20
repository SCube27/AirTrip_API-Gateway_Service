const CrudRepository = require('./crudRepository');
const { Role } = require('../models/index');

class RoleRepository extends CrudRepository {
    constructor() {
        super(Role);
    }

    async getRolebyName(name) {
        const role = await Role.findOne({ where: {name: name} });
        return role;
    }
}

module.exports = RoleRepository;