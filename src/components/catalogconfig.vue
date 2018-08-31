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
    todocomplete: API - Запрос каталога в зависимости от выбранного поставщика
    todocomplete: API - Вывод товаров каталога по ид
    todocomplete: API - Показать товары по ид папки

    todo: API - Скрыть товары, которых нет в наличии у поставщика из селекта(по ид поставщика), в селекте может быть выбрано "все поставщики".
    todocomplete: API - запрос каталогов для селекта. Возвращает массив формата [{name: 'Игроленд', id: '1234'}, {} ...]
    todo: API - Запрос сообщения последнего обновления каталога 'Последнее изменение 09.08.2018 18:00'


    todo: API - ТОВАРЫ ↓↓↓
    todocomplete: API - Поиск по товарам в определённой катагории, передаётся строка и ид категории, получаю соответствующий массив товаров
    todocomplete: API - Загрузка галереи пользователя через dropZone
    todocomplete: API - Добавить поле какую галерею использовать(по умолчанию или пользовательскую)
    todocomplete: API - добавить наценку, метод на подобие 'Альтернативное наименование'


    todocomplete: В хлебных крошках ↓↓↓
      todocomplete: написать обработчик для тригера "Скрыть не в наличии"
      todocomplete: Добавить "Новую категорию"

    todo: Каталог (панель слева)
      todocomplete: В контекстное меню Добавить "Отвязать товар", если товар уже привязан (поидее такого не может быть, т.к. при привязке товара, он удаляется из массива т.е. он не виден для пользователя)
      todo: В контекстное меню Добавить "Заблокировать" в контекстное меню каталога, то что было в 3м столбце (иконка замочек)
      todocomplete: при клике на папку в каталоге, изменить хлебные крошки
      todo: Сделать возможность изменения родителя (придумать как сделать), скорее всего в настройках категории
      todo: Последнее изменение каталога
      todocomplete: сделать выделение каталога при клике (завести отдельную переменную с индексом и ид выделенного каталога), смотри как сделанно во вкладке "Товары"
      todo: контекстное меню
        todo: Параметры - Параметры каталога, по типу окна "Показать товары" (не отрисованно) Поля: фото и описание, родительская категория
        todocomlete: Товары - кнопка  "Показать товары"
        todocomplete: Добавить - добавить новую папку, пишем только название
        todocomplete: удалить - удаление папки

    todocomplete: Вкладка "Каталоги"
      todocompete: сделать выделение каталога при клике (завести отдельную переменную с индексом и ид выделенного каталога), смотри как сделанно во вкладке "Товары"
      todocomplete: контекстное меню
        todocomplete: Товары - показать товары
        todocomplete: Привязать - привязать товар к выделенному каталогу в панели слева, если ничего не выделено, то проинформировать пользователя что бы он выделил каталог в панели слева
      todocomplete: кнопки "Првязвть" и "Показать товары" в нижней панели(под папками)

    todocomplete: Вкладка "Поиск"
      todocomplete: контекстное меню
        todocomplete: Товары - показать товары
        todocomplete: Привязать - привязать товар к выделенному каталогу в панели слева, если ничего не выделено, то проинформировать пользователя что бы он выделил каталог в панели слева
      todocomplete: кнопки "Првязвть" и "Показать товары" в нижней панели(под папками)

    todocomplete: Вкладка "Товары"
      todocomplete: Поиск по товарам
      todocomplete: Загрузка изображений на сервер
      todocomplete: Переключение какую галерею использовать(по умолчанию или пользовательскую)
      todocomplete: Добавить обработчик для поля "Наценка"
      Todocomplete: Добавить обработчик для поля "Альтернативное наименование"
      todocomplete: Сделать пагинацию товаров, когда будет готова нормальная выгрузка (больше товаров)
      todocomplete: "Показать по", написать обработчик
      todocomplete: Сделать контекстное меню для привязки товара к каталогу или кнопку какую-то

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
                  :userCatalogId = 'currentCatalogId'
                  :hideNotAvl="hideNotAvl"
                  @setFolders = 'onSetFolders($event, "catalogFolder")'
                  @addCatalogFolder = 'onAddCatalogFolder'
                  @removeCatalogFolder = 'onRemoveCatalogFolder'
                  @setSelectedItem = 'onSetSelectItem($event, "catalogFolder")'
                  @setSelectRoot = 'onSetSelectRoot'
                  @showGoods="onCatalogShowGoods"
                  @showParamFolder="onShowParamFolder"
                  ref="catalogFolder"
                >
                </appCatalogFolders>
            </div>
            <div class="col-9" >
              <div class="row">
                  <div class="tab-controls-c">
                    <div class="tab-i" :class="{'active': tabValue === 'provider'}" @click="tabChangeVal('provider')">
                      Каталоги
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
                    <div class="tab-i" :class="{'active': tabValue === 'attach'}" @click="tabChangeVal('attach')" v-show="foldersCont.attachFolder.showAttachedTab">
                      Привязанные категории
                    </div>
                    <div class="tab-i" :class="{'active': tabValue === 'attachproduct'}" @click="tabChangeVal('attachproduct')" v-show="foldersCont.attachProducts.showAttachedTab">
                      Привязанные продукты
                    </div>
                    <div class="tab-i" :class="{'active': tabValue === 'params'}" @click="tabChangeVal('params')">
                      Параметры каталога
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
                                Выбранный каталог: <span class="provider-txt">{{ providerHeader }}</span>
                              </div>
                            </div>
                            <appCatalogFolders
                              :folderH = 'foldersCont.providerFolder.folderH'
                              :sideFolder = 'foldersCont.providerFolder.sideFolder'
                              :lastUpdateTxt = 'foldersCont.providerFolder.lastUpdateTxt'
                              :contextMenu = 'foldersCont.providerFolder.contextMenu'
                              :rootCatalogFolders = 'foldersCont.providerFolder.rootCatalogFolders'
                              :selectedProvider = 'selectedProvider'
                              :hideNotAvl="hideNotAvl"
                              @setFolders = 'onSetFolders($event, "providerFolder")'
                              @setSelectedItem = 'onSetSelectItem($event, "providerFolder")'
                              @attachFolderToCategory='onAttachFolderToCategory'
                              @showGoods="onTabShowGoods"
                              ref="providerCont"
                            >
                            </appCatalogFolders>
                          </div>
                          <div class="bottom-s">
                            <div class="btn-c d-flex justify-content-between">
                              <button type="button" class="btn btn-outline-secondary" @click="onTabShowGoods">Показать товары</button>
                              <button type="button" class="btn btn-outline-secondary" @click="onAttachFolderToCategory">Привязать</button>
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
                                      label="catalogName"
                                      track-by="id"
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
                                :hideNotAvl="hideNotAvl"
                                @setFolders = 'onSetFolders($event, "findResFolder")'
                                @showParamFolder = 'onSetFolders($event)'
                                @setSelectedItem = 'onSetSelectItem($event, "findResFolder")'
                                @attachFolderToCategory='onAttachFolderToCategory'
                                @showGoods="onTabShowGoods"
                                ref="findResFolder"
                              >
                              </appCatalogFolders>
                            </div>
                            <div class="bottom-s">
                              <div class="btn-c d-flex justify-content-between">
                                <button type="button" class="btn btn-outline-secondary" @click="onTabShowGoods">Показать товары</button>
                                <button type="button" class="btn btn-outline-secondary" @click="onAttachFolderToCategory">Привязать</button>
                              </div>
                            </div>
                          </div>
                        <div key="goods-tab" class="att-folders-i folders-wt goods-tab" v-show="tabValue == 'goods'">
                          <div class="upper-s">
                            <div class="find-folder-i">
                              <div class="txt-f">
                                Товары в категории: <span class="provider-txt">{{categoryGoods.selectedTitle}}</span>
                              </div>
                              <div class="find-b justify-content-start d-flex">
                                <div class="input-group ">
                                  <input v-model.lazy="categoryGoods.findGoodsStr" v-on:keyup.enter="onFindGoods" type="text" class="form-control" placeholder="Поиск товаров">
                                  <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button" @click="onFindGoods">
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
                            <appCatalogCategoryGoods
                              :category="categoryGoods.category"
                              :categoryId="categoryGoods.categoryId"
                              :supplierId="categoryGoods.supplier_id"
                              :offset="categoryGoods.offset"
                              :hideNotAvl="hideNotAvl"
                              @updatePagination="onUpdatePagination($event)"
                              @setSelectedProduct="onSetSelectProduct($event)"
                              @attachProductToCategory="onAttachProductToCategory"
                              ref="productsCatalog"
                            ></appCatalogCategoryGoods>
                          </div>
                          <div class="bottom-s">
                            <div class="row">
                              <appPagination :countPage = "categoryGoods.pagination.countPage"
                                             :routerOn = "categoryGoods.pagination.routerOn"
                                             :pageNum="categoryGoods.pagination.currentPage"
                                             @pageChange = "onGoodsPageChange($event)"
                                             >
                              </appPagination>
                            </div>
                          </div>
                        </div>
                        <div key="catalog-attach-tab" class="att-folders-i folders-wt" v-show="tabValue == 'attach'">
                          <div class="upper-s">
                            <div class="find-folder-i">
                              <div class="txt-f">
                                Выбранная категория: <span class="provider-txt">{{ foldersCont.attachFolder.folderH }}</span>
                              </div>
                            </div>
                            <appBasicCatalogFolders
                              :folderH = 'foldersCont.attachFolder.folderH'
                              :rootCatalogFolders = 'foldersCont.attachFolder.rootCatalogFolders'
                              :emptyList="foldersCont.attachFolder.emptyList"
                              :propId="'attached_category_id'"
                              :propTitle="'attached_category_title'"
                              @setFolders = 'onSetFolders($event, "attachFolder")'
                              @setSelectedItem = 'onSetSelectItem($event, "attachFolder")'
                              @removeAttachedItem='onRemoveAttachedItemModal($event, "attachFolder")'
                              ref="attachCont"
                            >
                            </appBasicCatalogFolders>
                          </div>
                        </div>
                        <div key="product-attach-tab" class="att-folders-i folders-wt" v-show="tabValue == 'attachproduct'">
                          <div class="upper-s">
                            <div class="find-folder-i">
                              <div class="txt-f">
                                Выбранная категория: <span class="provider-txt">{{ foldersCont.attachFolder.folderH }}</span>
                              </div>
                            </div>
                            <appBasicCatalogFolders
                              :folderH = 'foldersCont.attachProducts.folderH'
                              :rootCatalogFolders = 'foldersCont.attachProducts.rootProductFolders'
                              :emptyList="foldersCont.attachProducts.emptyList"
                              :propId="'attached_product_id'"
                              :propTitle="'attached_product_title'"
                              @setFolders = 'onSetFolders($event, "attachProducts")'
                              @setSelectedItem = 'onSetSelectItem($event, "attachProducts")'
                              @removeAttachedItem='onRemoveAttachedProductModal($event, "attachProducts")'
                              ref="attachProd"
                            >
                            </appBasicCatalogFolders>
                          </div>
                        </div>
                        <div key="params-tab" class="att-folders-i folders-wt" v-show="tabValue == 'params'">
                        <div class="upper-s">
                          <appCatalogItem :selected="paramsFolder.selected"
                                          :switcherActive="paramsFolder.switcherActive"
                                          :showConfig="true"
                                          :userList="userList"
                                          :catalogName="paramsFolder.catalogName"
                                          :catalogId="paramsFolder.id"
                                          :isActive="paramsFolder.isActive"
                                          :isOn="paramsFolder.isOn"
                                          :description="paramsFolder.description"
                                          :selectedUsers="paramsFolder.selectedUsers"
                                          :userRole="userRole"
                                          :useCatalogParams="true"
                                          @configToogle = "onConfigToogle"
                                          @switchToogle = "onSwitchToogle"
                                          @isOnToogle = "onIsOnToogle"
                                          @changeDescr = "onChangeDescr($event)"
                                          @copyCatalog = ""
                                          @saveCatalog = "onSaveCatalog"
                                          @changeSelect = "onChangeSelect($event)"
                                          @removeCatalog = "onOpenRemoveCatalogWindow(index)">
                          </appCatalogItem>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
        <!-- Modal RemoveCatalog-->
        <appModal
          :headerText="'Подтвердите удаление категории'"
          :keyId="'confirmDeleteModal'"
          :deleteIcon="true"
          :positiveActionText="'Удалить категорию'"
          :textField="remoteTextLabel"
          :isNotifyModal="true"
          :negativeActionText="'Отмена'"
          :actionIndex="0"
          :inputsArr="inputsArr"
          :buttonClass="'btn-danger'"
          :necessaryEvent="'pageChange'"
          @pageChange="contextRemoveCatalog">
        </appModal>
        <!-- Modal DeAttach Product -->
        <appModal
          :headerText="'Подтвердите отвязывание продукта'"
          :keyId="'confirmDeAttachProductModal'"
          :deleteIcon="true"
          :positiveActionText="'Отвязать продукт'"
          :textField="remoteTextLabel"
          :isNotifyModal="true"
          :negativeActionText="'Отмена'"
          :actionIndex="0"
          :inputsArr="inputsArr"
          :buttonClass="'btn-danger'"
          :necessaryEvent="'pageChange'"
          @pageChange="removeAttachedProduct">
        </appModal>
        <!-- Modal DeAttach Category -->
        <appModal
          :headerText="'Подтвердите отвязывание категории'"
          :keyId="'confirmDeAttachModal'"
          :deleteIcon="true"
          :positiveActionText="'Отвязать категорию'"
          :textField="remoteTextLabel"
          :isNotifyModal="true"
          :negativeActionText="'Отмена'"
          :actionIndex="0"
          :inputsArr="inputsArr"
          :buttonClass="'btn-danger'"
          :necessaryEvent="'pageChange'"
          @pageChange="removeAttachedCategory">
        </appModal>
        <!--Modal AddCatalog-->
        <appModal
          :headerText="'Введите имя новой категории'"
          :keyId="'confirmAddModal'"
          :deleteIcon="false"
          :positiveActionText="'Добавить категорию'"
          :negativeActionText="'Отмена'"
          :actionIndex="0"
          :inputsArr="inputsAddArr"
          :buttonClass="'btn-success'"
          :necessaryEvent="'pageChange'"
          @pageChange="contextCreatedNewCatalog($event)">
        </appModal>
    </div>
