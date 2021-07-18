const bcrypt = require('bcrypt');
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
// TODO
module.exports.registration = async (req, res) => {
    const { login, password } = req.body;
    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(password, salt)
    const user = new Users({login, password: hash})

    try {
        await user.save();
        res.status(201).json(user)
    } catch(e) {
        errorHandler(res, e)
    }
}
