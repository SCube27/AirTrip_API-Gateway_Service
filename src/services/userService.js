const { InternalServerError, BadRequestError, NotFoundError } = require('../errors/index');
const { Logger } = require('../config/index');
const { Auth } = require('../utils/index');

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async signupUser(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            if(error.name === "SequelizeValidationError") {
                let explanation = [];
                error.errors.forEach((err) => {
                    explanation.push(err.message);
                });
                Logger.error(explanation);
                throw new BadRequestError("User Data Field", explanation);
            }
            Logger.error("Some internal server error occured no new entry created.")
            throw new InternalServerError("Something went wrong, cannot create new user");
        }
    }

    async loginUser(data) {
        try {
            const user = await this.userRepository.getUserbyUsername(data.username);
            if(!user) {
                throw new BadRequestError('Username', "No user found for the given username");
            }

            const passwordMatch = Auth.checkPassword(data.password, user.password);
            if(!passwordMatch) {
                throw new BadRequestError('Password', "The entered password doesn't match");
            }

            const jwt = Auth.createToken({id: user.id, username: user.username, email: user.email});
            return jwt;
        } catch (error) {
            if(error.name == 'BadRequest') {
                throw error;
            }
            Logger.error("Some internal issue happened can't login");
            throw new InternalServerError('Some internal server issue occured');
        }
    }

    async isAuthenticated(token) {
        try {
            if(!token) {
                throw new BadRequestError('JWT Token', "JWT Token is missing");
            }
            const response = Auth.verifyToken(token);

            const user = await this.userRepository.get(response.id);
            if(!user) {
                Logger.error('User for the given ID not found');
                throw new NotFoundError(user, 'User not found');
            }
            return user.id;
        } catch (error) {
            if(error.name == 'JsonWebTokenError') {
                Logger.error('Recieved JWT Token is not valid');
                throw new BadRequestError('JWT Token', "JWT Token is invalid");
            }
            if(error.name == 'BadRequest') {
                throw error;
            }
            if(error.name == 'NotFound') {
                throw error;
            }
            Logger.error("Some internal issue happened");
            throw new InternalServerError('Some internal server issue occured');
        }
    }
}

module.exports = UserService;