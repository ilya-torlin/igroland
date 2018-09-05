<!--Поставщики-->
<template>
    <!--provider.vue-->
    <!--
      todo: API - сохранение поставщика
      todo: API - блокировка/разблокировка поставщика
      todo: API - добавить ссылку на каталог для кнопки "скачать"
    -->

    <!--
      todo: доделать пагинацию, когда закончу делать компонент с пагинацией
      todo: заменить ассециативный массив providerList на обыный, такой же как в каталогах catalogList.vue
    -->

    <div class="container">
      <appProviderItem v-for="(providerItem, index) in providerList"
        :key = "index"
        :name = "providerItem.name"
        :lastUpdate = "providerItem.lastUpdate"
        :showConfig = "providerItem.showConfig"
        :isOn = "providerItem.isOn"
        :id = "providerItem.id"
        :inputsArr = "providerItem.inputsArr"
        :uploadTime = "providerItem.uploadTime"
        :uploadBtnArr = "providerItem.uploadBtnArr"
        :catalogFileUrl = "providerItem.catalogFileUrl"
         @configToogle = "onConfigToogle(index)"
         @isOnToogle = "onIsOnToogle(index)"
         @uploadTime = "onUploadTime"
         @saveProvider = "onSaveProvider(index)"
         @changeData = "onChangeData"
      >
      </appProviderItem>
    </div>
</template>

