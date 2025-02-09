//Выход из личного кабинета
const logoutButton = new LogoutButton();

logoutButton.action = () => {
  ApiConnector.logout((response) => {
    if (response.success) { // проверить на успех responce
      location.reload();
    }
  });
};

//Получение информации о пользователе
ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

//Получение текущих курсов валюты
const ratesBoard = new RatesBoard();

function updateRates() {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
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
  });
};

//Конвертирование валюты
moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, "Валюта успешно конвертирована!");
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};

//Перевод валюты
moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, "Перевод средств успешно выполнен!");
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};

//Работа с избранным FavoritesWidget. Начальный список избранного
const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
  console.log(`getFavorites responce`, response);
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});

//Добавление пользователя в список избранных
favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      moneyManager.setMessage(true, "Пользователь успешно добавлен!");
    } else {
      moneyManager.setMessage(false, response.error);
    }
  })
 }

 //Удаление пользователя из избранного
 favoritesWidget.removeUserCallback = (userId) => {
  ApiConnector.removeUserFromFavorites(userId, (response) =>{
    console.log(`userId`, userId);
    console.log(`response`, response);
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      moneyManager.setMessage(true, "Пользователь успешно удален!");
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
 }