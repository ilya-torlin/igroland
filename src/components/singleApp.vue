<!--Страница приложения из списка приложений-->
<template>
  <!--singleApp.vue-->

  <div class="container">
    <div class="white-block-r">
       <div class="row align-items-center">
         <div class="col-12">
           <div class="app-tc d-flex align-items-center justify-content-between">
             <h5 class="title-c">
               {{appData.name}}
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
          <appInput :cont="siteInput.placeholder" class="appInputLabel"
                    key="siteInput"
                    :input="siteInput"
                    @changedata="onChangeData('siteInput', $event)"
          >
          </appInput>
        </div>
        <div class="col-4">
          <appInput :cont="profitPercentInputRoz.placeholder" class="appInputLabel"
                    key="profitPercentInputRoz"
                    :input="profitPercentInputRoz"
                    @changedata="onChangeData('profitPercentInputRoz', $event)"
          >
          </appInput>
        </div>
        <div class="col-4">
          <appInput :cont="profitPercentInputOpt.placeholder" class="appInputLabel"
                    key="profitPercentInputOpt"
                    :input="profitPercentInputOpt"
                    @changedata="onChangeData('profitPercentInputOpt', $event)"
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
        <div class="col-12 white-bl-btn">
          <button type="button" class="btn btn-success" @click="saveApplication">
            Сохранить
          </button>
          <a class="btn btn-outline-secondary" @click="" :href="downloadLink" target="_blank" :download="downloadName">
            Скачать каталог
          </a>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <!--Подтвердить генерацию нового ключа-->
    <appModal
      headerText="Генерация нового ключа"
      keyId="confirmGenApiModal"
      :deleteIcon="true"
      positiveActionText="Сгенерировать"
      :textField="genTextLabel"
      :isNotifyModal="true"
      negativeActionText="Отмена"
      :actionIndex="0"
      :inputsArr="inputsArr"
      buttonClass="btn-success"
      :necessaryEvent="'pageChange'"
      @pageChange="genNewApiKey">
    </appModal>
    <!--Удаление приложения-->
    <appModal
      headerText="Подтвердите удаление приложения"
      keyId="confirmDeleteModal"
      :deleteIcon="true"
      positiveActionText="Удалить приложение"
      :textField="remoteTextLabel"
      negativeActionText="Отмена"
      :actionIndex="0"
      :isNotifyModal="true"
      :inputsArr="inputsArr"
      buttonClass="btn-danger"
      :necessaryEvent="'pageChange'"
      @pageChange="deleteApplication">
    </appModal>


  </div>
</template>

