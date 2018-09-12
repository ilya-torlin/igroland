<!--Каталог с привязанными категориями-->
<template>
    <!--catalogBasicFolders.vue-->
  <!--
    Логика работы компонента ↓↓↓
      Данные
        Есть временное хранилище rootCatalogFoldersComp, которое перезаписывается при помощи метода this.setFolders()
        Основное хранилище хранится в родительском компоненте
      Первоначальная инициализация
        Данные для папок запрашиваются в родительском компоненте, prop rootCatalogFolders
      Примерная логика работы открытия/закрытия папок
        Весь каталог представляет из себя обычный массив, БЕЗ ВЛОЖЕННОСТИ
        Изначально запрашиваются каталоги(далее папки) всех поставщиков
        При нажатии на значок расскрытия папки
          На сервер отправляется запрос, используя метод this.requestCategory(...params); данный метод возвращает promise и папки соответствующей категории(на которую кликнули)
          Если запрос успешен, то после родительской папки в массив добавляются новые папки, и перерасчитывается колличество папок-потомков (необходимо для удаления)
          Учитывайте, что есть несколько уровней вложенности, и у всех родителей необходимо пересчитать кол-во потомков... аналогично и с удалением
          !!!ВАЖНО Вызываем метод this.setFolders(), если вы изменили rootCatalogFoldersComp
        При нажатии на значок Закрытия папки
          Аналогичная ситуация что и с добавлением, в коде есть комментарии
  -->

  <div class=" catalog-folder white-bg" >
    <div class="bb">
      <!--<div class="folder-h" v-show="folderH">-->
        <!--<div class="title-h">-->
          <!--{{folderH}}-->
        <!--</div>-->
      <!--</div>-->
      <div class="folder-b">
        <div class="folder-c">
          <ul class="folder-list folder-list-main" v-if="rootCatalogFoldersComp.length > 0">
            <li v-for="(catFolder, index) in rootCatalogFoldersComp"
                @click="setSelectItem(catFolder, index, 'setSelectedItem')"
                :class="{'isActive' : (catFolder[propId] == selectedItemObjectId)}"
            >
              <!--:key - параметр для сортировки-->
              <div class="folder-title" @click.right = "" >
                <div class="folder-name ">
                  <div class="folder-controls-c">
                    <!-- todocomplete: по клику удалять связь категорий -->
                    <button class="btn-icon-tr" @click="setSelectItem(catFolder, index, 'removeAttachedItem')">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="16px" height="18px">
                        <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                              d="M14.909,6.000 L13.818,6.000 L13.818,16.875 C13.818,17.497 13.330,18.000 12.727,18.000 L3.273,18.000 C2.670,18.000 2.182,17.497 2.182,16.875 L2.182,6.000 L1.091,6.000 C0.488,6.000 0.000,5.497 0.000,4.875 C0.000,4.254 0.488,3.750 1.091,3.750 L3.273,3.750 L4.364,3.750 C4.364,1.679 5.992,0.000 8.000,0.000 C10.008,0.000 11.636,1.679 11.636,3.750 L12.727,3.750 L14.909,3.750 C15.512,3.750 16.000,4.254 16.000,4.875 C16.000,5.497 15.512,6.000 14.909,6.000 ZM7.273,15.750 L8.727,15.750 L8.727,6.750 L7.273,6.750 L7.273,15.750 ZM4.364,6.750 L4.364,15.750 L5.818,15.750 L5.818,6.750 L4.364,6.750 ZM8.000,1.500 C6.795,1.500 5.818,2.508 5.818,3.750 L10.182,3.750 C10.182,2.508 9.205,1.500 8.000,1.500 ZM11.636,6.750 L10.182,6.750 L10.182,15.750 L11.636,15.750 L11.636,6.750 Z"/>
                      </svg>
                    </button>
                  </div>
                  {{catFolder[propTitle]}}
                </div>
              </div>
            </li>
          </ul>
          <div class="empty-cat" v-else>
            {{ emptyList }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {API_URL} from '../constants';
  import axios from 'axios';
  import singleFolder from '../modules/singleFolder'


    export default {
        name: 'catalogBasicFolders',
        data () {
          return {
            rootCatalogFoldersComp: //каталог
              [
                /*{
                  attached_category_id:"33648"  // ид
                  attached_category_title:"Хомуты"
                  id:"6"
                }*/
              ],
            selectedItemObjectId: 0,
            selectedItemObjectIndex: 0, //
          }
        },
        computed: {
        },
        methods: {
          //перезапись массива каталога, используется в родительском компоненте
          setRootCatalogFoldersComp(value){
            this.rootCatalogFoldersComp = value;
          },
          //передача каталога в этом компоненте к родителю, вызывается если вы изменили rootCatalogFoldersComp
          setFolders(){
            this.$emit('setFolders', {'value': this.rootCatalogFoldersComp });
          },
          removeFromRoot(index){
            this.$delete(this.rootCatalogFoldersComp, index);
          },
          setSelectItem(catalog, index, action){
            if( this.selectedItemObjectId === catalog.id && this.selectedItemObjectIndex === index){
              this.selectedItemObjectId = 0;
              this.selectedItemObjectIndex = 0;
              //this.setSelectRoot();
            }else{
              this.selectedItemObjectId = catalog.id;
              this.selectedItemObjectIndex = index;
            }
            this.$emit(action, {'value': {
                id : catalog.id,
                index : index,
                name: catalog[this.propTitle],
                catalogId: +catalog[this.propId],
              } });
          },

        },
        props:[
          'folderH', // заголовок каталога
          'rootCatalogFolders', // все папки
          'selectedProvider', //выбранный поставщик (объект {name, id})
          'selectedItemId', // выбранный каталог (по которому кликнули, выделяется желтым цветом объект id)
          'selectedItemIndex', // выбранный каталог (по которому кликнули, выделяется желтым цветом объект index)
          'emptyList',  // вывод сообщения для пустого католога
          'propTitle',
          'propId',
        ],
        mounted(){
        }
    }
</script>

<style lang="sass">
    /*@import 'assets/sass/main.sass';*/
</style>
