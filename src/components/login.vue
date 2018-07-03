<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <label for="login-e">
                    Введите ваш логин
                </label>
                <input id="login-e" type="text" v-model="msg">
            </div>
            <div class="col">
                <h1>
                    Ваш логин: {{msg}}
                </h1>
            </div>
            <div class="col">
                <!--Вызываем событие 'getLogin', которое отслеживается и обрабатывается в родительском компоненте-->
                <button @click="$emit('getLogin')">
                    Войти
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data () {
            return {
                msg: 'TopKek'
            }
        }
    }
</script>

<style lang="sass">
    /*@import 'assets/sass/main.sass';*/
</style>
