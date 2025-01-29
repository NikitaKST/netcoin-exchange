'use strict';
const userForm = new UserForm();

// Функция для запроса на авторизацию
userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, (response) => {
    console.log('loginFormCallback responce', response);
    if (response.success) { // проверить на успех responce
      location.reload();
    } else {
      alert(response.error);
    }
  });
}

// Функция для запроса на регистрацию
userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, (response) => {
    if (response.success) { // проверить на успех responce
      location.reload();
    } else {
      alert(response.error);
    }
  });
}