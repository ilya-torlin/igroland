<!--Список всех каталогов-->
<template>
  <!--catalogList.vue-->
  <div class="catalogComp">
    <div class="row">
      <div class="col-12">
        <div class="btn-c">
          <button type="button" class="btn btn-outline-secondary">Новый каталог</button>
        </div>
      </div>
      <div class="col-12 mt-3">
        <div class="alert alert-success" role="alert">
          <div class="svg-c">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="23px" height="23px">
              <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                    d="M11.500,23.000 C5.149,23.000 -0.000,17.851 -0.000,11.500 C-0.000,5.149 5.149,-0.000 11.500,-0.000 C17.851,-0.000 23.000,5.149 23.000,11.500 C23.000,17.851 17.851,23.000 11.500,23.000 ZM17.557,7.414 C16.968,6.849 16.014,6.849 15.425,7.414 L10.064,12.505 L8.533,11.080 C7.944,10.516 6.990,10.516 6.401,11.080 C5.812,11.646 5.812,12.561 6.401,13.126 L8.998,15.573 C9.587,16.138 10.541,16.138 11.130,15.573 L17.557,9.460 C18.145,8.895 18.145,7.979 17.557,7.414 Z"/>
            </svg>
          </div>
          Каталог добавлен!
        </div>
      </div>
    </div>
    <div class="row catalog-list-r">
      <div class="col-12 catalog-list-c">
        <div class="catalog-list-i">
          <div class="catalog-h">
            <div class="title-cat">
              Игрушки
            </div>
            <div class="conf-panel">
              <div class="item">
                <button data-toggle="tooltip" data-placement="left" data-original-title="Активен">
                  <div class="svg-c">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      width="10px" height="17px">
                      <path fill-rule="evenodd"  fill="rgb(255, 229, 130)"
                            d="M7.685,0.632 L5.598,7.629 L9.425,7.629 L2.119,16.631 L4.206,9.630 L0.384,9.630 L7.685,0.632 Z"/>
                    </svg>
                  </div>
                </button>
              </div>
              <div class="item">
                <button data-toggle="tooltip" data-placement="top" data-original-title="Настройки">
                  <div class="svg-c">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      width="17px" height="17px">
                      <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                            d="M16.039,9.965 L14.539,9.965 C14.387,10.629 14.115,11.244 13.765,11.805 L14.834,12.874 C15.095,13.135 15.095,13.557 14.834,13.817 L13.892,14.760 C13.631,15.020 13.209,15.020 12.949,14.760 L11.885,13.696 C11.324,14.051 10.708,14.326 10.039,14.478 L10.039,15.965 C10.039,16.333 9.741,16.632 9.373,16.632 L8.040,16.632 C7.671,16.632 7.373,16.333 7.373,15.965 L7.373,14.478 C6.705,14.326 6.088,14.051 5.527,13.696 L4.464,14.760 C4.203,15.020 3.781,15.020 3.521,14.760 L2.578,13.817 C2.318,13.557 2.318,13.135 2.578,12.874 L3.647,11.805 C3.297,11.244 3.025,10.629 2.874,9.965 L1.373,9.965 C1.004,9.965 0.706,9.666 0.706,9.299 L0.706,7.965 C0.706,7.597 1.004,7.298 1.373,7.298 L2.874,7.298 C3.025,6.634 3.297,6.019 3.647,5.459 L2.578,4.389 C2.318,4.128 2.318,3.707 2.578,3.446 L3.521,2.503 C3.781,2.243 4.203,2.243 4.464,2.503 L5.527,3.567 C6.088,3.212 6.705,2.938 7.373,2.785 L7.373,1.299 C7.373,0.930 7.671,0.632 8.040,0.632 L9.373,0.632 C9.741,0.632 10.039,0.930 10.039,1.299 L10.039,2.785 C10.708,2.938 11.324,3.212 11.885,3.567 L12.949,2.503 C13.209,2.243 13.631,2.243 13.892,2.503 L14.834,3.446 C15.095,3.707 15.095,4.128 14.834,4.389 L13.765,5.459 C14.115,6.019 14.387,6.634 14.539,7.298 L16.039,7.298 C16.408,7.298 16.706,7.597 16.706,7.965 L16.706,9.299 C16.706,9.666 16.408,9.965 16.039,9.965 ZM8.706,4.632 C6.497,4.632 4.706,6.423 4.706,8.632 C4.706,10.841 6.497,12.632 8.706,12.632 C10.915,12.632 12.706,10.841 12.706,8.632 C12.706,6.423 10.915,4.632 8.706,4.632 ZM8.706,10.632 C7.602,10.632 6.706,9.736 6.706,8.632 C6.706,7.527 7.602,6.631 8.706,6.631 C9.811,6.631 10.706,7.527 10.706,8.632 C10.706,9.736 9.811,10.632 8.706,10.632 Z"/>
                    </svg>
                  </div>
                </button>
              </div>
              <div class="item">
                <button data-toggle="tooltip" data-placement="top" data-original-title="Выключить">
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
          <div class="catalog-b">
            <label for="photoUpload">
              <input type="file" id="photoUpload">
            </label>

            <multiselect
              v-model="selected"
              :options="options"
              :multiple="true"
              :close-on-select="true"
              placeholder="Пользователи"
              label="name"
              track-by="name">
            </multiselect>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import Multiselect from 'vue-multiselect'

  export default {
    name: 'catalogList',
    data () {
      return {
        selected: null,
        options: [
          {name: 'User 1'},
          {name: 'User 2'},
          {name: 'User 3'}]
      }
    },
    components: {
      Multiselect
    },
    mounted(){
      $('[data-toggle="tooltip"]').tooltip();
    }
  }
</script>

<style lang="sass">
  @import '../../node_modules/vue-multiselect/dist/vue-multiselect.min.css'
  /*@import 'assets/sass/main.sass';*/
</style>
