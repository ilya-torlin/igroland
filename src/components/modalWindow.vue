<!--Модальное окно-->
<template>
    <!--modalWindow.vue-->
    <div class="modal fade warning-modal" v-bind:id="keyId" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">
              <div class="svg-c" v-show="deleteIcon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="23px" height="23px">
                  <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                        d="M11.500,23.000 C5.149,23.000 0.000,17.851 0.000,11.500 C0.000,5.149 5.149,-0.000 11.500,-0.000 C17.851,-0.000 23.000,5.149 23.000,11.500 C23.000,17.851 17.851,23.000 11.500,23.000 ZM11.500,5.000 C10.672,5.000 10.000,5.671 10.000,6.500 C10.000,7.328 10.672,8.000 11.500,8.000 C12.328,8.000 13.000,7.328 13.000,6.500 C13.000,5.671 12.328,5.000 11.500,5.000 ZM13.000,10.500 C13.000,9.671 12.328,9.000 11.500,9.000 C10.672,9.000 10.000,9.671 10.000,10.500 L10.000,16.500 C10.000,17.328 10.672,18.000 11.500,18.000 C12.328,18.000 13.000,17.328 13.000,16.500 L13.000,10.500 Z"/>
                </svg>
              </div>
              <div class="txt">
                {{ headerText }}
              </div>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" v-if="!isNotifyModal">
            <appInput v-for="(elem, index) in inputsArr" :key="index"
                      :validFeedback="elem.validFeedback"
                      :invalidFeedback="elem.invalidFeedback"
                      :placeholder="elem.placeholder"
                      :required="elem.required"
                      :pattern="elem.pattern"
                      :type="elem.type"
                      :value="elem.value"
                      :isValid="elem.isValid"
                      :showError="elem.showError"
                      @changedata="onChangeData(index, $event)">
            </appInput>
          </div>
          <div class="modal-body" v-else>
            <p>{{ textField }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ negativeActionText || 'Отменить' }}</button>
            <button type="button" class="btn" :class="buttonClass" data-dismiss="modal" @click="clickEvent(actionIndex)">{{ positiveActionText }}</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

  import {API_URL} from '../constants';
  import axios from 'axios';
  import {mapGetters} from 'vuex';
  import {mapMutations} from 'vuex';
  import appInput from './inputValid';

    export default {
      name: 'modalWindow',
      data () {
          return {
            msg: 'template',
          }
      },
      computed: {
        ...mapGetters('alerts', {
          succesAlert: 'succesAlert',
          errorAlert: 'errorAlert'
        }),
        ...mapGetters('progress', {
          progStateWidth: 'progStateWidth',
          progShow: 'progShow'
        }),
      },
      props: [
        'headerText',
        'deleteIcon',
        'positiveActionText',
        'negativeActionText',
        'actionIndex',
        'inputsArr',
        'necessaryEvent',
        'keyId',
        'buttonClass',
        'isNotifyModal',
        'textField'
      ],
      methods: {
        clickEvent(index){
          this.$emit(this.necessaryEvent, {value: {index: index, input: this.inputsArr}});
        },
        onChangeData(index, data){
          this.inputsArr[index].value = data.value;
          this.inputsArr[index].isValid = data.valid;
        },
      },
      components: {
          appInput,
      },
    }
</script>

<style lang="sass">
    /*@import 'assets/sass/main.sass';*/
</style>
