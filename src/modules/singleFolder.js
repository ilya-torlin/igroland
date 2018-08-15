//Категории и каталог - 2е разные сущности
export default class singleFolder {
  constructor(folderObj) {
    this.childCount = folderObj.childCount || 0; // колличество потомков в 'открытой' папке
    this.folderId = folderObj.folderId || 0; //уникальный ид папки
    this.name = folderObj.name || 'Новый каталог'; // Имя папки
    this.goodsCount = folderObj.goodsCount || 0; // количество товаров в папке
    this.lvlFolder = folderObj.lvlFolder || 0; // Уровень папки, 0 - папка в корне
    this.isOpen = folderObj.isOpen || false; // Открыть ли каталог (для фронтенда)
    this.hasFolders = folderObj.hasFolders || false;// есть вложенный каталог
    this.hideFolder = folderObj.hideFolder || false;// скрыть папку
  }
  //getters

  //setters

  //methods
}

class catalogListItem {
  constructor(catalogObj){
    this.catalogId = catalogObj.catalogId || 0; // краткое описание каталога
    this.selected = catalogObj.selected || null; // выбранные элементы в селекте
    this.switcherActive = catalogObj.switcherActive || false; // активность переключателя (Доступен для всех)
    this.showConfig = catalogObj.showConfig || false; /// Тригер для отображения параметров переключателя(шестерёнка)
    this.catalogName = catalogObj.catalogName || 'Новый каталог'; /// Наименование каталога
    this.isActive = catalogObj.isActive || false; /// каталог активен(значёе молнии), один или несколько пользователей используют его
    this.isOn = catalogObj.isOn || false; /// Тригер для включения/отключения каталога, если каталог отключён, то пользователи его не видят
    this.description = catalogObj.description || ''; // краткое описание каталога
    this.catalogImg = catalogObj.catalogImg || ''; // Изображение каталога
    this.catalogSaved = catalogObj.catalogSaved || true; //каталог сохранён, при внесении изменений или копирывании каталога ставим в false... если каталог не сохранён, то его нельзя скопировать и выводится ошибка(предупреждение) для пользователя
    this.userList = catalogObj.userList || []; // доступен для пользователей
    /*
    * Формат пользователя (обязательные поля):
    * {name: 'user@gmail.com', id: '1234'},
    * */
    this.selectedUsers = catalogObj.selectedUsers || []; // выбранные пользователи в селекте

  }
}
