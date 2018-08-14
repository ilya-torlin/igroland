<!--Хлебные крошки-->
<template>
    <!--breadcrumbs.vue-->
    <div class="row breadcrumb-r">
        <div class="col-6">

          <ol class="breadcrumb">

            <li class="breadcrumb-item"
                v-for="(item, index) in breadcrumbs"
                v-if="breadcrumbs.length > 0"
                @click="breadItemClicked(item.id)">
              <a href="javascript:void(0)">
                {{item.title}}
              </a>
            </li>
            <li class="breadcrumb-item active">
                <div class="form-group">
                    <div class="input-group">
                        <input type="text" v-model="newCatalogName" placeholder="Новая категория" class="form-control" aria-label="Amount (to the nearest dollar)">
                        <div class="input-group-append">
                            <button @click = "createNewCatalog(newCatalogName)" type="button" data-toggle="tooltip" data-placement="bottom" data-original-title="Добавить категорию" class="btn btn-success">+</button>
                        </div>
                    </div>
                </div>
            </li>
            </ol>
        </div>
        <div class="col-6">
            <div class="control-panel-filter">
                <appSwitcher  txt="Скрыть не в наличии"
                              :switcherActive="hideNotOwnedSwitch"
                              @switchToogle="hideNotOwned">
                </appSwitcher>

              <div class="d-flex align-items-center selectLabeled" cont="">
                <multiselect
                  v-model="selectedProvider"
                  :options="providerList"
                  :multiple="false"
                  :close-on-select="true"
                  :allow-empty="false"
                  :searchable="false"
                  placeholder="Выбрать поставщика"
                  selectedLabel="Выбрано"
                  label="name"
                  track-by="name"
                  selectLabel="Выбрать"
                  deselectLabel=""
                  @input = "onChangeProvider">
                </multiselect>
              </div>

              <!--<select name="" id="" ref="selCompanyList">-->
                <!--<option value="Союз игрушка">-->
                  <!--Все поставщеки-->
                <!--</option>-->
                <!--<option value="Игроленд">-->
                      <!--Игроленд-->
                  <!--</option>-->
                  <!--<option value="РС Восток">-->
                      <!--РС Восток-->
                  <!--</option>-->
                  <!--<option value="Гала Центр">-->
                      <!--Гала Центр-->
                  <!--</option>-->
                  <!--<option value="Союз игрушка">-->
                      <!--Союз игрушка-->
                  <!--</option>-->
              <!--</select>-->
            </div>
        </div>
    </div>
</template>

<script>
    // import $ from '../../node_modules/jquery';
    import '../../src/assets/libs/jQueryFormStyler-master/dist/jquery.formstyler.min';
    import appSwitcher from './switcher'
    import Multiselect from 'vue-multiselect'
    export default {
        name: 'breadcrumbs',
        data () {
            return {
              hideNotOwnedSwitch: true, //переключатель, скрыть в наличии
              newCatalogName: '', // новое имя каталога
            }
        },
        components:{
          appSwitcher,
          Multiselect
        },
        props: [
          'breadcrumbs',//массив с хлебными крошками
          'providerList',// поставщики для селекта
          'selectedProvider',//выбранный поставщик
        ],
        methods:{
          breadItemClicked(catalogId){
            this.$emit('breadItemClicked', {'value': catalogId});
          },
          createNewCatalog(catalogName){
            this.$emit('createNewCatalog', {'value': catalogName});
          },
          hideNotOwned(){
            this.hideNotOwnedSwitch = !this.hideNotOwnedSwitch;
            this.$emit('hideNotOwned', {'value': this.hideNotOwnedSwitch})
          },
          onChangeProvider(){
            this.$emit('changeProvider', {'value': this.selectedProvider})
          },
        },
        mounted(){
          $('[data-toggle="tooltip"]').tooltip();
          $('select, input[type="number"], input[type="file"]').styler();
        }
    }
</script>

<style lang="sass">
  /*@import '../../src/assets/libs/jQueryFormStyler-master/dist/jquery.formstyler.css'*/
  /*@import '../../src/assets/libs/jQueryFormStyler-master/dist/jquery.formstyler.theme.css'*/
  @import '../../node_modules/vue-multiselect/dist/vue-multiselect.min.css'

  /*@import 'assets/sass/main.sass';*/
</style>
