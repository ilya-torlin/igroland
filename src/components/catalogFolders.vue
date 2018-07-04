<!--Каталог с папками (панель слева)-->
<template>
    <!--catalogFolders.vue-->

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
                <ul class="folder-list">
                    <li>
                        <div class="folder-title">
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
                        <ul class="folder-list">
                            <li>
                                <div class="folder-title">
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
                                <div class="folder-name">
                                    Машинки
                                </div>
                                <div class="folder-controls-c">
                                    <span class="badge badge-success badge-pill">2312</span>
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
                            </li>
                            <li>
                                <div class="folder-name">
                                    Машинки
                                </div>
                                <div class="folder-controls-c">
                                    <span class="badge badge-success badge-pill">4</span>
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
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div class="folder-title">
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
                        <div class="folder-title">
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
            </div>
        </div>

    </div>
</template>

<script>

    export default {
        name: 'app',
        data () {
            return {
                msg: 'catalogFolders'
            }
        },
        methods: {
            refreshFolders: function(){
                console.log('refreshFolders');
            }
        }
    }
</script>

<style lang="sass">
    /*@import 'assets/sass/main.sass';*/
</style>
