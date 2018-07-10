<!--Окно авторизации-->
<template>
  <!--auth.vue-->
  <div class="login-cc custom-valid-s">
    <div class="login-c">
      <div class="logo-c">
        <img src="../assets/img/logo.png" alt="">
        <div class="txt-c">
          analyze-it
        </div>
      </div>
      <div class="form-c">
        <transition name="vue-fade" mode="out-in" >
          <appLogin v-if="authStatus == 'login'" @changeStatus="changeStatus"></appLogin>
          <appSignup v-if="authStatus == 'signUp'" @changeStatus="changeStatus"></appSignup>
          <appForgotPwd v-if="authStatus == 'forgotPwd'" @changeStatus="changeStatus"></appForgotPwd>
          <!--todo: внедрить компонент input во все формы/компоненты, вместо инпатов-->
        </transition>
      </div>
    </div>
  </div>
</template>

<script>

  import appLogin from './login.vue'
  import appSignup from './SignUp.vue'
  import appForgotPwd from './forgotPwd.vue'

  import {mapGetters} from 'vuex';

  export default {
    name: 'auth',
    data () {
      return {
        authStatus: 'login', // login, forgotPwd, signUp
      }
    },
    methods:{
      changeStatus(status){
        console.log('status', status);
        this.authStatus = status.authStatus;
      }
    },
    components:{
      appLogin,
      appSignup,
      appForgotPwd
    },
    computed: {

    },
    mounted(){

    }
  }
</script>

<style lang="sass">

  /*@import 'assets/sass/main.sass';*/
</style>
