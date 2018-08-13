<!--Каталог с папками (панель слева)-->
<template>
    <!--catalogFolders.vue-->

    <!--
      todo: для каталога делается запрос на сервер(отправляется ид родителя), с сервера приходят потомки
    -->

  <!--
    todo: Примерная логика работы
    todo: У любой папки есть место для вывода новой папки
    todo: при клике на развертывание папки, делается запрос на сервер с ид папки, на которую кликнули; добавить флаг, что папка была запрошена с сервера, что бы не выполнять лишние запросы
    todo: после ответа сервера новые каталоги добавляются в массив подпапок данной папки, и менять каким-то образом lvl(Уровень вложенности, возможно делать ++ к lvl вложенности родителькой папки)

    todo: при сворачивании папки
  -->

  <div class=" catalog-folder white-bg" :class="{'side-catalog-f': sideFolder}" >
    <div class="bb">
      <div class="folder-h" v-show="folderH">
        <div class="title-h">
          {{folderH}}
        </div>
      </div>
      <div class="folder-b">
        <div class="folder-c">
          <ul class="folder-list folder-list-main ">

            <!--
              todo: Убрать вложенный цикл, надо просто идти по папкам и в зависимости от lvl добавлять отступ
              todo: Подумать насчёт колизии с одинаковым ид папок (сортировка + ид), в разных папках
            -->

            <li v-for="(catFolder, key) in rootCatalogFolders"
                :class="{'is-active': catFolder.isOpen}"
                :style="{'paddingLeft': catFolder.lvlFolder * 10 + 'px'}"
                v-if="!catFolder.hideFolder"
                :key="catFolder.id"
            >
              <div class="folder-title" @click.right = "contextOpen($event)" >
                <div class="folder-name ">
                  <span class="dot-txt" v-for="i in catFolder.lvlFolder">
                      &#183;
                  </span>
                  {{key}}__{{catFolder.name}}
                </div>
                <div class="folder-controls-c">
                  <span class="badge badge-success badge-pill">{{catFolder.goodsCount}}</span>
                  <button class="btn-icon-tr" v-if="catFolder.hasFolders != 0" @click="openSubfolder(key, catFolder.folderId, catFolder.lvlFolder, key)">
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
          <a href="javascript:void(0)">
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
  import {mapGetters} from 'vuex';
  import {mapMutations} from 'vuex';

    export default {
        name: 'catalogFolders',
        data () {
          return {
            rootCatalogFolders: //корневой каталог
              {
              /*Логика:
              * Нет никакой влеженности
              * У каждой папки есть место для вывода следующего массива папок (folderArr)
              * */
                '0_0_123321': { // формат ключа lvl_sortVal_idFolder: sortVal - для сортировки значение [0, infinite], '_' - разделитель , idFolder - ид папки
                  folderId: '123321', //уникальный ид папки
                  name: 'Велосипед', // Имя папки
                  goodsCount: 181, // количество товаров в папке
                  lvlFolder: 0, // Уровень папки, 0 - папка в корне
                  isOpen: false, // Открыть ли каталог (для фронтенда)
                  hasFolders: false,// есть вложенный каталог
                  hideFolder: false,// скрыть папку
                  folderArr: [ // храниться массив подпапок
                  ]
                },
                '0_1_2324': { // формат ключа sortVal_idFolder: sortVal - для сортировки значение [0, infinite], '_' - разделитель , idFolder - ид папки
                  folderId: '2324', //уникальный ид папки
                  name: 'Самокат', // Имя папки
                  goodsCount: 102, // количество товаров в папке
                  lvlFolder: 0, // Уровень папки, 0 - папка в корне
                  isOpen: false, // Открыть ли каталог (для фронтенда)
                  hasFolders: true,// есть вложенный каталог
                  hideFolder: false,// скрыть папку
                  folderArr: [ // храниться массив подпапок
                    '1_0_7878',
                    '1_1_6676'
                  ]
                },
                //с сервера приходит lvl 0
                '1_0_7878': { // формат ключа sortVal_idFolder: sortVal - для сортировки значение [0, infinite], '_' - разделитель , idFolder - ид папки
                  folderId: '7878', //уникальный ид папки
                  name: 'Электросамокат', // Имя папки
                  goodsCount: 192, // количество товаров в папке
                  lvlFolder: 1, // Уровень папки, 0 - папка в корне
                  hasFolders: false,// есть вложенный каталог
                  hideFolder: true,//скрыть папку
                  isOpen: false, // Открыть ли каталог (для фронтенда)
                  folderArr: [ // храниться массив подпапок
                  ]
                },
                '1_1_6676': { // формат ключа sortVal_idFolder: sortVal - для сортировки значение [0, infinite], '_' - разделитель , idFolder - ид папки
                  folderId: '6676', //уникальный ид папки
                  name: 'Минисамокат', // Имя папки
                  goodsCount: 19, // количество товаров в папке
                  lvlFolder: 1, // Уровень папки, 0 - папка в корне
                  hasFolders: false,// есть вложенный каталог
                  hideFolder: true,//скрыть папку
                  isOpen: false, // Открыть ли каталог (для фронтенда)
                  folderArr: [ // храниться массив подпапок
                  ]
                },
              },
              subCatalogFolders:{ // подкаталоги
              '1_0_7878': { // формат ключа sortVal_idFolder: sortVal - для сортировки значение [0, infinite], '_' - разделитель , idFolder - ид папки
                folderId: '7878', //уникальный ид папки
                name: 'Электросамокат', // Имя папки
                goodsCount: 192, // количество товаров в папке
                lvlFolder: 1, // Уровень папки, 0 - папка в корне
                isOpen: false, // Открыть ли каталог (для фронтенда)
                folderArr: [ // храниться массив подпапок
                ]
              },
              '0_1_6676': { // формат ключа sortVal_idFolder: sortVal - для сортировки значение [0, infinite], '_' - разделитель , idFolder - ид папки
                folderId: '6676', //уникальный ид папки
                name: 'Минисамокат', // Имя папки
                goodsCount: 19, // количество товаров в папке
                lvlFolder: 1, // Уровень папки, 0 - папка в корне
                isOpen: false, // Открыть ли каталог (для фронтенда)
                folderArr: [ // храниться массив подпапок
                ]
              },
            }
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
          contextOpen(e){
              this.contextMenu.xPos = e.clientX;
              this.contextMenu.yPos = e.clientY;
              this.contextMenu.contextMenuOpen = true;

              console.log('e = ', e);
              e.preventDefault();
          },
          // открыть папку
          requestCategory(idCategory, lvlFolder, providerId, parentId){ // запрос категории/каталога по ид, возвращает промис
            return new Promise((resolve, reject) => {
              let payload = {
                // lvlFolder: lvlFolder ? lvlFolder : '',
                lvlFolder: lvlFolder,
                id: idCategory || '',
                supplier_id: providerId || '',
                parentId: parentId || '0'
              };
              console.log('!!!!!!payload ---------', payload);
                axios({url: API_URL + '/category', data: payload, method: 'GET' })
                  .then(resp => {
                    const error = resp.data.error;
                    if(error){
                      reject(resp.data.data);
                    }else {
                      resolve(resp.data.data);
                    }
                  })
                  .catch(err => {
                    reject(err);
                  });
                //http://igroland-api.praweb.ru/category?lvlFolder=0&id=33556&supplier_id=
                axios.get( API_URL + '/category', {
                    params: {
                      ...payload
                    },
                    // paramsSerializer: function(params) {
                    //   return qs.stringify(params, { indices: false })
                    // }
                  })
                  .then(resp => {
                    const error = resp.data.error;
                    if(error){
                      reject(resp.data.data);
                    }else {
                      resolve(resp.data.data);
                    }
                  })
                  .catch(err => {
                    reject(err);
                  });
            });
          },
          openSubfolder(index, folderId, lvlFolder, parentId){
            //Делаем запрос на сервер, от сервера приходит ассециативный массив с папками catalogFolders и catalogFoldersKeyArr - массив ключей
            //формат lvlFolder++_index_idCatalog, также на сервере делаем инкремент lvlFolder у папки
            //Далее проходимся по массиву с сервера и добавляем все ключи
            this.rootCatalogFolders[index].isOpen = !this.rootCatalogFolders[index].isOpen; // меняем значение, открываем/закрываем папку
            //скрываем/открываем папки-потомки // в axios, после успешного запроса

            for(let catItem of this.rootCatalogFolders[index].folderArr){
              this.rootCatalogFolders[catItem].hideFolder = !this.rootCatalogFolders[index].isOpen;
            }

            let categoryRequest = this.requestCategory(folderId, lvlFolder, '', parentId);
            categoryRequest.then(
              result => { // всё ок
                console.log('!!!!!!categoryRequest SUB result ---------', result);
                for (let key in result.catalogFolders) {
                  console.log('key in result.catalogFolders ', key );
                  this.$set(this.rootCatalogFolders, key, result.catalogFolders[key]);

                }
                this.$set(this.rootCatalogFolders[index], 'folderArr', result.catalogFoldersKeyArr); // $set, что бы "не потерять динамичность"
              },
              error =>{ // всё не ок
                console.log('error');
              }
            );

              //передаём ивент, для родительского компонента
              this.$emit('openSubfolder', {'index': index, 'folderId': folderId});
            },
        },
        props:[
          'folderH', // заголовок каталога
          'sideFolder', //боковая панель (каталог)
          'lastUpdateTxt', // Когда было произведено последнее мзменение, запрашивается в виде текста с сервера
          'contextMenu', // Контекстное меню
          'menuOpt', // пункты контекстного меню
        ],
        mounted(){
            let varthis = this;
            //для закрытия меню при клике
            $(document).click(function () {
                if(!$(this).hasClass('folder-title')){
                    varthis.contextMenu.contextMenuOpen = false;
                }
            });

            //Запрос категории
            let categoryRequest = this.requestCategory();
            categoryRequest.then(
              result => { // всё ок
                console.log('categoryRequest result ---------', result);
                this.rootCatalogFolders = result.catalogFolders;

              },
              error =>{ // всё не ок
                console.log('error');
              }
            );

        }
    }
</script>

<style lang="sass">
    /*@import 'assets/sass/main.sass';*/
</style>
