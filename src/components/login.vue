<!--Вход пользователя-->
<template>
  <div class="row">
    <div class="col-md-12 ">
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
        <button type="button" class="btn btn-success" @click="getLogIn">Войти</button>
      </div>
    </div>
    <div class="col-12">
      <p class="login-quest">
        У вас нет аккаунта? <a href="" @click.prevent="$emit('changeStatus', {authStatus: 'signUp'})">Зарегистрируйтесь!</a>
        <br>
        <a href="" @click.prevent="$emit('changeStatus', {authStatus: 'forgotPwd'})">
          Забыли пароль?
        </a>
      </p>
    </div>

    <!-- Modal -->
    <div class="modal fade warning-modal" id="errorLoginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                Внимание
              </div>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            {{errorText}}
          </div>
          <div class="modal-footer">
            <!--<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>-->
            <button type="button" class="btn btn-success" data-dismiss="modal" @click="$emit('changeStatus', {authStatus: 'login'});">ОК</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {mapMutations} from 'vuex';

  import appInput from './inputValid';
  import {AUTH_REQUEST} from '../store/actions/auth'

  export default {
    name: 'login',
    data () {
      return {
        inputsArr:[//используется в profileConfig.vue
          { //
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
          {
            id: 'pwd-i',
            showError: '',
            validFeedback: "",
            invalidFeedback: "Пароль введён неверно",
            placeholder: "Пароль",
            type: "password",
            required: "true",
            pattern: /^[0-9a-zA-Z!@#$%^&*]{6,}$/,
            value: '',
            isValid: false
          }
        ],
        errorText: 'Произошла ошибка при заполнении формы'
      }
    },
    computed:{
      formValid(){
        let isValid = this.inputsArr[0].isValid;
        for(let item of this.inputsArr){
          isValid = isValid && item.isValid;
        }
        return isValid;
      }
    },
    components:{
      appInput
    },
    methods: {
      getLogIn(){
        if(this.formValid){
          let username = this.inputsArr[0].value;
          let password = this.inputsArr[1].value;
          const loginData = { email: username, password: password };
          //Action в Vuex возвращает Promise
          this.$store.dispatch(AUTH_REQUEST, loginData).then(promSucces => {
            this.$store.commit('config/setHeaderStatus', true);
            this.$router.push({name: 'profileconfig'});
          }, promError => {
            this.errorText = promError.data.msgClient;

            // for(let item of this.inputsArr){
            //   item.showError = true;
            // }

            $('#errorLoginModal').modal();
            console.error('Login err', promError);
          });
        }else{
          let index = 0;
          for(let item of this.inputsArr){
            item.valid = item.isValid;
            this.onChangeData(index, item);
            if(!item.isValid){
               item.showError = true;
            }
            index++;
          }
        }
      },
      onChangeData(index, data){ // для компонента input
        this.inputsArr[index].value = data.value;
        this.inputsArr[index].isValid = data.valid;
      }
    }
  }
</script>

<style lang="sass">
/*@import '../assets/sass/main.sass'*/

</style>
