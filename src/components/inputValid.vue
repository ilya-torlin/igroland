
<template>
  <!--
  invalid-group - ошибка
  valid-group - всё норм
  -->
  <div>
    <div class="input-group mb-3" :class="validClass" :cont="input.placeholder" v-if="input.type === 'select'">
      <div style="width:100%">
        <multiselect
          :value="selectedFind"
          :options="input.options"
          :multiple="false"
          :close-on-select="true"
          :allow-empty="false"
          :searchable="false"
          :placeholder="input.placeholder"
          selectedLabel="Выбрано"
          label="name"
          track-by="id"
          selectLabel="Выбрать"
          deselectLabel=""
          @input = "onInputSelect" >
        </multiselect>
      </div>
      <div class="invalid-feedback">
        {{input.invalidFeedback}}
      </div>
    </div>
    <div class="input-group mb-3" :class="validClass" :cont="input.placeholder" v-else>
      <input  class="form-control"
              :type="input.type"
              :placeholder="input.placeholder"
              :value="input.value"
              @input="onInput">

      <div class="invalid-feedback">
        {{input.invalidFeedback}}
      </div>
    </div>
  </div>
</template>

<script>
 import Multiselect from 'vue-multiselect';

  export default {
    name: 'inputValid',
    props: ['input', 'validFeedback', 'invalidFeedback', 'placeholder', 'required', 'pattern', 'value', 'type', 'isValid', 'showError'],
    data () {
      return {
        selectedFind:null,
        activated: this.input.value != '' // если пользователь что-то вводил
      }
    },
    components:{
      multiselect: Multiselect
    },
    computed: {
      validClass(){
        if(this.activated){
          return this.input.pattern.test(this.input.value) && !this.input.showError ?
            'valid-group' :
            'invalid-group';
        }else {
          return 'pendingCheck';
        }
      },
      maskedValue(){
        let value = this.input.value;
        if (this.input.type === 'tel'){
          let x = value.replace(/\D/g, '').match(/(\d)(\d{0,3})(\d{0,3})(\d{0,4})/);
          return !x ? '' : x[1] + (!x[2] ? '' : '(' + x[2] + ')' + ( !x[3] ? '' : x[3] + ( !x[4] ? '' : '-' + x[4] ) ) ) ;
        }
        return value;
      },
    },
    methods: {
      //вызывается при изменении инпата
      onInput(e){
         this.activated = true;
         this.$emit('changedata', {
           value: e.target.value,
           valid: this.input.pattern.test(e.target.value)
         });
       },
      onInputSelect(event){
        let selectedType = {
          name: event.name,
          id: event.id
        };
        this.selectedFind = selectedType;
        this.$emit('changedata', {
          value: selectedType,
          valid: this.input.pattern.test(event.name)
        });
      },
    }
  }
</script>

<style >
  @import '../../node_modules/vue-multiselect/dist/vue-multiselect.min.css';
</style>
