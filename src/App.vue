<template>
  <div id="app">
    <section class="header">
      <div class="container header-c">
        <div class="row header-r">
          <div class="col-12">
            <div class="menu-header">
              <div class="logo-c">
                <img src="src/assets/img/logo.png">
              </div>
              <ul class="menu-ul">
                <li>
                  <router-link to="/dashboard">
                    DashBoard
                  </router-link>
                </li>
                <li>
                  <router-link to="/catalog">
                    Каталоги
                  </router-link>
                </li>
                <li>
                  <router-link to="/provider">
                    Поставщики
                  </router-link>
                </li>
                <li>
                  <router-link to="/users">
                    Пользователи
                  </router-link>
                </li>
                <li>
                  <router-link to="/attachments">
                    Приложения
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--<appLogin @getLogin="doLogin"></appLogin>-->

    <div class="container">
      <div class="row">
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
