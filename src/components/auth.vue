<!--Шаблонный компонент-->
<template>
  <!--componentTemplate.vue-->
  <div class="container">
    <div class="row">
      <div class="col-12">
        <appLogin></appLogin>
        <!--<appSignup></appSignup>-->
      </div>
    </div>
  </div>
</template>

<script>

  import Vue from 'vue'
  import VueRouter from 'vue-router'

  import appLogin from './login.vue'
  import appSignup from './SignUp.vue'

  Vue.component('appLogin', appLogin);//
  Vue.component('appSignup', appSignup);//

  export default {
    name: 'auth',
    data () {
      return {
        msg: 'auth'
      }
    }
  }
</script>

<style lang="sass">
  
  /*@import 'assets/sass/main.sass';*/
</style>