</template>

<script>
    import appCatalogFolders from './catalogFolders.vue'
    import appBreadcrumbs from './breadcrumbs.vue'
    import appModal from './modalWindow.vue';
    import appBasicCatalogFolders from './catalogBasicFolders.vue'
    import appCatalogCategoryGoods from './catalogCategoryGoods'
    import appCatalogItem from './catalogItem'

    import {API_URL, IMAGE_URL, USER_ADMIN} from '../constants';
    import axios from 'axios';
    import {mapGetters} from 'vuex';
    import {mapMutations} from 'vuex';

    import Multiselect from 'vue-multiselect'

    import singleFolder from '../modules/singleFolder'

    import appPagination from './pagination'
    import appSwitcher from './switcher'
    import appInput from './inputValid'
    import vue2Dropzone from 'vue2-dropzone'

    export default {
        name: 'catalogConfig',
        data () {
            return {
              IMAGE_URL: API_URL, // корень для изображений
              inputsArr:[ // массив инпутов для всплывающего окна
                {
                  id: 'confirmDelete',
                  showError: '',
                  validFeedback: "",
                  invalidFeedback: "Имя введено неверно",
                  placeholder: "Введите имя категории, которую хотите удалить",
                  type: "text",
                  required: "true",
                  pattern: /[^]*/,
                  value: '',
                  isValid: false
                }
              ],
              inputsAddArr:[  // массив инпутов для всплывающего окна
                {
                  id: 'confirmAdd',
                  showError: '',
                  validFeedback: "",
                  invalidFeedback: "Имя введено неверно",
                  placeholder: "Введите имя категории, которую хотите добавить",
                  type: "text",
                  required: "true",
                  pattern: /[^]*/,
                  value: '',
                  isValid: false
                }
              ],
              remoteTextLabel: '',  // текст для всплывашки удаления
              findFolderStr: '', // Для поиска по папкам
              tabValue: 'provider', // Значение таба: find, provider
              breadcrumbs: [],// Хлебные крошки
              selectedCatalogId: 12, // выбранный каталог из левой панели
              hideNotAvl: false,
              providerList: [// поставщики для селекта
              ],
              catalogList:[],
              selectedProvider: {
              },
              findFolderArr: { // Для вывода папок в блоке поиска
              },
              selectedFind: null,
              additionalFindProp: null,
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
                        eventName: 'attachFolderToCategory', // имя ивента, который вызывается при нажатии на пункт меню
                        iconId: 2,
                        //Подумать как передавать payload, при нажатии на папку
                      },
                    ]
                  },
                  rootCatalogFolders: [], // все папки, заполняется в компоненте catalogFolders.vue
                  catalogSelectedItemId: 0, // id выбранного каталога // объект выбранного каталога (выделяется желтым)
                  catalogSelectedItemIndex: 0,  // index выбранного каталога // объект выбранного каталога (выделяется желтым)
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
                        eventName: 'attachFolderToCategory', // имя ивента, который вызывается при нажатии на пункт меню
                        iconId: 2,
                        //Подумать как передавать payload, при нажатии на папку
                      },

                    ]
                  },
                  rootCatalogFolders: [], // все папки, заполняется в компоненте catalogFolders.vue
                  catalogSelectedItemId: 0, // id выбранного каталога // объект выбранного каталога (выделяется желтым)
                  catalogSelectedItemIndex: 0,  // index выбранного каталога // объект выбранного каталога (выделяется желтым)
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
                        eventName: 'addCatalogFolder', // имя ивента, который вызывается при нажатии на пункт меню
                        iconId: 4,
                        //Подумать как передавать payload, при нажатии на папку
                      },
                      {
                        title: 'Удалить',//заголовок
                        eventName: 'removeCatalogFolder', // имя ивента, который вызывается при нажатии на пункт меню
                        iconId: 5,
                        //Подумать как передавать payload, при нажатии на папку
                      },

                    ]
                  },
                  rootCatalogFolders: [], // все папки, заполняется в компоненте catalogFolders.vue
                  catalogSelectedItemId: 0, // id выбранного каталога // объект выбранного каталога (выделяется желтым)
                  catalogSelectedItemIndex: 0,  // index выбранного каталога // объект выбранного каталога (выделяется желтым)
                },
                attachFolder:{
                  folderH: '',
                  showAttachedTab: false,
                  emptyList: 'Категорий не найдено',
                  /* rootCatalogFolders Item
                  {
                    attached_category_id:"34359",
                    attached_category_title:"Бытовая химия. Уход и красота. Гигиена",
                    id:"5"
                  }
                  */
                  rootCatalogFolders: [],
                  catalogSelectedItemId: 0, // id выбранного каталога // объект выбранного каталога (выделяется желтым)
                  catalogSelectedItemIndex: 0,  // index выбранного каталога // объект выбранного каталога (выделяется желтым)
                  catalogSelectedItemCategoryId: 0  // id категории, которую отвязвыем
                },
                attachProducts:{
                  folderH: '',
                  showAttachedTab: false,
                  emptyList: 'Продуктов не найдено',
                  /* rootProductFolders Item
                  {
                    attached_category_id:"34359",
                    attached_product_id:"Бытовая химия. Уход и красота. Гигиена",
                    id:"5"
                  }
                  */
                  rootProductFolders: [],
                  catalogSelectedItemId: 0, // id выбранного каталога // объект выбранного каталога (выделяется желтым)
                  catalogSelectedItemIndex: 0,  // index выбранного каталога // объект выбранного каталога (выделяется желтым)
                  catalogSelectedItemCategoryId: 0  // id категории, которую отвязвыем
                }
              },
              paramsFolder:{

              },
              userList: [],
              //Goods categoryGoods.pagination.countItemsPage
              categoryGoods: { // товары выбранной категории
                findGoodsStr: '',
                selectedTitle:'',
                categoryId: 0,//для запроса товаров
                supplier_id: '',//для запроса товаров
                limit: '',//для запроса товаров
                offset: '',//для запроса товаров
                productSelectedId: 0,// id выбранного товара
                productSelectedIndex: 0,
                category: {
                  // childCount: 0,
                  // folderId: "0",
                  // goodsCount: 12,
                  // hasFolders: true,
                  // hideFolder: false,
                  // isOpen: false,
                  // lvlFolder: 0,
                  // name: "Авто",
                  // supplier_id: "1",
                },
                pagination: { // параметры пагинации
                  countPage: 2, // общее колличество страниц, делаем запрос к базе
                  countItemsPage: 20, // колличество элементов на странице
                  routerOn: false, // отключение роутера, если включить, то надо настроить роутер
                  currentPage: 1
                },
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
          ...mapGetters('user',{
              userRole: 'role',
            }),
          //формирование опций для селекта с параметрами поиска, вкладка поиск
          findSelectOpt(){
            return this.providerList;
          },
          currentCatalogId(){
            return +this.$route.params.id || null;
          },
          showAttachedTab(){
            return this.foldersCont.attachFolder.showAttachedTab;
          },
          currentPageCount(){
            return this.categoryGoods.pagination.countPage;
          },
          providerHeader(){
            return (this.selectedProvider.catalogName) ? this.selectedProvider.catalogName : 'Выберите поставщика';
          }
        },
        components: {
          Multiselect,
          appCatalogItem,
          appCatalogFolders,
          appBasicCatalogFolders,
          appCatalogCategoryGoods,
          appBreadcrumbs,
          appPagination,
          appSwitcher,
          appInput,
          appModal,
          vueDropzone: vue2Dropzone
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
          //Event handler: выбор параметров поиска, во вкладке поиск (где искать)
          onInputSelect(event, selectResKey){
            let selectedProvider = {
              code: event.code,
              id: event.id,
              catalogName: event.catalogName
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
          // выбор корня каталога, сбрасываем хлебные крошки
          onSetSelectRoot(){
            // скидываем выбранные ээлементы и очищаем хлебны крошки
            this.foldersCont.catalogFolder.catalogSelectedItemId = 0;
            this.foldersCont.catalogFolder.catalogSelectedItemIndex = 0;
            this.$set(this,'breadcrumbs',[]);
            // скрываем вкладку Привязанные товары
            this.foldersCont.attachFolder.showAttachedTab = false;
            this.foldersCont.attachProducts.showAttachedTab = false;
          },
          // действия с привязанными товарами
          setAttachAction(keyFolder,index){
            // для привязанных товаров
            // открываем вкладку Привязанные товары
            this.foldersCont.attachFolder.showAttachedTab = true;
            this.foldersCont.attachProducts.showAttachedTab = true;
            this.$refs['attachCont'].setRootCatalogFoldersComp(this.foldersCont[keyFolder].rootCatalogFolders[index].attachedCategories);
            if(this.foldersCont[keyFolder].rootCatalogFolders[index].attachedProducts)
              this.$refs['attachProd'].setRootCatalogFoldersComp(this.foldersCont[keyFolder].rootCatalogFolders[index].attachedProducts);
            //this.foldersCont.attachFolder.rootCatalogFolders = this.foldersCont[keyFolder].rootCatalogFolders[index].attachedCategories;
            this.foldersCont.attachFolder.folderH = this.foldersCont[keyFolder].rootCatalogFolders[index].name;
            this.foldersCont.attachProducts.folderH = this.foldersCont[keyFolder].rootCatalogFolders[index].name;
          },
          //запись новых значений в объект по которому кликнули (выдяеляется желтым)
          onSetSelectItem(e, keyFolder){
            //console.log(e);
            this.foldersCont[keyFolder].catalogSelectedItemId = e.value.id;
            this.foldersCont[keyFolder].catalogSelectedItemIndex = e.value.index;
            if(keyFolder === 'catalogFolder'){

              // для списка категорий
              let newBreadcrumbs = [];
              if(e.value.lvlFolder > 0 && e.value.id !== 0){
                this.setAttachAction(keyFolder, e.value.index);

                let indexLvlFolder = e.value.lvlFolder - 1;
                newBreadcrumbs.push(e.value);
                for(let ind = e.value.index; ind >= 0 || indexLvlFolder === 0; ind--){ // Пока не дошли до самой первой папки, или пока не проверили последнего родителя
                  if(indexLvlFolder === this.foldersCont[keyFolder].rootCatalogFolders[ind].lvlFolder){
                    let parent_node = {
                      id: this.foldersCont[keyFolder].rootCatalogFolders[ind].folderId,
                      index: ind,
                      lvlFolder: this.foldersCont[keyFolder].rootCatalogFolders[ind].lvlFolder,
                      name: this.foldersCont[keyFolder].rootCatalogFolders[ind].name,
                    };
                    newBreadcrumbs.push(parent_node);
                    if(indexLvlFolder !== 0) { //т.к. нашли первого родителя, уменьшаем уровень вложенности для поиска следующего родителя
                      indexLvlFolder--;
                    }
                    if(this.foldersCont[keyFolder].rootCatalogFolders[ind].lvlFolder === 0){//Дошли до корня
                      break;
                    }
                  }
                }
              }
              else if(e.value.id === 0){
                if(this.tabValue === 'attach')
                  this.tabChangeVal('provider');
                this.onSetSelectRoot();
              }
              else {
                newBreadcrumbs.push(e.value);
                this.setAttachAction(keyFolder, e.value.index);
              }
              //console.log(newBreadcrumbs);
              newBreadcrumbs.reverse();
              this.$set(this,'breadcrumbs',newBreadcrumbs);
            }
          },
          // получаем ид выделеного продукта
          onSetSelectProduct(e){
            this.categoryGoods.productSelectedId = e.id;
            this.categoryGoods.productSelectedIndex = e.index;
          },
          // находим индекс массива по свойствам элемента
          findCategoryIndex(categoryArray,categoryId){
            return categoryArray.findIndex( element => +categoryId == +element.folderId );
          },
          // вызываем всплывашку отвязки категорий
          onRemoveAttachedItemModal(e, keyFolder){
            this.foldersCont[keyFolder].catalogSelectedItemId = e.value.id;
            this.foldersCont[keyFolder].catalogSelectedItemIndex = e.value.index;
            this.foldersCont[keyFolder].catalogSelectedItemCategoryId = e.value.catalogId;
            if(+this.foldersCont.attachFolder.catalogSelectedItemId !== 0){
              let categoryName = e.value.name;
              this.remoteTextLabel = 'Вы действительно хотите отвязать категорию - "' +  categoryName + '"?';
              $('#confirmDeAttachModal').modal();
            }else{
              this.setErrorAlertShow(true);
              this.setErrorAlertMsg('Вы не выбрали привязанную категорию');
            }
          },
          removeAttachedCategory(){
            let activeTab = this.getActiveTab();
            let categoryId = this.foldersCont.attachFolder.catalogSelectedItemId;
            console.log(this.foldersCont.attachFolder);
            this.stepOneActive(); // прогрессбар
            axios({url: API_URL + '/categoryattach/' + categoryId ,method: 'DELETE' })
              .then(resp => {
                const error = resp.data.error;
                this.stepLastActive(); // прогрессбар
                if(error){
                  let errorTxt = resp.data.data.msgClient;
                  this.setErrorAlertShow(true);
                  this.setErrorAlertMsg('Ошибка при отвязывании категории: ' + errorTxt);
                }else{
                  //this.$delete(this.foldersCont.catalogFolder.rootCatalogFolders, categoryIndex);
                  let usedCategories = this.getParentsCategoryId();
                  console.log('parents categories ------------->',usedCategories);
                  let updateCategory;
                  for(let ind = 0; ind<usedCategories.length; ind++) {
                    updateCategory = this.getCategoryById(+usedCategories[ind].id);
                    updateCategory.then(
                      result => { // всё ок
                        // сохраняем вложенность
                        result.lvlFolder = this.foldersCont.catalogFolder.rootCatalogFolders[usedCategories[ind].index].lvlFolder;
                        // обновляем текущую категорию
                        this.$set(this.foldersCont.catalogFolder.rootCatalogFolders, usedCategories[ind].index, result);
                        //this.foldersCont.catalogFolder.rootCatalogFolders[this.foldersCont['catalogFolder'].catalogSelectedItemIndex] = result;
                        // обновляем привязанные категорию только у того выбранного
                        if (ind === 0)
                          this.$refs['attachCont'].setRootCatalogFoldersComp(result.attachedCategories);
                      },
                      error => { // всё не ок
                        console.log('error', error);
                      }
                    );
                  }
                  // Открываем папку для просмотра, если она есть в каталогах
                  let catalogArray = ['providerFolder','findResFolder'];
                  for (let catInd = 0; catInd < catalogArray.length; catInd++) {
                    if(this.foldersCont[catalogArray[catInd]].rootCatalogFolders.length > 0){
                      let newIndex = this.findCategoryIndex(this.foldersCont[catalogArray[catInd]].rootCatalogFolders, this.foldersCont.attachFolder.catalogSelectedItemCategoryId);
                      if(newIndex !== -1)
                        this.foldersCont[catalogArray[catInd]].rootCatalogFolders[newIndex].hideFolder = false;
                    }

                  }
                  // newIndex = this.findCategoryIndex(this.foldersCont['findResFolder'].rootCatalogFolders, this.foldersCont.attachFolder.catalogSelectedItemCategoryId);
                  // this.foldersCont['findResFolder'].rootCatalogFolders[newIndex].hideFolder = false;

                  // удаляем из списка компонента привязаных товаров выбранную категорию
                  this.$refs['attachCont'].removeFromRoot(this.foldersCont['attachFolder'].catalogSelectedItemIndex);
                  //this.setAttachAction('catalogFolder',this.foldersCont['catalogFolder'].catalogSelectedItemIndex);
                  this.setSuccesAlertShow(true);
                  this.setSuccesAlertMsg('Категория отвязана');
                }
              })
              .catch(err => {
                this.setErrorAlertShow(true);
                this.setErrorAlertMsg('Ошибка при отвязывании категории ');
                this.stepLastActive(); // прогрессбар
                console.log(err);
              });
          },
          // вызываем всплывашку отвязки продукта
          onRemoveAttachedProductModal(e, keyFolder){
            this.foldersCont[keyFolder].catalogSelectedItemId = e.value.id;
            this.foldersCont[keyFolder].catalogSelectedItemIndex = e.value.index;
            this.foldersCont[keyFolder].catalogSelectedItemCategoryId = e.value.catalogId;
            if(+this.foldersCont[keyFolder].catalogSelectedItemId !== 0){
              let categoryName = e.value.name;
              this.remoteTextLabel = 'Вы действительно хотите отвязать продукт - "' +  categoryName + '"?';
              $('#confirmDeAttachProductModal').modal();
            }else{
              this.setErrorAlertShow(true);
              this.setErrorAlertMsg('Вы не выбрали привязанный продукт');
            }
          },
          removeAttachedProduct(){
            // todocomplete: проверить работоспособность кода
            let activeTab = this.getActiveTab();
            let categoryId = this.foldersCont.attachProducts.catalogSelectedItemId;
            console.log(this.foldersCont.attachProducts);
            this.stepOneActive(); // прогрессбар
            axios({url: API_URL + '/productattach/' + categoryId ,method: 'DELETE' })
              .then(resp => {
                const error = resp.data.error;
                this.stepLastActive(); // прогрессбар
                if(error){
                  let errorTxt = resp.data.data.msgClient;
                  this.setErrorAlertShow(true);
                  this.setErrorAlertMsg('Ошибка при отвязывании продукта: ' + errorTxt);
                }else{
                  //this.$delete(this.foldersCont.catalogFolder.rootCatalogFolders, categoryIndex);
                  let usedCategories = this.getParentsCategoryId();
                  console.log('parents categories ------------->',usedCategories);
                  let updateCategory;
                  for(let ind = 0; ind<usedCategories.length; ind++) {
                    updateCategory = this.getCategoryById(+usedCategories[ind].id);
                    updateCategory.then(
                      result => { // всё ок
                        // сохраняем вложенность
                        result.lvlFolder = this.foldersCont.catalogFolder.rootCatalogFolders[usedCategories[ind].index].lvlFolder;
                        this.$set(this.foldersCont.catalogFolder.rootCatalogFolders, usedCategories[ind].index, result);
                        //this.foldersCont.catalogFolder.rootCatalogFolders[this.foldersCont['catalogFolder'].catalogSelectedItemIndex] = result;
                        if(ind === 0)
                          this.$refs['attachProd'].setRootCatalogFoldersComp(result.attachedProducts);
                        // let catalogKey = '';
                        // if(this.tabValue == 'provider')
                        //   catalogKey = 'providerFolder';
                        // else if(this.tabValue == 'find')
                        //   catalogKey = 'findResFolder';
                        //
                        // let newIndex = this.findCategoryIndex(this.foldersCont[catalogKey].rootCatalogFolders, this.foldersCont.attachFolder.catalogSelectedItemCategoryId);
                        // console.log('newIndex ',newIndex);
                        // this.foldersCont[catalogKey].rootCatalogFolders[newIndex].hideFolder = false;
                      },
                      error => { // всё не ок
                        console.log('error', error);
                      }
                    );
                  }

                  // удаляем из списка компонента привязаных товаров выбранную категорию
                  //this.$refs['attachCont'].removeFromRoot(this.foldersCont['attachFolder'].catalogSelectedItemIndex);
                  //this.setAttachAction('catalogFolder',this.foldersCont['catalogFolder'].catalogSelectedItemIndex);
                  this.setSuccesAlertShow(true);
                  this.setSuccesAlertMsg('Продукт отвязан');
                }
              })
              .catch(err => {
                this.setErrorAlertShow(true);
                this.setErrorAlertMsg('Ошибка при отвязывании категории ');
                this.stepLastActive(); // прогрессбар
                console.log(err);
              });
          },
          //поиск среди папок по подстроке
          findFolder(){
            console.log('Поиск по подстроке - ', this.findFolderStr);
            let payload = {
              text: this.findFolderStr,
              catalog_id: this.selectedFind.id || null
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
          //Event handler: клик по хлебным крошкам
          onBreadItemClicked(e){
            console.log('catalog id is ==== ', e.value);
          },
          // создание нового каталога/папки из контекстного меню
          contextCreatedNewCatalog(event){
            let categoryName = event.value.input[0].value;  // название каталога
            this.inputsAddArr[0].value = '';  // очищаем поля инпутов
            this.inputsAddArr[0].isValid = false;  // очищаем поля инпутов
            this.createNewCatalog(categoryName);
          },
          // удаление категории из пользовательского каталога
          contextRemoveCatalog(){
            let categoryId = this.foldersCont.catalogFolder.catalogSelectedItemId;
            let categoryIndex = this.foldersCont.catalogFolder.catalogSelectedItemIndex;
            this.stepOneActive(); // прогрессбар
            axios({url: API_URL + '/category/' + categoryId ,method: 'DELETE' })
              .then(resp => {
                const error = resp.data.error;
                this.stepLastActive(); // прогрессбар
                if(error){
                  let errorTxt = resp.data.data.msgClient;
                  this.setErrorAlertShow(true);
                  this.setErrorAlertMsg('Ошибка при удалении категории: ' + errorTxt);
                }else{
                  //this.$delete(this.foldersCont.catalogFolder.rootCatalogFolders, categoryIndex);
                  this.updateFolderCont(null, null, null, this.currentCatalogId, 'catalogFolder', 'catalogFolder');
                  this.setSuccesAlertShow(true);
                  this.setSuccesAlertMsg('Категория удалёна');

                }
              })
              .catch(err => {
                this.setErrorAlertShow(true);
                this.setErrorAlertMsg('Ошибка при удалении категории ');
                this.stepLastActive(); // прогрессбар
                console.log(err);
              });
          },
          // создание нового каталога/папки
          createNewCatalog(catalogName){
            // добавляем категория к нашему каталогу, проверяем если не выбранны в колонке слева категории, то добавляем
            // в корневую папку и родительскую категорию не ставим, иначе ставим
            console.log('create new catalog', catalogName);
            let payload = {
              name: catalogName,
              parentId: 0,
              catalogId: this.currentCatalogId,
            };
            if(+this.foldersCont.catalogFolder.catalogSelectedItemId !== 0){
              payload.parentId = +this.foldersCont.catalogFolder.catalogSelectedItemId;
            }
            this.stepOneActive(); // прогрессбар
            axios({url: API_URL + '/category', data: payload, method: 'POST' })
              .then(resp => {
                const error = resp.data.error;
                console.log(resp);
                this.stepLastActive(); // прогрессбар
                if(error){
                  let errorTxt = resp.data.data.msgClient;
                  this.setErrorAlertShow(true);
                  this.setErrorAlertMsg('Ошибка при добавлении категории: ' + errorTxt);
                }else{
                  this.setSuccesAlertShow(true);
                  this.setSuccesAlertMsg('Категория добавлена');
                  this.updateFolderCont(null, null, null, this.currentCatalogId, 'catalogFolder', 'catalogFolder');
                }
              })
              .catch(err => {
                this.setErrorAlertShow(true);
                this.setErrorAlertMsg('Ошибка при добавлении категории ');
                this.stepLastActive(); // прогрессбар
                console.log(err);
              });
            //заглушка, вставляем папку с сервера
            //this.foldersCont.catalogFolder.rootCatalogFolders.push(new singleFolder({}));
            //this.$refs['catalogFolder'].setRootCatalogFoldersComp(this.foldersCont.catalogFolder.rootCatalogFolders);
          },
          //Event handler: скрыть не в наличии
          onHideNotOwned(value){
            //todocomplete: переключатель 'скрыть не в наличии', сейчас никак  не обрабатывается, доделать
            this.hideNotAvl = value;
            //this.notUserCreatedFoldersInit();
            this.onChangeProvider(this.selectedProvider);
            this.updateFolderCont(null, null, null, this.currentCatalogId, 'catalogFolder', 'catalogFolder');
            this.$refs['productsCatalog'].getProducts(this.foldersCont.catalogFolder.catalogSelectedItemId);
          },
          //изменение значения setRootCatalogFoldersComp(массив папок), у дочернего компонента по ссылке ref
          updateFolderCont(idCategory, lvlFolder, parentFolderId, selectedProvider, folderKey, componentRefKey){
            // todo: переделать вызов параметров на объект
            //folderKey - ключ папки в foldersCont
            // componentRefKey - ссылка на компонент,
            if(!folderKey || !componentRefKey){
              console.error('folderKey && componentRefKey - обязательные параметры');
            } else {
              let payload = {
                lvlFolder: lvlFolder || null, // уровень вложенности
                id: idCategory || '', // ид папки
                supplier_id: selectedProvider || '', // поставщик(если есть), если не указан, то приходят категории от всех каталогов
                parentFolderId: parentFolderId || '0' // ид родительской папки, вроде не используется, надо сделать ревью
              };
              console.log('Req pay --', payload);
              let categoryRequest = this.$refs[componentRefKey].requestCategory(+payload.id, payload.lvlFolder, payload.parentFolderId, +selectedProvider, this.hideNotAvl);
              categoryRequest.then(
                result => { // всё ок
                  console.log('categoryRequest result -->>', result);
                  this.foldersCont[folderKey].rootCatalogFolders = result.catalogFolders;
                  //Перезаписываем значение в компоненте
                  console.log('componentRefKey -->>', componentRefKey);
                  this.$refs[componentRefKey].setRootCatalogFoldersComp(result.catalogFolders);
                },
                error =>{ // всё не ок
                  console.log('error');
                }
              );
            }
          },
          //Event handler: изменение поставщика
          onChangeProvider(newProviderObj){
            this.selectedProvider = newProviderObj;
            console.log('Провайдер изменён на: ', newProviderObj);
            //Запрос категории
            this.updateFolderCont(null, null, null, +newProviderObj.id, 'providerFolder', 'providerCont');
          },
          // Изменеие значения табов, для переключения
          tabChangeVal(newVal){
            this.tabValue = newVal;
            if(newVal === 'provider'){
              console.log('provider Tab Selected')
              // this.updateFolderCont(null, null, null, this.selectedProvider.id, 'providerFolder', 'providerCont');
            }
          },
          // инициализация вкладок с категориями и товарами не созданных с пользователем
          notUserCreatedFoldersInit(){
            //папка с поставщиком
            //this.updateFolderCont(null, null, null, null, 'providerFolder', 'providerCont');
            //папка с результатами поиска
            //this.updateFolderCont(null, null, null, null, 'findResFolder', 'findResFolder');
          },
          //инициализация всех папок/категорий
          allFoldersInit(){
            this.notUserCreatedFoldersInit();
            //папка каталога пользователя
            //todocomplete: будет новый метод на беке,
            this.updateFolderCont(null, null, null, this.currentCatalogId, 'catalogFolder', 'catalogFolder');

          },
          // фильтр поставщиков для алминистраторов
          providerFilter(providerList){
            return providerList.filter( value => value.id < 6 );
          },
          //запрос списка поставщиков
          getProvider(){
            this.stepOneActive(); // прогрессбар
            axios.get( API_URL + '/catalog', {
              params: {},
            }).then(resp => {
                const error = resp.data.error;
                if(error){
                  let errorTxt = resp.data.data.msgClient;
                  this.setErrorAlertShow(true);
                  this.setErrorAlertMsg('Ошибка при запросе каталогов: ' + errorTxt);
                }else {
                  // todocomplete: фильтровать данные для администраторов
                  console.log('filtermassive',resp.data.data);
                  if(this.userRole.id === USER_ADMIN)
                    this.providerList = this.providerFilter(resp.data.data);
                  else
                    this.providerList = resp.data.data;

                  //this.providerList = resp.data.data;
                  this.providerList.push({catalogName: 'Все каталоги', id: ''});
                  //todo: при изменении провайдера вызывать!!??
                  //this.selectedProvider = this.providerList[this.providerList.length-1]
                }
                this.stepLastActive(); // прогрессбар
              })
              .catch(err => {
                this.setErrorAlertShow(true);
                this.setErrorAlertMsg('Ошибка при запросе каталогов');
                this.stepLastActive(); // прогрессбар
              });
          },
          //Добавить папку/категорию в каталог/категорию показать всплывашку
          onAddCatalogFolder(){
            $('#confirmAddModal').modal();
          },
          //Удалить папку категорию - показываем всплывашку
          onRemoveCatalogFolder(){
            if(+this.foldersCont.catalogFolder.catalogSelectedItemId !== 0){
              console.log(this.foldersCont.catalogFolder.rootCatalogFolders[this.foldersCont.catalogFolder.catalogSelectedItemIndex]);
              let categoryName = this.foldersCont.catalogFolder.rootCatalogFolders[this.foldersCont.catalogFolder.catalogSelectedItemIndex].name;
              this.remoteTextLabel = 'Вы действительно хотите удалить категорию - "' +  categoryName + '"?';
              $('#confirmDeleteModal').modal();
            }else{
              this.setErrorAlertShow(true);
              this.setErrorAlertMsg('Вы не выбрали категорию в пользовательском каталоге');
            }
          },
          // возвращает активную вкладку
          getActiveTab(){
            if(this.tabValue == 'provider')
              return {  obj: this.foldersCont.providerFolder,
                        selectedId: +this.foldersCont.providerFolder.catalogSelectedItemId,
                        selectedIndex: this.foldersCont.providerFolder.catalogSelectedItemIndex,
              };
            else if(this.tabValue == 'find')
              return {  obj: this.foldersCont.findResFolder,
                        selectedId: +this.foldersCont.findResFolder.catalogSelectedItemId,
                        selectedIndex: this.foldersCont.findResFolder.catalogSelectedItemIndex,
              };
            //else if(this.tabValue === 'goods')
            else
              return {  obj: {},
                selectedId: 0,
                selectedIndex: 0,
              };
          },
          // получить категорию по Ид
          getCategoryById(categoryId){
            return new Promise((resolve, reject) => {
              axios({url: API_URL + '/category/' + categoryId, data: {}, method: 'GET' })
                .then(resp => {
                  const error = resp.data.error;
                  console.log('resp.error',resp.data.error);
                  this.stepLastActive(); // прогрессбар
                  if(error){
                    reject(resp.data.data);
                    let errorTxt = resp.data.data.msgClient;
                    this.setErrorAlertShow(true);
                    this.setErrorAlertMsg('Ошибка при обновлении категории: ' + errorTxt);
                  }else{
                    resolve(resp.data.data);
                  }
                })
                .catch(err => {
                  this.setErrorAlertShow(true);
                  this.setErrorAlertMsg('Ошибка при обновлении категории');
                  this.stepLastActive(); // прогрессбар
                  reject(err);
                });
            });
          },
          // ищет все родительские категории в ползьзовательском каталоге
          getParentsCategoryId(){
            let selected = {  id: this.foldersCont.catalogFolder.catalogSelectedItemId,
                              index: this.foldersCont.catalogFolder.catalogSelectedItemIndex
                            };
            let categoryArray = [selected];
            let indexLvlFolder = this.foldersCont.catalogFolder.rootCatalogFolders[selected.index].lvlFolder - 1;
            for(let ind = selected.index; ind >= 0 || indexLvlFolder === 0; ind--){
              if(indexLvlFolder === this.foldersCont.catalogFolder.rootCatalogFolders[ind].lvlFolder){
                console.log('find parent');
                categoryArray.push({id :this.foldersCont.catalogFolder.rootCatalogFolders[ind].folderId,
                                    index: ind
                                  });
                indexLvlFolder--;
              }
            }
            return categoryArray;
          },
          // Привязка категорий
          onAttachFolderToCategory(){
            let activeTab = this.getActiveTab();
            let catalogCategory = {
              selectedId: +this.foldersCont.catalogFolder.catalogSelectedItemId,
              selectedIndex: this.foldersCont.catalogFolder.catalogSelectedItemIndex
            };
            //console.log(activeTab,catalogCategory);
            if (catalogCategory.selectedId) {
              if (activeTab.selectedId) {
                let payload = {
                  category_id: catalogCategory.selectedId,
                  attached_category_id: activeTab.selectedId
                };
                this.stepOneActive(); // прогрессбар
                axios({url: API_URL + '/categoryattach', data: payload, method: 'POST' })
                  .then(resp => {
                    const error = resp.data.error;
                    console.log(resp);
                    this.stepLastActive(); // прогрессбар
                    if(error){
                      let errorTxt = resp.data.data.msgClient;
                      this.setErrorAlertShow(true);
                      this.setErrorAlertMsg('Ошибка при привязке категорий: ' + errorTxt);
                    }else{
                      this.setSuccesAlertShow(true);
                      this.setSuccesAlertMsg('Категории привязаны');
                      let currentFolder = activeTab.obj.rootCatalogFolders[activeTab.selectedIndex];
                      currentFolder.hideFolder = true;
                      if(currentFolder.isOpen){
                        for (let ind = 1; ind <= currentFolder.childCount; ind++){
                          activeTab.obj.rootCatalogFolders[activeTab.selectedIndex+ind].hideFolder = true;
                        }
                      }
                      //this.updateFolderCont(null, null, null, this.currentCatalogId, 'catalogFolder', 'catalogFolder');
                      let usedCategories = this.getParentsCategoryId();
                      console.log('parents categories ------------->',usedCategories);
                      let updateCategory;
                      for(let ind = 0; ind<usedCategories.length; ind++){
                        // обновляем список привязанных категорий у выбранного id
                        updateCategory = this.getCategoryById(+usedCategories[ind].id);
                        updateCategory.then(
                          result => { // всё ок
                            // сохраняем вложенность
                            result.lvlFolder = this.foldersCont.catalogFolder.rootCatalogFolders[usedCategories[ind].index].lvlFolder;
                            this.$set(this.foldersCont.catalogFolder.rootCatalogFolders,usedCategories[ind].index,result);
                            //this.foldersCont.catalogFolder.rootCatalogFolders[this.foldersCont['catalogFolder'].catalogSelectedItemIndex] = result;
                            if (ind === 0)
                              this.$refs['attachCont'].setRootCatalogFoldersComp(result.attachedCategories);
                          },
                          error =>{ // всё не ок
                            console.log('error', error);
                          }
                        );
                      }


                    }
                  })
                  .catch(err => {
                    this.setErrorAlertShow(true);
                    this.setErrorAlertMsg('Ошибка при привязке категорий');
                    this.stepLastActive(); // прогрессбар
                    console.log(err);
                  });
              }
              else {
                this.setErrorAlertShow(true);
                this.setErrorAlertMsg('Не выбрана категория в каталоге производителей');
              }
            }
            else{
              this.setErrorAlertShow(true);
              this.setErrorAlertMsg('Не выбрана категория в пользовательском каталоге');
            }
            console.log('attach to category');
          },
          // Привязка продуктов к категории
          onAttachProductToCategory(){
            let catalogCategory = {
              selectedId: +this.foldersCont.catalogFolder.catalogSelectedItemId,
              selectedIndex: this.foldersCont.catalogFolder.catalogSelectedItemIndex
            };
            if (catalogCategory.selectedId) {
              if (this.categoryGoods.productSelectedId) {
                let payload = {
                   category_id: catalogCategory.selectedId,
                   attached_product_id: this.categoryGoods.productSelectedId  // параметры для отправки на сервер
                };
                console.log(payload);
                this.stepOneActive(); // прогрессбар
                axios({url: API_URL + '/productattach', data: payload, method: 'POST' })
                  .then(resp => {
                    const error = resp.data.error;
                    console.log(resp);
                    this.stepLastActive(); // прогрессбар
                    if(error){
                      let errorTxt = resp.data.data.msgClient;
                      this.setErrorAlertShow(true);
                      this.setErrorAlertMsg('Ошибка при привязке продукта: ' + errorTxt);
                    }else{
                      this.setSuccesAlertShow(true);
                      this.setSuccesAlertMsg('Продукт привязан');
                      //activeTab.obj.rootCatalogFolders[activeTab.selectedIndex].hideFolder = true;
                      //this.updateFolderCont(null, null, null, this.currentCatalogId, 'catalogFolder', 'catalogFolder');
                      let usedCategories = this.getParentsCategoryId();
                      console.log('parents categories ------------->',usedCategories);
                      let updateCategory;
                      for(let ind = 0; ind<usedCategories.length; ind++) {
                        // обновляем список привязанных категорий у выбранного id
                        updateCategory = this.getCategoryById(+usedCategories[ind].id);
                        updateCategory.then(
                          result => { // всё ок
                            // сохраняем вложенность
                            result.lvlFolder = this.foldersCont.catalogFolder.rootCatalogFolders[usedCategories[ind].index].lvlFolder;
                            this.$set(this.foldersCont.catalogFolder.rootCatalogFolders, usedCategories[ind].index, result);
                            //this.foldersCont.catalogFolder.rootCatalogFolders[this.foldersCont['catalogFolder'].catalogSelectedItemIndex] = result;
                            if (ind === 0)
                              this.$refs['attachProd'].setRootCatalogFoldersComp(result.attachedProducts);
                          },
                          error => { // всё не ок
                            console.log('error', error);
                          }
                        );
                      }
                    }
                  })
                  .catch(err => {
                    this.setErrorAlertShow(true);
                    this.setErrorAlertMsg('Ошибка при привязке продукта');
                    this.stepLastActive(); // прогрессбар
                    console.log(err);
                  });
              }
              else {
                this.setErrorAlertShow(true);
                this.setErrorAlertMsg('Не выбрана категория в каталоге товаров');
              }
            }
            else{
              this.setErrorAlertShow(true);
              this.setErrorAlertMsg('Не выбрана категория в пользовательском каталоге');
            }
            console.log('attach to product category');
          },
          //поиск среди папок
          onFindGoods(){
            console.log('Поиск по подстроке - ', this.categoryGoods.findGoodsStr);
            this.stepOneActive(); // прогрессбар
            this.$refs['productsCatalog'].findGoods(this.categoryGoods.findGoodsStr);
            this.stepLastActive(); // прогрессбар
          },
          // изменяем текущую страницу
          onGoodsPageChange(e){
            this.categoryGoods.offset = e.value.currentPage;
            //this.$refs['productsCatalog'].findGoods(this.categoryGoods.findGoodsStr);
          },
          // возвращаем количество старниц для пагинации
          onUpdatePagination(e){
            this.categoryGoods.pagination.countPage = e;
          },
          // получаем информацию по текущему пользовательскому каталогу
          getMyCatalogInfo(){
            this.stepOneActive(); // прогрессбар
            axios.get( API_URL + '/catalog/' + this.currentCatalogId, {
              params: {
              },
            })
              .then(resp => {
              const error = resp.data.error;
              if(error){
                let errorTxt = resp.data.data.msgClient;
                this.setErrorAlertShow(true);
                this.setErrorAlertMsg('Ошибка при запросе информации о каталоге: ' + errorTxt);
              }else{
                console.log(resp.data.data);
                this.paramsFolder = resp.data.data;
                this.foldersCont.catalogFolder.folderH = this.paramsFolder.catalogName;
                this.foldersCont.catalogFolder.lastUpdateTxt = 'Последнее изменение ' + this.paramsFolder.lastUpdate;
              }
              this.stepLastActive(); // прогрессбар
              })
              .catch(err => {
                this.setErrorAlertShow(true);
                this.setErrorAlertMsg('Ошибка при запросе информации о каталоге');
                this.stepLastActive(); // прогрессбар
              });
          },
          // показываем вкладку "параметры каталога"
          onShowParamFolder(){

          },
          // показываем товары отпределенной категориии
          onCatalogShowGoods(){
            let catalogCategory = {
              selectedId: +this.foldersCont.catalogFolder.catalogSelectedItemId,
              selectedIndex: this.foldersCont.catalogFolder.catalogSelectedItemIndex
            };
            if (catalogCategory.selectedId) {
              this.categoryGoods.categoryId = catalogCategory.selectedId;
              this.categoryGoods.selectedTitle = this.foldersCont.catalogFolder.rootCatalogFolders[catalogCategory.selectedIndex].name;
              console.log('onCatalogShowGoods');
              this.$refs['productsCatalog'].getProducts(catalogCategory.selectedId);
              this.tabChangeVal('goods');
            }
          },
          onTabShowGoods(){
            let activeTab = this.getActiveTab();
            if (activeTab.selectedId) {
              this.categoryGoods.categoryId = activeTab.selectedId;
              this.categoryGoods.selectedTitle = activeTab.obj.rootCatalogFolders[activeTab.selectedIndex].name;
              console.log('onTabShowGoods');
              this.$refs['productsCatalog'].getProducts(activeTab.selectedId,);
              this.tabChangeVal('goods');
            }
          },
          // подгрузка списка пользователей с сервера
          initUserList(){
            // если пользователь не суперадмин, то не запрашивать каталог

            this.stepOneActive(); // прогрессбар
            axios({url: API_URL + '/user', method: 'GET' })
              .then(resp => {
                const error = resp.data.error;
                this.stepLastActive(); // прогрессбар
                if(error){
                  let errorTxt = resp.data.data.msgClient;
                  this.setErrorAlertShow(true);
                  this.setErrorAlertMsg('Ошибка при получении списка пользователей: ' + errorTxt);
                }else{
                  //let currentUserList = resp.data.data;
                  if (this.userRole.id === USER_ADMIN)
                    this.userList = resp.data.data;
                  console.log('condition',this.userRole.id === USER_ADMIN);
                  console.log('userList',resp.data.data);
                }
              })
              .catch(err => {
                this.setErrorAlertShow(true);
                this.setErrorAlertMsg('Ошибка при получении списка каталогов');
                this.stepLastActive(); // прогрессбар
                console.log(err);
              });
          },
          // методы для изменения параметров каталога
          onConfigToogle(){
            this.paramsFolder.showConfig = !this.paramsFolder.showConfig;
          },
          onSwitchToogle(){
            this.paramsFolder.switcherActive = !this.paramsFolder.switcherActive;
            this.falseCatalogSave();
          },
          onIsOnToogle(){},
          onChangeDescr(e){
            this.paramsFolder.description = e.value;
            this.falseCatalogSave();
          },
          onChangeSelect(event){
            this.paramsFolder.selectedUsers = event.value;
            this.falseCatalogSave();
          },
          onOpenRemoveCatalogWindow(){},
          onSaveCatalog(){
            if(this.paramsFolder.catalogSaved){
              this.setSuccesAlertShow(true);
              this.setSuccesAlertMsg('Каталог сохранён');
            }else {
              let payload = this.paramsFolder;
              let catalogIndex = this.paramsFolder.id;
              this.stepOneActive(); // прогрессбар
              axios({url: API_URL + '/catalog/' +  catalogIndex, data: payload, method: 'PUT' })
                .then(resp => {
                  const error = resp.data.error;
                  this.stepLastActive(); // прогрессбар
                  if(error){
                    let errorTxt = resp.data.data.msgClient;
                    this.setErrorAlertShow(true);
                    this.setErrorAlertMsg('Ошибка при сохранении каталога: ' + errorTxt);
                  }else {
                    this.paramsFolder.catalogSaved = true;
                    this.setSuccesAlertShow(true);
                    this.setSuccesAlertMsg('Каталог сохранён');
                  }
                })
                .catch(err => {
                  this.setErrorAlertShow(true);
                  this.setErrorAlertMsg('Ошибка при сохранении каталога');
                  this.stepLastActive(); // прогрессбар
                  console.log(err);
                });
            }
          },
          falseCatalogSave(index){
            this.paramsFolder.catalogSaved = false;
          },
        },
        mounted(){
          this.getProvider();
          this.allFoldersInit();
          this.getMyCatalogInfo();
          this.initUserList();
        }
    }
</script>

<style lang="sass">
    /*@import 'assets/sass/main.sass';*/
    @import '../../node_modules/vue2-dropzone/dist/vue2Dropzone.min.css'

</style>
