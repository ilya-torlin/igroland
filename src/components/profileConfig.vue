<!--Профиль клиента-->
<template>
    <!--profileConfig.vue-->

    <!--
      todo: -->
    <div class="container profileUser-c">
        <div class="row">
            <div class="col-12">
              <div class="white-block-r">
                <div class="title-user">
                  <div class="ava-big-c">
                    <img :src="avatar" alt="">
                  </div>
                </div>
                <div class="user-info">
                  <div class="user-name">
                    {{ userName + ' ' + profile.surname}}
                  </div>
                  <div class="user-contacts">
                    <div class="c-i">
                      {{profile.email}}
                    </div>
                    <div class="c-i">
                      {{profile.site}}
                    </div>
                    <div class="c-i">
                      {{profile.phone}}
                    </div>
                  </div>
                  <div class="label-c">
                    <label for="uploadAva" class="uploadProfileAva">
                      Обновить фото
                      <input type="file" id="uploadAva">
                    </label>
                  </div>
                </div>
              </div>
            </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="white-block-r22">
              <div class="row">
                <div class="col-12">
                  <h4>
                    ПРОФИЛЬ
                  </h4>
                </div>
              </div>
              <div class="row">
                <div class="col-4 " v-for="(elem, index) in inputsArr" >
                  <appInput class="appInputLabel"
                            :key="index"
                            :validFeedback="elem.validFeedback"
                            :invalidFeedback="elem.invalidFeedback"
                            :placeholder="elem.placeholder"
                            :required="elem.required"
                            :pattern="elem.pattern"
                            :type="elem.type"
                            :value="elem.value"
                            :isValid="elem.isValid"
                            :showError="elem.showError"
                            @changedata="onChangeData(index, $event)"
                  >
                  </appInput>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <!--todo: написать функцию для обновления-->
                  <button @click="updateUserProfile" type="button" class="btn btn-success" >Обновить</button>
                </div>
              </div>
            </div>
          </div>
        </div>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {mapMutations} from  'vuex';
    import appInput from './inputValid'
    import {API_URL} from '../constants';
    import axios from 'axios';
    export default {
        name: 'profileConfig',
        data () {
            return {
                msg: 'profileConfig',
                inputsArr:{ // Редактируемые поля профиля -- Ассоциативный массив для быстрого доступа к элементов
                  'surname-i':{
                    id: 'surname-i',
                    showError: '',
                    validFeedback: "",
                    invalidFeedback: "Фамилия введена неверно",
                    placeholder: "Фамилия",
                    type: "text",
                    required: "false",
                    pattern: /^[а-яА-Яa-zA-Z]{2,15}$/,
                    value: '',
                    isValid: false
                  },
                  'name-i':{
                    id: 'name-i',
                    showError: '',
                    validFeedback: "",
                    invalidFeedback: "Имя введено неверно",
                    placeholder: "Имя",
                    type: "text",
                    required: "false",
                    pattern: /^[а-яА-Яa-zA-Z]{2,15}$/,
                    value: '',
                    isValid: false
                  },
                  'lastName-i':{
                    id: 'lastName-i',
                    showError: '',
                    validFeedback: "",
                    invalidFeedback: "Отчество введено неверно",
                    placeholder: "Отчество",
                    type: "text",
                    required: "false",
                    pattern: /^[а-яА-Яa-zA-Z]{2,15}$/,
                    value: '',
                    isValid: false
                  },
                  'login-i':{
                    id: 'login-i',
                    showError: '',
                    validFeedback: "",
                    invalidFeedback: "Логин введён неверно",
                    placeholder: "Логин",
                    type: "text",
                    required: "true",
                    pattern: /^[a-zA-Z0-9_@.]{6,30}$/,
                    value: '',
                    isValid: false
                  },
                  //todo: добавить маску для телефона
                  'phone-i':{
                    id: 'phone-i',
                    showError: '',
                    validFeedback: "",
                    invalidFeedback: "Телефон введен неверно",
                    placeholder: "Телефон",
                    type: "tel",
                    required: "false",
                    pattern: /^[0-9()\-+]{1,11}$/,
                    value: '',
                    isValid: false
                  },
                  'site-i':{
                    id: 'site-i',
                    showError: '',
                    validFeedback: "",
                    invalidFeedback: "Сайт введен неверно",
                    placeholder: "Сайт",
                    type: "text",
                    required: "false",
                    pattern: /^[а-яА-Яa-zA-Z0-9_.\/#:]{5,100}$/,
                    value: '',
                    isValid: false
                  },
              },
            }
        },
        computed: {
          ...mapGetters('user',
            {
              avatar: 'avatar',
              userName: 'name',
              userRole: 'role',
              profile: 'profile',
              id: 'id'
            }),
        },
        components: {
          appInput
        },
        methods:{
          ...mapMutations('progress',{
            setProgStateWidth: 'setProgStateWidth',
            setProgShow: 'setProgShow',
            stepOneActive: 'stepOneActive',
            stepTwoActive: 'stepTwoActive',
            stepLastActive: 'stepLastActive',
          }),
          ...mapMutations('alerts',{
            setSuccesAlertShow: 'setSuccesAlertShow',
            setErrorAlertShow: 'setErrorAlertShow',
            setSuccesAlertMsg: 'setSuccesAlertMsg',
            setErrorAlertMsg: 'setErrorAlertMsg'
          }),
          updateUserProfile(){ 
            let payload = {
              profile:{
                surname: this.inputsArr['surname-i'].value,
                lastName: this.inputsArr['lastName-i'].value,
                login: this.inputsArr['login-i'].value,
                phone: this.inputsArr['phone-i'].value,
                site: this.inputsArr['site-i'].value
              },
              userName: this.inputsArr['name-i'].value = this.userName,
              id: this.id
            };
            //
            this.stepOneActive(); // прогрессбар
            axios({url: API_URL + '/login', data: payload, method: 'POST' })
              .then(resp => {
                const error = resp.data.error;
                this.stepLastActive(); // прогрессбар
                if(error){
                  this.stepLastActive();
                  let errorTxt = resp.data.data.msgClient;
                  this.setErrorAlertShow(true);
                  this.setErrorAlertMsg('Ошибка при обновлении профиля: ' + errorTxt);
                }else {
                  this.stepLastActive();
                  this.switcherActive = !this.switcherActive;
                  this.usersList[index].blocked = !this.usersList[index].blocked;
                  this.setSuccesAlertShow(true);
                  this.setSuccesAlertMsg('Профиль обновлён');
                }
              })
              .catch(err => {
                this.setErrorAlertShow(true);
                this.setErrorAlertMsg('Ошибка при обновлении профиля');
                console.log(err);
                this.stepLastActive();
              });
          },
          onChangeData(index, data){ // для компонента input
            this.inputsArr[index].value = data.value;
            this.inputsArr[index].isValid = data.valid;
          }
        },
        mounted(){
          //Задаём начальные значения
          this.inputsArr['surname-i'].value = this.profile.surname;
          this.inputsArr['name-i'].value = this.userName;
          this.inputsArr['lastName-i'].value = this.profile.lastName;
          this.inputsArr['login-i'].value = this.profile.login;
          this.inputsArr['phone-i'].value = this.profile.phone;
          this.inputsArr['site-i'].value = this.profile.site;
        }
    }
</script>

<style lang="sass">
    /*@import 'assets/sass/main.sass';*/
</style>
