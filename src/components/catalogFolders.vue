<!--Каталог с папками (панель слева)-->
<template>
    <!--catalogFolders.vue-->
    <div class="container">
        <div class="row">
            <div class="col">
                <h1>
                    ComponentTemplate {{msg}}
                </h1>
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
        }
    }
</script>

<style lang="sass">
    /*@import 'assets/sass/main.sass';*/
</style>
