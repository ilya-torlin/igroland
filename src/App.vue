<template>
  <div id="app">
    <section class="header">
      <div class="container header-c">
        <div class="row header-r">
          <div class="col-12 col-md-8">
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
          <div class="col-12 col-md-4">
            <div class="h-user-c">
              <div class="h-user-info">
                <div class="btn-c">
                  <button type="button" class="round-inf" data-toggle="tooltip" data-placement="bottom" data-original-title="Какая-то инфа">
                    <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="23px" height="23px">
                      <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                            d="M11.500,23.000 C5.149,23.000 0.000,17.851 0.000,11.500 C0.000,5.149 5.149,-0.000 11.500,-0.000 C17.851,-0.000 23.000,5.149 23.000,11.500 C23.000,17.851 17.851,23.000 11.500,23.000 ZM11.500,5.000 C10.672,5.000 10.000,5.671 10.000,6.500 C10.000,7.328 10.672,8.000 11.500,8.000 C12.328,8.000 13.000,7.328 13.000,6.500 C13.000,5.671 12.328,5.000 11.500,5.000 ZM13.000,10.500 C13.000,9.671 12.328,9.000 11.500,9.000 C10.672,9.000 10.000,9.671 10.000,10.500 L10.000,16.500 C10.000,17.328 10.672,18.000 11.500,18.000 C12.328,18.000 13.000,17.328 13.000,16.500 L13.000,10.500 Z"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="h-user-profile">
                <div class="user-discr flex-center">
                  <div class="ava-c">
                    <img src="src/assets/img/logo.png" alt="Имя пользователя">
                  </div>
                  <div class="user-info">
                    <div class="h-user-name">
                      User
                    </div>
                    <div class="h-user-role">
                      Administrator
                    </div>
                  </div>
                </div>
                <div class="config-btn-c flex-center">
                  <router-link class="btn-icon-tr" to="/profileconfig" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Настройки профиля">
                    <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="24px" height="24px">
                      <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                            d="M23.000,14.001 L20.749,14.001 C20.521,14.997 20.113,15.920 19.588,16.760 L21.192,18.365 C21.583,18.755 21.583,19.388 21.192,19.779 L19.778,21.193 C19.388,21.583 18.755,21.583 18.364,21.193 L16.769,19.597 C15.927,20.130 15.002,20.542 14.000,20.770 L14.000,23.001 C14.000,23.553 13.552,24.001 13.000,24.001 L11.000,24.001 C10.448,24.001 10.000,23.553 10.000,23.001 L10.000,20.770 C8.998,20.542 8.073,20.130 7.232,19.597 L5.636,21.193 C5.246,21.583 4.612,21.583 4.222,21.193 L2.808,19.779 C2.417,19.388 2.417,18.755 2.808,18.365 L4.412,16.760 C3.887,15.920 3.479,14.997 3.251,14.001 L1.000,14.001 C0.448,14.001 0.000,13.553 0.000,13.001 L0.000,11.001 C0.000,10.448 0.448,10.001 1.000,10.001 L3.251,10.001 C3.479,9.004 3.887,8.082 4.412,7.241 L2.808,5.637 C2.417,5.246 2.417,4.613 2.808,4.223 L4.222,2.808 C4.612,2.418 5.246,2.418 5.636,2.808 L7.232,4.404 C8.073,3.872 8.998,3.460 10.000,3.231 L10.000,1.001 C10.000,0.448 10.448,0.001 11.000,0.001 L13.000,0.001 C13.552,0.001 14.000,0.448 14.000,1.001 L14.000,3.231 C15.002,3.460 15.927,3.872 16.769,4.404 L18.364,2.808 C18.755,2.418 19.388,2.418 19.778,2.808 L21.192,4.223 C21.583,4.613 21.583,5.246 21.192,5.637 L19.588,7.241 C20.113,8.082 20.521,9.004 20.749,10.001 L23.000,10.001 C23.552,10.001 24.000,10.448 24.000,11.001 L24.000,13.001 C24.000,13.553 23.552,14.001 23.000,14.001 ZM12.000,6.001 C8.686,6.001 6.000,8.687 6.000,12.000 C6.000,15.315 8.686,18.001 12.000,18.001 C15.314,18.001 18.000,15.315 18.000,12.000 C18.000,8.687 15.314,6.001 12.000,6.001 ZM12.000,15.001 C10.343,15.001 9.000,13.657 9.000,12.000 C9.000,10.344 10.343,9.000 12.000,9.000 C13.657,9.000 15.000,10.344 15.000,12.000 C15.000,13.657 13.657,15.001 12.000,15.001 Z"/>
                    </svg>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--<appLogin @getLogin="doLogin"></appLogin>-->

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
    },
    mounted(){
      //init bootstrap tooltips
      $(function () {
        $('[data-toggle="tooltip"]').tooltip();
      });
    }
  }
</script>

<style lang="sass">
  @import 'assets/sass/main.sass';
</style>
