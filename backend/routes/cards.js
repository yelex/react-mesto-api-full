const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  getCards, createCard, deleteCard,
  likeCard, dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((value, helper) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        return helper.message('Invalid link');
      }
      return value;
    }),

  }),
}), createCard);
cardsRouter.put('/:cardId/likes', celebrate({
  params: {
    cardId: Joi.string().length(24).hex(),
  },
}), likeCard);
cardsRouter.delete('/:cardId/likes', celebrate({
  params: {
    cardId: Joi.string().length(24).hex(),
  },
}), dislikeCard);
cardsRouter.delete('/:cardId', celebrate({
  params: {
    cardId: Joi.string().length(24).hex(),
  },
}), deleteCard);

module.exports = cardsRouter;
