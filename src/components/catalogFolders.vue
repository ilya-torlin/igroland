<!--Каталог с папками (панель слева)-->
<template>
    <!--catalogFolders.vue-->

    <!--
      todo: для каталога делается запрос на сервер(отправляется ид родителя), с сервера приходят потомки
    -->

  <!--todo: Поменять col-3 у родителя, возможно поставить просто col и сделать min-width у панели слева в 70/100%-->

  <div class="side-catalog-f catalog-folder white-bg" :class="{'hide-sb': !showSideBarCatalog}">

      <transition name="vue-fade" mode="out-in"
                  enter-active-class="animated zoomIn"
                  leave-active-class="animated zoomOutLeft">
        <div v-show="showSideBarCatalog">
          <div class="bb">
            <div class="folder-h">
              <div class="title-h">
                Каталог
              </div>
              <button class="btn-icon-tr hide-side-panel-btn"
                      @click="showSideBarCatalogToogle" data-toggle="tooltip" data-placement="bottom"
                      data-original-title="Свернуть каталог"  >
                <svg width="100%" height="100%" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">
                    <g transform="matrix(0.0390625,0,0,0.0390625,0,0)">
                        <path d="M509.336,220.717C507.553,218.939 505.288,218.052 502.518,218.052L132.741,218.052L132.741,151.682C132.741,147.729 130.861,144.867 127.112,143.089C123.355,141.51 119.898,142.104 116.74,144.867L2.961,249.755C0.986,251.733 0,254.103 0,256.867C0,259.434 0.986,261.708 2.961,263.682L116.741,367.387C119.902,369.954 123.359,370.454 127.113,368.868C130.862,367.29 132.742,364.428 132.742,360.277L132.742,293.907L502.525,293.907C505.289,293.907 507.562,293.015 509.337,291.243C511.113,289.467 512,287.198 512,284.431L512,227.538C512.003,224.773 511.112,222.497 509.336,220.717Z" style="fill:rgb(131,147,167);fill-rule:nonzero;"/>
                    </g>
                </svg>
              </button>
            </div>
            <div class="folder-b">
              <div class="folder-c">
                <ul class="folder-list folder-list-main ">
                  <li class="is-active" >
                    <div class="folder-title" @click.right = "contextOpen($event)" >
                      <div class="folder-name ">
                        Машинки
                      </div>
                      <div class="folder-controls-c">
                        <span class="badge badge-success badge-pill">21</span>
                        <button class="btn-icon-tr">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="8px" height="13px">
                            <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                                  d="M1.738,12.343 C1.390,12.681 0.826,12.681 0.479,12.343 C0.131,12.004 0.131,11.455 0.479,11.116 L5.116,6.601 L0.479,2.085 C0.131,1.747 0.131,1.198 0.479,0.860 C0.826,0.521 1.390,0.521 1.738,0.860 L6.986,5.970 C7.164,6.143 7.249,6.373 7.244,6.601 C7.249,6.829 7.164,7.058 6.986,7.232 L1.738,12.343 Z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <ul class="folder-list">
                      <li style="padding-left: 10px" @click.right = "contextOpen($event)">
                        <div class="folder-title">
                          <div class="folder-name">
                                          <span class="dot-txt">
                                              &#183;
                                          </span>
                            Машинки 2
                          </div>
                          <div class="folder-controls-c">
                            <span class="badge badge-success badge-pill">21</span>
                            <button class="btn-icon-tr">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                width="8px" height="13px">
                                <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                                      d="M1.738,12.343 C1.390,12.681 0.826,12.681 0.479,12.343 C0.131,12.004 0.131,11.455 0.479,11.116 L5.116,6.601 L0.479,2.085 C0.131,1.747 0.131,1.198 0.479,0.860 C0.826,0.521 1.390,0.521 1.738,0.860 L6.986,5.970 C7.164,6.143 7.249,6.373 7.244,6.601 C7.249,6.829 7.164,7.058 6.986,7.232 L1.738,12.343 Z"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </li>
                      <li style="padding-left: 10px" @click.right = "contextOpen($event)">
                        <div class="folder-title">
                          <div class="folder-name">
                                          <span class="dot-txt">
                                              &#183;
                                          </span>
                            Машинки 2
                          </div>
                          <div class="folder-controls-c">
                            <span class="badge badge-success badge-pill">21</span>
                            <button class="btn-icon-tr">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                width="8px" height="13px">
                                <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                                      d="M1.738,12.343 C1.390,12.681 0.826,12.681 0.479,12.343 C0.131,12.004 0.131,11.455 0.479,11.116 L5.116,6.601 L0.479,2.085 C0.131,1.747 0.131,1.198 0.479,0.860 C0.826,0.521 1.390,0.521 1.738,0.860 L6.986,5.970 C7.164,6.143 7.249,6.373 7.244,6.601 C7.249,6.829 7.164,7.058 6.986,7.232 L1.738,12.343 Z"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </li>
                      <li style="padding-left: 10px" @click.right = "contextOpen($event)">
                        <div class="folder-title">
                          <div class="folder-name">
                                          <span class="dot-txt">
                                              &#183;
                                          </span>
                            Машинки 2
                          </div>
                          <div class="folder-controls-c">
                            <span class="badge badge-success badge-pill">21</span>
                            <button class="btn-icon-tr">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                width="8px" height="13px">
                                <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                                      d="M1.738,12.343 C1.390,12.681 0.826,12.681 0.479,12.343 C0.131,12.004 0.131,11.455 0.479,11.116 L5.116,6.601 L0.479,2.085 C0.131,1.747 0.131,1.198 0.479,0.860 C0.826,0.521 1.390,0.521 1.738,0.860 L6.986,5.970 C7.164,6.143 7.249,6.373 7.244,6.601 C7.249,6.829 7.164,7.058 6.986,7.232 L1.738,12.343 Z"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div class="folder-title" @click.right = "contextOpen($event)">
                      <div class="folder-name">
                        Машинки
                      </div>
                      <div class="folder-controls-c">
                        <span class="badge badge-success badge-pill">21</span>
                        <button class="btn-icon-tr">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="8px" height="13px">
                            <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                                  d="M1.738,12.343 C1.390,12.681 0.826,12.681 0.479,12.343 C0.131,12.004 0.131,11.455 0.479,11.116 L5.116,6.601 L0.479,2.085 C0.131,1.747 0.131,1.198 0.479,0.860 C0.826,0.521 1.390,0.521 1.738,0.860 L6.986,5.970 C7.164,6.143 7.249,6.373 7.244,6.601 C7.249,6.829 7.164,7.058 6.986,7.232 L1.738,12.343 Z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="folder-title" @click.right = "contextOpen($event)">
                      <div class="folder-name">
                        Машинки
                      </div>
                      <div class="folder-controls-c">
                        <span class="badge badge-success badge-pill">21</span>
                        <button class="btn-icon-tr">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="8px" height="13px">
                            <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                                  d="M1.738,12.343 C1.390,12.681 0.826,12.681 0.479,12.343 C0.131,12.004 0.131,11.455 0.479,11.116 L5.116,6.601 L0.479,2.085 C0.131,1.747 0.131,1.198 0.479,0.860 C0.826,0.521 1.390,0.521 1.738,0.860 L6.986,5.970 C7.164,6.143 7.249,6.373 7.244,6.601 C7.249,6.829 7.164,7.058 6.986,7.232 L1.738,12.343 Z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>

                <!--<div v-for="singleFolder in foldersCatalog" :key="singleFolder.folderId">-->
                <!--{{singleFolder.folderId}}  -->
                <!--</div>-->
              </div>
            </div>
          </div>
          <div class="folder-f">
            <div class="js-context-folder context-menu-custom" :class="{'is-active': contextMenu.contextMenuOpen}" :style="{top: contextMenu.yPos+'px', left: contextMenu.xPos+'px' }">
              <ul>
                <li>
                  <a href="">
                    Параметры
                  </a>
                </li>
                <li>
                  <a href="">
                    Товары
                  </a>
                </li>
                <li>
                  <a href="">
                    Добавить
                  </a>
                </li>
                <li>
                  <a href="">
                    Удалить
                  </a>
                </li>
              </ul>
            </div>
            <div class="last-change-f">
              <div class="svg-c flex-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="24px" height="24px">
                  <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                        d="M11.975,23.477 C5.624,23.477 0.476,18.329 0.476,11.977 C0.476,5.626 5.624,0.477 11.975,0.477 C18.327,0.477 23.476,5.626 23.476,11.977 C23.476,18.329 18.327,23.477 11.975,23.477 ZM11.975,3.477 C7.281,3.477 3.475,7.283 3.475,11.977 C3.475,16.671 7.281,20.477 11.975,20.477 C16.670,20.477 20.475,16.671 20.475,11.977 C20.475,7.283 16.670,3.477 11.975,3.477 ZM16.975,13.477 L11.975,13.477 C11.147,13.477 10.475,12.806 10.475,11.977 L10.475,6.977 C10.475,6.149 11.147,5.477 11.975,5.477 C12.804,5.477 13.476,6.149 13.476,6.977 L13.476,10.477 L16.975,10.477 C17.804,10.477 18.475,11.149 18.475,11.977 C18.475,12.806 17.804,13.477 16.975,13.477 Z"/>
                </svg>
              </div>
              <div class="discr-txt">
                Последнее изменение Сегодня 18:00
              </div>
            </div>
          </div>
        </div>
      </transition>
      <transition name="vue-fade" mode="out-in"
                  enter-active-class="animated zoomInLeft"
                  leave-active-class="animated zoomOut">
        <div v-show="!showSideBarCatalog">
          <div class="bb">
            <div class="folder-h ">
              <div class="title-h">
                <div class="svg-c">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="21px" height="24px">
                    <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                          d="M18.000,24.000 L3.000,24.000 C2.172,24.000 1.464,23.707 0.879,23.121 C0.293,22.536 -0.000,21.829 -0.000,21.000 L-0.000,3.000 C-0.000,1.343 1.343,0.000 3.000,0.000 L12.000,0.000 L12.000,6.000 C12.000,7.657 13.343,9.000 15.000,9.000 L21.000,9.000 L21.000,21.000 C21.000,22.657 19.657,24.000 18.000,24.000 ZM14.000,0.000 L21.000,7.000 L14.000,7.000 L14.000,0.000 Z"/>
                  </svg>
                </div>
              </div>
              <button class="btn-icon-tr hide-side-panel-btn show-sp"
                      @click="showSideBarCatalogToogle" data-toggle="tooltip" data-placement="bottom"
                      data-original-title="Развернуть каталог"  >
                <svg width="100%" height="100%" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">
                    <g transform="matrix(0.0390625,0,0,0.0390625,0,0)">
                        <path d="M509.336,220.717C507.553,218.939 505.288,218.052 502.518,218.052L132.741,218.052L132.741,151.682C132.741,147.729 130.861,144.867 127.112,143.089C123.355,141.51 119.898,142.104 116.74,144.867L2.961,249.755C0.986,251.733 0,254.103 0,256.867C0,259.434 0.986,261.708 2.961,263.682L116.741,367.387C119.902,369.954 123.359,370.454 127.113,368.868C130.862,367.29 132.742,364.428 132.742,360.277L132.742,293.907L502.525,293.907C505.289,293.907 507.562,293.015 509.337,291.243C511.113,289.467 512,287.198 512,284.431L512,227.538C512.003,224.773 511.112,222.497 509.336,220.717Z" style="fill:rgb(131,147,167);fill-rule:nonzero;"/>
                    </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </transition>




    </div>
