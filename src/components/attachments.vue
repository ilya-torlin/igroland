<!--Приложения-->
<template>
    <!--attachments.vue-->
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
                msg: 'attachments'
            }
        }
    }
</script>

<style lang="sass">
    /*@import 'assets/sass/main.sass';*/
</style>
