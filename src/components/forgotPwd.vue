<!--Восстановление пароля пользователя-->
<template>
  <!--forgotPwd.vue-->
  <div class="row">
    <div class="col-md-12 mb-3">
      <div class="input-group">
        <!--<div class="input-group-prepend">-->
        <!--<span class="input-group-text">@</span>-->
        <!--</div>-->
        <input type="email" class="form-control" placeholder="email *" value="" required="">
        <div class="valid-feedback">
          Отлично!
        </div>
        <div class="invalid-feedback">
          Email введён неверно
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="btn-c">
        <button type="button" class="btn btn-success">Восстановить пароль</button>
      </div>
    </div>

    <div class="col-12">
      <p class="login-quest">
        У вас уже есть аккаунт? <a href="" @click.prevent="$emit('changeStatus', {authStatus: 'login'})">Войдите!</a>
        Или <a href="" @click.prevent="$emit('changeStatus', {authStatus: 'signUp'})">Зарегистрируйтесь!</a>
        <br>
      </p>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'forgotPwd',
    data () {
      return {
        msg: 'forgotPwd'
      }
    }
  }
</script>

<style lang="sass">
  /*@import 'assets/sass/main.sass';*/
</style>
