<!--Регистрация пользователя-->
<template>
  <!--signUp.vue-->
  <div class="row">
    <div class="col-md-12 mb-3">
      <appInput v-for="(elem, index) in inputsArr" :key="index"
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
    <div class="col-12">
      <div class="btn-c">
        <button type="button" class="btn btn-success" @click="getSignUp">Зарегистрироваться</button>
      </div>
    </div>
    <div class="col-12">
      <p class="login-quest">
        У вас уже есть аккаунт? <a href="" @click.prevent="$emit('changeStatus', {authStatus: 'login'})">Войдите!</a>
        <br>
        <a href="" @click.prevent="$emit('changeStatus', {authStatus: 'forgotPwd'})">
          Забыли пароль?
        </a>
      </p>
    </div>
  </div>
</template>

<script>
  import appInput from './inputValid'
  import axios from 'axios';
  import {mapGetters} from 'vuex';
  import {mapMutations} from  'vuex';
  import {API_URL} from '../constants';
  import {AUTH_REQUEST} from '../store/actions/auth' //Если не получиться поменять путь

    export default {
        name: 'SignUp',
        data () {
            return {
              inputsArr:[
                {
                  validFeedback: "",
                  invalidFeedback: "Email введён неверно",
                  placeholder: "Email",
                  type: "text",
                  required: "true",
                  pattern: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                  value: '',
                  isValid: false,
                  showError: false
                },
                {
                  validFeedback: "",
                  invalidFeedback: "Логин введён неверно",
                  placeholder: "Логин",
                  type: "text",
                  required: "true",
                  pattern: /^[a-zA-Z0-9_@.]{6,30}$/,
                  value: '',
                  isValid: false,
                  showError: false
                },
                {
                  id: 'pwd',
                  validFeedback: "",
                  invalidFeedback: "Пароль введён неверно",
                  placeholder: "Пароль",
                  type: "password",
                  required: "true",
                  pattern: /^[0-9a-zA-Z!@#$%^&*]{6,}$/,
                  value: '',
                  isValid: false,
                  showError: false
                },
                {
                  id: 'cfpwd',
                  validFeedback: "",
                  invalidFeedback: "Пароли не совпадают",
                  placeholder: "Подтвердите пароль",
                  type: "password",
                  required: "true",
                  pattern: /^[0-9a-zA-Z!@#$%^&*]{6,}$/,
                  value: '',
                  isValid: false,
                  showError: false
                }
              ]
            }
        },
        components:{
          appInput
        },
        computed: {
          formValid(){
            let isValid = this.inputsArr[0].isValid;
            for(let item of this.inputsArr){
              isValid = isValid && item.isValid;
            }
            return isValid;
          }
        },
        methods: {
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
          getSignUp(){
            let pwdVal, confirmVal, samePwd = false;
            for(let item of this.inputsArr){
              if(item.id === 'pwd'){
                pwdVal = item;
              }
              if(item.id === 'cfpwd'){
                confirmVal = item;
              }
              if(!item.isValid){
                item.showError = true;
              }
            }
            if(pwdVal.value === confirmVal.value){
              samePwd = true;
            }
            if(!samePwd){
              confirmVal.showError = true;
            }
            if(this.formValid && samePwd){
              let payload = {
                email: this.inputsArr[0].value,
                login: this.inputsArr[1].value,
                password: pwdVal.value,
              };
              this.stepOneActive(); // прогрессбар
              //Форма заполненна правильно, сделать запрос на сервер для регистрации
              axios({url: API_URL + '/login/registration', data: payload, method: 'POST' })
                .then(resp => {
                  const error = resp.data.error;
                  this.stepLastActive(); // прогрессбар
                  if(error){
                    this.stepLastActive();
                    let errorTxt = resp.data.data.msgClient;
                    this.setErrorAlertShow(true);
                    this.setErrorAlertMsg('Ошибка при регистрации пользователя: ' + errorTxt);
                  }else {
                    this.stepLastActive();
                    this.setSuccesAlertShow(true);
                    this.setSuccesAlertMsg('Пользователь зарегистрирован');
                    //авторизуем пользователя
                    // let username = payload.email;
                    // let password = payload.password;
                    // const loginData = { email: username, password: password };
                    //Action в Vuex возвращает Promise
                      this.$store.dispatch(AUTH_REQUEST, payload).then(promSucces => {
                      this.$store.commit('config/setHeaderStatus', true);
                      this.$router.push({name: 'profileconfig'});
                      console.log('Авторизовался');
                    }, promError => {
                      let errorTxt = promError.data.msgClient;
                      this.setErrorAlertShow(true);
                      this.setErrorAlertMsg('Ошибка при авторизации пользователя пользователя: ' + errorTxt);
                      console.error('Login err', promError);
                    });

                  }
                })
                .catch(err => {
                  this.setErrorAlertShow(true);
                  this.setErrorAlertMsg('Ошибка при регистрации пользователя');
                  console.log(err);
                  this.stepLastActive();
                });
            }else{
              alert('Ошибка в форме');
            }
          },
          onChangeData(index, data){ // для компонента input
            this.inputsArr[index].value = data.value;
            this.inputsArr[index].isValid = data.valid;
            if(data.valid){
              this.inputsArr[index].showError = false;
            }
          }
        }
    }
</script>

<style lang="sass">
    /*@import 'assets/sass/main.sass';*/
</style>
