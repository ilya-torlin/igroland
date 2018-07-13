<!--Каталог-->
<template>
    <!--catalogconfig.vue-->
    <div class="container">
        <div class="row">
            <div class="col-3">
                <appCatalogFolders>
                </appCatalogFolders>
            </div>
            <div class="col-9">
                <appBreadcrumbs></appBreadcrumbs>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueRouter from 'vue-router'

    import appCatalogFolders from './catalogFolders.vue'
    Vue.component('appCatalogFolders', appCatalogFolders);

    import appBreadcrumbs from './breadcrumbs.vue'
    Vue.component('appBreadcrumbs', appBreadcrumbs);

    export default {
        name: 'app',
        data () {
            return {
                msg: 'catalog'
            }
        }
    }
</script>

<style lang="sass">
    /*@import 'assets/sass/main.sass';*/
</style>
