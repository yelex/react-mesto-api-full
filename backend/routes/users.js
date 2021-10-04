const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  getUsers,
  getUser,
  updateUserProfile,
  updateUserAvatar,
  getInfoAboutMe,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getInfoAboutMe);
usersRouter.get('/:userId', celebrate({
  params: {
    userId: Joi.string().length(24).hex(),
  },
}), getUser);
usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string(),
  }),
}), updateUserProfile);
usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((value, helper) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        return helper.message('Invalid link');
      }
      return value;
    }),
  }),
}), updateUserAvatar);

module.exports = usersRouter;
