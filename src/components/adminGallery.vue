<!--Шаблонный галереи администратора-->
<template>
    <!--adminGallery.vue-->
    <div>
      <template v-if="userRole.id === adminRoleId">
        <appSwitcher class="mb-3"  txt="Использовать галерею по умолчанию"
                     :switcherActive="useDefaultImagesSwitch"
                     @switchToogle="onUseDefaultImages">
        </appSwitcher>
        <!-- нужно для рендеринга, иначе выдает ошибку, рендерить раньше чем подгружает с сервера -->
        <template v-if="imagelist">
          <div class="image-galery mb-3" v-if="imagelist['SUPPLIER']">
            <img :src="IMAGE_URL + item" alt="" v-for="(item, index) in imagelist['SUPPLIER']" :key="index">
          </div>
        </template>
        <appSwitcher class="mb-3" txt="Использовать свои изображения"
                     :switcherActive="useOwnImagesSwitch"
                     @switchToogle="onUseOwnImages">
        </appSwitcher>
        <transition name="vue-fade" mode="out-in"
                    enter-active-class="animated zoomIn"
                    leave-active-class="animated zoomOut">
          <div v-if="useOwnImagesSwitch">
            <vue-dropzone class="mb-3" ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
            <!-- нужно для рендеринга, иначе выдает ошибку, рендерить раньше чем подгружает с сервера -->
            <template v-if="imagelist">
              <div class="image-galery mb-3" v-if="imagelist['ADMIN']">
                <img :src="IMAGE_URL + item" alt="" v-for="(item, index) in imagelist['ADMIN']" :key="index">
              </div>
            </template>
          </div>
        </transition>
      </template>
      <template v-else>
        <div class="image-galery mb-3" v-if="imagelist">
          <img :src="IMAGE_URL + item" alt="" v-for="(item, index) in imagelist" :key="index">
        </div>
      </template>
    </div>
</template>

<script>

  import {API_URL,IMAGE_URL,USER_ADMIN} from '../constants';
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
            // useOwnImagesSwitch: false,
            // useDefaultImagesSwitch: true,
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
        ...mapGetters('user',
          {
            avatar: 'avatar',
            userName: 'name',
            userRole: 'role',
            userProfile: 'profile'
          }),
        useOwnImagesSwitch(){
          return this.useAdminGallery;
        },
        useDefaultImagesSwitch(){
          return !this.useAdminGallery;
        },
        adminRoleId(){
          return USER_ADMIN;
        }
      },
      props: [
        'imagelist',
        'product',
        'dropzoneOptions',
        'useAdminGallery'
      ],
      components: {
        appSwitcher,
        vueDropzone: vue2Dropzone
      },
      methods: {
        ...mapMutations('alerts',{
          setSuccessAlertShow: 'setSuccessAlertShow',
          setErrorAlertShow: 'setErrorAlertShow',
          setSuccessAlertMsg: 'setSuccessAlertShow',
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
        onUseDefaultImages(e){
          console.log('onUseDefaultImages',e);
          // this.useDefaultImagesSwitch = !this.useDefaultImagesSwitch;
          // if(this.useDefaultImagesSwitch){
          //   this.useOwnImagesSwitch = false;// 1 из 2х, должен быть активен
          // } else {
          //   this.useOwnImagesSwitch = true;// 1 из 2х, должен быть активен
          // }
          this.onChangeUseOwnGallery(!e.switcherActive);
        },
        //Использовать свои изображения, переключатель
        onUseOwnImages(e){
          console.log('onUseOwnImages',e);
          // this.useOwnImagesSwitch = !this.useOwnImagesSwitch;
          // if (this.useOwnImagesSwitch){
          //   this.useDefaultImagesSwitch = false;// 1 из 2х, должен быть активен
          // }else {
          //   this.useDefaultImagesSwitch = true;// 1 из 2х, должен быть активен
          // }
          this.onChangeUseOwnGallery(e.switcherActive);
        },
        onChangeUseOwnGallery(value){
          this.$emit('changeGallery', value);
        }
      },
      mounted(){},
    }
</script>

<style lang="sass">
    /*@import 'assets/sass/main.sass';*/
</style>
