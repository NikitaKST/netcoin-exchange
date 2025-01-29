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

//Пополнение баланса
const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, "Баланс успешно пополнен!"); // Сообщение об успехе
    } else {
      moneyManager.setMessage(false, response.error); // Вывод ошибки от сервера
    }
  })
}

//Конвертирование валюты
moneyManager.conversionMoneyCallback = ({ fromCurrency, targetCurrency, fromAmount }) => {
  ApiConnector.convertMoney({ fromCurrency, targetCurrency, fromAmount }, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, "Валюта успешно конвертирована!");
    } else {
      moneyManager.setMessage(false, response.error);
    }
  })
}

//Перевод валюты