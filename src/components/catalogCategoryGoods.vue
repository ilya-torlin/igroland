<!--Компонент вывода товаров из категории-->
<!--todo: не выводить товары которые привязаны к пользовательской категории -->
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
              <li :class="{ active : (limit === 20) }" ><a @click="changeLimit(20)">
                20
              </a></li>
              <li :class="{ active : (limit === 50) }" ><a @click="changeLimit(50)">
                50
              </a></li>
              <li :class="{ active : (limit === 100) }" ><a @click="changeLimit(100)">
                100
              </a></li>
            </ul>
          </div>
          <div class="goods-list">
            <ul v-if="goodsListArr.length > 0">
              <li class="goods-title" v-for="(goodsItem, index) in goodsListArr"
                  @click="setProduct(goodsItem.id, index)"
                  :class="{'isActive': productSelectedId == goodsItem.id}"
                  @click.right = "contextOpen($event, goodsItem)"
              >
                <div class="img-c">
                  <img :src="IMAGE_URL + goodsItem.images[0]" alt="" v-if="goodsItem.images">
                  <img src="../../src/assets/img/imageTmp.png" alt="" v-else>
                </div>
                <div class="goods-name">
                  {{goodsItem.name}}
                </div>
              </li>
            </ul>
            <div class="empty-cat" v-else>
              Продукты не найдены
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <h6 class="mb-3">
          Галерея
        </h6>
        <template v-if="productSelectedId > 0">
          <appAdminGallery
              :imagelist="selectedProduct.images"
              :product="productSelectedId"
              :useAdminGallery="selectedProduct.useAdminGallery"
              :dropzoneOptions="dropzoneOptions"
              @changeGallery="onChangeUseAdminGallery($event)"
          ></appAdminGallery>
        </template>
      </div>
      <div class="col-4">
        <div class="goods-col-3">
          <h6>
            Информация о продукте
          </h6>
          <div class="goods-info"  v-if="productSelectedId > 0">
            <div class="goods-i">
              <div class="title-h">
                Наименование
              </div>
              <div class="gray-txt">
                {{goodsListArr[productSelectedIndex].name}}
              </div>
            </div>
            <div class="goods-i" v-if="userRole.id === adminRoleId">
              <div class="title-h">
                Альтернативное наименование
              </div>
              <div class="find-b justify-content-start d-flex">
                <div class="input-group ">
                  <input v-model="alternativeGoodsName" v-on:keyup.enter="renameGoods" type="text" class="form-control" placeholder="">
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
                        :validFeedback="profitPercentInput.validFeedback"
                        :invalidFeedback="profitPercentInput.invalidFeedback"
                        :placeholder="profitPercentInput.placeholder"
                        :required="profitPercentInput.required"
                        :pattern="profitPercentInput.pattern"
                        :type="profitPercentInput.type"
                        :value="profitPercentInput.value"
                        :isValid="profitPercentInput.isValid"
                        :showError="profitPercentInput.showError"
                        @changedata="onChangeDataParcent($event)"
                        ref="tradeMarkup"
              >
              </appInput>
            </div>
            <div class="goods-i">
              <div class="atr-i" v-for="(itemParam, index) in selectedProduct.params">
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
    <div class="js-context-folder context-menu-custom" v-if="contextMenu"
                  :class="{'is-active': contextMenu.contextMenuOpen}"
                  :style="{top: contextMenu.yPos+'px', left: contextMenu.xPos+'px' }">
      <ul>
        <li v-for=" (item, index) in contextMenu.menuOpt"
            :key="index">
          <a href="javascript:void(0)" @click="contextMenuOptEvent(item.eventName)">
            <span class="svg-c" v-if="item.iconId === 1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="16px" height="16px">
                <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                      d="M15.000,16.000 L13.000,16.000 C12.448,16.000 12.000,15.552 12.000,15.000 L12.000,13.000 C12.000,12.448 12.448,12.000 13.000,12.000 L15.000,12.000 C15.552,12.000 16.000,12.448 16.000,13.000 L16.000,15.000 C16.000,15.552 15.552,16.000 15.000,16.000 ZM15.000,10.000 L13.000,10.000 C12.448,10.000 12.000,9.552 12.000,9.000 L12.000,7.000 C12.000,6.448 12.448,6.000 13.000,6.000 L15.000,6.000 C15.552,6.000 16.000,6.448 16.000,7.000 L16.000,9.000 C16.000,9.552 15.552,10.000 15.000,10.000 ZM15.000,4.000 L13.000,4.000 C12.448,4.000 12.000,3.552 12.000,3.000 L12.000,1.000 C12.000,0.448 12.448,0.000 13.000,0.000 L15.000,0.000 C15.552,0.000 16.000,0.448 16.000,1.000 L16.000,3.000 C16.000,3.552 15.552,4.000 15.000,4.000 ZM9.000,16.000 L7.000,16.000 C6.448,16.000 6.000,15.552 6.000,15.000 L6.000,13.000 C6.000,12.448 6.448,12.000 7.000,12.000 L9.000,12.000 C9.552,12.000 10.000,12.448 10.000,13.000 L10.000,15.000 C10.000,15.552 9.552,16.000 9.000,16.000 ZM9.000,10.000 L7.000,10.000 C6.448,10.000 6.000,9.552 6.000,9.000 L6.000,7.000 C6.000,6.448 6.448,6.000 7.000,6.000 L9.000,6.000 C9.552,6.000 10.000,6.448 10.000,7.000 L10.000,9.000 C10.000,9.552 9.552,10.000 9.000,10.000 ZM9.000,4.000 L7.000,4.000 C6.448,4.000 6.000,3.552 6.000,3.000 L6.000,1.000 C6.000,0.448 6.448,0.000 7.000,0.000 L9.000,0.000 C9.552,0.000 10.000,0.448 10.000,1.000 L10.000,3.000 C10.000,3.552 9.552,4.000 9.000,4.000 ZM3.000,16.000 L1.000,16.000 C0.448,16.000 0.000,15.552 0.000,15.000 L0.000,13.000 C0.000,12.448 0.448,12.000 1.000,12.000 L3.000,12.000 C3.552,12.000 4.000,12.448 4.000,13.000 L4.000,15.000 C4.000,15.552 3.552,16.000 3.000,16.000 ZM3.000,10.000 L1.000,10.000 C0.448,10.000 0.000,9.552 0.000,9.000 L0.000,7.000 C0.000,6.448 0.448,6.000 1.000,6.000 L3.000,6.000 C3.552,6.000 4.000,6.448 4.000,7.000 L4.000,9.000 C4.000,9.552 3.552,10.000 3.000,10.000 ZM3.000,4.000 L1.000,4.000 C0.448,4.000 0.000,3.552 0.000,3.000 L0.000,1.000 C0.000,0.448 0.448,0.000 1.000,0.000 L3.000,0.000 C3.552,0.000 4.000,0.448 4.000,1.000 L4.000,3.000 C4.000,3.552 3.552,4.000 3.000,4.000 Z"/>
              </svg>
            </span>
            <span class="svg-c" v-if="item.iconId === 2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="16px" height="16px">
                <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                      d="M15.402,5.359 L12.533,8.229 C11.740,9.021 10.456,9.021 9.663,8.229 L10.752,7.139 C11.203,7.258 11.701,7.147 12.055,6.794 L13.968,4.881 C14.496,4.353 14.496,3.496 13.968,2.968 L13.011,2.011 C12.483,1.483 11.626,1.483 11.098,2.011 L9.185,3.924 C8.832,4.278 8.720,4.776 8.839,5.226 L7.750,6.316 C6.958,5.523 6.958,4.239 7.750,3.446 L10.620,0.577 C11.412,-0.216 12.697,-0.216 13.489,0.577 L15.402,2.489 C16.195,3.282 16.195,4.567 15.402,5.359 ZM5.359,10.620 C5.095,10.356 5.095,9.928 5.359,9.663 L9.663,5.359 C9.927,5.095 10.356,5.095 10.620,5.359 C10.884,5.623 10.884,6.052 10.620,6.316 L6.316,10.620 C6.051,10.884 5.623,10.884 5.359,10.620 ZM3.924,9.185 L2.011,11.098 C1.483,11.627 1.483,12.483 2.011,13.011 L2.968,13.968 C3.496,14.496 4.352,14.496 4.881,13.968 L6.794,12.055 C7.147,11.702 7.258,11.203 7.139,10.753 L8.229,9.663 C9.021,10.456 9.021,11.741 8.229,12.533 L5.359,15.402 C4.567,16.195 3.282,16.195 2.489,15.402 L0.576,13.489 C-0.216,12.697 -0.216,11.412 0.576,10.620 L3.446,7.750 C4.238,6.958 5.523,6.958 6.316,7.750 L5.226,8.840 C4.776,8.721 4.277,8.832 3.924,9.185 Z"/>
              </svg>
            </span>
            <span class="svg-c" v-if="item.iconId === 3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="16px" height="16px">
                <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                      d="M15.333,9.334 L13.833,9.334 C13.681,9.998 13.409,10.613 13.059,11.174 L14.128,12.243 C14.389,12.503 14.389,12.925 14.128,13.186 L13.185,14.129 C12.925,14.389 12.503,14.389 12.243,14.129 L11.179,13.065 C10.618,13.420 10.002,13.695 9.333,13.847 L9.333,15.334 C9.333,15.702 9.035,16.000 8.667,16.000 L7.333,16.000 C6.965,16.000 6.667,15.702 6.667,15.334 L6.667,13.847 C5.998,13.695 5.382,13.420 4.821,13.065 L3.757,14.129 C3.497,14.389 3.075,14.389 2.815,14.129 L1.872,13.186 C1.611,12.925 1.611,12.503 1.872,12.243 L2.941,11.174 C2.591,10.613 2.319,9.998 2.167,9.334 L0.667,9.334 C0.299,9.334 0.000,9.035 0.000,8.667 L0.000,7.334 C0.000,6.966 0.299,6.667 0.667,6.667 L2.167,6.667 C2.319,6.003 2.591,5.388 2.941,4.828 L1.872,3.758 C1.611,3.497 1.611,3.075 1.872,2.815 L2.815,1.872 C3.075,1.612 3.497,1.612 3.757,1.872 L4.821,2.936 C5.382,2.581 5.998,2.306 6.667,2.154 L6.667,0.667 C6.667,0.299 6.965,0.000 7.333,0.000 L8.667,0.000 C9.035,0.000 9.333,0.299 9.333,0.667 L9.333,2.154 C10.002,2.306 10.618,2.581 11.179,2.936 L12.243,1.872 C12.503,1.612 12.925,1.612 13.185,1.872 L14.128,2.815 C14.389,3.075 14.389,3.497 14.128,3.758 L13.059,4.828 C13.409,5.388 13.681,6.003 13.833,6.667 L15.333,6.667 C15.702,6.667 16.000,6.966 16.000,7.334 L16.000,8.667 C16.000,9.035 15.702,9.334 15.333,9.334 ZM8.000,4.001 C5.791,4.001 4.000,5.791 4.000,8.000 C4.000,10.210 5.791,12.000 8.000,12.000 C10.209,12.000 12.000,10.210 12.000,8.000 C12.000,5.791 10.209,4.001 8.000,4.001 ZM8.000,10.001 C6.896,10.001 6.000,9.105 6.000,8.000 C6.000,6.896 6.896,6.000 8.000,6.000 C9.105,6.000 10.000,6.896 10.000,8.000 C10.000,9.105 9.105,10.001 8.000,10.001 Z"/>
              </svg>
            </span>
            <span class="svg-c" v-if="item.iconId === 4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="16px" height="16px">
                <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                      d="M14.957,9.044 L9.043,9.044 L9.043,14.957 C9.043,15.533 8.576,16.000 8.000,16.000 C7.424,16.000 6.957,15.533 6.957,14.957 L6.957,9.044 L1.043,9.044 C0.467,9.044 -0.000,8.576 -0.000,8.000 C-0.000,7.424 0.467,6.957 1.043,6.957 L6.957,6.957 L6.957,1.044 C6.957,0.467 7.424,0.000 8.000,0.000 C8.576,0.000 9.043,0.467 9.043,1.044 L9.043,6.957 L14.957,6.957 C15.533,6.957 16.000,7.424 16.000,8.000 C16.000,8.576 15.533,9.044 14.957,9.044 Z"/>
              </svg>
            </span>
            <span class="svg-c" v-if="item.iconId === 5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="16px" height="18px">
                <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                      d="M14.909,6.000 L13.818,6.000 L13.818,16.875 C13.818,17.497 13.330,18.000 12.727,18.000 L3.273,18.000 C2.670,18.000 2.182,17.497 2.182,16.875 L2.182,6.000 L1.091,6.000 C0.488,6.000 0.000,5.497 0.000,4.875 C0.000,4.254 0.488,3.750 1.091,3.750 L3.273,3.750 L4.364,3.750 C4.364,1.679 5.992,0.000 8.000,0.000 C10.008,0.000 11.636,1.679 11.636,3.750 L12.727,3.750 L14.909,3.750 C15.512,3.750 16.000,4.254 16.000,4.875 C16.000,5.497 15.512,6.000 14.909,6.000 ZM7.273,15.750 L8.727,15.750 L8.727,6.750 L7.273,6.750 L7.273,15.750 ZM4.364,6.750 L4.364,15.750 L5.818,15.750 L5.818,6.750 L4.364,6.750 ZM8.000,1.500 C6.795,1.500 5.818,2.508 5.818,3.750 L10.182,3.750 C10.182,2.508 9.205,1.500 8.000,1.500 ZM11.636,6.750 L10.182,6.750 L10.182,15.750 L11.636,15.750 L11.636,6.750 Z"/>
              </svg>
            </span>
            {{item.title}}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  import {API_URL, IMAGE_URL,USER_ADMIN} from '../constants';
  import axios from 'axios';
  import {mapGetters} from 'vuex';
  import {mapMutations} from 'vuex';

  import Multiselect from 'vue-multiselect'
  import appSwitcher from './switcher'
  import appInput from './inputValid'
  import vue2Dropzone from 'vue2-dropzone'
  import appAdminGallery from './adminGallery'

    export default {
      name: 'catalogCategoryGoods',
      data () {
          return {
            IMAGE_URL,
            alternativeGoodsName: '',
            limit: 20,//для запроса товаров
            productSelectedId: 0,// id выбранного товара
            productSelectedIndex: 0,
            profitPercentInput: {
              id: 'profit-percent',
              showError: false,
              validFeedback: "",
              invalidFeedback: "Наценка введена неверно",
              placeholder: "Наценка, %",
              type: "text",
              required: "false",
              pattern: /^[0-9,.]{1,2}$/,
              value: '',
              isValid: false
            },
            selectedProduct:{},
            goodsListArr: [ // массив с товарами
            ],
            dropzoneOptions: { // опции для dropzone
              url: API_URL + '/product/' + 0 + '/addgallery',
              thumbnailWidth: 150,
              maxFilesize: 0.5,
              headers: { Authorization: 'Bearer ' + localStorage.getItem('user-token') },
              addRemoveLinks: true,
              //для перевода
              dictFileTooBig: 'Загружаемый файл слишком большой',
              dictDefaultMessage: '<div class="dropzone-cont"> <div class="img-c"> <img src="../../src/assets/img/imageUpload.png" alt=""> </div> <span class="sad">Перетащите изображения (*.png, *.jpg, *.jpeg) сюда</span> </div>',
              dictInvalidFileType: 'Тип файла не подходит (*.png, *.jpg, *.jpeg)',
              dictResponseError: 'Ошибка передачи на сервер, перезагрузите страницу и повторите действие ещё раз',
              dictCancelUpload: 'Отменить',
              dictRemoveFile: 'Удалить файл'
            },
            contextMenu:{ // Контекстное меню
              contextMenuOpen: false, //состояние контекстного меню (закрыто/открыто)
              yPos: 323,//полложение по оси x
              xPos: 224,//полложение по оси y
              selectedProduct: {},//папка, на которую кликнули
              menuOpt: [ // пункты меню
                {
                  title: 'Привязать',//заголовок
                  eventName: 'attachProductToCategory', // имя ивента, который вызывается при нажатии на пункт меню
                  iconId: 2,
                  //Подумать как передавать payload, при нажатии на папку
                },
              ]
            },
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
        ...mapGetters('user',{
          avatar: 'avatar',
          userName: 'name',
          userRole: 'role',
          userProfile: 'profile'
        }),
        adminRoleId(){
          return USER_ADMIN;
        }
      },
      props: [
        'categoryId',
        'supplierId',
        'offset',
        'category',
        'findGoodsStr',
        'hideNotAvl'
      ],
      components: {
        Multiselect,
        appSwitcher,
        appInput,
        vueDropzone: vue2Dropzone,
        appAdminGallery
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
        //Переименование товара
        renameGoods(){
          let payload = {
            title: this.alternativeGoodsName,
          };
          this.stepOneActive(); // прогрессбар
          axios({url: API_URL + '/product/' + this.productSelectedId + '/setalternativetitle', data: payload, method: 'POST' })
            .then(resp => {
              const error = resp.data.error;
              console.log(resp);
              this.stepLastActive(); // прогрессбар
              if(error){
                let errorTxt = resp.data.data.msgClient;
                this.setErrorAlertShow(true);
                this.setErrorAlertMsg('Ошибка при изменении наименования: ' + errorTxt);
              }else{
                //this.setProduct(this.productSelectedId, this.productSelectedIndex);
                this.$set(this.goodsListArr[this.productSelectedIndex],'name',this.alternativeGoodsName);
                //this.goodsListArr[this.productSelectedIndex].name = this.alternativeGoodsName;
                this.setSuccessAlertShow(true);
                this.setSuccessAlertMsg('Наименование изменено');
              }
            })
            .catch(err => {
              this.setErrorAlertShow(true);
              this.setErrorAlertMsg('Ошибка при изменении наименования');
              this.stepLastActive(); // прогрессбар
              console.log(err);
            });
        },
        // обновление продукта
        updateProduct(prodId, categoryGoodsIndex){
          this.productSelectedId = prodId;
          this.productSelectedIndex = categoryGoodsIndex;
          // если id продукта 0, то не обрабатываем
          if (prodId === 0)
            return;
          let payload = {
            id: prodId || this.categoryId || null,
          };
          this.stepOneActive(); // прогрессбар
          axios.get( API_URL + `/product/${this.productSelectedId}`, {
            params: {},
          }).then(resp => {
            const error = resp.data.error;
            if(error){
              let errorTxt = resp.data.data.msgClient;
              this.setErrorAlertShow(true);
              this.setErrorAlertMsg('Ошибка при запросе товаров: ' + errorTxt);
            }else{
              this.selectedProduct = resp.data.data;
              //this.$set(this.goodsListArr, categoryGoodsIndex, resp.data.data);
              //this.goodsListArr[categoryGoodsIndex] = resp.data.data;
              this.productSelectedId = resp.data.data.id;
              this.alternativeGoodsName = resp.data.data.name;
              this.dropzoneOptions.url =  API_URL + '/product/' + this.productSelectedId + '/addgallery';
              if(resp.data.data.tradeMarkup)
                this.profitPercentInput.value = resp.data.data.tradeMarkup.value;
              else
                this.profitPercentInput.value = '';
              this.$refs['tradeMarkup'].activated = false;
              // говорим компоненту родителю, что выделили продукт
              this.$emit('setSelectedProduct', {
                id: this.productSelectedId,
                index: this.productSelectedIndex,
              });
            }
            this.stepLastActive(); // прогрессбар
          })
            .catch(err => {
              this.setErrorAlertShow(true);
              this.setErrorAlertMsg('Ошибка при запросе товаров');
              this.stepLastActive(); // прогрессбар
            });
        },
        //запрос информации о конкретном товаре и выделение товара в списке товаров
        setProduct(prodId, categoryGoodsIndex){
          console.log(prodId, this.productSelectedId);
          if (this.productSelectedId === +prodId) {
            this.productSelectedId = 0;
            this.productSelectedIndex = 0;
            return
          }
          this.updateProduct(prodId, categoryGoodsIndex);
        },
        // для компонента input, изменение родителя, установка наценки на товар
        onChangeDataParcent(data){
          this.profitPercentInput.value = data.value;
          this.profitPercentInput.isValid = data.valid;
          if(this.profitPercentInput.isValid){
            let payload = {
              value: this.profitPercentInput.value,
            };
            this.stepOneActive(); // прогрессбар
            axios({url: API_URL + '/product/' + this.productSelectedId + '/settrademarkup', data: payload, method: 'POST' })
              .then(resp => {
                const error = resp.data.error;
                console.log(resp);
                this.stepLastActive(); // прогрессбар
                if(error){
                  let errorTxt = resp.data.data.msgClient;
                  this.setErrorAlertShow(true);
                  this.setErrorAlertMsg('Ошибка при изменении наценки: ' + errorTxt);
                }else{
                  this.setSuccessAlertShow(true);
                  this.setSuccessAlertMsg('Наценка изменена');
                }
              })
              .catch(err => {
                this.setErrorAlertShow(true);
                this.setErrorAlertMsg('Ошибка при изменении наценки');
                this.stepLastActive(); // прогрессбар
                console.log(err);
              });
          }
        },
        //запрос списка товара в определённой категории
        getProducts(categoryId){
          // проверяем если передается категория 0, то не выполняем запрос на получение товаров
          if (categoryId === 0)
            return;
          // todo: проверить работает ли вывод товаров "только в наличии"
          let payload = {
            category_id: categoryId || null,
            supplier_id: this.supplierId || null,
            limit: this.limit || null,
            offset: this.offset || null,
            hideNotAvl: this.hideNotAvl
          };
          this.stepOneActive(); // прогрессбар
          axios.get( API_URL + '/product', {
            params: {
              ...payload
            },
          }).then(resp => {
            const error = resp.data.error;
            if(error){
              let errorTxt = resp.data.data.msgClient;
              this.setErrorAlertShow(true);
              this.setErrorAlertMsg('Ошибка при запросе товаров: ' + errorTxt);
            }else{
              console.log(resp);
              this.goodsListArr = resp.data.data.items;
              this.$emit('updatePagination', Math.ceil(resp.data.data.data.count/this.limit));
              this.productSelectedId = 0;
              this.productSelectedIndex = 0;
              // this.categoryGoods.pagination.countItemsPage;
              // this.categoryGoods.pagination.countPage;
              //this.categoryGoods.goodsListArr[0];
              //this.setProduct(this.goodsListArr[0].id, 0); // инициализируем первый товар
              if (this.goodsListArr.length > 0)
                this.dropzoneOptions.url =  API_URL + '/product/' + this.goodsListArr[0].id + '/addgallery';
            }
            this.stepLastActive(); // прогрессбар
          })
            .catch(err => {
              this.setErrorAlertShow(true);
              this.setErrorAlertMsg('Ошибка при запросе товаров');
              this.stepLastActive(); // прогрессбар
            });
        },
        //поиск среди товаров
        findGoods(findGoodsStr){
          console.log('Поиск по подстроке - ', findGoodsStr);
          let payload = {
            text: findGoodsStr || '',
            category_id: this.categoryId || null,
            limit: this.limit || null,
            offset: this.offset || null
          };
          this.stepOneActive(); // прогрессбар
          axios.get( API_URL + '/product/search', {
            params: {
              ...payload
            },
          }).then(resp => {
            const error = resp.data.error;
            if(error){
              let errorTxt = resp.data.data.msgClient;
              this.setErrorAlertShow(true);
              this.setErrorAlertMsg('Ошибка при поиске: ' + errorTxt);
            }else{
              console.log(resp.data);
              if (resp.data.data.items.length > 0)
                this.goodsListArr = resp.data.data.items;
              else
                this.goodsListArr = [];
              this.productSelectedId = 0;
              this.productSelectedIndex = 0;
            }
            this.stepLastActive(); // прогрессбар
          })
            .catch(err => {
              this.setErrorAlertShow(true);
              this.setErrorAlertMsg('Ошибка при поиске');
              this.stepLastActive(); // прогрессбар
            });
        },
        // вызов меню
        contextOpen(e, val){
          this.contextMenu.xPos = e.clientX;
          this.contextMenu.yPos = e.clientY;
          this.contextMenu.contextMenuOpen = true;
          this.contextMenu.selectedProduct  = val;
          e.preventDefault();
        },
        contextMenuOptEvent(eventName){
          this.$emit(eventName);
        },
        // обновление лимита показа товаров
        changeLimit(value){
          this.limit = value;
          this.getProducts(this.categoryId);
        },
        // изменить свойство "Использовать пользовательскую галерею"
        onChangeUseAdminGallery(e){
          let payload = {
            value: e,
          };
          this.stepOneActive(); // прогрессбар
          axios({url: API_URL + '/product/' + this.productSelectedId + '/setuseadmingallery', data: payload, method: 'POST' })
            .then(resp => {
              const error = resp.data.error;
              console.log(resp);
              this.stepLastActive(); // прогрессбар
              if(error){
                let errorTxt = resp.data.data.msgClient;
                this.setErrorAlertShow(true);
                this.setErrorAlertMsg('Ошибка при изменении галереи: ' + errorTxt);
              }else{
                this.updateProduct(this.productSelectedId,this.productSelectedIndex);
                //this.$set(this.goodsListArr,this.productSelectedIndex,e);
                this.setSuccessAlertShow(true);
                this.setSuccessAlertMsg('Галерея изменена');
              }
            })
            .catch(err => {
              this.setErrorAlertShow(true);
              this.setErrorAlertMsg('Ошибка при изменении галереи');
              this.stepLastActive(); // прогрессбар
              console.log(err);
            });
        },
      },
      watch:{
        offset(){
          this.getProducts(this.categoryId);
        }
      },
      mounted(){
        this.getProducts(this.categoryId);
        //let varthis = this;
        $(document).click( () => {
          if(!$(this).hasClass('goods-title')){
            this.contextMenu.contextMenuOpen = false;
          }
        });
      }
    }
</script>

<style lang="sass">
    /*@import 'assets/sass/main.sass';*/
</style>
