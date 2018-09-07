<!--Компонент -->
<template>
    <!--componentTemplate.vue-->
  <transition name="vue-fade" mode="out-in"
              enter-active-class="animated zoomIn"
              leave-active-class="animated zoomOut">
    <div class="row catalog-list-r">
      <div class="col-12 catalog-list-c">
        <div class="catalog-list-i">
          <div class="catalog-h">
            <div class="title-cat">
              <div class=" ava-c" data-placement="bottom">
                <img :src="user.photo" :alt="user.name + user.surname">
              </div>
              <div class="user-info">
                <div class="h-user-name">
                  {{ user.login || user.name + user.surname }}
                </div>
                <div class="h-user-role">
                  {{user.email}}
                </div>
              </div>
            </div>
            <div class="conf-panel">
              <div class="item">
                <button  class="" data-dismiss="modal" @click="openRemoveModal(user.id)" data-toggle="tooltip" data-placement="top" data-original-title="Удалить пользователя" >
                  <div class="svg-c">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      width="16px" height="17px">
                      <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                            d="M14.309,6.310 L13.309,6.310 L13.309,15.977 C13.309,16.529 12.861,16.977 12.309,16.977 L3.643,16.977 C3.090,16.977 2.642,16.529 2.642,15.977 L2.642,6.310 L1.642,6.310 C1.090,6.310 0.642,5.862 0.642,5.310 C0.642,4.758 1.090,4.310 1.642,4.310 L3.643,4.310 L4.643,4.310 C4.643,2.469 6.135,0.977 7.976,0.977 C9.817,0.977 11.309,2.469 11.309,4.310 L12.309,4.310 L14.309,4.310 C14.862,4.310 15.309,4.758 15.309,5.310 C15.309,5.862 14.862,6.310 14.309,6.310 ZM7.309,14.977 L8.643,14.977 L8.643,6.977 L7.309,6.977 L7.309,14.977 ZM4.643,6.977 L4.643,14.977 L5.976,14.977 L5.976,6.977 L4.643,6.977 ZM7.976,2.310 C6.872,2.310 5.976,3.205 5.976,4.310 L9.976,4.310 C9.976,3.205 9.080,2.310 7.976,2.310 ZM11.309,6.977 L9.976,6.977 L9.976,14.977 L11.309,14.977 L11.309,6.977 Z"/>
                    </svg>
                  </div>
                </button>
              </div>
              <div class="item">
                <button :class="{isOnTr: user.isActive}" class="trIsOnB" @click="isOnToogle(user.id)" data-toggle="tooltip" data-placement="top" :data-original-title="user.isActive ? 'Заблокировать' : 'Разблокировать'" >
                  <div class="svg-c">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      width="17px" height="17px">
                      <path fill-rule="evenodd"  fill="rgb(3, 189, 91)"
                            d="M8.973,16.632 C4.555,16.632 0.974,13.193 0.974,8.951 C0.974,6.143 2.546,3.692 4.888,2.353 C5.168,2.198 5.406,2.166 5.495,2.165 C6.073,2.165 6.541,2.615 6.541,3.169 C6.538,3.577 6.320,3.821 6.171,3.941 C6.149,3.956 6.063,4.019 5.977,4.066 C4.234,5.053 3.060,6.867 3.060,8.951 C3.060,12.086 5.708,14.628 8.973,14.628 L8.973,14.632 C12.239,14.632 14.886,12.095 14.886,8.965 C14.886,6.885 13.713,5.074 11.970,4.089 C11.884,4.042 11.797,3.980 11.777,3.964 C11.627,3.845 11.409,3.601 11.406,3.194 C11.406,2.641 11.874,2.192 12.452,2.192 C12.541,2.193 12.779,2.225 13.059,2.380 C15.402,3.716 16.974,6.163 16.974,8.965 C16.974,13.199 13.392,16.632 8.973,16.632 ZM8.973,8.632 C8.397,8.632 7.930,8.184 7.930,7.632 L7.930,1.632 C7.930,1.079 8.397,0.632 8.973,0.632 C9.550,0.632 10.017,1.079 10.017,1.632 L10.017,7.632 C10.017,8.184 9.550,8.632 8.973,8.632 Z"/>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

  import {API_URL} from '../constants';
  import axios from 'axios';
  import {mapActions} from 'vuex';
  import {mapMutations} from 'vuex';

    export default {
      name: 'UserItem',
      data () {
          return {
              msg: 'template'
          }
      },
      computed: {
      },
      props: [
        'user'
      ],
      methods: {
        ...mapActions('alerts',{
          setErrorAlertMsg: 'setErrorAlertMsg',
          setSuccessAlertMsg: 'setSuccessAlertMsg',
        }),
        ...mapMutations('progress',{
          setProgStateWidth: 'setProgStateWidth',
          setProgShow: 'setProgShow',
          stepOneActive: 'stepOneActive',
          stepTwoActive: 'stepTwoActive',
          stepLastActive: 'stepLastActive',
        }),
        openRemoveModal(){
          this.$emit('deleteUser');
        },
        isOnToogle(userId){
          this.$emit('onSwitchIsActive');
        },
      },
    }
</script>

<style lang="sass">
    /*@import 'assets/sass/main.sass';*/
</style>
