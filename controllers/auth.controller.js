const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../models/Users')
const errorHandler = require('../utils/errorHandler')

module.exports.auth = async (req, res) => {
    const { login, password } = req.body;
    const candidate = await Users.findOne({login: login});

    if(candidate) {
        const passwordResult = bcrypt.compareSync(password, candidate.password) 
        if(passwordResult) {
            const token = jwt.sign({
                id: candidate._id
            }, process.env.JWT, {expiresIn: 3600})

            res.status(200).json({token: `Bearer ${token}`})
        } else {
            res.status(404).json('Не верный логин или пароль')
        }

    } else {
        res.status(404).json('Не верный логин или пароль')
    }
}
module.exports.registration = async (req, res) => {
    const { login, password } = req.body;
    const salt = bcrypt.genSaltSync(10);

    const user = new Users({login, password: bcrypt.hashSync(password, salt)})

    try {
        await user.save();
        res.status(201).json(user)
    } catch(e) {
        errorHandler(res, e)
    }
}
