//Выход из личного кабинета
const logoutButton = new LogoutButton();

logoutButton.action = () => {
  ApiConnector.logout(response => {
    if (response.success) { // проверить на успех responce
      location.reload();
    }
  })
}