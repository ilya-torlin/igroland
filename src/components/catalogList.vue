<!--Список всех каталогов-->
<template>
  <!--catalogList.vue-->
  <div class="container">
    <div class="catalogComp">
      <div class="row">
        <div class="col-12">
          <div class="btn-c">
            <button @click="onOpenModalWindow" type="button" class="btn btn-outline-secondary">Новый каталог</button>
          </div>
        </div>
        <div class="col-12 mt-3">
        </div>
      </div>
        <div class="row" v-if="isCatalogsLoaded">
          <div class="col-12">
            <div class="white-block-r ">
              <h4 class="mb-0">
                Список каталогов пуст, для создания нового каталога, используйте кнопку "Новый каталог"
              </h4>
            </div>
          </div>
        </div>

        <appCatalogItem v-else v-for="(catalogItem, index) in catalogList"
          :key="index"
          :index="index"
          :selected="catalogItem.selected"
          :catalogItem="catalogItem"
          :switcherActive="catalogItem.switcherActive"
          :showConfig="catalogItem.showConfig"
          :userList="userList"
          :catalogName="catalogItem.catalogName"
          :catalogId="catalogItem.id"
          :isActive="catalogItem.isActive"
          :isOn="catalogItem.isOn"
          :description="catalogItem.description"
          :selectedUsers="catalogItem.selectedUsers"
          :userRole="userRole"
          :useCatalogParams="false"
          @configToogle = "onConfigToogle(index)"
          @switchToogle = "onSwitchToogle(index)"
          @isOnToogle = "onIsOnToogle(index)"
          @changeDescr = "onChangeDescr(index, $event)"
          @copyCatalog = "onCopyCatalog(index)"
          @saveCatalog = "onSaveCatalog(index)"
          @changeSelect = "onChangeSelect(index, $event)"
          @changeName="onChangeName(index, $event)"
          @removeCatalog = "onOpenRemoveCatalogWindow(index)"
          @changeImage="onChangeImage(index, $event)">
        </appCatalogItem>

        <!--appPagination v-if="Object.keys(catalogList).length != 0" :countPage = "pagination.countPage"
          :routerLink="/catalog/"
          :routerOn="pagination.routerOn"
          @pageChange = "onPageChange()">
        </appPagination-->
      <div class="pagination"></div>

      <!-- Modal RemoveCatalog-->
      <appModal
        headerText="Подтвердите удаление каталога"
        keyId="confirmDeleteModal"
        :deleteIcon="true"
        positiveActionText="Удалить каталог"
        negativeActionText="Отмена"
        :actionIndex="removeCatalogIndex"
        :inputsArr="inputsArr"
        buttonClass="btn-danger"
        necessaryEvent="pageChange"
        @pageChange="removeCatalog(removeCatalogIndex)">
      </appModal>
      <!--Modal AddCatalog-->
      <appModal
        headerText="Введите имя нового каталога"
        keyId="confirmAddModal"
        :deleteIcon="false"
        positiveActionText="Добавить каталог"
        negativeActionText="Отмена"
        :actionIndex="0"
        :inputsArr="inputsAddArr"
        buttonClass="btn-success"
        necessaryEvent="pageChange"
        @pageChange="addNewCatalog">
      </appModal>
    </div>
  </div>
