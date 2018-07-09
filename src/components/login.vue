<!--Вход пользователя-->
<template>
  <div class="row">
    <div class="col-md-12 mb-3">
      <div class="input-group">
        <!--<div class="input-group-prepend">-->
        <!--<span class="input-group-text">@</span>-->
        <!--</div>-->
        <input type="text" class="form-control" id="userLogin" placeholder="Введите логин" value="" required="">

        <!--todo: Сделать каждый инпат как отдельный компонент, для упращения валидации
            todo: Для инпатов создать массив инпатов со значениями, и выводить компонент через v-for
            f.e. <input-component v-for="(singleInput, index) in inputsArr" :key="index"><input-component>
            todo: данные в компонент передавать через :atribute , в самом компоненте прописать - props: ['atribute']
            в инпате у дочернего компонента, НЕ прописывать v-bind, использовать event @input="someMethod", и объявить someMethod() у дочернего компонента

            урок 5 41:00:00 - Про принцип однонаправленного потока данных
              все параметры будем хранить в родительском компоненте
                изменение данных идёт за счёт назначения событий через emit внутри дочернего компонента
                все данные изменяет родительский компонент, и передаёт их в дочерний через атрибуты компонента при его вызове
                дочерний компонент не должен менять свойства родительского компонента, всё меняется за счёт вызова ивентов
                не надо передовать в компонент родительский объект, т.к. в объекте есть ссылка ссылка, и при его изменении в дочернем компоненте, он будет меняться и в родительском (это уже не однонаправленый поток данных)

        -->

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

  </div>

  <!--todo: добавить регистрацию, и восстановление пароля-->
</template>

<script>
  import {mapGetters} from 'vuex';
  import {mapMutations} from 'vuex';


  export default {
    name: 'login',
    data () {
        return {

        }
    },
    computed:{
      ...mapGetters([
        'price'
      ]),
    },
    methods: {
      ...mapMutations([
        'setHeaderStatus',
        'setlogedIn'
      ]),
      getLogIn(){
        this.$store.commit('setHeaderStatus', true);
        this.$store.commit('setlogedIn', true);

      }
    }
  }
</script>

<style lang="sass">
/*@import '../assets/sass/main.sass'*/

</style>
