<!--Шаблонный компонент-->
<template>
  <!--componentTemplate.vue-->
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>
          {{msg}}
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'E404',
    data () {
      return {
        msg: 'Страница не найдена'
      }
    }
  }
</script>

<style lang="sass">
  /*@import 'assets/sass/main.sass';*/
</style>
