<!--Хлебные крошки-->
<template>
    <!--breadcrumbs.vue-->
    <div class="row breadcrumb-r">
        <div class="col-6">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Автомобили</a></li>
                <li class="breadcrumb-item"><a href="#">Легковые</a></li>
                <li class="breadcrumb-item active">
                    <!--<input type="text" placeholder="Новая категория">-->
                    <div class="form-group">
                        <div class="input-group">
                            <input type="text" placeholder="Новая категория" class="form-control" aria-label="Amount (to the nearest dollar)">
                            <div class="input-group-append">
                                <button type="button" data-toggle="tooltip" data-placement="bottom" data-original-title="Добавить категорию" class="btn btn-success">+</button>
                            </div>
                        </div>
                    </div>
                </li>
            </ol>
        </div>
        <div class="col-6">
            <div class="control-panel-filter">

                <appSwitcher  txt="Скрыть не в наличии"
                              :switcherActive="switcherActive"
                              @switchToogle="switcherActive = $event.switcherActive">
                </appSwitcher>


                <select name="" id="" ref="selCompanyList">
                    <option value="Игроленд">
                        Игроленд
                    </option>
                    <option value="РС Восток">
                        РС Восток
                    </option>
                    <option value="Гала Центр">
                        Гала Центр
                    </option>
                    <option value="Союз игрушка">
                        Союз игрушка
                    </option>
                </select>

            </div>
        </div>
    </div>
</template>

<script>
    // import $ from '../../node_modules/jquery';
    import '../../src/assets/libs/jQueryFormStyler-master/dist/jquery.formstyler.min';
    import appSwitcher from './switcher'
    export default {
        name: 'breadcrumbs',
        data () {
            return {
              msg: 'breadcrumbs',
              switcherActive: true,
              selCompanyList: ''
            }
        },
        components:{
          appSwitcher
        },
        mounted(){
          $('[data-toggle="tooltip"]').tooltip();

          $('select, input[type="number"], input[type="file"]').styler();

          $(this.$refs.selCompanyList).on('change', () => {
            this.selCompanyList = this.$refs.selCompanyList.value;
          });
        }
    }
</script>

<style lang="sass">
  /*@import '../../src/assets/libs/jQueryFormStyler-master/dist/jquery.formstyler.css'*/
  /*@import '../../src/assets/libs/jQueryFormStyler-master/dist/jquery.formstyler.theme.css'*/

  /*@import 'assets/sass/main.sass';*/
</style>
