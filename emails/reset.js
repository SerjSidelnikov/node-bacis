const keys = require('../keys');

module.exports = function (email, token) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: 'Восстановление доступа',
    html: `
      <h1>Сброс пароля</h1>
      <p>Для сброса пароля пройдите по ссылке ниже:</p>
      <p><a href="${keys.BASE_URL}/auth/password/${token}">Сбросить пароль</a></p>
      <p>Если это были не вы, то проигнорируйте это сообщение</p>
      <hr>
      <a href="${keys.BASE_URL}">Магазин курсов</a>
    `,
  };
};
