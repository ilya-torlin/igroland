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

  </div>

  <!--todo: добавить регистрацию, и восстановление пароля-->
</template>

<script>
  import {mapGetters} from 'vuex';
  import {mapMutations} from 'vuex';

  import appInput from './input';

  export default {
    name: 'login',
    data () {
      return {
        inputsArr:[
          {
            validFeedback: "",
            invalidFeedback: "Логин введён неверно",
            placeholder: "Логин",
            type: "text",
            required: "true",
            pattern: /^[a-zA-Z0-9_]{6,30}$/,
            value: ''
          },
          {
            validFeedback: "",
            invalidFeedback: "Пароль введён неверно",
            placeholder: "Пароль",
            type: "password",
            required: "true",
            pattern: /^[0-9a-zA-Z!@#$%^&*]{6,}$/,
            value: ''
          }
        ]
      }
    },
    computed:{
      ...mapGetters([
        'price'
      ]),
    },
    components:{
      appInput
    },
    methods: {
      ...mapMutations([
        'setHeaderStatus',
        'setlogedIn'
      ]),
      getLogIn(){
        this.$store.commit('setHeaderStatus', true);
        this.$store.commit('setlogedIn', true);

      },
      onChangeData(index, data){ // для компонента input
        this.inputsArr[index].value = data.value;
      }
    }
  }
</script>

<style lang="sass">
/*@import '../assets/sass/main.sass'*/

</style>
