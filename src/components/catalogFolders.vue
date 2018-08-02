<!--Каталог с папками (панель слева)-->
<template>
    <!--catalogFolders.vue-->

    <!--
      todo: для каталога делается запрос на сервер(отправляется ид родителя), с сервера приходят потомки
    -->

    <div class="catalog-folder white-bg">
        <div class="folder-h">
            <div class="title-h">
                Каталог
            </div>
            <button class="btn-icon-tr" @click="refreshFolders">
                <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="17px" height="17px">
                    <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                          d="M15.815,6.847 L13.715,6.847 L10.042,6.847 L12.294,4.604 C11.204,3.518 9.697,2.847 8.033,2.847 C4.965,2.847 2.435,5.129 2.057,8.081 C2.057,8.081 1.942,8.847 1.073,8.847 C0.518,8.847 0.069,8.399 0.069,7.847 C0.069,7.771 0.078,7.698 0.094,7.627 C0.684,3.788 4.012,0.847 8.033,0.847 C10.252,0.847 12.261,1.742 13.715,3.190 L16.068,0.847 L16.068,6.847 L15.815,6.847 ZM2.421,10.847 L6.095,10.847 L3.842,13.090 C4.933,14.175 6.439,14.847 8.103,14.847 C11.171,14.847 13.702,12.564 14.079,9.612 C14.079,9.612 14.194,8.847 15.064,8.847 C15.619,8.847 16.068,9.294 16.068,9.847 C16.068,9.922 16.059,9.996 16.043,10.067 C15.453,13.906 12.124,16.847 8.103,16.847 C5.885,16.847 3.876,15.951 2.422,14.504 L0.068,16.847 L0.068,10.847 L0.321,10.847 L2.421,10.847 Z"/>
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
</template>

<script>
    export default {
        name: 'catalogFolders',
        data () {
            return {
                msg: 'catalogFolders',
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
                        }
                    ]
            }
        },
        methods: {
            refreshFolders: function(){
                console.log('refreshFolders');
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
