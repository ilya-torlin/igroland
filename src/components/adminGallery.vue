<!--Шаблонный галереи администратора-->
<template>
    <!--adminGallery.vue-->
    <div>
      <appSwitcher class="mb-3"  txt="Использовать галерею по умолчанию"
                   :switcherActive="useDefaultImagesSwitch"
                   @switchToogle="onUseDefaultImages">
      </appSwitcher>
      <div class="image-galery mb-3">
        <img :src="IMAGE_URL + item" alt="" v-for="(item, index) in imagelist">
      </div>
      <appSwitcher class="mb-3" txt="Использовать свои изображения"
                   :switcherActive="useOwnImagesSwitch"
                   @switchToogle="onUseOwnImages">
      </appSwitcher>
      <transition name="vue-fade" mode="out-in"
                  enter-active-class="animated zoomIn"
                  leave-active-class="animated zoomOut">
        <div v-if="useOwnImagesSwitch">
          <vue-dropzone class="mb-3" ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
          <div class="image-galery mb-3">
            <img src="../assets/img/dodik.png" alt="">
          </div>
        </div>
      </transition>
    </div>
</template>

<script>

  import {API_URL,IMAGE_URL} from '../constants';
  import axios from 'axios';
  import {mapGetters} from 'vuex';
  import {mapMutations} from 'vuex';

  import appSwitcher from './switcher'
  import vue2Dropzone from 'vue2-dropzone'

    export default {
      name: 'adminGallery',
      data () {
          return {
            IMAGE_URL,
            useOwnImagesSwitch: false,
            useDefaultImagesSwitch: true,
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
        'imagelist',
        'product',
        'dropzoneOptions'
      ],
      components: {
        appSwitcher,
        vueDropzone: vue2Dropzone
      },
      methods: {
        ...mapMutations('alerts',{
          setSuccesAlertShow: 'setSuccesAlertShow',
          setErrorAlertShow: 'setErrorAlertShow',
          setSuccesAlertMsg: 'setSuccesAlertMsg',
          setErrorAlertMsg: 'setErrorAlertMsg'
        }),
        ...mapMutations('progress',{
          setProgStateWidth: 'setProgStateWidth',
          setProgShow: 'setProgShow',
          stepOneActive: 'stepOneActive',
          stepTwoActive: 'stepTwoActive',
          stepLastActive: 'stepLastActive',
        }),
        //Использовать изображения по умолчанию, переключатель
        onUseDefaultImages(){
          this.useDefaultImagesSwitch = !this.useDefaultImagesSwitch;
          if(this.useDefaultImagesSwitch){
            this.useOwnImagesSwitch = false;// 1 из 2х, должен быть активен
          } else {
            this.useOwnImagesSwitch = true;// 1 из 2х, должен быть активен
          }
        },
        //Использовать свои изображения, переключатель
        onUseOwnImages(){
          this.useOwnImagesSwitch = !this.useOwnImagesSwitch;
          if (this.useOwnImagesSwitch){
            this.useDefaultImagesSwitch = false;// 1 из 2х, должен быть активен
          }else {
            this.useDefaultImagesSwitch = true;// 1 из 2х, должен быть активен
          }
        },
      },
      mounted(){
      }
    }
</script>

<style lang="sass">
    /*@import 'assets/sass/main.sass';*/
</style>
