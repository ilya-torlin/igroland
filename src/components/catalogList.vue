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
    <!--todo: вынести в отдельный компонент-->

      <template v-for="(catalogItem, index) in catalogList">
        {{catalogItem.switcherActive}} {{index}} // <br>
      </template>

      <!--todo: Сделать функционал для: кнопки включения/отключения,
          todo: Список выделенных пользователей в селекте
          todo: Кнопки 'скопировать', 'сохранить', 'удалить'
          todo: Добавить ссылку на название каталога
          todo: кнопка "новый каталог"
          todo: Доделать пагинацию
          todo: Сделать заглушку, если нет каталогов
      -->
      <appCatalogItem v-for="(catalogItem, index) in catalogList"
        :key="index"
        :selected="catalogItem.selected"
        :switcherActive="catalogItem.switcherActive"
        :showConfig="catalogItem.showConfig"
        :userList="catalogItem.userList"
        :catalogName="catalogItem.catalogName"
        :catalogId="index"
        :isActive="catalogItem.isActive"
        :isOn="catalogItem.isOn"
        :description="catalogItem.description"
        @configToogle = "onConfigToogle(index)"
        @switchToogle = "onSwitchToogle(index)"
        @changeDescr = "onChangeDescr(index, $event)">
      </appCatalogItem>


    <div class="row">
      <div class="col-12">
        <!--todo: добавить массив со страницамив состояние-->
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Предыдущая</span>
              </a>
            </li>
            <li class="page-item is-active"><a class="page-link" href="#">1</a></li>
            <li class="page-item dots-pag"><a class="page-link" href="#">...</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">4</a></li>
            <li class="page-item dots-pag"><a class="page-link" href="#">...</a></li>
            <li class="page-item"><a class="page-link" href="#">15</a></li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Следующая</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>

  import appCatalogItem from './catalogItem'
  export default {
    name: 'catalogList',
    data () {
      return {
        // catalogList["123"]
        catalogList: { // ассоциативный массив объектов
            123: { // Идентификатор каталога
              selected: null, // выбранные элементы в селекте
              switcherActive: false, // активность переключателя
              showConfig: true, // Тригер для отображения параметров переключателя
              catalogName: 'Игрушки', // Наименование каталога
              isActive: true, // каталог активен(значёе молнии), один или несколько пользователей используют его
              isOn: false, // Тригер для включения/отключения каталога, если каталог отключён, то пользователи его не видят
              description: 'Краткое описание каталога', // краткое описание каталога
              catalogImg: '', // Изображение каталога
              userList: [ // пользователи для селекта
                {name: 'user@gmail.com'},
                {name: 'goner@gmail.com'},
                {name: '2user2@gmail.com'}
              ]
            },
            1232: { // Идентификатор каталога
              selected: null, // выбранные элементы в селекте
              switcherActive: false, // активность переключателя
              showConfig: false, // Тригер для отображения параметров переключателя
              catalogName: 'Игрушки2', // Наименование каталога
              isActive: false, // каталог активен(значёе молнии), один или несколько пользователей используют его
              isOn: false, // Тригер для включения/отключения каталога, если каталог отключён, то пользователи его не видят
              description: '', // краткое описание каталога
              catalogImg: '', // Изображение каталога
              userList: [ // пользователи для селекта
                {name: 'user@gmail.com'},
                {name: 'goner@gmail.com'},
                {name: '2user2@gmail.com'}
              ]
            }
        },
        //pagination, при переключении страницы, делаем запрос к серверу
        countPage: 12, // колличество страниц
      }
    },
    methods: {
      onConfigToogle(index){
        this.catalogList[index].showConfig = !this.catalogList[index].showConfig;
      },
      onSwitchToogle(index){
        this.catalogList[index].switcherActive = !this.catalogList[index].switcherActive;
      },
      onChangeDescr(index, e){
        console.log('e.value = ', e.value);
        this.catalogList[index].description = e.value;
      }
    },
    computed: {
      currentPage(){ // текущая страница, передаётся в url в качестве параметра
        return this.$route.params.page || 1;
      },
      catalogList123(){
        return this.catalogList[0]["123"];
      }
    },
    components: {
      appCatalogItem
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
