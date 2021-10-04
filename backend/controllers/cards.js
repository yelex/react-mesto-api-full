const Card = require('../models/card');
const NotFoundError = require('../errors/not-found'); // 404
const InternalError = require('../errors/internal-err'); // 500
const ForbiddenError = require('../errors/forbidden'); // 403
const BadRequestError = require('../errors/bad-request'); // 400

module.exports.getCards = (req, res, next) => Card.find({})
  .then((cards) => res.send(cards.map((card) => {
    const {
      _id, name, link, owner, createdAt, likes,
    } = card;
    return {
      _id, name, link, owner, createdAt, likes,
    };
  })))
  .catch(() => {
    next(new InternalError('На сервере произошла ошибка'));
  });
module.exports.createCard = (req, res, next) => Card.create({
  name: req.body.name,
  link: req.body.link,
  owner: req.user._id,
})
  .then((card) => {
    const {
      _id, name, link, owner, createdAt, likes,
    } = card;
    res.send({
      likes, _id, name, link, owner, createdAt,
    });
  })
  .catch((err) => {
    console.log(err);
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные'));
      return;
    }
    next(new InternalError('На сервере произошла ошибка'));
  });

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId).then(
    (card) => {
      if (!card) {
        throw Error('404');
      }
      if (req.user._id !== card.owner.toString()) {
        throw Error('403');
      }
      return Card.findByIdAndRemove(req.params.cardId);
    },
  ).then(
    (card) => {
      const {
        _id, name, link, owner, createdAt, likes,
      } = card;
      res.send({
        likes, _id, name, link, owner, createdAt,
      });
    },
  ).catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
      return;
    }
    if (err.message === '404') {
      next(new NotFoundError('Карточка не найдена'));
      return;
    }

    if (err.message === '403') {
      next(new ForbiddenError('Недостаточно прав'));
      return;
    }

    next(new InternalError('На сервере произошла ошибка'));
  });
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
).then((card) => {
  if (!card) {
    throw Error('404');
  }
  const {
    _id, name, link, owner, createdAt, likes,
  } = card;
  res.send({
    likes, _id, name, link, owner, createdAt,
  });
})
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
      return;
    }
    if (err.message === '404') {
      next(new NotFoundError('Карточка не найдена'));
      return;
    }

    next(new InternalError('На сервере произошла ошибка'));
  });

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
).then((card) => {
  if (!card) {
    throw Error('404');
  }
  const {
    _id, name, link, owner, createdAt, likes,
  } = card;
  res.send({
    likes, _id, name, link, owner, createdAt,
  });
})
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
      return;
    }
    if (err.message === '404') {
      next(new NotFoundError('Карточка не найдена'));
      return;
    }

    next(new InternalError('На сервере произошла ошибка'));
  });
