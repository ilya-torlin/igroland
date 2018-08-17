<!--Переключатель-->
<template>
  <!--switcher.vue-->
  <div class="switcher-c" :class="{'is-active':switcherActive}" @click="doSwitch">
    <div class="switcher-i">

    </div>
    <div class="txt-sw">
      {{txt}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'switcher',
    props: ['txt', 'switcherActive'],
    data () {
      return {
      }
    },
    methods:{
      //вызов события переключения
      doSwitch(){
        this.$emit('switchToogle', {
          switcherActive: !this.switcherActive
        });
      }
    }
  }
</script>

<style lang="sass">
  /*@import 'assets/sass/main.sass';*/
</style>
