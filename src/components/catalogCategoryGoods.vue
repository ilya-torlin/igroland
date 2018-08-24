<!--Компонент вывода товаров из категории-->
<template>
    <!--catalogCategoryGoods.vue-->
  <div class="goods-cont">
    <div class="row">
      <div class="col-4">
        <div class="goods-col-1">
          <div class="goodsLimit">
            <div class="txt">
              Показывать по:
            </div>
            <ul>
              <li class="active"><a href="javascript:void(0)">
                20
              </a></li>
              <li><a href="javascript:void(0)">
                50
              </a></li>
              <li><a href="javascript:void(0)">
                100
              </a></li>
            </ul>
          </div>
          <div class="goods-list">
            <ul>
              <li v-for="(goodsItem, index) in categoryGoods.goodsListArr"
                  @click="setProduct(goodsItem.id, index)" :class="{'isActive': categoryGoods.productSelectedId == goodsItem.id}">
                <div class="img-c">
                  <img :src="IMAGE_URL + goodsItem.images[0]" alt="" v-if="goodsItem.images">
                  <img src="../../src/assets/img/imageTmp.png" alt="" v-else>
                </div>
                <div class="goods-name">
                  {{goodsItem.name}}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-4">
        <h6 class="mb-3">
          Галерея
        </h6>

        <appSwitcher class="mb-3"  txt="Использовать галерею по умолчанию"
                     :switcherActive="categoryGoods.useDefaultImagesSwitch"
                     @switchToogle="onUseDefaultImages">
        </appSwitcher>
        <div class="image-galery mb-3">
          <img :src="IMAGE_URL + item" alt="" v-for="(item, index) in categoryGoods.goodsListArr[categoryGoods.productSelectedIndex].images">
        </div>
        <appSwitcher class="mb-3" txt="Использовать свои изображения"
                     :switcherActive="categoryGoods.useOwnImagesSwitch"
                     @switchToogle="onUseOwnImages">
        </appSwitcher>
        <transition name="vue-fade" mode="out-in"
                    enter-active-class="animated zoomIn"
                    leave-active-class="animated zoomOut">
          <div v-if="categoryGoods.useOwnImagesSwitch">
            <vue-dropzone class="mb-3" ref="myVueDropzone" id="dropzone" :options="categoryGoods.dropzoneOptions"></vue-dropzone>
            <div class="image-galery mb-3">
              <img src="../assets/img/dodik.png" alt="">
            </div>
          </div>
        </transition>
      </div>
      <div class="col-4">
        <div class="goods-col-3">
          <h6>
            Информация о продукте
          </h6>
          <div class="goods-info">
            <div class="goods-i">
              <div class="title-h">
                Наименование
              </div>
              <div class="gray-txt">
                {{categoryGoods.goodsListArr[categoryGoods.productSelectedIndex].name}}
              </div>
            </div>
            <div class="goods-i">
              <div class="title-h">
                Альтернативное наименование
              </div>
              <div class="find-b justify-content-start d-flex">
                <div class="input-group ">
                  <input v-model.lazy="categoryGoods.findGoodsStr" v-on:keyup.enter="renameGoods" type="text" class="form-control" placeholder="">
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="renameGoods">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="15px" height="15px">
                        <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                              d="M14.410,3.414 L13.938,3.886 L11.108,1.054 L11.579,0.582 C12.361,-0.200 13.628,-0.200 14.410,0.582 C15.192,1.364 15.192,2.632 14.410,3.414 ZM5.190,12.639 L2.360,9.807 L10.164,1.998 L12.995,4.830 L5.190,12.639 ZM3.775,14.055 L0.001,14.999 L0.944,11.223 L1.416,10.751 L4.247,13.583 L3.775,14.055 Z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="goods-i">
              <div class="title-h">
                Наценка, %
              </div>
              <appInput key="profitPercentInput"
                        :validFeedback="categoryGoods.profitPercentInput.validFeedback"
                        :invalidFeedback="categoryGoods.profitPercentInput.invalidFeedback"
                        :placeholder="categoryGoods.profitPercentInput.placeholder"
                        :required="categoryGoods.profitPercentInput.required"
                        :pattern="categoryGoods.profitPercentInput.pattern"
                        :type="categoryGoods.profitPercentInput.type"
                        :value="categoryGoods.profitPercentInput.value"
                        :isValid="categoryGoods.profitPercentInput.isValid"
                        :showError="categoryGoods.profitPercentInput.showError"
                        @changedata="onChangeDataParcent($event)"
              >
              </appInput>
            </div>
            <div class="goods-i">
              <div class="atr-i" v-for="(itemParam, index) in categoryGoods.goodsListArr[categoryGoods.productSelectedIndex].params">
                <div class="i-t title-h">
                  {{itemParam.key}}
                </div>
                <div class="i-t gray-txt">
                  {{itemParam.val}}
                </div>
                <!--todo: Добавить краткое описание товара-->
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import {API_URL, IMAGE_URL} from '../constants';
  import axios from 'axios';
  import {mapGetters} from 'vuex';
  import {mapMutations} from 'vuex';

  import Multiselect from 'vue-multiselect'
  import appSwitcher from './switcher'
  import appInput from './inputValid'
  import vue2Dropzone from 'vue2-dropzone'

    export default {
      name: 'catalogCategoryGoods',
      data () {
          return {
            msg: 'template',
            IMAGE_URL,
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
        'rootCatalog',
        'categoryGoods'
      ],
      components: {
        Multiselect,
        appSwitcher,
        appInput,
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
          this.categoryGoods.useDefaultImagesSwitch = !this.categoryGoods.useDefaultImagesSwitch;
          if(this.categoryGoods.useDefaultImagesSwitch){
            this.categoryGoods.useOwnImagesSwitch = false;// 1 из 2х, должен быть активен
          } else {
            this.categoryGoods.useOwnImagesSwitch = true;// 1 из 2х, должен быть активен
          }
        },
        //Использовать свои изображения, переключатель
        onUseOwnImages(){
          this.categoryGoods.useOwnImagesSwitch = !this.categoryGoods.useOwnImagesSwitch;
          if (this.categoryGoods.useOwnImagesSwitch){
            this.categoryGoods.useDefaultImagesSwitch = false;// 1 из 2х, должен быть активен
          }else {
            this.categoryGoods.useDefaultImagesSwitch = true;// 1 из 2х, должен быть активен
          }
        },
        //Переименование товара
        renameGoods(){
        },
        //запрос информации о конкретном товаре и выделение товара в списке товаров
        setProduct(prodId, categoryGoodsIndex){
          this.categoryGoods.productSelectedId = prodId;
          this.categoryGoods.productSelectedIndex = categoryGoodsIndex;

          let payload = {
            id: prodId || this.categoryGoods.categoryId || null,
          };
          this.stepOneActive(); // прогрессбар
          axios.get( API_URL + `/product/${this.categoryGoods.productSelectedId}`, {
            params: {

            },
          }).then(resp => {
            const error = resp.data.error;
            if(error){
              let errorTxt = resp.data.data.msgClient;
              this.setErrorAlertShow(true);
              this.setErrorAlertMsg('Ошибка при запросе товаров: ' + errorTxt);
            }else{
              //this.$set(this.categoryGoods.goodsListArr[categoryGoodsIndex], 'params', resp.data.data.params);
              this.categoryGoods.goodsListArr[categoryGoodsIndex] = resp.data.data;
              this.categoryGoods.productSelectedId = resp.data.data.id;
            }
            this.stepLastActive(); // прогрессбар
          })
            .catch(err => {
              this.setErrorAlertShow(true);
              this.setErrorAlertMsg('Ошибка при запросе товаров');
              this.stepLastActive(); // прогрессбар
            });
        },
        // для компонента input, изменение родителя
        onChangeDataParcent(data){
          this.categoryGoods.profitPercentInput.value = data.value;
          this.categoryGoods.profitPercentInput.isValid = data.valid;
        },
      },
    }
</script>

<style lang="sass">
    /*@import 'assets/sass/main.sass';*/
</style>
