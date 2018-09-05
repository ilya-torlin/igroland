<!--Сообщения для пользователя, выводиться на всех страницах-->
<template>
  <!--alerts.vue-->
    <transition mode="out-in"
                enter-active-class="animated bounceInRight"
                leave-active-class="animated bounceOutRight">
      <div v-show="message.show" :class="alertClass ? 'alert-danger' : 'alert-success'" class="alert alert-dismissible fade show" role="alert">
        <div class="svg-c">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="23px" height="23px">
            <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                  d="M11.500,23.000 C5.149,23.000 0.000,17.851 0.000,11.500 C0.000,5.149 5.149,-0.000 11.500,-0.000 C17.851,-0.000 23.000,5.149 23.000,11.500 C23.000,17.851 17.851,23.000 11.500,23.000 ZM13.000,6.500 C13.000,5.672 12.328,5.000 11.500,5.000 C10.672,5.000 10.000,5.672 10.000,6.500 L10.000,12.500 C10.000,13.328 10.672,14.000 11.500,14.000 C12.328,14.000 13.000,13.328 13.000,12.500 L13.000,6.500 ZM11.500,15.000 C10.672,15.000 10.000,15.672 10.000,16.500 C10.000,17.328 10.672,18.000 11.500,18.000 C12.328,18.000 13.000,17.328 13.000,16.500 C13.000,15.672 12.328,15.000 11.500,15.000 Z"/>
          </svg>
        </div>
        {{message.msg}}
        <button type="button" class="close"  aria-label="Close" @click="closeAlert">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </transition>
</template>


<script>

  import {mapMutations} from 'vuex';

  export default {
    name: 'alerts',
    data () {
      return {

      }
    },
    props:[
      'message',
      'alertClass',
    ],
    methods: {
      ...mapMutations('alerts',{
        setErrorAlertShow: 'setErrorAlertShow',
        setSuccessAlertShow: 'setSuccessAlertShow',
      }),
      closeAlert(){
        (this.alertClass) ? this.setErrorAlertShow(false) : this.setSuccessAlertShow(false);
      },
    }
  }
</script>

<style lang="sass">
  /*@import 'assets/sass/main.sass';*/
</style>
