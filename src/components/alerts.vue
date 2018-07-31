<!--Сообщения для пользователя, выводиться на всех страницах-->
<template>
  <!--alerts.vue-->
    <div class="fixed-alert-c">
      <transition mode="out-in"
                  enter-active-class="animated bounceInRight"
                  leave-active-class="animated bounceOutRight">
        <div v-show="errorAlert.show" class="alert alert-danger alert-dismissible fade show" role="alert">
          <div class="svg-c">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="23px" height="23px">
              <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                    d="M11.500,23.000 C5.149,23.000 0.000,17.851 0.000,11.500 C0.000,5.149 5.149,-0.000 11.500,-0.000 C17.851,-0.000 23.000,5.149 23.000,11.500 C23.000,17.851 17.851,23.000 11.500,23.000 ZM13.000,6.500 C13.000,5.672 12.328,5.000 11.500,5.000 C10.672,5.000 10.000,5.672 10.000,6.500 L10.000,12.500 C10.000,13.328 10.672,14.000 11.500,14.000 C12.328,14.000 13.000,13.328 13.000,12.500 L13.000,6.500 ZM11.500,15.000 C10.672,15.000 10.000,15.672 10.000,16.500 C10.000,17.328 10.672,18.000 11.500,18.000 C12.328,18.000 13.000,17.328 13.000,16.500 C13.000,15.672 12.328,15.000 11.500,15.000 Z"/>
            </svg>
          </div>
          {{errorAlert.msg}}
          <button type="button" class="close"  aria-label="Close" @click="closeErrAlert">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </transition>
      <transition mode="out-in"
                  enter-active-class="animated bounceInRight"
                  leave-active-class="animated bounceOutRight">
        <div v-show="succesAlert.show" class="alert alert-success alert-dismissible fade show" role="alert">
          <div class="svg-c">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="23px" height="23px">
              <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                    d="M11.500,23.000 C5.149,23.000 -0.000,17.851 -0.000,11.500 C-0.000,5.149 5.149,-0.000 11.500,-0.000 C17.851,-0.000 23.000,5.149 23.000,11.500 C23.000,17.851 17.851,23.000 11.500,23.000 ZM17.557,7.414 C16.968,6.849 16.014,6.849 15.425,7.414 L10.064,12.505 L8.533,11.080 C7.944,10.516 6.990,10.516 6.401,11.080 C5.812,11.646 5.812,12.561 6.401,13.126 L8.998,15.573 C9.587,16.138 10.541,16.138 11.130,15.573 L17.557,9.460 C18.145,8.895 18.145,7.979 17.557,7.414 Z"/>
            </svg>
          </div>
          {{succesAlert.msg}}
          <button type="button" class="close"  aria-label="Close" @click="closeSuccessAlert">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </transition>
    </div>
</template>


<script>

  import {mapGetters} from 'vuex';
  import {mapMutations} from 'vuex';

  export default {
    name: 'alerts',
    data () {
      return {

      }
    },
    computed: {
      ...mapGetters('alerts',
      {
        succesAlert: 'succesAlert',
        errorAlert: 'errorAlert'
      })
    },
    methods: {
      ...mapMutations('alerts',{
        setSuccesAlertShow: 'setSuccesAlertShow',
        setErrorAlertShow: 'setErrorAlertShow',
        setSuccesAlertMsg: 'setSuccesAlertMsg',
        setErrorAlertMsg: 'setErrorAlertMsg'
      }),
      closeErrAlert(){
        this.setErrorAlertShow(false);
        // this.$store.commit('alerts/setErrorAlert', tmp);
      },
      closeSuccessAlert(){
        this.setSuccesAlertShow(false);
        // this.$store.commit('alerts/setErrorAlert', tmp);
      }
    }
  }
</script>

<style lang="sass">
  /*@import 'assets/sass/main.sass';*/
</style>
