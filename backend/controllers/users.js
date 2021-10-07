const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found'); // 404
const InternalError = require('../errors/internal-err'); // 500
const ConflictError = require('../errors/conflict'); // 409
const BadRequestError = require('../errors/bad-request'); // 400
const UnauthorizedError = require('../errors/unauthorized'); // 401

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users.map((user) => {
      const {
        _id, name, about, avatar,
      } = user;
      return {
        _id, name, about, avatar,
      };
    })))
    .catch(() => {
      next(new InternalError('На сервере произошла ошибка'));
    });
};

module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById({ _id: userId })
    .then((user) => {
      if (!user) {
        throw Error('404');
      }
      const {
        _id, name, about, avatar,
      } = user;

      res.send({
        name, about, avatar, _id,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }
      if (err.message === '404') {
        next(new NotFoundError('Пользователь не найден'));
        return;
      }
      next(new InternalError('На сервере произошла ошибка'));
    });
};

module.exports.getInfoAboutMe = (req, res, next) => {
  User.findById({ _id: req.user._id })
    .then((user) => {
      const {
        _id, name, about, avatar, email,
      } = user;
      res.send({
        name, about, avatar, _id, email,
      });
    })
    .catch(() => {
      next(new InternalError('На сервере произошла ошибка'));
    });
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw Error('404');
      }
      const {
        _id, avatar,
      } = user;
      res.send({
        name, about, avatar, _id,
      });
    })
    .catch((err) => {
      if (err.message === '404') {
        next(new NotFoundError('Пользователь не найден'));
        return;
      }

      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }

      next(new InternalError('На сервере произошла ошибка'));
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  if (!avatar) {
    next(new BadRequestError('Переданы некорректные данные'));
  }

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw Error('404');
      }
      const {
        _id, name, about,
      } = user;
      res.send({
        name, about, avatar, _id,
      });
    })
    .catch((err) => {
      if (err.message === '404') {
        next(new NotFoundError('Пользователь не найден'));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
        return;
      }
      next(new InternalError('На сервере произошла ошибка'));
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => {
        const {
          _id,
        } = user;
        res.send({
          name, about, avatar, email, _id,
        });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError('Переданы некорректные данные'));
          return;
        }
        if (err.name === 'MongoServerError' && err.code === 11000) {
          next(new ConflictError('Такой e-mail уже существует'));
          return;
        }
        next(new InternalError('На сервере произошла ошибка'));
      });
  });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'dev-secret');

      res
        .cookie('jwt', token, {
          httpOnly: true,
          maxAge: 3600000 * 24 * 7,
        }).send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError('Необходима авторизация'));
    });
};
