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

    todo: API - в первую очередь ↓↓↓
    todo: API - Запрос каталога в зависимости от выбранного поставщика
    todo: API - Вывод товаров каталога по ид
    todo: API - Показать товары по ид папки

    todo: API - Скрыть товары, которых нет в наличии у поставщика из селекта(по ид поставщика), в селекте может быть выбрано "все поставщики".
    todo: API - запрос поставщиков для селекта. Возвращает массив формата [{name: 'Игроленд', id: '1234'}, {} ...]
    todo: API - Запрос сообщения последнего обновления каталога 'Последнее изменение 09.08.2018 18:00'

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
      todo: Папки вынести в отдельный компонент
      todo: сварачивание/разворачивание папок (для уровней возможно сделать параметр lvl).
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
            <div class="widthTransition col-3">
                <appCatalogFolders
                  :folderH = 'foldersCont.catalogFolder.folderH'
                  :sideFolder = 'foldersCont.catalogFolder.sideFolder'
                  :lastUpdateTxt = 'foldersCont.catalogFolder.lastUpdateTxt'
                  :contextMenu = 'foldersCont.catalogFolder.contextMenu'
                  :rootCatalogFolders = 'foldersCont.catalogFolder.rootCatalogFolders'
                  @setFolders = 'onSetFolders($event, "catalogFolder")'
                  @addCatalogFolder = 'onAddCatalogFolder'
                  ref="catalogFolder"
                >
                </appCatalogFolders>
            </div>
            <div class="col-9" >
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
                    <div class="tab-i" :class="{'active': tabValue === 'goods'}" @click="tabChangeVal('goods')">
                      Товары
                    </div>
                  </div>
              </div>
              <div class="row att-folders-r">
                  <div class="col-12 white-bg">
                    <div class="att-folders-c">
                        <div key="provider-tab" class="att-folders-i folders-wt" v-show="tabValue == 'provider'">
                          <div class="upper-s">
                            <div class="find-folder-i">
                              <div class="txt-f">
                                Категории поставщика: <span class="provider-txt">{{selectedProvider.name}}</span>
                              </div>
                              <!--<div class="find-b justify-content-start d-flex">-->
                              <!--<div class="input-group ">-->
                              <!--<input v-model.lazy="findFolderStr" v-on:keyup.enter="findFolder" type="text" class="form-control" placeholder="Найти" aria-label="Recipient's username" aria-describedby="button-addon2">-->
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
                            <appCatalogFolders
                              :folderH = 'foldersCont.providerFolder.folderH'
                              :sideFolder = 'foldersCont.providerFolder.sideFolder'
                              :lastUpdateTxt = 'foldersCont.providerFolder.lastUpdateTxt'
                              :contextMenu = 'foldersCont.providerFolder.contextMenu'
                              :rootCatalogFolders = 'foldersCont.providerFolder.rootCatalogFolders'
                              :selectedProvider = 'selectedProvider'
                              @setFolders = 'onSetFolders($event, "providerFolder")'
                              ref="providerCont"
                            >
                            </appCatalogFolders>
                          </div>
                          <div class="bottom-s">
                            <div class="btn-c d-flex justify-content-between">
                              <button type="button" class="btn btn-outline-secondary">Показать товары</button>
                              <button type="button" class="btn btn-outline-secondary">Привязать</button>
                            </div>
                          </div>
                        </div>
                        <div key="find-tab" class="att-folders-i folders-wt" v-show="tabValue == 'find'">
                            <div class="upper-s">
                              <div class="find-folder-i">
                                <!--<div class="txt-f">-->
                                <!--Категории поставщика 22: <span class="provider-txt">{{selectedProvider.name}}</span>-->
                                <!--</div>-->
                                <div class="find-b justify-content-start d-flex">
                                  <div class="input-group ">
                                    <input v-model.lazy="findFolderStr" v-on:keyup.enter="findFolder" type="text" class="form-control" placeholder="Найти" aria-label="Recipient's username" aria-describedby="button-addon2">
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
                                      :value="selectedFind"
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
                                      deselectLabel=""
                                      @input = "onInputSelect($event, 'selectedFind')" >
                                    </multiselect>
                                  </div>
                                </div>
                              </div>
                              <appCatalogFolders
                                :folderH = 'foldersCont.findResFolder.folderH'
                                :sideFolder = 'foldersCont.findResFolder.sideFolder'
                                :lastUpdateTxt = 'foldersCont.findResFolder.lastUpdateTxt'
                                :contextMenu = 'foldersCont.findResFolder.contextMenu'
                                :rootCatalogFolders = 'foldersCont.findResFolder.rootCatalogFolders'
                                :selectedProvider = 'selectedProvider'
                                @setFolders = 'onSetFolders($event, "findResFolder")'
                                ref="findResFolder"
                              >
                              </appCatalogFolders>
                            </div>
                            <div class="bottom-s">
                              <div class="btn-c d-flex justify-content-between">
                                <button type="button" class="btn btn-outline-secondary">Показать товары</button>
                                <button type="button" class="btn btn-outline-secondary">Привязать</button>
                              </div>
                            </div>
                          </div>
                        <div key="goods-tab" class="att-folders-i folders-wt goods-tab" v-show="tabValue == 'goods'">
                          <div class="upper-s">
                            <div class="find-folder-i">
                              <div class="txt-f">
                                Товары в категории: <span class="provider-txt">{{categoryGoods.category.name}}</span>
                              </div>
                              <div class="find-b justify-content-start d-flex">
                                <div class="input-group ">
                                  <input v-model.lazy="categoryGoods.findGoodsStr" v-on:keyup.enter="findGoods" type="text" class="form-control" placeholder="Поиск по категории">
                                  <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" @click="findGoods">
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
                              </div>
                            </div>
                            <div class="goods-cont">
                              <div class="row">
                                <div class="col-4">
                                  <div class="goods-col-1">
                                    <div class="goodsLimit">
                                      <div class="txt">
                                        Показывать по:
                                      </div>
                                      <ul>
                                        <li class="active"><a href="javascript:void(0)">
                                          20
                                        </a></li>
                                        <li><a href="javascript:void(0)">
                                          50
                                        </a></li>
                                        <li><a href="javascript:void(0)">
                                          100
                                        </a></li>
                                      </ul>
                                    </div>
                                    <div class="goods-list">
                                      <ul>
                                        <li v-for="(goodsItem, index) in categoryGoods.goodsListArr">
                                          <div class="img-c">
                                            <img :src="goodsItem.img" alt="" v-if="goodsItem.img">
                                            <img src="../../src/assets/img/imageTmp.png" alt="" v-else>
                                          </div>
                                          <div class="goods-name">
                                            {{goodsItem.name}}
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-4">
                                  <h6>
                                    Галлерея
                                  </h6>
                                </div>
                                <div class="col-4">
                                  <div class="goods-col-3">
                                    <h6>
                                      Информация о продукте
                                    </h6>
                                    <div class="goods-info">
                                      <div class="goods-i">
                                        <div class="title-h">
                                          Наименование
                                        </div>
                                        <div class="gray-txt">
                                          Игровой набор Mioshi Army "Лучник: разведчик" (лук, 3 стрелы, 1 мишень)
                                        </div>
                                      </div>
                                      <div class="goods-i">
                                        <div class="title-h">
                                          Альтернативное наименование
                                        </div>
                                        <div class="find-b justify-content-start d-flex">
                                          <div class="input-group ">
                                            <input v-model.lazy="categoryGoods.findGoodsStr" v-on:keyup.enter="findGoods" type="text" class="form-control" placeholder="">
                                            <div class="input-group-append">
                                              <button class="btn btn-outline-secondary" type="button" @click="findGoods">
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                                  width="15px" height="15px">
                                                  <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                                                        d="M14.410,3.414 L13.938,3.886 L11.108,1.054 L11.579,0.582 C12.361,-0.200 13.628,-0.200 14.410,0.582 C15.192,1.364 15.192,2.632 14.410,3.414 ZM5.190,12.639 L2.360,9.807 L10.164,1.998 L12.995,4.830 L5.190,12.639 ZM3.775,14.055 L0.001,14.999 L0.944,11.223 L1.416,10.751 L4.247,13.583 L3.775,14.055 Z"/>
                                                </svg>
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="goods-i ">
                                        <div class="atr-i" v-for="(itemParam, index) in categoryGoods.goodsListArr[0].params">
                                          <div class="i-t title-h">
                                            {{itemParam.key}}
                                          </div>
                                          <div class="i-t gray-txt">
                                            {{itemParam.val}}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="bottom-s">
                            <div class="row">
                              <appPagination :countPage = "categoryGoods.pagination.countPage"
                                             @pageChange = "onGoodsPageChange()">
                              </appPagination>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import appCatalogFolders from './catalogFolders.vue'
    import appBreadcrumbs from './breadcrumbs.vue'

    import {API_URL} from '../constants';
    import axios from 'axios';
    import {mapGetters} from 'vuex';
    import {mapMutations} from 'vuex';

    import Multiselect from 'vue-multiselect'

    import singleFolder from '../modules/singleFolder'

    import appPagination from './pagination'


    export default {
        name: 'catalogConfig',
        data () {
            return {
                findFolderStr: '', // Для поиска по папкам
                tabValue: 'goods', // Значение таба: find, provider
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
                ],
                selectedProvider: {
                },
                findFolderArr: { // Для вывода папок в блоке поиска
                },
                selectedFind: { // Выбранный параметр для поиска во вкладке поиск
                  name: 'Все поставщики',
                  id: ''
                },
                additionalFindProp: [
                  {name: 'Каталог (панель слева)', id: '1234'},
                  {name: 'Выделенная папка (панель слева)', id: '4453'},
                ],
                foldersCont: { //массив со всеми папками для компонента catalogFolder
                  providerFolder: {
                    folderH: '', // заголовок каталога
                    sideFolder: false, //боковая панель (каталог)
                    lastUpdateTxt: '', // Когда было произведено последнее мзменение, запрашивается в виде текста с сервера
                    contextMenu:{ // Контекстное меню
                      contextMenuOpen: false, //состояние контекстного меню (закрыто/открыто)
                      yPos: 323,//полложение по оси x
                      xPos: 224,//полложение по оси y
                      selectedFolder: {},//папка, на которую кликнули
                      menuOpt: [ // пункты меню
                        {
                          title: 'Товары',//заголовок
                          eventName: 'showGoods', // имя ивента, который вызывается при нажатии на пункт меню
                          iconId: 1,
                          //Подумать как передавать payload, при нажатии на папку
                        },
                        {
                          title: 'Привязать',//заголовок
                          eventName: 'attachFolder', // имя ивента, который вызывается при нажатии на пункт меню
                          iconId: 2,
                          //Подумать как передавать payload, при нажатии на папку
                        },
                      ]
                    },
                    rootCatalogFolders: [], // все папки, заполняется в компоненте catalogFolders.vue
                  },
                  findResFolder: { // вывод поиска
                    folderH: '', // заголовок каталога
                    sideFolder: false, //боковая панель (каталог)
                    lastUpdateTxt: '', // Когда было произведено последнее мзменение, запрашивается в виде текста с сервера
                    contextMenu:{ // Контекстное меню
                      contextMenuOpen: false, //состояние контекстного меню (закрыто/открыто)
                      yPos: 323,//полложение по оси x
                      xPos: 224,//полложение по оси y
                      selectedFolder: {},//папка, на которую кликнули
                      menuOpt: [ // пункты меню
                        {
                          title: 'Товары',//заголовок
                          eventName: 'showGoods', // имя ивента, который вызывается при нажатии на пункт меню
                          iconId: 1,
                          //Подумать как передавать payload, при нажатии на папку
                        },
                        {
                          title: 'Привязать',//заголовок
                          eventName: 'attachFolder', // имя ивента, который вызывается при нажатии на пункт меню
                          iconId: 2,
                          //Подумать как передавать payload, при нажатии на папку
                        },

                      ]
                    },
                    rootCatalogFolders: [], // все папки, заполняется в компоненте catalogFolders.vue
                  },
                  catalogFolder: {
                    folderH: 'Каталог', // заголовок каталога
                    sideFolder: true, //боковая панель (каталог)
                    lastUpdateTxt: 'Последнее изменение Сегодня 18:00', // Когда было произведено последнее мзменение, запрашивается в виде текста с сервера
                    contextMenu:{ // Контекстное меню
                      contextMenuOpen: false, //состояние контекстного меню (закрыто/открыто)
                      yPos: 323,//полложение по оси x
                      xPos: 224,//полложение по оси y
                      selectedFolder: {},//папка, на которую кликнули
                      menuOpt: [ // пункты меню
                        {
                          title: 'Параметры',//заголовок
                          eventName: 'showParamFolder', // имя ивента, который вызывается при нажатии на пункт меню
                          iconId: 3,
                          //Подумать как передавать payload, при нажатии на папку
                        },
                        {
                          title: 'Товары',//заголовок
                          eventName: 'showGoods', // имя ивента, который вызывается при нажатии на пункт меню
                          iconId: 1,
                          //Подумать как передавать payload, при нажатии на папку
                        },
                        {
                          title: 'Добавить',//заголовок
                          eventName: 'addFolder', // имя ивента, который вызывается при нажатии на пункт меню
                          iconId: 4,
                          //Подумать как передавать payload, при нажатии на папку
                        },
                        {
                          title: 'Удалить',//заголовок
                          eventName: 'deleteFolder', // имя ивента, который вызывается при нажатии на пункт меню
                          iconId: 5,
                          //Подумать как передавать payload, при нажатии на папку
                        },

                      ]
                    },
                    rootCatalogFolders: [], // все папки, заполняется в компоненте catalogFolders.vue
                  },
                },
                //Goods
                categoryGoods: { // товары выбранной категории
                  findGoodsStr: '',
                  category: {
                    childCount: 0,
                    folderId: "33556",
                    goodsCount: 12,
                    hasFolders: true,
                    hideFolder: false,
                    isOpen: false,
                    lvlFolder: 0,
                    name: "Авто",
                    supplier_id: "1",
                  },
                  pagination:{
                    countPage: 12, // общее колличество страниц, делаем запрос к базе
                    countItemsPage: 12 // колличество элементов на странице
                  },
                  goodsListArr: [
                    {
                      name: 'Салфетка пластик, 43х28см',
                      img: '../../src/assets/img/dodik2.png',
                      params: [
                        {key :'Артикул', val: "123141"},
                        {key :'Бренд', val: "Adibas"},
                        {key :'Код 1С', val: "90210"},
                        {key :'Штрихкод', val: "31235888"},
                        {key :'id', val: "767864"},
                        {key :'Цена', val: "233.45"},
                        {key :'Мин. партия', val: "3333"},
                        {key :'В коробке', val: "10"},
                        {key :'Количество', val: "10000"},
                        {key :'Страна', val: "Китай"},
                    ],
                    id: "65879",
                    price: "23.69",
                    idx: 1,
                    images: [
                      '../../src/assets/img/dodik2.png',
                      '../../src/assets/img/dodik2.png',
                      '../../src/assets/img/dodik.png'
                    ]
                    },
                    {
                      name: 'Додя 2',
                      img: '../../src/assets/img/dodik2.png'
                    },
                    {
                      name: 'Додя 3',
                      img: ''
                    },
                    {
                      name: 'Додя 4',
                      img: '../../src/assets/img/dodik2.png'
                    },
                    {
                      name: 'Додя 1',
                      img: '../../src/assets/img/dodik2.png'
                    },
                    {
                      name: 'Додя 2',
                      img: '../../src/assets/img/dodik2.png'
                    },
                    {
                      name: 'Додя 3',
                      img: ''
                    },
                    {
                      name: 'Додя 4',
                      img: '../../src/assets/img/dodik2.png'
                    },
                    {
                      name: 'Додя 1',
                      img: '../../src/assets/img/dodik2.png'
                    },
                    {
                      name: 'Додя 2',
                      img: '../../src/assets/img/dodik2.png'
                    },
                    {
                      name: 'Додя 3',
                      img: ''
                    },
                    {
                      name: 'Додя 4',
                      img: '../../src/assets/img/dodik2.png'
                    },
                  ],
                },
            }
        },
        computed: {
          ...mapGetters('alerts', {
            succesAlert: 'succesAlert',
            errorAlert: 'errorAlert'
          }),
          ...mapGetters('progress', {
            progStateWidth: 'progStateWidth',
            progShow: 'progShow'
          }),
          findSelectOpt(){
            return this.providerList.concat(this.additionalFindProp);
          },
          currentCatalogId(){
            return this.$route.params.id || null;
          }
        },
        components: {
          Multiselect,
          appCatalogFolders,
          appBreadcrumbs,
          appPagination
        },
        methods: {
          ...mapMutations('alerts',{
            setSuccesAlertShow: 'setSuccesAlertShow',
            setErrorAlertShow: 'setErrorAlertShow',
            setSuccesAlertMsg: 'setSuccesAlertMsg',
            setErrorAlertMsg: 'setErrorAlertMsg'
          }),
          ...mapMutations('progress',{
            setProgStateWidth: 'setProgStateWidth',
            setProgShow: 'setProgShow',
            stepOneActive: 'stepOneActive',
            stepTwoActive: 'stepTwoActive',
            stepLastActive: 'stepLastActive',
          }),
          onInputSelect(event, selectResKey){
            let selectedProvider = {
              code: event.code,
              id: event.id,
              name: event.name
            };
            this[selectResKey] = selectedProvider;

            if(selectResKey === 'selectedFind'){
              //Запрос категории
              this.updateFolderCont(null, null, null, +selectedProvider.id, 'findResFolder', 'findResFolder');
            }
          },
          //запись новых значений в папку
          onSetFolders(e, keyFolder){
            this.foldersCont[keyFolder].rootCatalogFolders = e.value;
          },
          findFolder(){ //поиск среди папок
            console.log('Поиск по подстроке - ', this.findFolderStr);
            let payload = {
              text: this.findFolderStr,
              supplier_id: this.selectedFind.id || null
            };
            this.stepOneActive(); // прогрессбар
            axios.get( API_URL + '/category/search', {
              params: {
                ...payload
              },
            }).then(resp => {
                const error = resp.data.error;
                if(error){
                  let errorTxt = resp.data.data.msgClient;
                  this.setErrorAlertShow(true);
                  this.setErrorAlertMsg('Ошибка при поиске: ' + errorTxt);
                }else{
                  this.$refs['findResFolder'].setRootCatalogFoldersComp(resp.data.data.catalogFolders);
                }
                this.stepLastActive(); // прогрессбар
              })
              .catch(err => {
                this.setErrorAlertShow(true);
                this.setErrorAlertMsg('Ошибка при поиске');
                this.stepLastActive(); // прогрессбар
              });
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
          updateFolderCont(idCategory, lvlFolder, parentFolderId, selectedProvider, folderKey, componentRefKey){
            //folderKey - ключ папки в foldersCont
            // componentRefKey - ссылка на компонент,

            if(!folderKey || !componentRefKey){
              console.error('folderKey && componentRefKey - обязательные параметры');
            } else {
              let payload = {
                lvlFolder: lvlFolder || null, // уровень вложенности
                id: idCategory || '', // ид папки
                supplier_id: selectedProvider || '', // поставщик(если есть), если не указан, то приходят категории от всех поставщиков
                parentFolderId: parentFolderId || '0' // ид родительской папки, вроде не используется, надо сделать ревью
              };
              console.log('Req pay --', payload);
              let categoryRequest = this.$refs[componentRefKey].requestCategory(+payload.id, payload.lvlFolder, payload.parentFolderId, +selectedProvider);
              categoryRequest.then(
                result => { // всё ок
                  console.log('categoryRequest result -->>', result);
                  this.foldersCont[folderKey].rootCatalogFolders = result.catalogFolders;
                  //Перезаписываем значение в компоненте
                  this.$refs[componentRefKey].setRootCatalogFoldersComp(result.catalogFolders);
                },
                error =>{ // всё не ок
                  console.log('error');
                }
              );
            }
          },
          onChangeProvider(newProviderObj){
            this.selectedProvider = newProviderObj;
            console.log('Провайдер изменён на: ', newProviderObj);
            //Запрос категории
            this.updateFolderCont(null, null, null, +newProviderObj.id, 'providerFolder', 'providerCont');
          },
          tabChangeVal(newVal){
            this.tabValue = newVal;
            if(newVal === 'provider'){
              console.log('provider Tab Selected')
              // this.updateFolderCont(null, null, null, this.selectedProvider.id, 'providerFolder', 'providerCont');
            }
          },
          //инициализация всех папок/категорий
          allFoldersInit(){
            //папка с поставщиком
            this.updateFolderCont(null, null, null, null, 'providerFolder', 'providerCont');
            //папка с результатами поиска
            this.updateFolderCont(null, null, null, null, 'findResFolder', 'findResFolder');
            //папка каталога пользователя

            //заглушка, создаём пустую папку
            this.foldersCont.catalogFolder.rootCatalogFolders.push(new singleFolder({}));
            this.$refs['catalogFolder'].setRootCatalogFoldersComp(this.foldersCont.catalogFolder.rootCatalogFolders);

            //todo: будет новый метод на беке,
            // this.updateFolderCont(this.currentCatalogId, null, null, null, 'catalogFolder', 'catalogFolder');

          },
          getProvider(){
            this.stepOneActive(); // прогрессбар
            axios.get( API_URL + '/supplier', {
              params: {},
            }).then(resp => {
                const error = resp.data.error;
                if(error){
                  let errorTxt = resp.data.data.msgClient;
                  this.setErrorAlertShow(true);
                  this.setErrorAlertMsg('Ошибка при запросе поставщиков: ' + errorTxt);
                }else {
                  this.providerList = resp.data.data;
                  this.providerList.push({name: 'Все поставщики', id: ''});
                  //todo: при изменении провайдера вызывать!!
                  this.selectedProvider = this.providerList[this.providerList.length-1]
                }
                this.stepLastActive(); // прогрессбар
              })
              .catch(err => {
                this.setErrorAlertShow(true);
                this.setErrorAlertMsg('Ошибка при запросе поставщиков');
                this.stepLastActive(); // прогрессбар
              });
          },
          //Добавить папку/категорию в каталог/категорию
          onAddCatalogFolder(){
            console.log('API пока не готово');
          },
          findGoods(){ //поиск среди папок
            console.log('Поиск по подстроке - ', this.categoryGoods.findGoodsStr);
            let payload = {
              text: this.categoryGoods.findGoodsStr || '',
              categoryId: this.categoryGoods.category.folderId || null
            };
            this.stepOneActive(); // прогрессбар
            axios.get( API_URL + '/category/search', {
              params: {
                ...payload
              },
            }).then(resp => {
              const error = resp.data.error;
              if(error){
                let errorTxt = resp.data.data.msgClient;
                this.setErrorAlertShow(true);
                this.setErrorAlertMsg('Ошибка при поиске: ' + errorTxt);
              }else{
                this.$refs['findResFolder'].setRootCatalogFoldersComp(resp.data.data.catalogFolders);
              }
              this.stepLastActive(); // прогрессбар
            })
              .catch(err => {
                this.setErrorAlertShow(true);
                this.setErrorAlertMsg('Ошибка при поиске');
                this.stepLastActive(); // прогрессбар
              });
          },
          onGoodsPageChange(){

          },
        },
        mounted(){
          this.getProvider();
          this.allFoldersInit();
        }

    }
</script>

<style lang="sass">
    /*@import 'assets/sass/main.sass';*/
</style>
