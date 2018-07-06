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
                <div class="switcher-c" :class="{'is-active':switcherActive}" @click="switcherActive = !switcherActive">
                    <div class="switcher-i">

                    </div>
                    <div class="txt-sw">
                        Скрыть не в наличии
                    </div>
                </div>

                <select name="" id="">
                    <option value="">
                        Игроленд
                    </option>
                    <option value="">
                        РС Восток
                    </option>
                    <option value="">
                        Гала Центр
                    </option>
                    <option value="">
                        Союз игрушка
                    </option>
                </select>

            </div>
        </div>
    </div>
</template>

<script>

    import styler from 'jquery-form-styler'


    export default {
        name: 'breadcrumbs',
        data () {
            return {
                msg: 'breadcrumbs',
                switcherActive: true
            }
        },
        mounted(){
            $(function () {
                $('[data-toggle="tooltip"]').tooltip();
                $('select, input[type="number"], input[type="file"]').styler();
            });
        }
    }
</script>

<style lang="sass">
    /*@import 'assets/sass/main.sass';*/
</style>
