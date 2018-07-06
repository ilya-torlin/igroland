<!--Вход пользователя-->
<template>
  <div class="login-c">
      <div class="logo-c">
        <img src="../assets/img/logo.png" alt="">
        <div class="txt-c">
          analyze-it
        </div>
      </div>
      <div class="form-c">
        <div class="row">
          <div class="col-md-12 mb-3">
            <div class="input-group">
              <!--<div class="input-group-prepend">-->
              <!--<span class="input-group-text">@</span>-->
              <!--</div>-->
              <input type="text" class="form-control" id="userLogin" placeholder="Введите логин" value="" required="">
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
              <!--<div class="input-group-prepend">-->
              <!--<span class="input-group-text">@</span>-->
              <!--</div>-->
              <input type="password" class="form-control" id="userPwd" placeholder="Введите пароль" value="" required="">
              <div class="valid-feedback">
                Отлично!
              </div>
              <div class="invalid-feedback">
                Логин введён неверно
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="btn-c">
              <button type="button" class="btn btn-success">Войти</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  <!--todo: добавить регистрацию, и восстановление пароля-->
</template>

<script>
    export default {
        name: 'app',
        data () {
            return {
                msg: 'TopKek'
            }
        }
    }
</script>

<style lang="sass">
/*@import '../assets/sass/main.sass'*/

.login-c
  width: 400px
  background: #ffffff
  padding: 30px
  margin: auto
  .logo-c
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    margin-top: 30px
    .txt-c
      font-size: 30px
      text-transform: uppercase
      font-weight: 300
      margin-top: 15px
      margin-bottom: 60px
  .btn-c
    display: flex
    justify-content: center
    align-items: center
    margin-top: 30px
    button
      width: 50%
      border-radius: 300px
  input
    text-align: center


</style>