</template>
<!--todocomplete: переделать ассоциативный массив на обычный -->
<script>

  import appCatalogItem from './catalogItem'
  import appInput from './inputValid';
  import appModal from './modalWindow';
  import appPagination from './pagination'
  import {API_URL, USER_ADMIN} from '../constants'
  import axios from 'axios'

  import {mapGetters} from 'vuex';
  import {mapActions} from 'vuex';
  import {mapMutations} from 'vuex';

  export default {
    name: 'catalogList',
    data () {
      return {
        // catalogList["123"]
        /*123: { // Идентификатор каталога
        selected: null, // выбранные элементы в селекте
        switcherActive: false, // активность переключателя (Доступен для всех)
        showConfig: false, // Тригер для отображения параметров переключателя(шестерёнка)
        catalogName: 'Игрушки', // Наименование каталога
        isActive: true, // каталог активен(значёе молнии), один или несколько пользователей используют его
        isOn: true, // Тригер для включения/отключения каталога, если каталог отключён, то пользователи его не видят
        description: 'Краткое описание каталога', // краткое описание каталога
        catalogImg: '', // Изображение каталога
        catalogSaved: true,//каталог сохранён, при внесении изменений или копирывании каталога ставим в false... если каталог не сохранён, то его нельзя скопировать и выводится ошибка(предупреждение) для пользователя
        userList: [ // пользователи для селекта
          {name: 'user@gmail.com', id: '1234'},
          {name: 'goner@gmail.com', id: '4453'},
          {name: '2user2@gmail.com', id: '8489'}
        ],
        selectedUsers: [ // выбранные пользователи в селекте
          {name: 'user@gmail.com', id: '1234'},
        ]
        },*/
        catalogList: [], // ассоциативный массив объектов
        inputsArr:[
          {
            id: 'confirmDelete',
            showError: '',
            validFeedback: "",
            invalidFeedback: "Имя введено неверно",
            placeholder: "Введите имя каталога, который хотите удалить",
            type: "text",
            required: "true",
            pattern: /[^]*/,
            value: '',
            isValid: false
          }
        ],
        inputsAddArr:[
          {
            id: 'confirmAdd',
            showError: '',
            validFeedback: "",
            invalidFeedback: "Имя введено неверно",
            placeholder: "Введите имя каталога, который хотите добавить",
            type: "text",
            required: "true",
            pattern: /[^]*/,
            value: '',
            isValid: false
          }
        ],
        removeCatalogIndex: 0, // индекс каталога, который надо удалить,
        //pagination, при переключении страницы, делаем запрос к серверу
        pagination:{
          countPage: 12, // общее колличество страниц, делаем запрос к базе
          countItemsPage: 12, // колличество элементов на странице
          routerOn: true // // отключение роутера, если включить, то надо настроить роутер
        },
        userList:[],
        isLoaded:false
      }
    },
    computed: {
      ...mapGetters('user', {
          userRole: 'role',
      }),
      isCatalogsLoaded(){
        return (Object.keys(this.catalogList).length == 0) && this.isLoaded;
      }
    },
    methods: {
      ...mapActions('alerts',{
        setErrorAlertMsg: 'setErrorAlertMsg',
        setSuccessAlertMsg: 'setSuccessAlertMsg',
      }),
      ...mapActions('user',{
        userRequest: 'USER_REQUEST',
      }),
      ...mapMutations('progress',{
        setProgStateWidth: 'setProgStateWidth',
        setProgShow: 'setProgShow',
        stepOneActive: 'stepOneActive',
        stepTwoActive: 'stepTwoActive',
        stepLastActive: 'stepLastActive',
      }),
      // изменить изображение
      onChangeImage(index, image){
        this.catalogList[index].catalogImg = image;
      },
      //переключение каталога в режим не сохранён
      falseCatalogSave(index){
        this.catalogList[index].catalogSaved = false;
      },
      // переключение шестерёнки (настройки каталога)
      onConfigToogle(index){
        this.catalogList[index].showConfig = !this.catalogList[index].showConfig;
      },
      // включение/отключение каталога
      onIsOnToogle(index){
        this.catalogList[index].isOn = !this.catalogList[index].isOn;
        let payload = {
          value: Number(this.catalogList[index].isOn).toString()
        };
        let catalogIndex = this.catalogList[index].id;
        axios({url: API_URL + '/catalog/'+ catalogIndex + '/setonoff', data: payload, method: 'POST' })
          .then(resp => {
            const error = resp.data.error;
            console.log(resp);
            this.stepLastActive(); // прогрессбар
            if(error){
              let errorTxt = resp.data.data.msgClient;
              this.setErrorAlertMsg('Ошибка при изменении состояния каталога: ' + errorTxt);
            }else{
              (this.catalogList[index].isOn) ? this.setSuccessAlertMsg('Каталог включен') : this.setSuccessAlertMsg('Каталог отключен');
              //this.falseCatalogSave(index);
            }
          })
          .catch(err => {
            this.setErrorAlertMsg('Ошибка при изменении состояния каталога ');
            this.stepLastActive(); // прогрессбар
            console.log(err);
          });
        //this.falseCatalogSave(index);
      },
      // переключение "Доступен для всех"
      onSwitchToogle(index){
        this.catalogList[index].switcherActive = !this.catalogList[index].switcherActive;
        this.falseCatalogSave(index);
      },
      // изменение описания
      onChangeDescr(index, e){
        this.catalogList[index].description = e.value;
        this.falseCatalogSave(index);
      },
      // изменение имени
      onChangeName(index, e){
        this.catalogList[index].catalogName = e.value;
        this.falseCatalogSave(index);
      },
      // копирование каталога
      onCopyCatalog(index){
        //копируем, создаём новый каталог на основе существующего, отправляем на сервер имя каталога, создаем каталог,
        // пролучаем с сервера id при добавлении, вставляем в список новый элемент с этим id
        //далее, только при нажатии на кнопку 'сохранить' отправляем этот каталог на сервер,
        let payload = {
          name: this.catalogList[index].catalogName + ' (копия)'
        };
        let indRand = 0;
        axios({url: API_URL + '/catalog', data: payload, method: 'POST' })
          .then(resp => {
            const error = resp.data.error;
            console.log(resp);
            this.stepLastActive(); // прогрессбар
            if(error){
              let errorTxt = resp.data.data.msgClient;
              this.setErrorAlertMsg('Ошибка при копировании каталога: ' + errorTxt);
            }else{
              this.setSuccessAlertMsg('Каталог скопирован');

              this.catalogList.push(Object.assign({}, this.catalogList[index]));
              //this.$set(this.catalogList, indRand, Object.assign({}, this.catalogList[index]));
              indRand = this.catalogList.length - 1;
              this.catalogList[indRand].id = resp.data.data.id;
              this.catalogList[indRand].catalogName = payload.name;
              $("html, body").animate({ scrollTop: $('.pagination').offset().top - 120}, 600);
              // this.catalogList.splice(indRand, 1, this.catalogList[indRand]);
              this.falseCatalogSave(indRand);
            }
          })
          .catch(err => {
            this.setErrorAlertMsg('Ошибка при копировании каталога ');
            this.stepLastActive(); // прогрессбар
            console.log(err);
          });

        //let indRand = (new Date).getTime();//unixtime in mileseconds

      },
      // сохранение каталога
      onSaveCatalog(index){
        if(this.catalogList[index].catalogSaved){
          this.setSuccessAlertMsg('Каталог сохранён');
        }else {
          let payload = this.catalogList[index];
          let catalogIndex = this.catalogList[index].id;
          this.stepOneActive(); // прогрессбар
          axios({url: API_URL + '/catalog/' +  catalogIndex, data: payload, method: 'PUT' })
            .then(resp => {
              const error = resp.data.error;
              this.stepLastActive(); // прогрессбар
              if(error){
                let errorTxt = resp.data.data.msgClient;
                this.setErrorAlertMsg('Ошибка при сохранении каталога: ' + errorTxt);
              }else {
                this.catalogList[index].catalogSaved = true;
                this.setSuccessAlertMsg('Каталог сохранён');
              }
            })
            .catch(err => {
              this.setErrorAlertMsg('Ошибка при сохранении каталога');
              this.stepLastActive(); // прогрессбар
              console.log(err);
            });
        }
        // let indRand = (new Date).getTime();//unixtime in mileseconds
        // this.$set(this.catalogList, indRand, Object.assign({}, this.catalogList[index]));
        // this.catalogList[indRand].catalogName = this.catalogList[index].catalogName + ' (копия)';

      },
      // удаление каталога, открытие окна подтверждения
      onOpenRemoveCatalogWindow(index){
        this.removeCatalogIndex = index;
        $('#confirmDeleteModal').modal();
      },
      // открытие модального окно по нажатю на кнопку
      onOpenModalWindow(){
        $('#confirmAddModal').modal();
        //$('#id1232').modal();
      },
      //выполняется при переключении страницы
      onPageChange(){
        console.log('onPageChange');
      },
      // удаление каталога
      removeCatalog(index){
        if(this.inputsArr[0].value === this.catalogList[index].catalogName){
          let payload = this.catalogList[index];
          this.stepOneActive(); // прогрессбар
          axios({url: API_URL + '/catalog/' + this.catalogList[index].id ,method: 'DELETE' })
            .then(resp => {
              const error = resp.data.error;
              this.stepLastActive(); // прогрессбар
              if(error){
                let errorTxt = resp.data.data.msgClient;
                this.setErrorAlertMsg('Ошибка при удалении каталога: ' + errorTxt);
              }else{
                this.$delete(this.catalogList, index, this.catalogList[index]);
                this.setSuccessAlertMsg('Каталог удалён');
              }
            })
            .catch(err => {
              this.setErrorAlertMsg('Ошибка при удалении каталога ');
              this.stepLastActive(); // прогрессбар
              console.log(err);
            });
        }else{
          this.setErrorAlertMsg('Ошибка при удалении каталога: имена не совпадают');
        }
      },
      //выполняется при  изменении селекта
      onChangeSelect(index, event){
        //Делать запрос на сервер для копирования?
        console.log('onChangeSelect ', event);
        this.catalogList[index].selectedUsers = event.value;
        this.falseCatalogSave(index);
      },
      // для компонента input
      onChangeData(index, data){
        this.inputsArr[index].value = data.value;
        this.inputsArr[index].isValid = data.valid;
      },
      // для компонента input
      onChangeAddData(index, data){
        this.inputsAddArr[index].value = data.value;
        this.inputsAddArr[index].isValid = data.valid;
      },
      //Добавить новый каталог
      addNewCatalog(){
        let payload = {
          name: this.inputsAddArr[0].value
        };
        this.inputsAddArr[0].value = '';
        this.stepOneActive(); // прогрессбар
        axios({url: API_URL + '/catalog', data: payload, method: 'POST' })
          .then(resp => {
            const error = resp.data.error;
            console.log(resp);
            this.stepLastActive(); // прогрессбар
            if(error){
              let errorTxt = resp.data.data.msgClient;
              this.setErrorAlertMsg('Ошибка при добавлении каталога: ' + errorTxt);
            }else{
              this.setSuccessAlertMsg('Каталог добавлен');
              this.initMyCatalog();
            }
          })
          .catch(err => {
            this.setErrorAlertMsg('Ошибка при добавлении каталога ');
            this.stepLastActive(); // прогрессбар
            console.log(err);
          });
      },
      // подгрузка каталога с сервера
      initMyCatalog(){
        this.stepOneActive(); // прогрессбар
        axios({url: API_URL + '/catalog/my', method: 'GET' })
          .then(resp => {
            const error = resp.data.error;
            this.stepLastActive(); // прогрессбар
            if(error){
              let errorTxt = resp.data.data.msgClient;
              this.setErrorAlertMsg('Ошибка при получении списка каталогов: ' + errorTxt);
            }else{
              let arrayList = resp.data.data;
              this.catalogList = [];
              arrayList.forEach(value => {
                if (value['catalogImg'])
                  value['catalogImg'] = API_URL + value['catalogImg'];
                this.catalogList.push(value);
                //this.$set(this.catalogList, value.id, value);
              });
              this.isLoaded = true;
            }
          })
          .catch(err => {
            this.setErrorAlertMsg('Ошибка при получении списка каталогов');
            this.stepLastActive(); // прогрессбар
            console.log(err);
          });
      },
      // подгрузка списка пользователей с сервера
      initUserList(){
        // если пользователь не суперадмин, то не запрашивать каталог
        if (USER_ADMIN != this.userRole.id){
          return
        }
        this.stepOneActive(); // прогрессбар
        axios({url: API_URL + '/user', method: 'GET' })
          .then(resp => {
            const error = resp.data.error;
            this.stepLastActive(); // прогрессбар
            if(error){
              let errorTxt = resp.data.data.msgClient;
              this.setErrorAlertMsg('Ошибка при получении списка пользователей: ' + errorTxt);
            }else{
              this.userList = resp.data.data;
              console.log('userList',resp.data.data);
            }
          })
          .catch(err => {
            this.setErrorAlertMsg('Ошибка при получении списка каталогов');
            this.stepLastActive(); // прогрессбар
            console.log(err);
          });
      },
    },
    components: {
      appCatalogItem,
      appInput,
      appModal,
      appPagination
    },
    mounted(){
      $('[data-toggle="tooltip"]').tooltip();
      this.userRequest().then( result => {
        this.initUserList();
      });
      this.initMyCatalog();
    }
  }
</script>

<style lang="sass">
  @import '../../node_modules/vue-multiselect/dist/vue-multiselect.min.css'
  /*@import 'assets/sass/main.sass';*/
</style>
