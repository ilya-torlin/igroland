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
              alert('Зарегался');
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