<script>
    import appProviderItem from './providerItem'
    import {API_URL} from '../constants'
    import axios from 'axios'

    import {mapActions} from 'vuex';
    import {mapMutations} from 'vuex';

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
                    uploadTime: '1',
                    catalogFileUrl: 'https://android-school.ru/wp-content/uploads/2016/07/FileUpload-1024x528.png',//файл для скачивания
                    catalogSaved: true,//провайдер сохранён, при внесении изменений или копирывании поставщика ставим в false... если каталог не сохранён, то его нельзя скопировать и выводится ошибка(предупреждение) для пользователя
                    inputsArr: {
                      'profit-val':{
                        id: 'profit-val',
                        showError: false,
                        validFeedback: "",
                        invalidFeedback: "Наценка введена неверно",
                        placeholder: "Наценка, руб.",
                        type: "text",
                        required: "false",
                        pattern: /^[0-9,.]{1,15}$/,
                        value: '',
                        isValid: false
                      },
                      'site-url':{
                        id: 'site-url',
                        showError: false,
                        validFeedback: "",
                        invalidFeedback: "Адрес сайта введён неверно",
                        placeholder: "Адрес",
                        type: "text",
                        required: "false",
                        pattern: /^[а-яА-Яa-zA-Z0-9_.\/#:]{5,100}$/,
                        value: '',
                        isValid: false
                      },
                      'profit-percent':{
                        id: 'profit-percent',
                        showError: false,
                        validFeedback: "",
                        invalidFeedback: "Наценка введена неверно",
                        placeholder: "Наценка, %",
                        type: "text",
                        required: "false",
                        pattern: /^[0-9,.]{1,15}$/,
                        value: '',
                        isValid: false
                      },
                    },
                    uploadBtnArr:[
                      {
                        btnTxt: '1ч.',//Текст кнопки
                        value: '1', //Значение
                      },
                      {
                        btnTxt: '2ч.',//Текст кнопки
                        value: '2', //Значение
                      },
                      {
                        btnTxt: '3ч.',//Текст кнопки
                        value: '3', //Значение
                      },
                      {
                        btnTxt: 'Раз в день',//Текст кнопки
                        value: 'Раз в день', //Значение
                      },

                    ]
                  },
                  21: {
                    name: 'Восток 10220',//имя поставщика
                    lastUpdate: '4 ч',// последнее обновление, приходит с сервера в виде строки
                    showConfig: false, // Тригер для отображения параметров переключателя(шестерёнка)
                    isOn: true, // Тригер для включения/отключения провайдера, если каталог отключён, то пользователи его не видят
                    id: 21, //идентификатор
                    uploadTime: '1',
                    catalogFileUrl: 'https://android-school.ru/wp-content/uploads/2016/07/FileUpload-1024x528.png',//файл для скачивания
                    catalogSaved: true,//провайдер сохранён, при внесении изменений или копирывании поставщика ставим в false... если каталог не сохранён, то его нельзя скопировать и выводится ошибка(предупреждение) для пользователя
                    inputsArr: {
                      'profit-val':{
                        id: 'profit-val',
                        showError: false,
                        validFeedback: "",
                        invalidFeedback: "Вес введен неверно",
                        placeholder: "Вес",
                        type: "text",
                        required: "false",
                        pattern: /^[0-9]{1,15}$/,
                        value: '',
                        isValid: false
                      },
                      'site-url':{
                        id: 'site-url',
                        showError: false,
                        validFeedback: "",
                        invalidFeedback: "Адрес сайта введён неверно",
                        placeholder: "Адрес",
                        type: "text",
                        required: "false",
                        pattern: /^[а-яА-Яa-zA-Z0-9_.\/#:]{5,100}$/,
                        value: '',
                        isValid: false
                      },
                      'profit-percent':{
                        id: 'profit-percent',
                        showError: false,
                        validFeedback: "",
                        invalidFeedback: "Наценка введена неверно",
                        placeholder: "Наценка, %",
                        type: "text",
                        required: "false",
                        pattern: /^[0-9,.]{1,15}$/,
                        value: '',
                        isValid: false
                      },
                    },
                    uploadBtnArr:[
                      {
                        btnTxt: '1ч.',//Текст кнопки
                        value: '1', //Значение
                      },
                      {
                        btnTxt: '2ч.',//Текст кнопки
                        value: '2', //Значение
                      },
                      {
                        btnTxt: '3ч.',//Текст кнопки
                        value: '3', //Значение
                      },
                      {
                        btnTxt: 'Раз в день',//Текст кнопки
                        value: 'Раз в день', //Значение
                      },

                    ]
                  },
                },

            }
        },
        components:{
          appProviderItem
        },
        methods: {
          ...mapActions('alerts',{
            setErrorAlertMsg: 'setErrorAlertMsg',
            setSuccessAlertMsg: 'setSuccessAlertMsg',
          }),
          ...mapMutations('progress',{
            setProgStateWidth: 'setProgStateWidth',
            setProgShow: 'setProgShow',
            stepOneActive: 'stepOneActive',
            stepTwoActive: 'stepTwoActive',
            stepLastActive: 'stepLastActive',
          }),
          //переключение поставщика в режим не сохранён
          falseCatalogSave(index){
            this.providerList[index].catalogSaved = false;
          },
          // переключение шестерёнки (настройки поставщика)
          onConfigToogle(index){
            this.providerList[index].showConfig = !this.providerList[index].showConfig;
          },
          // включение/отключение поставщика
          onIsOnToogle(index){
            let payload = this.providerList[index];
            this.stepOneActive(); // прогрессбар
            axios({url: API_URL + '/provider/block', data: payload, method: 'POST' })
              .then(resp => {
                const error = resp.data.error;
                this.stepLastActive(); // прогрессбар
                if(error){
                  let errorTxt = resp.data.data.msgClient;
                  this.setErrorAlertMsg('Ошибка при блокировке/разблокировке поставщика: ' + errorTxt);
                }else {
                  this.providerList[index].isOn = !this.providerList[index].isOn;
                  this.setSuccessAlertMsg('Изменения сохранены');
                }
              })
              .catch(err => {
                this.setErrorAlertMsg('Ошибка при блокировке/разблокировке поставщика');
                this.stepLastActive(); // прогрессбар
                console.log(err);
              });
          },
          // включение/отключение поставщика
          onUploadTime(payload){
            this.providerList[payload.id].uploadTime = payload.value;
            this.falseCatalogSave(payload.id);
          },
          // Обработчик для инпата
          onChangeData(payload){
            this.providerList[payload.id].inputsArr[payload.inputIndex].value = payload.value;
            this.providerList[payload.id].inputsArr[payload.inputIndex].isValid = payload.valid;
            this.falseCatalogSave(payload.id);
          },
          //Для валидации всех полей формы, вызывается перед отправкой формы на сервер
          FormValid(objectArr, firstKey){
            //objectArr - массив инпатов(форма, которую надо проверить на валидацию)
            //firstKey - любой ключ в массиве инпатов
            let isValid = objectArr[firstKey].isValid;
            for(let key in objectArr){
              isValid = isValid && objectArr[key].isValid;
            }
            return isValid;
          },
          // сохранение провайдера
          onSaveProvider(index){
            if(this.providerList[index].catalogSaved){
              this.setSuccessAlertMsg('Каталог сохранён');
            }else {
              if(this.FormValid(this.providerList[index].inputsArr, 'profit-percent')){
                let payload = this.providerList[index];
                this.stepOneActive(); // прогрессбар
                axios({url: API_URL + '/provider/save', data: payload, method: 'POST' })
                  .then(resp => {
                    const error = resp.data.error;
                    this.stepLastActive(); // прогрессбар
                    if(error){
                      let errorTxt = resp.data.data.msgClient;
                      this.setErrorAlertMsg('Ошибка при сохранении поставщика: ' + errorTxt);
                    }else {
                      this.providerList[index].catalogSaved = true;
                      this.setSuccessAlertMsg('Поставщик');
                    }
                  })
                  .catch(err => {
                    this.setErrorAlertMsg('Ошибка при сохранении провайдера');
                    this.stepLastActive(); // прогрессбар
                    console.log(err);
                  });
              }else{
                this.setErrorAlertMsg(`Форма заполненна некорректно`);
              }
            }

            // let indRand = (new Date).getTime();//unixtime in mileseconds
            // this.$set(this.providerList, indRand, Object.assign({}, this.providerList[index]));
            // this.providerList[indRand].catalogName = this.providerList[index].catalogName + ' (копия)';

          },
        }
    }
</script>

<style lang="sass">
    /*@import 'assets/sass/main.sass';*/
</style>
