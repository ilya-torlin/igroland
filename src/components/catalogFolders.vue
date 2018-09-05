<!--Каталог с папками (панель слева)-->
<template>
    <!--catalogFolders.vue-->

    <!--
      todocomplete: скрывать/удалять папку после привязки
    -->

  <!--
    Логика работы компонента ↓↓↓
      Данные
        Есть временное хранилище rootCatalogFoldersComp, которое перезаписывается при помощи метода this.setFolders()
        Основное хранилище хранится в родительском компоненте
      Первоначальная инициализация
        Данные для папок запрашиваются в родительском компоненте, prop rootCatalogFolders
      Примерная логика работы открытия/закрытия папок
        Весь каталог представляет из себя обычный массив, БЕЗ ВЛОЖЕННОСТИ
        Изначально запрашиваются каталоги(далее папки) всех поставщиков
        При нажатии на значок расскрытия папки
          На сервер отправляется запрос, используя метод this.requestCategory(...params); данный метод возвращает promise и папки соответствующей категории(на которую кликнули)
          Если запрос успешен, то после родительской папки в массив добавляются новые папки, и перерасчитывается колличество папок-потомков (необходимо для удаления)
          Учитывайте, что есть несколько уровней вложенности, и у всех родителей необходимо пересчитать кол-во потомков... аналогично и с удалением
          !!!ВАЖНО Вызываем метод this.setFolders(), если вы изменили rootCatalogFoldersComp
        При нажатии на значок Закрытия папки
          Аналогичная ситуация что и с добавлением, в коде есть комментарии
  -->

  <!--
    todocomplete: in left sidebar, create default empty folder... after attach event, upload this folder
    todocomplete: breadcrumbs left sidebar
  -->

  <div class=" catalog-folder white-bg" :class="{'side-catalog-f': sideFolder}" >
    <div class="bb">
      <div class="folder-h" v-show="folderH">
        <div class="title-h" @click="setSelectRoot">
          {{folderH}}
        </div>
      </div>
      <div class="folder-b">
        <div class="folder-c" :class="{'containerPending':folderPending}">
          <ul class="folder-list folder-list-main" v-if="rootCatalogFoldersComp.length > 0">
            <li v-for="(catFolder, index) in rootCatalogFoldersComp"
                @click="setSelectItem(catFolder, index)"
                :class="[ {'is-active' : catFolder.isOpen }, {'isActive' : (catFolder.folderId == selectedItemObjectId)} ]"
                :style="{'paddingLeft': catFolder.lvlFolder * 28 + 'px'}"
                v-if="!catFolder.hideFolder"
            >
              <!--:key - параметр для сортировки-->
              <div class="folder-title" @click.right = "contextOpen($event, catFolder )" >
                <div class="folder-name ">
                  <div class="folder-controls-c">
                    <button class="btn-icon-tr" v-if="catFolder.hasFolders != 0" @click="openSubfolder(index, catFolder.folderId, catFolder.lvlFolder, index)">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="8px" height="13px">
                        <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                              d="M1.738,12.343 C1.390,12.681 0.826,12.681 0.479,12.343 C0.131,12.004 0.131,11.455 0.479,11.116 L5.116,6.601 L0.479,2.085 C0.131,1.747 0.131,1.198 0.479,0.860 C0.826,0.521 1.390,0.521 1.738,0.860 L6.986,5.970 C7.164,6.143 7.249,6.373 7.244,6.601 C7.249,6.829 7.164,7.058 6.986,7.232 L1.738,12.343 Z"/>
                      </svg>
                    </button>
                  </div>
                  <span class="dot-txt" v-for="i in catFolder.lvlFolder">
                      &#183;
                  </span>
                  {{catFolder.name}}
                </div>
                <div class="folder-controls-c">
                  <span class="badge badge-success badge-pill">{{catFolder.goodsCount}}</span>
                </div>
              </div>
            </li>
          </ul>
          <div class="empty-cat" v-else>
            Категорий не найдено
          </div>
        </div>
      </div>
    </div>
    <div class="folder-f" v-if="sideFolder">
      <div class="last-change-f" v-show="lastUpdateTxt">
        <div class="svg-c flex-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="24px" height="24px">
            <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                  d="M11.975,23.477 C5.624,23.477 0.476,18.329 0.476,11.977 C0.476,5.626 5.624,0.477 11.975,0.477 C18.327,0.477 23.476,5.626 23.476,11.977 C23.476,18.329 18.327,23.477 11.975,23.477 ZM11.975,3.477 C7.281,3.477 3.475,7.283 3.475,11.977 C3.475,16.671 7.281,20.477 11.975,20.477 C16.670,20.477 20.475,16.671 20.475,11.977 C20.475,7.283 16.670,3.477 11.975,3.477 ZM16.975,13.477 L11.975,13.477 C11.147,13.477 10.475,12.806 10.475,11.977 L10.475,6.977 C10.475,6.149 11.147,5.477 11.975,5.477 C12.804,5.477 13.476,6.149 13.476,6.977 L13.476,10.477 L16.975,10.477 C17.804,10.477 18.475,11.149 18.475,11.977 C18.475,12.806 17.804,13.477 16.975,13.477 Z"/>
          </svg>
        </div>
        <div class="discr-txt">
          {{lastUpdateTxt}}
        </div>
      </div>
    </div>
    <div class="js-context-folder context-menu-custom" v-if="contextMenu" :class="{'is-active': contextMenu.contextMenuOpen}" :style="{top: contextMenu.yPos+'px', left: contextMenu.xPos+'px' }">
      <ul>
        <li v-for=" (item, index) in contextMenu.menuOpt"
            :key="index">
          <a href="javascript:void(0)" @click="contextMenuOptEvent(item.eventName)">
            <span class="svg-c" v-if="item.iconId === 1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="16px" height="16px">
                <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                    d="M15.000,16.000 L13.000,16.000 C12.448,16.000 12.000,15.552 12.000,15.000 L12.000,13.000 C12.000,12.448 12.448,12.000 13.000,12.000 L15.000,12.000 C15.552,12.000 16.000,12.448 16.000,13.000 L16.000,15.000 C16.000,15.552 15.552,16.000 15.000,16.000 ZM15.000,10.000 L13.000,10.000 C12.448,10.000 12.000,9.552 12.000,9.000 L12.000,7.000 C12.000,6.448 12.448,6.000 13.000,6.000 L15.000,6.000 C15.552,6.000 16.000,6.448 16.000,7.000 L16.000,9.000 C16.000,9.552 15.552,10.000 15.000,10.000 ZM15.000,4.000 L13.000,4.000 C12.448,4.000 12.000,3.552 12.000,3.000 L12.000,1.000 C12.000,0.448 12.448,0.000 13.000,0.000 L15.000,0.000 C15.552,0.000 16.000,0.448 16.000,1.000 L16.000,3.000 C16.000,3.552 15.552,4.000 15.000,4.000 ZM9.000,16.000 L7.000,16.000 C6.448,16.000 6.000,15.552 6.000,15.000 L6.000,13.000 C6.000,12.448 6.448,12.000 7.000,12.000 L9.000,12.000 C9.552,12.000 10.000,12.448 10.000,13.000 L10.000,15.000 C10.000,15.552 9.552,16.000 9.000,16.000 ZM9.000,10.000 L7.000,10.000 C6.448,10.000 6.000,9.552 6.000,9.000 L6.000,7.000 C6.000,6.448 6.448,6.000 7.000,6.000 L9.000,6.000 C9.552,6.000 10.000,6.448 10.000,7.000 L10.000,9.000 C10.000,9.552 9.552,10.000 9.000,10.000 ZM9.000,4.000 L7.000,4.000 C6.448,4.000 6.000,3.552 6.000,3.000 L6.000,1.000 C6.000,0.448 6.448,0.000 7.000,0.000 L9.000,0.000 C9.552,0.000 10.000,0.448 10.000,1.000 L10.000,3.000 C10.000,3.552 9.552,4.000 9.000,4.000 ZM3.000,16.000 L1.000,16.000 C0.448,16.000 0.000,15.552 0.000,15.000 L0.000,13.000 C0.000,12.448 0.448,12.000 1.000,12.000 L3.000,12.000 C3.552,12.000 4.000,12.448 4.000,13.000 L4.000,15.000 C4.000,15.552 3.552,16.000 3.000,16.000 ZM3.000,10.000 L1.000,10.000 C0.448,10.000 0.000,9.552 0.000,9.000 L0.000,7.000 C0.000,6.448 0.448,6.000 1.000,6.000 L3.000,6.000 C3.552,6.000 4.000,6.448 4.000,7.000 L4.000,9.000 C4.000,9.552 3.552,10.000 3.000,10.000 ZM3.000,4.000 L1.000,4.000 C0.448,4.000 0.000,3.552 0.000,3.000 L0.000,1.000 C0.000,0.448 0.448,0.000 1.000,0.000 L3.000,0.000 C3.552,0.000 4.000,0.448 4.000,1.000 L4.000,3.000 C4.000,3.552 3.552,4.000 3.000,4.000 Z"/>
              </svg>
            </span>
            <span class="svg-c" v-if="item.iconId === 2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="16px" height="16px">
                <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                    d="M15.402,5.359 L12.533,8.229 C11.740,9.021 10.456,9.021 9.663,8.229 L10.752,7.139 C11.203,7.258 11.701,7.147 12.055,6.794 L13.968,4.881 C14.496,4.353 14.496,3.496 13.968,2.968 L13.011,2.011 C12.483,1.483 11.626,1.483 11.098,2.011 L9.185,3.924 C8.832,4.278 8.720,4.776 8.839,5.226 L7.750,6.316 C6.958,5.523 6.958,4.239 7.750,3.446 L10.620,0.577 C11.412,-0.216 12.697,-0.216 13.489,0.577 L15.402,2.489 C16.195,3.282 16.195,4.567 15.402,5.359 ZM5.359,10.620 C5.095,10.356 5.095,9.928 5.359,9.663 L9.663,5.359 C9.927,5.095 10.356,5.095 10.620,5.359 C10.884,5.623 10.884,6.052 10.620,6.316 L6.316,10.620 C6.051,10.884 5.623,10.884 5.359,10.620 ZM3.924,9.185 L2.011,11.098 C1.483,11.627 1.483,12.483 2.011,13.011 L2.968,13.968 C3.496,14.496 4.352,14.496 4.881,13.968 L6.794,12.055 C7.147,11.702 7.258,11.203 7.139,10.753 L8.229,9.663 C9.021,10.456 9.021,11.741 8.229,12.533 L5.359,15.402 C4.567,16.195 3.282,16.195 2.489,15.402 L0.576,13.489 C-0.216,12.697 -0.216,11.412 0.576,10.620 L3.446,7.750 C4.238,6.958 5.523,6.958 6.316,7.750 L5.226,8.840 C4.776,8.721 4.277,8.832 3.924,9.185 Z"/>
              </svg>
            </span>
            <span class="svg-c" v-if="item.iconId === 3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="16px" height="16px">
                <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                      d="M15.333,9.334 L13.833,9.334 C13.681,9.998 13.409,10.613 13.059,11.174 L14.128,12.243 C14.389,12.503 14.389,12.925 14.128,13.186 L13.185,14.129 C12.925,14.389 12.503,14.389 12.243,14.129 L11.179,13.065 C10.618,13.420 10.002,13.695 9.333,13.847 L9.333,15.334 C9.333,15.702 9.035,16.000 8.667,16.000 L7.333,16.000 C6.965,16.000 6.667,15.702 6.667,15.334 L6.667,13.847 C5.998,13.695 5.382,13.420 4.821,13.065 L3.757,14.129 C3.497,14.389 3.075,14.389 2.815,14.129 L1.872,13.186 C1.611,12.925 1.611,12.503 1.872,12.243 L2.941,11.174 C2.591,10.613 2.319,9.998 2.167,9.334 L0.667,9.334 C0.299,9.334 0.000,9.035 0.000,8.667 L0.000,7.334 C0.000,6.966 0.299,6.667 0.667,6.667 L2.167,6.667 C2.319,6.003 2.591,5.388 2.941,4.828 L1.872,3.758 C1.611,3.497 1.611,3.075 1.872,2.815 L2.815,1.872 C3.075,1.612 3.497,1.612 3.757,1.872 L4.821,2.936 C5.382,2.581 5.998,2.306 6.667,2.154 L6.667,0.667 C6.667,0.299 6.965,0.000 7.333,0.000 L8.667,0.000 C9.035,0.000 9.333,0.299 9.333,0.667 L9.333,2.154 C10.002,2.306 10.618,2.581 11.179,2.936 L12.243,1.872 C12.503,1.612 12.925,1.612 13.185,1.872 L14.128,2.815 C14.389,3.075 14.389,3.497 14.128,3.758 L13.059,4.828 C13.409,5.388 13.681,6.003 13.833,6.667 L15.333,6.667 C15.702,6.667 16.000,6.966 16.000,7.334 L16.000,8.667 C16.000,9.035 15.702,9.334 15.333,9.334 ZM8.000,4.001 C5.791,4.001 4.000,5.791 4.000,8.000 C4.000,10.210 5.791,12.000 8.000,12.000 C10.209,12.000 12.000,10.210 12.000,8.000 C12.000,5.791 10.209,4.001 8.000,4.001 ZM8.000,10.001 C6.896,10.001 6.000,9.105 6.000,8.000 C6.000,6.896 6.896,6.000 8.000,6.000 C9.105,6.000 10.000,6.896 10.000,8.000 C10.000,9.105 9.105,10.001 8.000,10.001 Z"/>
              </svg>
            </span>
            <span class="svg-c" v-if="item.iconId === 4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="16px" height="16px">
                <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                    d="M14.957,9.044 L9.043,9.044 L9.043,14.957 C9.043,15.533 8.576,16.000 8.000,16.000 C7.424,16.000 6.957,15.533 6.957,14.957 L6.957,9.044 L1.043,9.044 C0.467,9.044 -0.000,8.576 -0.000,8.000 C-0.000,7.424 0.467,6.957 1.043,6.957 L6.957,6.957 L6.957,1.044 C6.957,0.467 7.424,0.000 8.000,0.000 C8.576,0.000 9.043,0.467 9.043,1.044 L9.043,6.957 L14.957,6.957 C15.533,6.957 16.000,7.424 16.000,8.000 C16.000,8.576 15.533,9.044 14.957,9.044 Z"/>
              </svg>
            </span>
            <span class="svg-c" v-if="item.iconId === 5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="16px" height="18px">
                <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                    d="M14.909,6.000 L13.818,6.000 L13.818,16.875 C13.818,17.497 13.330,18.000 12.727,18.000 L3.273,18.000 C2.670,18.000 2.182,17.497 2.182,16.875 L2.182,6.000 L1.091,6.000 C0.488,6.000 0.000,5.497 0.000,4.875 C0.000,4.254 0.488,3.750 1.091,3.750 L3.273,3.750 L4.364,3.750 C4.364,1.679 5.992,0.000 8.000,0.000 C10.008,0.000 11.636,1.679 11.636,3.750 L12.727,3.750 L14.909,3.750 C15.512,3.750 16.000,4.254 16.000,4.875 C16.000,5.497 15.512,6.000 14.909,6.000 ZM7.273,15.750 L8.727,15.750 L8.727,6.750 L7.273,6.750 L7.273,15.750 ZM4.364,6.750 L4.364,15.750 L5.818,15.750 L5.818,6.750 L4.364,6.750 ZM8.000,1.500 C6.795,1.500 5.818,2.508 5.818,3.750 L10.182,3.750 C10.182,2.508 9.205,1.500 8.000,1.500 ZM11.636,6.750 L10.182,6.750 L10.182,15.750 L11.636,15.750 L11.636,6.750 Z"/>
              </svg>
            </span>
            {{item.title}}
          </a>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import {API_URL} from '../constants';
  import axios from 'axios';
  import {mapActions} from 'vuex';
  import {mapMutations} from 'vuex';
  import singleFolder from '../modules/singleFolder'


    export default {
        name: 'catalogFolders',
        data () {
          return {
            rootCatalogFoldersComp: //каталог
              [
                /*{
                  childCount: 0, // колличество потомков в 'открытой' папке
                  folderId: '123321', //уникальный ид папки
                  name: 'Велосипед', // Имя папки
                  goodsCount: 181, // количество товаров в папке
                  lvlFolder: 0, // Уровень папки, 0 - папка в корне
                  isOpen: false, // Открыть ли каталог (для фронтенда)
                  hasFolders: false,// есть вложенный каталог
                  hideFolder: false,// скрыть папку
                  supplier_id: "1", //ид поставщика
                  --folderArr: [ // храниться массив подпапок
                  ],
                  --wasDeleted
                  --wasOpened
                  --key: '1',
                }*/
              ],
            folderPending: false, // true, пока идёт запрос на подгрузку папок
            selectedItemObjectId: 0,
            selectedItemObjectIndex: 0, //
          }
        },
        computed: {
        },
        methods: {
          ...mapActions('alerts',{
            setErrorAlertMsg: 'setErrorAlertMsg',
            setSuccessAlertMsg: 'setSuccessAlertMsg',
          }),
          ...mapMutations('progress',{
            setProgStateWidth: 'setProgStateWidth',
            setProgShow: 'setProgShow',
            stepOneActive: 'stepOneActive',
            stepTwoActive: 'stepTwoActive',
            stepLastActive: 'stepLastActive',
          }),
          //перезапись массива каталога, используется в родительском компоненте
          setRootCatalogFoldersComp(value){
            this.rootCatalogFoldersComp = value;
          },
          //отправка ивента, при нажатии на пункт в контекстном меню
          contextMenuOptEvent(eventName){
            this.$emit(eventName);
          },
          //открытие контекстного меню, расчёт координат
          contextOpen(e, val){
              this.contextMenu.xPos = e.clientX;
              this.contextMenu.yPos = e.clientY;
              this.contextMenu.contextMenuOpen = true;
              this.contextMenu.selectedFolder  = val;
              e.preventDefault();
          },
          // запрос категории/каталога по ид, возвращает промис
          requestCategory(idCategory, lvlFolder, parentFolderId, selectedProvider, hideNotAvl){
            //после вызова в promise вызывать this.setFolders().. для перезаписи каталога в родительском компоненте
            return new Promise((resolve, reject) => {
              let payload = {
                // lvlFolder: lvlFolder ? lvlFolder : '',
                lvlFolder: lvlFolder, // уровень вложенности
                id: idCategory || '', // ид папки
                catalog_id: selectedProvider || '', // поставщик(если есть), если не указан, то приходят категории от всех поставщиков
                parentFolderId: parentFolderId || '0', // ид родительской папки, вроде не используется, надо сделать ревью
                hideNotAvl: hideNotAvl || false
              };
              this.folderPending = true; // пока идёт запрос контейнер с папками блокируется
              this.stepOneActive(); // прогрессбар
              // console.log('!!!!!!payload ---------', payload);
              axios.get( API_URL + '/category', {
                  params: {
                    ...payload
                  },
                })
                .then(resp => {
                  const error = resp.data.error;
                  if(error){
                    reject(resp.data.data);
                    let errorTxt = resp.data.data.msgClient;
                    this.setErrorAlertMsg('Ошибка при запросе категории: ' + errorTxt);
                  }else{
                    resolve(resp.data.data);
                  }
                  this.stepLastActive(); // прогрессбар
                  this.folderPending = false;
                })
                .catch(err => {
                  this.folderPending = false;
                  this.setErrorAlertMsg('Ошибка при запросе категории');
                  this.stepLastActive(); // прогрессбар
                  reject(err);
                });

            });
          },
          //открытие/закрытие папки
          openSubfolder(index, folderId, lvlFolder, parentFolderId){
            if(this.rootCatalogFoldersComp[index].isOpen) {
              // Удаляем все подпапки, начиная с index.. закрываем папку index
              let childCount = this.rootCatalogFoldersComp[index].childCount;
              if(this.rootCatalogFoldersComp[index].lvlFolder > 0) {
                let indexLvlFolder = this.rootCatalogFoldersComp[index].lvlFolder - 1;
                for(let ind = index; ind >= 0 || indexLvlFolder === 0; ind--){ // Пока не дошли до самой первой папки, или пока не проверили последнего родителя
                  if(indexLvlFolder === this.rootCatalogFoldersComp[ind].lvlFolder){ //нашли родителя в текущей итерации
                    console.log('<<<----parent find ind', this.rootCatalogFoldersComp[ind]);
                    if(indexLvlFolder !== 0){ //т.к. нашли первого родителя, уменьшаем уровень вложенности для поиска следующего родителя
                      indexLvlFolder--;
                    }
                    this.rootCatalogFoldersComp[ind].childCount -= childCount;
                    if(this.rootCatalogFoldersComp[ind].lvlFolder === 0){//Дошли до корня
                      break;
                    }
                  }
                }
                //Производим удаление(скрытие) папок,
                this.rootCatalogFoldersComp.splice(index+1, childCount);
                this.rootCatalogFoldersComp[index].childCount = this.rootCatalogFoldersComp[index].childCount - childCount;
              }else {
                this.rootCatalogFoldersComp.splice(index+1, childCount);
                this.rootCatalogFoldersComp[index].childCount = this.rootCatalogFoldersComp[index].childCount - childCount;
              }

              this.rootCatalogFoldersComp[index].isOpen = false;

              this.setFolders();
            }else{
              let categoryRequest = this.requestCategory(folderId, lvlFolder, parentFolderId, this.userCatalogId, this.hideNotAvl);
              categoryRequest.then(

                result => { // всё ок
                  // фильтр каталогов с нулевыми остатками
                  let notNullArray = result.catalogFolders;
                  if (this.hideNotAvl)
                    notNullArray = result.catalogFolders.filter( (element) => +element.goodsCount > 0);
                  // console.log('!!!!!!categoryRequest SUB result ---------', result);
                  for (let item of notNullArray) {
                    // с позиции index
                    // удалить 0
                    // вставить item
                    //Изменять индекс у родителя
                    this.rootCatalogFoldersComp.splice(index+1, 0, item);
                    // this.rootCatalogFoldersComp[index].folderArr.splice(this.rootCatalogFoldersComp[index].folderArr.length, 0, index+1);
                  }

                  if(this.rootCatalogFoldersComp[index].lvlFolder > 0){
                    let indexLvlFolder = this.rootCatalogFoldersComp[index].lvlFolder - 1;
                    console.log('<<indexLvlFolder', indexLvlFolder);

                    for(let ind = index; ind >= 0 || indexLvlFolder === 0; ind--){ // Пока не дошли до самой первой папки, или пока не проверили последнего родителя
                      if(indexLvlFolder === this.rootCatalogFoldersComp[ind].lvlFolder){
                        console.log('<<<----parent find ind', this.rootCatalogFoldersComp[ind]);
                        if(indexLvlFolder !== 0){ //т.к. нашли первого родителя, уменьшаем уровень вложенности для поиска следующего родителя
                          indexLvlFolder--;
                        }
                        this.rootCatalogFoldersComp[ind].childCount += result.catalogFolders.length;
                        if(this.rootCatalogFoldersComp[ind].lvlFolder === 0){//Дошли до корня
                          break;
                        }
                      }
                    }
                    //присваиваем значение потомков папке, которую открыли
                    this.rootCatalogFoldersComp[index].childCount = this.rootCatalogFoldersComp[index].childCount + result.catalogFolders.length;
                  }else {
                    this.rootCatalogFoldersComp[index].childCount = this.rootCatalogFoldersComp[index].childCount + result.catalogFolders.length;
                  }

                  console.log('<<valueClickedFolder', this.rootCatalogFoldersComp[index]);


                  this.rootCatalogFoldersComp[index].isOpen = true; // открываем папку
                  this.setFolders();
                },
                error =>{ // всё не ок
                  console.log('error');
                }
              );

              //передаём ивент, для родительского компонента
              this.$emit('openSubfolder', {'index': index, 'folderId': folderId});
            }


          },
          //передача каталога в этом компоненте к родителю, вызывается если вы изменили rootCatalogFoldersComp
          setFolders(){
            this.$emit('setFolders', {'value': this.rootCatalogFoldersComp });
          },
          setSelectRoot(){
            this.$emit('setSelectRoot', {'value': ''});
          },
          setSelectItem(catalog, index){
            if( this.selectedItemObjectId === catalog.folderId && this.selectedItemObjectIndex === index){
              this.selectedItemObjectId = 0;
              this.selectedItemObjectIndex = 0;
              //this.setSelectRoot();
            }else{
              this.selectedItemObjectId = catalog.folderId;
              this.selectedItemObjectIndex = index;
            }
            this.$emit('setSelectedItem', {'value': {
                id : this.selectedItemObjectId,
                index : this.selectedItemObjectIndex,
                name: catalog.name,
                lvlFolder: catalog.lvlFolder
              } });
          },
        },
        props:[
          'folderH', // заголовок каталога
          'sideFolder', //боковая панель (каталог)
          'lastUpdateTxt', // Когда было произведено последнее мзменение, запрашивается в виде текста с сервера
          'contextMenu', // Контекстное меню
          'menuOpt', // пункты контекстного меню
          'rootCatalogFolders', // все папки
          'selectedProvider', //выбранный поставщик (объект {name, id})
          'selectedItemId', // выбранный каталог (по которому кликнули, выделяется желтым цветом объект id)
          'selectedItemIndex', // выбранный каталог (по которому кликнули, выделяется желтым цветом объект index)
          'userCatalogId',  // Id каталога пользователя
          'hideNotAvl'  // скрывать не в наличии
        ],
        mounted(){
            let varthis = this;
            //для закрытия меню при клике
            $(document).click(function () {
                if(!$(this).hasClass('folder-title')){
                    varthis.contextMenu.contextMenuOpen = false;
                }
            });
            /*//Запрос категории
            let categoryRequest = this.requestCategory();
            categoryRequest.then(
              result => { // всё ок
                console.log('categoryRequest result ---------', result);
                this.rootCatalogFoldersComp = result.catalogFolders;
                this.setFolders();
              },
              error =>{ // всё не ок
                console.log('error');
              }
            );*/
        }
    }
</script>

<style lang="sass">
    /*@import 'assets/sass/main.sass';*/
</style>