</template>

<script>
    export default {
        name: 'catalogFolders',
        data () {
            return {
                contextMenu:{ // Контекстное меню
                    contextMenuOpen: false, //состояние контекстного меню (закрыто/открыто)
                    yPos: 323,//полложение по оси x
                    xPos: 224//полложение по оси y
                },
                tmpCatalog:{
                  1231: {
                    folderId: '1231', //уникальный мд папки
                    name: 'Машинки', // Имя папки
                    goodsCount: 1023, // количество товаров в папке
                    childsIds: ['34', '45', '88'] //список вложенных папок
                  }
                },
                foldersCatalog: //все папки
                  [
                        {
                            folderId: '33', //уникальный мд папки
                            name: 'Машинки', // Имя папки
                            goodsCount: 1023, // количество товаров в папке
                            folderArr: [
                                {
                                    folderId: '121213', //уникальный мд папки
                                    name: 'Машинки', // Имя папки
                                    goodsCount: 102, // количество товаров в папке
                                    folderArr: []//массив папок
                                },
                                {
                                    folderId: '121214', //уникальный мд папки
                                    name: 'Машинки', // Имя папки
                                    goodsCount: 221, // количество товаров в папке
                                    folderArr: []//массив папок
                                },
                                {
                                    folderId: '1212134', //уникальный мд папки
                                    name: 'Машинки', // Имя папки
                                    goodsCount: 1302, // количество товаров в папке
                                    folderArr: []//массив папок
                                }
                            ]//массив папок
                        },
                        {
                            folderId: '2112', //уникальный мд папки
                            name: 'Машинки', // Имя папки
                            goodsCount: 1023, // количество товаров в папке
                            folderArr: [
                                {
                                    folderId: '121213', //уникальный мд папки
                                    name: 'Машинки', // Имя папки
                                    goodsCount: 102, // количество товаров в папке
                                    folderArr: []//массив папок
                                },
                                {
                                    folderId: '121214', //уникальный мд папки
                                    name: 'Машинки 123', // Имя папки
                                    goodsCount: 221, // количество товаров в папке
                                    folderArr: []//массив папок
                                },
                                {
                                    folderId: '1212134', //уникальный мд папки
                                    name: 'Машинки', // Имя папки
                                    goodsCount: 1302, // количество товаров в папке
                                    folderArr: []//массив папок
                                }
                            ]//массив папок
                        }
                    ]
            }
        },
        methods: {
            showSideBarCatalogToogle: function(){
              this.$emit('showSideBarCatalog', {'value': !this.showSideBarCatalog});
              console.log('showSideBarCatalog', this.showSideBarCatalog);
            },
            contextOpen: function(e){

                this.contextMenu.xPos = e.clientX;
                this.contextMenu.yPos = e.clientY;
                this.contextMenu.contextMenuOpen = true;

//                $('.folder-list .folder-title').removeClass('context-open');
//
//                $(e.target).parents('.folder-list .folder-title').addClass('context-open');

                console.log('e = ', e);

                e.preventDefault();
            },
            openSubfolder: function (e) {

            }
        },
        props:[
          'showSideBarCatalog'
        ],
        mounted(){

            let varthis = this;

            //для закрытия меню при клике
            $(document).click(function () {
                if(!$(this).hasClass('folder-title')){
                    varthis.contextMenu.contextMenuOpen = false;
                }
            });

        }
    }
</script>

<style lang="sass">
    /*@import 'assets/sass/main.sass';*/
</style>
