<!--Регистрация пользователя-->
<template>
  <!--signUp.vue-->
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
          Пароль введён неверно
        </div>
      </div>
    </div>
    <div class="col-md-12 mb-3">
      <div class="input-group">
        <!--<div class="input-group-prepend">-->
        <!--<span class="input-group-text">@</span>-->
        <!--</div>-->
        <input type="text" class="form-control" placeholder="логин" value="">
        <div class="valid-feedback">
          Отлично!
        </div>
        <div class="invalid-feedback">
          Логин введён неверно
        </div>
      </div>
    </div>
    <div class="col-md-12 mb-3">
      <div class="input-group">
        <input type="password" class="form-control" id="userPwd" placeholder="пароль *" value="" required="">
        <div class="valid-feedback">
          Отлично!
        </div>
        <div class="invalid-feedback">
          Пароль введён неверно
        </div>
      </div>
    </div>
    <div class="col-md-12 mb-3">
      <div class="input-group">
        <input type="password" class="form-control" placeholder="подтвердите пароль *" value="" required="">
        <div class="valid-feedback">
          Отлично!
        </div>
        <div class="invalid-feedback">
          Пароли не совпадают
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="btn-c">
        <button type="button" class="btn btn-success">Зарегистрироваться</button>
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
    export default {
        name: 'SignUp',
        data () {
            return {
                msg: 'SignUp'
            }
        }
    }
</script>

<style lang="sass">
    /*@import 'assets/sass/main.sass';*/
</style>
