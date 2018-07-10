
<template>
  <!--
  invalid-group - ошибка
  valid-group - всё норм
  -->
  <div class="input-group mb-3 " :class="validClass">
    <input  class="form-control"
            :type="type"
            :placeholder="placeholder"
            :value="value"
            @input="onInput">

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
    <!--<div class="valid-feedback">-->
    <!--{{validFeedback}}-->
    <!--</div>-->
    <div class="invalid-feedback">
      {{invalidFeedback}}
    </div>
  </div>
</template>

<script>
 /**
 * @param {string} validFeedback сообщение при корректном вводе данных
 * @param {string} invalidFeedback сообщение при некорректном вводе данных
 * @param {string} placeholder плейсхолдер
 * @param {string} required обязательное поле
 * @param {string} pattern регулярка для проверки вводимых данных
 * @param {string} value значение инпата
 *
 * */
  export default {
    name: 'inputValid',
    props: ['validFeedback', 'invalidFeedback', 'placeholder', 'required', 'pattern', 'value', 'type', 'isValid', 'showError'],
    data () {
      return {
        activated: this.value != '' // если пользователь что-то вводил
      }
    },
    computed: {
      validClass(){
        if(this.activated){
          return this.pattern.test(this.value) && !this.showError ?
            'valid-group' :
            'invalid-group';
        }else {
          return 'pendingCheck';
        }
      }
    },
    methods: {
     onInput(e){
       this.activated = true;

       this.$emit('changedata', {
         value: e.target.value,
         valid: this.pattern.test(e.target.value)
       });
     }
    }
  }
</script>

<style >

</style>
