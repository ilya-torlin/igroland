<!--Восстановление пароля пользователя-->
<template>
  <!--forgotPwd.vue-->
  <div class="row">
    <div class="col-md-12 mb-3">
      <appInput v-for="(elem, index) in inputsArr" :key="index"
                :input="elem"
                @changedata="onChangeData(index, $event)"
      >
      </appInput>
    </div>
    <div class="col-12">
      <div class="btn-c">
        <button type="button" class="btn btn-success" @click="getRefreshPwd">Восстановить пароль</button>
      </div>
    </div>

    <div class="col-12">
      <p class="login-quest">
        У вас уже есть аккаунт? <a href="" @click.prevent="$emit('changeStatus', {authStatus: 'login'})">Войдите!</a>
        Или <a href="" @click.prevent="$emit('changeStatus', {authStatus: 'signUp'})">Зарегистрируйтесь!</a>
        <br>
      </p>
    </div>

    <!-- Modal -->
    <div class="modal fade warning-modal" id="sendEmailModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
            {{modalText}}
          </div>
          <div class="modal-footer">
            <!--<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>-->
            <button type="button" class="btn btn-success" data-dismiss="modal" @click="$emit('changeStatus', {authStatus: 'login'});">Спасибо</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
  import appInput from './inputValid'
  import axios from 'axios'
  import {API_URL} from '../constants'


  export default {
    name: 'forgotPwd',
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
          }
        ],
        modalText: 'Письмо для восстановления пароля отправленно на указанный Email'
      }
    },
    components:{
      appInput
    },
    computed:{
      formValid(){
        let isValid = this.inputsArr[0].isValid;
        return isValid;
      }
    },
    methods: {
      //Востановление пароля
      getRefreshPwd(){
        if(this.formValid){
          $('#sendEmailModal').modal();
          // this.$router.push({ path: '', redirect: {name: 'catalog'}});

          let restorePromise = axios({url: API_URL + '/login/restore', data: {email: this.inputsArr[0].value}, method: 'POST' })
            .then(resp => {
              const error = resp.data.error;
              if(error){
                console.log('resp.data = ', resp.data);
                this.modalText = resp.data.data.msgClient;
              }else {
                this.modalText = 'Письмо для восстановления пароля отправленно на указанный Email';
              }
            });
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
