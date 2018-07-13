<template>
  <div id="app">

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
  </div>
</template>

<script>

  import {mapGetters} from 'vuex'; // Теперь можно писать {{getterNameFromStore}}, Предварительно передать mapGetters в computed

  import appHeader from './components/header'

  export default {
    name: 'app',
    data () {
      return {
        msg: 'TopKek',
      }
    },
    methods:{
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
      appHeader
    },
    computed: {
      ...mapGetters('user', {
        logedIn: 'logedIn'
      }),
    },
    mounted(){
      $('[data-toggle="tooltip"]').tooltip();
    }
  }

</script>

<style lang="sass">
  @import 'assets/libs/jQueryFormStyler-master/dist/jquery.formstyler.css'
  @import 'assets/libs/jQueryFormStyler-master/dist/jquery.formstyler.theme.css'

  @import 'assets/sass/main.sass'
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&subset=cyrillic,cyrillic-ext')
</style>