<script>

  import {API_URL} from '../constants';
  import axios from 'axios';
  import {mapMutations} from 'vuex';
  import {mapActions} from 'vuex';
  import Multiselect from 'vue-multiselect'
  import appInput from './inputValid';
  import appModal from './modalWindow';

  export default {
    name: 'singleApp',
    data () {
      return {
        remoteTextLabel: 'Подтвердите удаление текущего приложения',
        genTextLabel: 'После генерации нового ключа, старый ключ станет недействительным, соответственно все приложения связанные с ним стануть недоступны. Вы действительно хотите сгенерировать новый ключ?',
        appData:{

        },
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
          invalidFeedback: "Название введёно неверно",
          placeholder: "Название/Адрес",
          type: "text",
          required: "false",
          pattern: /^[а-яА-Яa-zA-Z0-9_. \/#:]{5,100}$/,
          value: 'Сайт приложения',
          isValid: false
        },
        profitPercentInputRoz: {
          id: 'profit-roz',
          showError: false,
          validFeedback: "",
          invalidFeedback: "Наценка введена неверно",
          placeholder: "Розничная наценка, %",
          type: "text",
          required: "false",
          pattern: /^[0-9,.]{1,15}$/,
          value: '',
          isValid: false
        },
        profitPercentInputOpt: {
          id: 'profit-opt',
          showError: false,
          validFeedback: "",
          invalidFeedback: "Наценка введена неверно",
          placeholder: "Оптовая наценка, %",
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
        ],
        selectedCatalogs: null,
        inputsArr:{ // массив инпутов для всплывающего окна
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
      }
    },
    computed:{
      // id приложения, передаётся в url в качестве параметра
      applicationId(){
        return this.$route.params.id || 1;
      },
      validInputs(){
        return this.testValid(this.siteInput) && this.testValid(this.profitPercentInputRoz) && this.testValid(this.profitPercentInputOpt);
      },
      downloadLink(){
        return API_URL + '/export/'+ this.API;
      },
      downloadName(){
        return this.appData.name + '.xml';
      },
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
      testValid(input){
        return input.pattern.test(input.value);
      },
      genNewApiKey(){
        let payload = {
          id: this.applicationId, // id
        };
        this.stepOneActive(); // прогрессбар
        axios({url: API_URL + '/export/generate', data: payload, method: 'POST' })
          .then(resp => {
            const error = resp.data.error;
            this.stepLastActive(); // прогрессбар
            if(error){
              let errorTxt = resp.data.data.msgClient;
              this.setErrorAlertMsg('Ошибка при генерации ключа: ' + errorTxt);
            }else{
              this.API = resp.data.data.link;//в зависимости от того, что вернёт api
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
          this.appData.name = data.value
        }
        if(key === 'profitPercentInputRoz' && data.valid === true){
          this.appData.roznPriceAdd = parseFloat(data.value).toFixed(2);
        }
        if(key === 'profitPercentInputOpt' && data.valid === true){
          this.appData.optPriceAdd = parseFloat(data.value).toFixed(2);
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
          let payload = this.applicationId;
          this.stepOneActive(); // прогрессбар
          axios({url: API_URL + `/export/${payload}`, method: 'DELETE' })
            .then(resp => {
              const error = resp.data.error;
              this.stepLastActive(); // прогрессбар
              if(error){
                let errorTxt = resp.data.data.msgClient;
                this.setErrorAlertMsg('Ошибка при удалении приложения: ' + errorTxt);
              }else{
                this.setSuccessAlertMsg('Приложение удалёно');
                this.$router.push({name: 'applications'});
              }
            })
            .catch(err => {
              this.setErrorAlertMsg('Ошибка при удалении приложения ');
              this.stepLastActive(); // прогрессбар
            });
      },
      saveApplication(){
        if(this.appSaved){
          this.setSuccessAlertMsg('Приложение сохранёно');
        }else {
          if(this.validInputs){
            let payload = {
              name: this.appData.name, // Имя приложения
              optPriceAdd: this.appData.optPriceAdd,
              roznPriceAdd: this.appData.roznPriceAdd,
              catalog_id: this.selectedCatalogs.id
            };
            this.stepOneActive(); // прогрессбар
            axios({url: API_URL + `/export/${this.applicationId}`, data: payload, method: 'PUT' })
              .then(resp => {
                const error = resp.data.error;
                this.stepLastActive(); // прогрессбар
                if(error){
                  let errorTxt = resp.data.data.msgClient;
                  this.setErrorAlertMsg('Ошибка при сохранении приложения: ' + errorTxt);
                }else {
                  this.profitPercentInputRoz.value = parseFloat(this.profitPercentInputRoz.value).toFixed(2);
                  this.profitPercentInputOpt.value = parseFloat(this.profitPercentInputOpt.value).toFixed(2);
                  this.setSuccessAlertMsg('Приложение сохранёно');
                }
              })
              .catch(err => {
                this.setErrorAlertMsg('Ошибка при сохранении приложения');
                this.stepLastActive(); // прогрессбар
                console.log(err);
              });
          }else{
            this.setErrorAlertMsg('Форма заполнена неправильно');
          }
        }
      },
      initMyCatalogs(){
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
              for(let item of arrayList) {
                this.catalogList.push({
                    id: item.id,
                    name: item.catalogName
                });
              }
              console.log(this.catalogList);
            }
          })
          .catch(err => {
            this.setErrorAlertMsg('Ошибка при получении списка каталогов');
            this.stepLastActive(); // прогрессбар
            console.log(err);
          });
      },
      initMyExportView(){
        let exportId = this.$route.params.id ;
        axios({url: API_URL + `/export/view`, data: {id: exportId}, method: 'POST' })
          .then(resp => {
            const error = resp.data.error;
            this.stepLastActive(); // прогрессбар
            if(error){
              let errorTxt = resp.data.data.msgClient;
              this.setErrorAlertMsg('Ошибка при получении данных приложения: ' + errorTxt);
            }else{
              this.appData = resp.data.data;
              this.profitPercentInputRoz.value = this.appData.roznPriceAdd;
              this.profitPercentInputOpt.value = this.appData.optPriceAdd;
              this.siteInput.value = this.appData.name;
              this.selectedCatalogs = this.appData.catalog;
              this.API = this.appData.link;
            }
          })
          .catch(err => {
            this.setErrorAlertMsg('Ошибка при получении данных приложения');
            this.stepLastActive(); // прогрессбар
            console.log(err);
          });
      }
    },
    components:{
      appInput,
      Multiselect,
      appModal
    },
    mounted(){
      this.initMyCatalogs();
      this.initMyExportView();
    }
  }
</script>

<style lang="sass">
  @import '../../node_modules/vue-multiselect/dist/vue-multiselect.min.css'
  /*@import 'assets/sass/main.sass';*/
  .white-bl-btn
    .btn
      margin-right: 15px
</style>
