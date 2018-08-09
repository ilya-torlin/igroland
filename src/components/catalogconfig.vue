<!--Каталог-->
<template>
    <!--catalogconfig.vue-->

  <!--
    Логика работы
    в appCatalogFolders отображается каталог, который собрал пользователь

    Первый столбец - товары от поставщика, выделенного в селекте из хлебных крошек
    Второй столбец - товары, которые были привязаны в appCatalogFolders
    Третий столбец - товары, которые были привязаны в appCatalogFolders(у отмеченной папки)

    Процесс привязки:
    1) в appCatalogFolders выделяется папка
    2) в Первом столбце выделяются каталоги
    3) Нажимаем на кнопку "привязать"
      После нажатия кнопки:
        1) выделенные каталоги добавляются в appCatalogFolders
        2) выделенные каталоги добавляются в 3й столбец

    Первый столбец:
      Показать товары - показать выделенные чекбоксами товары из соответствующего столбца (подумать, выделять 1ну папку)

    Контекстное меню:

    Параметры - Параметры каталога, по типу окна "Показать товары" (не отрисованно) Поля: фото и описание, родительская категория
    Товары - кнопка  "Показать товары"
    Добавить - добавить новую папку, пишем только название
    удалить - удаление папки

    todo: API - Запрос каталога в зависимости от выбранного поставщика
    todo: API - Вывод каталога по ид
    todo: API - Скрыть товары, которых нет в наличии у поставщика из селекта(по ид поставщика), в селекте может быть выбрано "все поставщики".
    todo: API - запрос поставщиков для селекта. Возвращает массив формата [{name: 'Игроленд', id: '1234'}, {} ...]


    todo: Переработать интерфейс
      todo: Каталог (панель слева)
        todo: В контекстное меню Добавить "Отвязать товар"
        todo: В контекстное меню Добавить "Заблокировать", то что было в 3м столбце
        todo: Убрать кнопку сворачивания(больше не нужна, т.к справа будет выводиться 1 колонка)
      todo: Изменить процесс привязки товара
        todo: ?
      todo: Сделать 2 таба
        todo: 1й таб - категории поставщика из селекта
        todo: 2й таб - Поиск категорий/тоавров(?)
          todo: Состоит из строки поиска, селекта (выбирается где ищется товар): Список поставщиков, среди привязанных товаров(в каталоге), среди привязанных товаров в выделенной папке;



    todo: Каталог (панель слева)
      todo: свернуть каталог, переделать свёрнутый блок
      todo: сварачивание/разворачивание папок (для уровней возможно сделать параметр lvl)
      todo: при клике на папку в каталоге, изменть хлебные крошки
      todo: вывод количества товаров в папке (запрос к API по ид папки)
      todo: !!Сделать возможность изменения родителя (придумать как сделать)
      todo: Последнее изменение каталога
      todo: !!Придумать куда впихнуть кнопку сохраненния
      todo: контекстное меню
        todo: Параметры - Параметры каталога, по типу окна "Показать товары" (не отрисованно) Поля: фото и описание, родительская категория
        todo: Товары - кнопка  "Показать товары"
        todo: Добавить - добавить новую папку, пишем только название
        todo: удалить - удаление папки
    todo: Столбцы
      todo: Поиск среди товаров/каталогов(?)
      todo: Показать товары (кнопка не активна, если не выделен каталог(папка)), чекбоксы не внедрять
        todo: Сверстать блок
      todo: !!! Возможно сделать switch и объеденить две колонки(2 и 3)
      todo: Первый столбец - товары от поставщика, выделенного в селекте из хлебных крошек

      todo: Второй столбец - товары, которые были привязаны в appCatalogFolders

      todo: Третий столбец - товары, которые были привязаны в appCatalogFolders(у отмеченной папки)
        todo: кнопка блокировать/разблокировать - если заблокирована, то категорию нельзя изменить (передавать на бекенд этот параметр)
  -->

    <div class="container">
        <div class="row">
            <div class="col-12">
              <appBreadcrumbs
                :breadcrumbs = "breadcrumbs"
                :providerList = "providerList"
                :selectedProvider = "selectedProvider"
                @breadItemClicked = "onBreadItemClicked($event)"
                @createNewCatalog = "createNewCatalog($event.value)"
                @hideNotOwned = "onHideNotOwned($event.value)"
                @changeProvider = "onChangeProvider($event.value)"
              >
              </appBreadcrumbs>
            </div>
            <div class="widthTransition" :class="{'col-3': showSideBarCatalog, 'col-1': !showSideBarCatalog}">
                <appCatalogFolders
                  :showSideBarCatalog = "showSideBarCatalog"
                  @showSideBarCatalog = "onShowSideBarCatalog">
                </appCatalogFolders>
            </div>
            <div class=""  :class="{'col-9': showSideBarCatalog, 'col': !showSideBarCatalog}">
              <div class="row">
                  <div class="tab-controls-c">
                    <div class="tab-i" :class="{'active': tabValue === 'provider'}" @click="tabChangeVal('provider')">
                      Поставщик
                    </div>
                    <div class="tab-i" :class="{'active': tabValue === 'find'}" @click="tabChangeVal('find')">
                      Поиск
                      <div class="svg-c">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="17px"
                             height="17px">
                          <path fill-rule="evenodd" fill="rgb(131, 147, 167)"
                                d="M15.919,15.813 C15.525,16.207 14.887,16.207 14.494,15.813 L11.403,12.723 C10.235,13.594 8.792,14.117 7.223,14.117 C3.357,14.117 0.223,10.983 0.223,7.117 C0.223,3.251 3.357,0.117 7.223,0.117 C11.088,0.117 14.222,3.251 14.222,7.117 C14.222,8.686 13.700,10.130 12.828,11.298 L15.919,14.388 C16.312,14.782 16.312,15.420 15.919,15.813 ZM7.223,2.117 C4.461,2.117 2.222,4.355 2.222,7.117 C2.222,9.879 4.461,12.117 7.223,12.117 C9.984,12.117 12.223,9.879 12.223,7.117 C12.223,4.355 9.984,2.117 7.223,2.117 Z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="row att-folders-r">
                  <div class="col-12 white-bg">
                    <div class="att-folders-c">
                      <transition name="custom-classes-transition" mode="out-in"
                                  duration="300"
                                  enter-active-class="animated fadeIn"
                                  leave-active-class="animated fadeOut">
                        <div key="provider-tab" class="att-folders-i folders-wt" v-if="tabValue == 'provider'">
                          <div class="upper-s">
                            <div class="find-folder-i">
                              <div class="txt-f">
                                Категории поставщика: <span class="provider-txt">{{selectedProvider.name}}</span>
                              </div>
                              <!--<div class="find-b justify-content-start d-flex">-->
                              <!--<div class="input-group ">-->
                              <!--<input v-model.lazy="findUserStr" v-on:keyup.enter="findFolder" type="text" class="form-control" placeholder="Найти" aria-label="Recipient's username" aria-describedby="button-addon2">-->
                              <!--<div class="input-group-append">-->
                              <!--<button class="btn btn-outline-secondary" type="button" @click="findFolder">-->
                              <!--<svg-->
                              <!--xmlns="http://www.w3.org/2000/svg"-->
                              <!--xmlns:xlink="http://www.w3.org/1999/xlink"-->
                              <!--width="17px" height="17px">-->
                              <!--<path fill-rule="evenodd"  fill="rgb(131, 147, 167)"-->
                              <!--d="M15.919,15.813 C15.525,16.207 14.887,16.207 14.494,15.813 L11.403,12.723 C10.235,13.594 8.792,14.117 7.223,14.117 C3.357,14.117 0.223,10.983 0.223,7.117 C0.223,3.251 3.357,0.117 7.223,0.117 C11.088,0.117 14.222,3.251 14.222,7.117 C14.222,8.686 13.700,10.130 12.828,11.298 L15.919,14.388 C16.312,14.782 16.312,15.420 15.919,15.813 ZM7.223,2.117 C4.461,2.117 2.222,4.355 2.222,7.117 C2.222,9.879 4.461,12.117 7.223,12.117 C9.984,12.117 12.223,9.879 12.223,7.117 C12.223,4.355 9.984,2.117 7.223,2.117 Z"/>-->
                              <!--</svg>-->
                              <!--</button>-->
                              <!--</div>-->
                              <!--</div>-->
                              <!--</div>-->
                            </div>
                            <div class="catalog-folder white-bg">
                              <div class="folder-b">
                                <div class="folder-c">
                                  <ul class="folder-list folder-list-main ">
                                    <li class="is-active" >
                                      <div class="folder-title"  >
                                        <div class="folder-name ">
                                          Машинки
                                        </div>
                                        <div class="folder-controls-c">
                                          <span class="badge badge-success badge-pill">21</span>
                                          <button class="btn-icon-tr">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              xmlns:xlink="http://www.w3.org/1999/xlink"
                                              width="8px" height="13px">
                                              <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                                                    d="M1.738,12.343 C1.390,12.681 0.826,12.681 0.479,12.343 C0.131,12.004 0.131,11.455 0.479,11.116 L5.116,6.601 L0.479,2.085 C0.131,1.747 0.131,1.198 0.479,0.860 C0.826,0.521 1.390,0.521 1.738,0.860 L6.986,5.970 C7.164,6.143 7.249,6.373 7.244,6.601 C7.249,6.829 7.164,7.058 6.986,7.232 L1.738,12.343 Z"/>
                                            </svg>
                                          </button>
                                        </div>
                                      </div>
                                      <ul class="folder-list">
                                        <li style="padding-left: 10px"  >
                                          <div class="folder-title">
                                            <div class="folder-name">
                                        <span class="dot-txt">
                                            &#183;
                                        </span>
                                              Машинки 2
                                            </div>
                                            <div class="folder-controls-c">
                                              <span class="badge badge-success badge-pill">21</span>
                                              <button class="btn-icon-tr">
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                                  width="8px" height="13px">
                                                  <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                                                        d="M1.738,12.343 C1.390,12.681 0.826,12.681 0.479,12.343 C0.131,12.004 0.131,11.455 0.479,11.116 L5.116,6.601 L0.479,2.085 C0.131,1.747 0.131,1.198 0.479,0.860 C0.826,0.521 1.390,0.521 1.738,0.860 L6.986,5.970 C7.164,6.143 7.249,6.373 7.244,6.601 C7.249,6.829 7.164,7.058 6.986,7.232 L1.738,12.343 Z"/>
                                                </svg>
                                              </button>
                                            </div>
                                          </div>
                                        </li>
                                        <li style="padding-left: 10px"  >
                                          <div class="folder-title">
                                            <div class="folder-name">
                                        <span class="dot-txt">
                                            &#183;
                                        </span>
                                              Машинки 2
                                            </div>
                                            <div class="folder-controls-c">
                                              <span class="badge badge-success badge-pill">21</span>
                                              <button class="btn-icon-tr">
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                                  width="8px" height="13px">
                                                  <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                                                        d="M1.738,12.343 C1.390,12.681 0.826,12.681 0.479,12.343 C0.131,12.004 0.131,11.455 0.479,11.116 L5.116,6.601 L0.479,2.085 C0.131,1.747 0.131,1.198 0.479,0.860 C0.826,0.521 1.390,0.521 1.738,0.860 L6.986,5.970 C7.164,6.143 7.249,6.373 7.244,6.601 C7.249,6.829 7.164,7.058 6.986,7.232 L1.738,12.343 Z"/>
                                                </svg>
                                              </button>
                                            </div>
                                          </div>
                                        </li>
                                        <li style="padding-left: 10px" >
                                          <div class="folder-title">
                                            <div class="folder-name">
                                        <span class="dot-txt">
                                            &#183;
                                        </span>
                                              Машинки 2
                                            </div>
                                            <div class="folder-controls-c">
                                              <span class="badge badge-success badge-pill">21</span>
                                              <button class="btn-icon-tr">
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                                  width="8px" height="13px">
                                                  <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                                                        d="M1.738,12.343 C1.390,12.681 0.826,12.681 0.479,12.343 C0.131,12.004 0.131,11.455 0.479,11.116 L5.116,6.601 L0.479,2.085 C0.131,1.747 0.131,1.198 0.479,0.860 C0.826,0.521 1.390,0.521 1.738,0.860 L6.986,5.970 C7.164,6.143 7.249,6.373 7.244,6.601 C7.249,6.829 7.164,7.058 6.986,7.232 L1.738,12.343 Z"/>
                                                </svg>
                                              </button>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <div class="folder-title" @click.right = "contextOpen($event)">
                                        <div class="folder-name">
                                          Машинки
                                        </div>
                                        <div class="folder-controls-c">
                                          <span class="badge badge-success badge-pill">21</span>
                                          <button class="btn-icon-tr">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              xmlns:xlink="http://www.w3.org/1999/xlink"
                                              width="8px" height="13px">
                                              <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                                                    d="M1.738,12.343 C1.390,12.681 0.826,12.681 0.479,12.343 C0.131,12.004 0.131,11.455 0.479,11.116 L5.116,6.601 L0.479,2.085 C0.131,1.747 0.131,1.198 0.479,0.860 C0.826,0.521 1.390,0.521 1.738,0.860 L6.986,5.970 C7.164,6.143 7.249,6.373 7.244,6.601 C7.249,6.829 7.164,7.058 6.986,7.232 L1.738,12.343 Z"/>
                                            </svg>
                                          </button>
                                        </div>
                                      </div>
                                    </li>
                                    <li>
                                      <div class="folder-title" @click.right = "contextOpen($event)">
                                        <div class="folder-name">
                                          Машинки
                                        </div>
                                        <div class="folder-controls-c">
                                          <span class="badge badge-success badge-pill">21</span>
                                          <button class="btn-icon-tr">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              xmlns:xlink="http://www.w3.org/1999/xlink"
                                              width="8px" height="13px">
                                              <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                                                    d="M1.738,12.343 C1.390,12.681 0.826,12.681 0.479,12.343 C0.131,12.004 0.131,11.455 0.479,11.116 L5.116,6.601 L0.479,2.085 C0.131,1.747 0.131,1.198 0.479,0.860 C0.826,0.521 1.390,0.521 1.738,0.860 L6.986,5.970 C7.164,6.143 7.249,6.373 7.244,6.601 C7.249,6.829 7.164,7.058 6.986,7.232 L1.738,12.343 Z"/>
                                            </svg>
                                          </button>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>

                                  <!--<div v-for="singleFolder in foldersCatalog" :key="singleFolder.folderId">-->
                                  <!--{{singleFolder.folderId}}  -->
                                  <!--</div>-->
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="bottom-s">
                            <div class="btn-c d-flex justify-content-between">
                              <button type="button" class="btn btn-outline-secondary">Показать товары</button>
                              <button type="button" class="btn btn-outline-secondary">Привязать</button>
                            </div>
                          </div>
                        </div>
                        <div key="find-tab" class="att-folders-i folders-wt" v-else-if="tabValue == 'find'">
                          <div class="upper-s">
                            <div class="find-folder-i">
                              <!--<div class="txt-f">-->
                                <!--Категории поставщика 22: <span class="provider-txt">{{selectedProvider.name}}</span>-->
                              <!--</div>-->
                              <div class="find-b justify-content-start d-flex">
                                <div class="input-group ">
                                  <input v-model.lazy="findUserStr" v-on:keyup.enter="findFolder" type="text" class="form-control" placeholder="Найти" aria-label="Recipient's username" aria-describedby="button-addon2">
                                  <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" @click="findFolder">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                        width="17px" height="17px">
                                        <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                                              d="M15.919,15.813 C15.525,16.207 14.887,16.207 14.494,15.813 L11.403,12.723 C10.235,13.594 8.792,14.117 7.223,14.117 C3.357,14.117 0.223,10.983 0.223,7.117 C0.223,3.251 3.357,0.117 7.223,0.117 C11.088,0.117 14.222,3.251 14.222,7.117 C14.222,8.686 13.700,10.130 12.828,11.298 L15.919,14.388 C16.312,14.782 16.312,15.420 15.919,15.813 ZM7.223,2.117 C4.461,2.117 2.222,4.355 2.222,7.117 C2.222,9.879 4.461,12.117 7.223,12.117 C9.984,12.117 12.223,9.879 12.223,7.117 C12.223,4.355 9.984,2.117 7.223,2.117 Z"/>
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                                <div class="selectLabeled">
                                  <multiselect
                                    v-model="selectedFind"
                                    :options="findSelectOpt"
                                    :multiple="false"
                                    :close-on-select="true"
                                    :allow-empty="false"
                                    :searchable="false"
                                    placeholder="Выбрать параметры поиска"
                                    selectedLabel="Выбрано"
                                    label="name"
                                    track-by="name"
                                    selectLabel="Выбрать"
                                    deselectLabel="" >
                                  </multiselect>
                                </div>
                              </div>

                            </div>
                            <div class="catalog-folder white-bg">
                              <div class="folder-b">
                                <div class="folder-c">
                                  <ul class="folder-list folder-list-main ">
                                    <li class="is-active" >
                                      <div class="folder-title"  >
                                        <div class="folder-name ">
                                          Машинки
                                        </div>
                                        <div class="folder-controls-c">
                                          <span class="badge badge-success badge-pill">21</span>
                                          <button class="btn-icon-tr">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              xmlns:xlink="http://www.w3.org/1999/xlink"
                                              width="8px" height="13px">
                                              <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                                                    d="M1.738,12.343 C1.390,12.681 0.826,12.681 0.479,12.343 C0.131,12.004 0.131,11.455 0.479,11.116 L5.116,6.601 L0.479,2.085 C0.131,1.747 0.131,1.198 0.479,0.860 C0.826,0.521 1.390,0.521 1.738,0.860 L6.986,5.970 C7.164,6.143 7.249,6.373 7.244,6.601 C7.249,6.829 7.164,7.058 6.986,7.232 L1.738,12.343 Z"/>
                                            </svg>
                                          </button>
                                        </div>
                                      </div>
                                      <ul class="folder-list">
                                        <li style="padding-left: 10px"  >
                                          <div class="folder-title">
                                            <div class="folder-name">
                                        <span class="dot-txt">
                                            &#183;
                                        </span>
                                              Машинки 2
                                            </div>
                                            <div class="folder-controls-c">
                                              <span class="badge badge-success badge-pill">21</span>
                                              <button class="btn-icon-tr">
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                                  width="8px" height="13px">
                                                  <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                                                        d="M1.738,12.343 C1.390,12.681 0.826,12.681 0.479,12.343 C0.131,12.004 0.131,11.455 0.479,11.116 L5.116,6.601 L0.479,2.085 C0.131,1.747 0.131,1.198 0.479,0.860 C0.826,0.521 1.390,0.521 1.738,0.860 L6.986,5.970 C7.164,6.143 7.249,6.373 7.244,6.601 C7.249,6.829 7.164,7.058 6.986,7.232 L1.738,12.343 Z"/>
                                                </svg>
                                              </button>
                                            </div>
                                          </div>
                                        </li>
                                        <li style="padding-left: 10px"  >
                                          <div class="folder-title">
                                            <div class="folder-name">
                                        <span class="dot-txt">
                                            &#183;
                                        </span>
                                              Машинки 2
                                            </div>
                                            <div class="folder-controls-c">
                                              <span class="badge badge-success badge-pill">21</span>
                                              <button class="btn-icon-tr">
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                                  width="8px" height="13px">
                                                  <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                                                        d="M1.738,12.343 C1.390,12.681 0.826,12.681 0.479,12.343 C0.131,12.004 0.131,11.455 0.479,11.116 L5.116,6.601 L0.479,2.085 C0.131,1.747 0.131,1.198 0.479,0.860 C0.826,0.521 1.390,0.521 1.738,0.860 L6.986,5.970 C7.164,6.143 7.249,6.373 7.244,6.601 C7.249,6.829 7.164,7.058 6.986,7.232 L1.738,12.343 Z"/>
                                                </svg>
                                              </button>
                                            </div>
                                          </div>
                                        </li>
                                        <li style="padding-left: 10px" >
                                          <div class="folder-title">
                                            <div class="folder-name">
                                        <span class="dot-txt">
                                            &#183;
                                        </span>
                                              Машинки 2
                                            </div>
                                            <div class="folder-controls-c">
                                              <span class="badge badge-success badge-pill">21</span>
                                              <button class="btn-icon-tr">
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                                  width="8px" height="13px">
                                                  <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                                                        d="M1.738,12.343 C1.390,12.681 0.826,12.681 0.479,12.343 C0.131,12.004 0.131,11.455 0.479,11.116 L5.116,6.601 L0.479,2.085 C0.131,1.747 0.131,1.198 0.479,0.860 C0.826,0.521 1.390,0.521 1.738,0.860 L6.986,5.970 C7.164,6.143 7.249,6.373 7.244,6.601 C7.249,6.829 7.164,7.058 6.986,7.232 L1.738,12.343 Z"/>
                                                </svg>
                                              </button>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <div class="folder-title" @click.right = "contextOpen($event)">
                                        <div class="folder-name">
                                          Машинки
                                        </div>
                                        <div class="folder-controls-c">
                                          <span class="badge badge-success badge-pill">21</span>
                                          <button class="btn-icon-tr">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              xmlns:xlink="http://www.w3.org/1999/xlink"
                                              width="8px" height="13px">
                                              <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                                                    d="M1.738,12.343 C1.390,12.681 0.826,12.681 0.479,12.343 C0.131,12.004 0.131,11.455 0.479,11.116 L5.116,6.601 L0.479,2.085 C0.131,1.747 0.131,1.198 0.479,0.860 C0.826,0.521 1.390,0.521 1.738,0.860 L6.986,5.970 C7.164,6.143 7.249,6.373 7.244,6.601 C7.249,6.829 7.164,7.058 6.986,7.232 L1.738,12.343 Z"/>
                                            </svg>
                                          </button>
                                        </div>
                                      </div>
                                    </li>
                                    <li>
                                      <div class="folder-title" @click.right = "contextOpen($event)">
                                        <div class="folder-name">
                                          Машинки
                                        </div>
                                        <div class="folder-controls-c">
                                          <span class="badge badge-success badge-pill">21</span>
                                          <button class="btn-icon-tr">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              xmlns:xlink="http://www.w3.org/1999/xlink"
                                              width="8px" height="13px">
                                              <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                                                    d="M1.738,12.343 C1.390,12.681 0.826,12.681 0.479,12.343 C0.131,12.004 0.131,11.455 0.479,11.116 L5.116,6.601 L0.479,2.085 C0.131,1.747 0.131,1.198 0.479,0.860 C0.826,0.521 1.390,0.521 1.738,0.860 L6.986,5.970 C7.164,6.143 7.249,6.373 7.244,6.601 C7.249,6.829 7.164,7.058 6.986,7.232 L1.738,12.343 Z"/>
                                            </svg>
                                          </button>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>

                                  <!--<div v-for="singleFolder in foldersCatalog" :key="singleFolder.folderId">-->
                                  <!--{{singleFolder.folderId}}  -->
                                  <!--</div>-->
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="bottom-s">
                            <div class="btn-c d-flex justify-content-between">
                              <button type="button" class="btn btn-outline-secondary">Показать товары</button>
                              <button type="button" class="btn btn-outline-secondary">Привязать</button>
                            </div>
                          </div>
                        </div>
                      </transition>

                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueRouter from 'vue-router'

    import appCatalogFolders from './catalogFolders.vue'
    Vue.component('appCatalogFolders', appCatalogFolders);

    import appBreadcrumbs from './breadcrumbs.vue'
    Vue.component('appBreadcrumbs', appBreadcrumbs);

    import Multiselect from 'vue-multiselect'

    export default {
        name: 'catalogConfig',
        data () {
            return {
                findUserStr: '', // временный атрибут, заменить
                tabValue: 'find', // Значение таба: find, provider
                breadcrumbs: [ // Хлебные крошки
                  {
                    title: 'Кросовки', // имя каталога
                    id: '32' // id каталога
                  },
                  {
                    title: 'Беговые', // имя каталога
                    id: '21' // id каталога
                  },
                ],
                selectedCatalogId: 12, // выбранный каталог из левой панели
                providerList: [ // поставщики для селекта
                  {name: 'Игроленд', id: '1234'},
                  {name: 'РС Восток', id: '4453'},
                  {name: 'Гала центр', id: '8489'},
                  {name: 'Союз игрушка', id: '8489'},
                  {name: 'Все поставщики', id: '9999'},
                ],
                selectedProvider: {
                  name: 'Все поставщики',
                  id: '9999'
                },
                showSideBarCatalog: true, // показывать панель с каталогом справа
                findFolderArr: { // Для вывода папок в блоке поиска
                },
                selectedFind: { // Выбранный параметр для поиска во вкладке поиск
                  name: 'Все поставщики',
                  id: '9999'
                },
                additionalFindProp: [
                  {name: 'Каталог(панель слева)', id: '1234'},
                  {name: 'Выделенная папка (панель слева)', id: '4453'},
                ],
            }
        },
        computed: {
          findSelectOpt(){
            return this.providerList.concat(this.additionalFindProp);
          },
        },
        components: {
          Multiselect
        },
        methods: {
          findFolder(){ //поиск среди папок

          },
          onBreadItemClicked(e){
            console.log('catalog id is ==== ', e.value);
          },
          createNewCatalog(catalogName){ // создание нового каталога/папки
            console.log('create new catalog', catalogName);
          },
          onHideNotOwned(value){ // скрыть не в наличии
            if(value === true){ // скрываем товары, которых нет в наличии
              console.log('скрываем товары, которых нет в наличии');
            }else { // отображаем все товары

            }
          },
          onChangeProvider(newProviderObj){
            if(newProviderObj){
              this.selectedProvider = newProviderObj;
            }else {

            }
            this.selectedProvider = newProviderObj;
            console.log('Провайдер изменён на: ', newProviderObj);

          },
          onShowSideBarCatalog(){
            this.showSideBarCatalog = !this.showSideBarCatalog;
          },
          tabChangeVal(newVal){
            this.tabValue = newVal;
          }

        },

    }
</script>

<style lang="sass">
    /*@import 'assets/sass/main.sass';*/
</style>
