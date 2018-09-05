<!--Страница приложения из списка приложений-->
<template>
  <!--singleApp.vue-->

  <!--
    todo: API - удалить приложение
    todo: API - сохранить приложение
    todo: API - сгенерировать новый ключ(не перезаписывать старый, просто отдавать строку нового ключа, перезапись происходит при нажатии на кнопку "сохранить")
    todo: API - запрос для первоначальной инициализации по ид приложения
  -->

  <!--
    todo: перевод для селекта
    todo: округлять проценты до сотых
  -->

  <div class="container">
    <div class="white-block-r">
       <div class="row align-items-center">
         <div class="col-12">
           <div class="app-tc d-flex align-items-center justify-content-between">
             <h5 class="title-c">
               Приложение
             </h5>
             <button type="button" class="btn btn-danger" @click="openModalRemoveApp">
               УДАЛИТЬ
             </button>
           </div>
         </div>
       </div>
     </div>
    <div class="white-block-r pr-0">
      <div class="row align-items-center" >
        <div class="col-4">
          <appInput class="appInputLabel"
                    key="siteInput"
                    :validFeedback="siteInput.validFeedback"
                    :invalidFeedback="siteInput.invalidFeedback"
                    :placeholder="siteInput.placeholder"
                    :required="siteInput.required"
                    :pattern="siteInput.pattern"
                    :type="siteInput.type"
                    :value="siteInput.value"
                    :isValid="siteInput.isValid"
                    :showError="siteInput.showError"
                    @changedata="onChangeData('siteInput', $event)"
          >
          </appInput>
        </div>
        <div class="col-4">
         <div class="d-flex align-items-center selectLabeled" cont="Выберите каталог">
           <multiselect
             v-model="selectedCatalogs"
             :options="catalogList"
             :multiple="false"
             :close-on-select="true"
             :allow-empty="false"
             :searchable="false"
             placeholder="Каталоги"
             selectedLabel="Выбрано"
             label="name"
             track-by="name"
             selectLabel="Выбрать"
             deselectLabel="Убрать из списка"
             @input = "onChangeSelect">
           </multiselect>
         </div>
        </div>
        <div class="col-4">
          <appInput class="appInputLabel"
                    key="profitPercentInput"
                    :validFeedback="profitPercentInput.validFeedback"
                    :invalidFeedback="profitPercentInput.invalidFeedback"
                    :placeholder="profitPercentInput.placeholder"
                    :required="profitPercentInput.required"
                    :pattern="profitPercentInput.pattern"
                    :type="profitPercentInput.type"
                    :value="profitPercentInput.value"
                    :isValid="profitPercentInput.isValid"
                    :showError="profitPercentInput.showError"
                    @changedata="onChangeData('profitPercentInput', $event)"
          >
          </appInput>
        </div>
        <div class="col-6">
          <div class="heygen-c">
            <div cont="Ключ API" class="input-group mb-3 buffer-copy-inpt appInputLabel">
              <input id="api-inpt" ReadOnly v-model="API"  type="text" class="form-control disabled" placeholder="API Key" aria-label="Recipient's username" aria-describedby="button-addon2">
              <div class="input-group-append">
                <button type="button" class="btn btn-primary" @click="copyBuffer('api-inpt')">
                  <div class="svg-c">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      width="19px" height="22px">
                      <image  x="0px" y="0px" width="19px" height="22px"  xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAWCAQAAACIlG/0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfiCAcPADVnEOBPAAABk0lEQVQoz2WRvYsTQRiHn9+7u/mS0/OijY3gJ4jFNVeItZ1iZ5NeECvxTrhKGyv/AbFRCdjZqGBhp82Bgr0HWol3jZhDTcgm+1rMZDOJM7Cz7P7med53RoiMBgUZIowpYyZUVDgePuUUrPRO9a6qPRUIebPc+9T78Ght6wcjJrPg6qt7v8qBH8Q58APf6XP+++cHV+jSCA7j0PpNywG8dowLVvITt15sXuIwBQKjeeR0wCpOpzKKqbWObT67G4OGhUjgBJ4LCdHpbj3d3qBDZtQjRITorIEqcNrdO88fXyDLQRBZgemcvbze3b7dKCrlk6N/st8oFk99aAB5882Tj693v2SVVa1xCd/EmcGuonRxnTn235+7YanUkzevey9zClver/94LmQpY1ahklo93mndoxaivhC2+e54tPGpxAFGQlHSSno3keakFYb+WKL5XDK/NuoDceS4UQ5/ptpFmSOGe5TG368v0x9KVCH4rs9QtE4ef3j94jVrupbl8tH+2/79HQbCKGjTIsNgCeSUjBgy+QchNZ56rQMctQAAAABJRU5ErkJggg==" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
            <div class="btn-c">
              <button type="button" class="btn btn-danger" @click="openModalGenApi">
                Сгенерировать новый ключ
              </button>
            </div>
          </div>
        </div>
        <div class="col-12 ">
          <button type="button" class="btn btn-success" @click="saveApplication">
            Сохранить
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <!--Подтвердить генерацию нового ключа-->
    <div class="modal fade warning-modal" id="confirmGenApiModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">
              <div class="svg-c">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="23px" height="23px">
                  <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                        d="M11.500,23.000 C5.149,23.000 0.000,17.851 0.000,11.500 C0.000,5.149 5.149,-0.000 11.500,-0.000 C17.851,-0.000 23.000,5.149 23.000,11.500 C23.000,17.851 17.851,23.000 11.500,23.000 ZM11.500,5.000 C10.672,5.000 10.000,5.671 10.000,6.500 C10.000,7.328 10.672,8.000 11.500,8.000 C12.328,8.000 13.000,7.328 13.000,6.500 C13.000,5.671 12.328,5.000 11.500,5.000 ZM13.000,10.500 C13.000,9.671 12.328,9.000 11.500,9.000 C10.672,9.000 10.000,9.671 10.000,10.500 L10.000,16.500 C10.000,17.328 10.672,18.000 11.500,18.000 C12.328,18.000 13.000,17.328 13.000,16.500 L13.000,10.500 Z"/>
                </svg>
              </div>
              <div class="txt">
                Генерация нового ключа
              </div>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>
              После генерации нового ключа, старый ключ станет недействительным, соответственно все приложения связанные с ним стануть недоступны. Вы действительно хотите сгенерировать новый ключ?
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Отмена</button>
            <button type="button" class="btn btn-success" data-dismiss="modal" @click="genNewApiKey">
              Сгенерировать новый ключ
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--Удаление приложения-->
    <div class="modal fade warning-modal" id="confirmDeleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle1">
              <div class="svg-c">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="23px" height="23px">
                  <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                        d="M11.500,23.000 C5.149,23.000 0.000,17.851 0.000,11.500 C0.000,5.149 5.149,-0.000 11.500,-0.000 C17.851,-0.000 23.000,5.149 23.000,11.500 C23.000,17.851 17.851,23.000 11.500,23.000 ZM11.500,5.000 C10.672,5.000 10.000,5.671 10.000,6.500 C10.000,7.328 10.672,8.000 11.500,8.000 C12.328,8.000 13.000,7.328 13.000,6.500 C13.000,5.671 12.328,5.000 11.500,5.000 ZM13.000,10.500 C13.000,9.671 12.328,9.000 11.500,9.000 C10.672,9.000 10.000,9.671 10.000,10.500 L10.000,16.500 C10.000,17.328 10.672,18.000 11.500,18.000 C12.328,18.000 13.000,17.328 13.000,16.500 L13.000,10.500 Z"/>
                </svg>
              </div>
              <div class="txt">
                Подтвердите удаление приложения
              </div>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <appInput class=" "
                      key="confirmDeleteApp"
                      :validFeedback="confirmDeleteAppInput.validFeedback"
                      :invalidFeedback="confirmDeleteAppInput.invalidFeedback"
                      :placeholder="confirmDeleteAppInput.placeholder"
                      :required="confirmDeleteAppInput.required"
                      :pattern="confirmDeleteAppInput.pattern"
                      :type="confirmDeleteAppInput.type"
                      :value="confirmDeleteAppInput.value"
                      :isValid="confirmDeleteAppInput.isValid"
                      :showError="confirmDeleteAppInput.showError"
                      @changedata="onChangeData('confirmDeleteAppInput', $event)"
            >
            </appInput>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Отмена</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteApplication()">Удалить приложение</button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>

  import {API_URL} from '../constants';
  import axios from 'axios';
  import {mapMutations} from 'vuex';
  import {mapActions} from 'vuex';
  import Multiselect from 'vue-multiselect'
  import appInput from './inputValid';

  export default {
    name: 'singleApp',
    data () {
      return {
        name: 'sitename.ru', // Имя приложения
        role: 'Ninja',//'права' пользователя
        avatar: 'src/assets/img/app.png',//аватарка
        API: 'asliudjaw23eidpk2wk3dw-03o2kwe',
        id: 123, // id
        blocked: false, // приложение заблокированно
        siteInput: {
          id: 'site-url',
          showError: false,
          validFeedback: "",
          invalidFeedback: "Адрес сайта введён неверно",
          placeholder: "Адрес",
          type: "text",
          required: "false",
          pattern: /^[а-яА-Яa-zA-Z0-9_.\/#:]{5,100}$/,
          value: 'sitename.ru',
          isValid: false
        },
        profitPercentInput: {
          id: 'profit-percent',
          showError: false,
          validFeedback: "",
          invalidFeedback: "Наценка введена неверно",
          placeholder: "Наценка, %",
          type: "text",
          required: "false",
          pattern: /^[0-9,.]{1,15}$/,
          value: '',
          isValid: false
        },
        confirmDeleteAppInput: {
          id: 'confirmDelete',
          showError: '',
          validFeedback: "",
          invalidFeedback: "Имя приложения введено неверно",
          placeholder: "Введите имя приложения, которое хотите удалить",
          type: "text",
          required: "true",
          pattern: /[^]*/,
          value: '',
          isValid: false
        },
        appSaved: true, //Приложение сохранёно, флаг для того что бы не делать лишних запросов на сервер, при изменении полей, флаг менятся на false
        catalogList: [ // каталоги для селекта
          {name: 'Машинки', id: '1234'},
          {name: 'Посуда', id: '4453'},
          {name: 'Подушки', id: '8489'}
        ],
        selectedCatalogs: [ // выбранные каталоги в селекте
          {name: 'Машинки', id: '1234'},
        ]

      }
    },
    computed:{
      // id приложения, передаётся в url в качестве параметра
      applicationId(){
        return this.$route.params.id || 1;
      }
    },
    methods:{
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
      openModalGenApi(){
        $('#confirmGenApiModal').modal();
      },
      genNewApiKey(){
        let payload = {
          name: this.name, // Имя приложения
          role: this.role,//'права' пользователя
          avatar: this.avatar,//аватарка
          API: this.API,
          id: this.id, // id
          blocked: this.blocked, // приложение заблокированно
        };
        this.stepOneActive(); // прогрессбар
        axios({url: API_URL + '/application/keygen', data: payload, method: 'POST' })
          .then(resp => {
            const error = resp.data.error;
            this.stepLastActive(); // прогрессбар
            if(error){
              let errorTxt = resp.data.data.msgClient;
              this.setErrorAlertMsg('Ошибка при генерации ключа: ' + errorTxt);
            }else{
              this.API = resp.data.data.api;//в зависимости от того, что вернёт api
              this.setSuccessAlertMsg('Ключ сгенерирован');
            }
          })
          .catch(err => {
            this.setErrorAlertMsg('Ошибка при генерации ключа');
            this.stepLastActive(); // прогрессбар
            console.log(err);
          });
      },
      copyBuffer(id){
        let copyText = document.getElementById(id);
        copyText.select();
        document.execCommand("copy");

        this.setSuccessAlertMsg('Текст скопирован в буфер обмена');
      },
      onChangeData(key, data){ // для компонента input
        this[key].value = data.value;
        this[key].isValid = data.valid;

        if(key === 'siteInput' && data.valid === true){
          this.name = data.value
        }
        this.falseAppSave();
      },
      falseAppSave(){
        this.appSaved = false;
      },
      onChangeSelect(){ // изменение селекта
        this.falseAppSave();
      },
      openModalRemoveApp(){ // удалить приложение
        $('#confirmDeleteModal').modal();
      },
      deleteApplication(){ // Удалить приложение
        if(this.name === this.confirmDeleteAppInput.value){
          let payload = {
            name: this.name, // Имя приложения
            role: this.role,//'права' пользователя
            avatar: this.avatar,//аватарка
            API: this.API,
            id: this.id, // id
            blocked: this.blocked, // приложение заблокированно
          };
          this.stepOneActive(); // прогрессбар
          axios({url: API_URL + '/application/remove', data: payload, method: 'POST' })
            .then(resp => {
              const error = resp.data.error;
              this.stepLastActive(); // прогрессбар
              if(error){
                let errorTxt = resp.data.data.msgClient;
                this.setErrorAlertMsg('Ошибка при удалении приложения: ' + errorTxt);
              }else{
                this.setSuccessAlertMsg('Приложение удалёно');
              }
            })
            .catch(err => {
              this.setErrorAlertMsg('Ошибка при удалении приложения ');
              this.stepLastActive(); // прогрессбар
              console.log(err);
            });
        }else{
          this.setErrorAlertMsg('Ошибка при удалении приложения: имена не совпадают');
        }
      },
      saveApplication(){
        if(this.appSaved){
          this.setSuccessAlertMsg('Приложение сохранёно');
        }else {
          if(this.siteInput.isValid && this.profitPercentInput.isValid){
            let payload = {
              name: this.name, // Имя приложения
              role: this.role,//'права' пользователя
              avatar: this.avatar,//аватарка
              API: this.API,
              id: this.id, // id
              blocked: this.blocked, // приложение заблокированно
            };
            this.stepOneActive(); // прогрессбар
            axios({url: API_URL + '/application/save', data: payload, method: 'POST' })
              .then(resp => {
                const error = resp.data.error;
                this.stepLastActive(); // прогрессбар
                if(error){
                  let errorTxt = resp.data.data.msgClient;
                  this.setErrorAlertMsg('Ошибка при сохранении приложения: ' + errorTxt);
                }else {
                  this.catalogList[index].catalogSaved = true;
                  this.setSuccessAlertMsg('Приложение сохранёно');
                }
              })
              .catch(err => {
                this.setErrorAlertMsg('Ошибка при сохранении каталога');
                this.stepLastActive(); // прогрессбар
                console.log(err);
              });
          }else{
            this.setErrorAlertMsg('Форма заполненна неправильно');
          }
        }
      }
    },
    components:{
      appInput,
      Multiselect
    },
    mounted(){

    }
  }
</script>

<style lang="sass">
  @import '../../node_modules/vue-multiselect/dist/vue-multiselect.min.css'
  /*@import 'assets/sass/main.sass';*/
</style>
