<template>
  <div id="app">
    <div class="progress-axios" :style="{'width' : progStateWidth + '%'}" :class="{'isActive': progShow}" >

    </div>
    <appHeader></appHeader>

    <div class="container">
      <div class="row">
        <!--<div class="col-12">-->
        <!--<appUiKit></appUiKit>-->
        <!--</div>-->
        <div class="col-12">
          <!-- отображаем тут компонент, для которого совпадает маршрут -->
          <transition name="vue-fade" mode="out-in">
            <router-view>
            </router-view>
          </transition>
        </div>
      </div>
    </div>
    <!--alerts-->
    <div class="fixed-alert-c">
      <appAlerts v-for="(error,index) in errorAlert" :message="error" :alertClass="true" :key="'d'+index"></appAlerts>
      <appAlerts v-for="(success,index) in succesAlert" :message="success" :alertClass="false" :key="'s'+index"></appAlerts>
    </div>
  </div>
</template>

<script>

  import {mapGetters} from 'vuex';
  import {mapMutations} from 'vuex';
  import {mapActions} from 'vuex';
  import {SUCCES_AUTH_STATUS} from './constants';

  import appHeader from './components/header'
  import appAlerts from './components/alerts'

  export default {
    name: 'appSPA',
    data () {
      return {
        msg: 'mainSPA'
      }
    },
    methods:{
      ...mapMutations('progress',{
        setProgStateWidth: 'setProgStateWidth',
        setProgShow: 'setProgShow'
      }),
      ...mapActions('alerts',{
        setErrorAlertMsg: 'setErrorAlertMsg',
        setSuccessAlertMsg: 'setSuccessAlertMsg',
      }),
      ...mapActions('user',{
        userRequest: 'USER_REQUEST',
      }),
      // authRedirect(){ // редирект при разном статусе авторизации пользователя
      //   if(this.logedIn){
      //     this.$router.push({name: 'catalog'});
      //     this.$store.commit('config/setHeaderStatus', true);
      //   }else{
      //     this.$router.push({name: 'auth'});
      //     this.$store.commit('config/setHeaderStatus', false);
      //   }
      // }
    },
    components:{
      appHeader,
      appAlerts
    },
    computed: {
      ...mapGetters('user', {
        authStatus: 'status',
      }),
      ...mapGetters('progress', {
        progStateWidth: 'progStateWidth',
        progShow: 'progShow'
      }),
      ...mapGetters('alerts', {
        succesAlert: 'succesAlert',
        errorAlert: 'errorAlert'
      }),
    },
    mounted(){
      $('[data-toggle="tooltip"]').tooltip();
      //вызываем метод для запроса информации о пользователе
      if(this.authStatus === SUCCES_AUTH_STATUS)
        this.userRequest()
          .then(result => {
            this.setSuccessAlertMsg('Добро пожаловать, ' + result.data.data.login);
          })
          .catch(error => {
            this.setErrorAlertMsg(error.message);
          });
    }
  }

</script>

<style lang="sass">
  @import 'assets/libs/jQueryFormStyler-master/dist/jquery.formstyler.css'
  @import 'assets/libs/jQueryFormStyler-master/dist/jquery.formstyler.theme.css'

  @import 'assets/sass/main.sass'
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&subset=cyrillic,cyrillic-ext')

  @import "../node_modules/animate.css/animate.min.css"

</style>
