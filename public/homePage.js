//Выход из личного кабинета
const logoutButton = new LogoutButton();

logoutButton.action = () => {
  ApiConnector.logout(response => {
    if (response.success) { // проверить на успех responce
      location.reload();
    }
  })
}

//Получение информации о пользователе
ApiConnector.current((data) => {
  console.log(`data`, data);
  if (data.success) {
    console.log(`data.data`, data.data);
    ProfileWidget.showProfile(data.data);
  }
})


