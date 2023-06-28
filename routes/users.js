const router = require('express').Router();
const { getUser, updateUser, } = require('../controllers/user');
const { celebrate, Joi } = require('celebrate');

router.get('/me', getUser);

router.patch('/me', celebrate({
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        name: Joi.string().min(2).max(30).required(),
    })
}), updateUser);

module.exports = router;
