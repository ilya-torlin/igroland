<!--Поставщики-->
<template>
    <!--provider.vue-->
    <!--todo: доделать всё, когда дорисуют макет
        todo: ссылка при клике на заголовок
        todo: открыть окно с конфигурацией
        todo: включение/отключение Поставщика
        todo: сделать страницу с поставщиком
    -->

    <div class="container">
      <appProviderItem v-for="(providerItem, index) in providerList"
      :key = "index"
      :name = "providerItem.name"
      :lastUpdate = "providerItem.lastUpdate"
      :showConfig = "providerItem.showConfig"
      :isOn = "providerItem.isOn"
      :id = "providerItem.id"

      >

      </appProviderItem>
    </div>
</template>

<script>
    import appProviderItem from './providerItem'

    export default {
        name: 'provider',
        data () {
            return {
                providerList:{
                  324: {
                    name: 'Восток 1000',//имя поставщика
                    lastUpdate: '4 ч',// последнее обновление, приходит с сервера в виде строки
                    showConfig: false, // Тригер для отображения параметров переключателя(шестерёнка)
                    isOn: true, // Тригер для включения/отключения провайдера, если каталог отключён, то пользователи его не видят
                    id: 324, //идентификатор
                  }
                }
            }
        },
        components:{
          appProviderItem
        }
    }
</script>

<style lang="sass">
    /*@import 'assets/sass/main.sass';*/
</style>
