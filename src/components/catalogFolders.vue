<!--Каталог с папками (панель слева)-->
<template>
    <!--catalogFolders.vue-->

    <!--
      todo: скрывать/удалять папку после привязки
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

  <div class=" catalog-folder white-bg" :class="{'side-catalog-f': sideFolder}" >
    <div class="bb">
      <div class="folder-h" v-show="folderH">
        <div class="title-h">
          {{folderH}}
        </div>
      </div>
      <div class="folder-b">
        <div class="folder-c" :class="{'containerPending':folderPending}">
          <ul class="folder-list folder-list-main ">
            <li v-for="(catFolder, index) in rootCatalogFoldersComp"
                :class="{'is-active': catFolder.isOpen}"
                :style="{'paddingLeft': catFolder.lvlFolder * 10 + 'px'}"
                v-if="!catFolder.hideFolder"
            >
              <!--:key - параметр для сортировки-->
              <div class="folder-title" @click.right = "contextOpen($event, catFolder )" >
                <div class="folder-name ">
                  <span class="dot-txt" v-for="i in catFolder.lvlFolder">
                      &#183;
                  </span>
                  {{catFolder.name}}
                </div>
                <div class="folder-controls-c">
                  <span class="badge badge-success badge-pill">{{catFolder.goodsCount}}</span>
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
          <a href="javascript:void(0)" @click="contextMenuOptEvent(item.eventName)">
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
            rootCatalogFoldersComp: //каталог
              [
                /*{
                  folderId: '123321', //уникальный ид папки
                  name: 'Велосипед', // Имя папки
                  goodsCount: 181, // количество товаров в папке
                  lvlFolder: 0, // Уровень папки, 0 - папка в корне
                  isOpen: false, // Открыть ли каталог (для фронтенда)
                  hasFolders: false,// есть вложенный каталог
                  hideFolder: false,// скрыть папку
                  folderArr: [ // храниться массив подпапок
                  ],
                  key: '1',
                }*/
              ],
            folderPending: false // true, пока идёт запрос на подгрузку папок
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
          contextMenuOptEvent(eventName){
            this.$emit(eventName);
          },
          contextOpen(e, val){
              this.contextMenu.xPos = e.clientX;
              this.contextMenu.yPos = e.clientY;
              this.contextMenu.contextMenuOpen = true;
              this.contextMenu.selectedFolder  = val;
              e.preventDefault();
          },
          // открыть папку
          requestCategory(idCategory, lvlFolder, parentFolderId){ // запрос категории/каталога по ид, возвращает промис
            //после вызова в promise вызывать this.setFolders().. для перезаписи каталога в родительском компоненте
            return new Promise((resolve, reject) => {
              let payload = {
                // lvlFolder: lvlFolder ? lvlFolder : '',
                lvlFolder: lvlFolder, // уровень вложенности
                id: idCategory || '', // ид папки
                supplier_id: this.selectedProvider.id || '', // поставщик(если есть), если не указан, то приходят категории от всех поставщиков
                parentFolderId: parentFolderId || '0' // ид родительской папки, вроде не используется, надо сделать ревью
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
                    this.setErrorAlertShow(true);
                    this.setErrorAlertMsg('Ошибка при запросе категории: ' + errorTxt);
                  }else {
                    resolve(resp.data.data);
                  }
                  this.stepLastActive(); // прогрессбар
                  this.folderPending = false;
                })
                .catch(err => {
                  this.folderPending = false;
                  this.setErrorAlertShow(true);
                  this.setErrorAlertMsg('Ошибка при генерации ключа');
                  this.stepLastActive(); // прогрессбар
                  reject(err);
                });

            });
          },
          openSubfolder(index, folderId, lvlFolder, parentFolderId){
            //Делаем запрос на сервер, от сервера приходит ассециативный массив с папками catalogFolders и catalogFoldersKeyArr - массив ключей
            //формат lvlFolder++_index_idCatalog, также на сервере делаем инкремент lvlFolder у папки
            //Далее проходимся по массиву с сервера и добавляем все ключи

            if(this.rootCatalogFoldersComp[index].isOpen) {
              // Удаляем все подпапки, начиная с index.. закрываем папку index
              let childCount = this.rootCatalogFoldersComp[index].childCount;
              if(this.rootCatalogFoldersComp[index].lvlFolder > 0) {
                let indexLvlFolder = this.rootCatalogFoldersComp[index].lvlFolder - 1;
                // this.rootCatalogFoldersComp[index].wasOpened = true; // папка была открыта и родительской папке уже прибавились подпапки (необходимо для корректного удаления)
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
              let categoryRequest = this.requestCategory(folderId, lvlFolder, parentFolderId);
              categoryRequest.then(

                result => { // всё ок
                  // console.log('!!!!!!categoryRequest SUB result ---------', result);
                  for (let item of result.catalogFolders) {
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

                    // this.rootCatalogFoldersComp[index].wasOpened = true; // папка была открыта и родительской папке уже прибавились подпапки (необходимо для корректного удаления)
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
          setFolders(){
            this.$emit('setFolders', {'value': this.rootCatalogFoldersComp });
          }

        },
        props:[
          'folderH', // заголовок каталога
          'sideFolder', //боковая панель (каталог)
          'lastUpdateTxt', // Когда было произведено последнее мзменение, запрашивается в виде текста с сервера
          'contextMenu', // Контекстное меню
          'menuOpt', // пункты контекстного меню
          'rootCatalogFolders', // все папки
          'selectedProvider', //выбранный поставщик (объект {name, id})
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
                this.rootCatalogFoldersComp = result.catalogFolders;
                this.setFolders();
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
