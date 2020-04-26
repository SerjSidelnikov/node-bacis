const {body} = require('express-validator');

const User = require('../models/user');

exports.registerValidators = [
  body('email').isEmail().withMessage('Введите корректный email')
    .custom(async (value, {req}) => {
      try {
        const user = await User.findOne({email: value});

        if (user) {
          return Promise.reject('Пользователь с таким email уже существует');
        }
      } catch (e) {
        console.log(e);
      }
    })
    .normalizeEmail(),
  body('password', 'Пароль должен быть минимум 6 символов')
    .isLength({min: 6, max: 30})
    .isAlphanumeric()
    .trim(),
  body('confirm').custom((value, {req}) => {
    if (value !== req.body.password) {
      throw new Error('Пароли не совпадают');
    }
    return true;
  }).trim(),
  body('name').isLength({min: 2})
    .withMessage('Имя должно быть минимум 3 символа')
    .trim(),
];

exports.courseValidators = [
  body('title').isLength({min: 3})
    .withMessage('Минимальная длинна названия 3 символа').trim(),
  body('price').isNumeric()
    .withMessage('Введите корректную цену'),
  body('img').isURL()
    .withMessage('Введите корректный url картинки'),
];
