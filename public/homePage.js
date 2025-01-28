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
  if (data.success) {
    ProfileWidget.showProfile(data.data);
  }
})

//Получение текущих курсов валюты
const ratesBoard = new RatesBoard();

function updateRates() {
  ApiConnector.getStocks((data) => {
    if (data.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(data.data);
    }
  }); 
}

updateRates();

setInterval(updateRates, 60000);