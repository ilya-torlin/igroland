<template>
  <div id="app">
    <img src="src/assets/img/logo.png">

    <div class="container">
      <div class="row">
        <div class="col">
          <input type="text" v-model="msg">
        </div>
        <div class="col">
          <h1>
            {{msg}}
          </h1>
        </div>
      </div>
    </div>

    <appLogin @getLogin="doLogin"></appLogin>



  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        msg: 'TopKek'
      }
    },
    methods:{
      doLogin(){
        alert('Авторизация пользователя');
      }
    }
  }
</script>

<style lang="sass">
  @import 'assets/sass/main.sass';
</style>
