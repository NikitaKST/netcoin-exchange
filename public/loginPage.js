'use strict';
const userForm = new UserForm();

//возвращает объект с логином и паролем
userForm.loginFormCallback = (data) => {
  console.log('loginFormCallback data', data);

  ApiConnector.login(data, (response) => {
    console.log('loginFormCallback responce', response);
    if (response.success) { // проверить на успех responce
      location.reload();
    } else {
      alert(response.error);
    }
  });
}

//функция при попытке регистрации
userForm.registerFormCallback = (data) => {
  console.log('registerFormCallback data', data);

  ApiConnector.register(data, (response) => {
    console.log('registerFormCallback responce', response);
    if (!response.success) { // проверить на успех responce
      alert(response.error);
    } else {
      location.reload();
    }
  });

}