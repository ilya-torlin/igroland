<!--Поставщики-->
<template>
    <!--provider.vue-->
    <!--
      todo: API - сохранение поставщика
      todo: API - блокировка/разблокировка поставщика
    -->

    <!--todo: доделать пагинацию, когда закончу делать компонент с пагинацией
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

    import {mapGetters} from 'vuex';
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
          ...mapMutations('alerts',{
            setSuccesAlertShow: 'setSuccesAlertShow',
            setErrorAlertShow: 'setErrorAlertShow',
            setSuccesAlertMsg: 'setSuccesAlertMsg',
            setErrorAlertMsg: 'setErrorAlertMsg'
          }),
          ...mapMutations('progress',{
            setProgStateWidth: 'setProgStateWidth',
            setProgShow: 'setProgShow',
            stepOneActive: 'stepOneActive',
            stepTwoActive: 'stepTwoActive',
            stepLastActive: 'stepLastActive',
          }),
          falseCatalogSave(index){//переключение поставщика в режим не сохранён
            this.providerList[index].catalogSaved = false;
          },
          onConfigToogle(index){// переключение шестерёнки (настройки поставщика)
            this.providerList[index].showConfig = !this.providerList[index].showConfig;
          },
          onIsOnToogle(index){// включение/отключение поставщика

            let payload = this.providerList[index];
            this.stepOneActive(); // прогрессбар
            axios({url: API_URL + '/provider/block', data: payload, method: 'POST' })
              .then(resp => {
                const error = resp.data.error;
                this.stepLastActive(); // прогрессбар
                if(error){
                  let errorTxt = resp.data.data.msgClient;
                  this.setErrorAlertShow(true);
                  this.setErrorAlertMsg('Ошибка при блокировке/разблокировке поставщика: ' + errorTxt);
                }else {
                  this.providerList[index].isOn = !this.providerList[index].isOn;
                  this.setSuccesAlertShow(true);
                  this.setSuccesAlertMsg('Изменения сохранены');
                }
              })
              .catch(err => {
                this.setErrorAlertShow(true);
                this.setErrorAlertMsg('Ошибка при блокировке/разблокировке поставщика');
                this.stepLastActive(); // прогрессбар
                console.log(err);
              });
          },
          onUploadTime(payload){// включение/отключение поставщика
            this.providerList[payload.id].uploadTime = payload.value;
            this.falseCatalogSave(payload.id);
          },
          onChangeData(payload){
            this.providerList[payload.id].inputsArr[payload.inputIndex].value = payload.value;
            this.providerList[payload.id].inputsArr[payload.inputIndex].isValid = payload.valid;
            this.falseCatalogSave(payload.id);
          },
          //form valid func
          FormValid(objectArr, firstKey){
            //objectArr - массив инпатов(форма, которую надо проверить на валидацию)
            //firstKey - любой ключ в массиве инпатов
            let isValid = objectArr[firstKey].isValid;
            for(let key in objectArr){
              isValid = isValid && objectArr[key].isValid;
            }
            return isValid;
          },
          onSaveProvider(index){ // сохранение провайдера
            if(this.providerList[index].catalogSaved){
              this.setSuccesAlertShow(true);
              this.setSuccesAlertMsg('Каталог сохранён');
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
                      this.setErrorAlertShow(true);
                      this.setErrorAlertMsg('Ошибка при сохранении поставщика: ' + errorTxt);
                    }else {
                      this.providerList[index].catalogSaved = true;
                      this.setSuccesAlertShow(true);
                      this.setSuccesAlertMsg('Поставщик');
                    }
                  })
                  .catch(err => {
                    this.setErrorAlertShow(true);
                    this.setErrorAlertMsg('Ошибка при сохранении провайдера');
                    this.stepLastActive(); // прогрессбар
                    console.log(err);
                  });
              }else{
                this.setErrorAlertShow(true);
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
