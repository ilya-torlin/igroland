<!--Поставщики-->
<template>
    <!--provider.vue-->
    <div class="container">
      <appProviderItem v-for="(providerItem, index) in providerList"
        :key = "index"
        :providerIndex="index"
        :provider = "providerItem"
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
                isValid: true
              },
              'site-url':{
                id: 'site-url',
                showError: false,
                validFeedback: "",
                invalidFeedback: "Адрес сайта введён неверно",
                placeholder: "Адрес",
                type: "text",
                required: "false",
                pattern: /^[а-яА-Яa-zA-Z0-9\-_.,?=&\/#:]{5,200}$/,
                value: '',
                isValid: true
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
                isValid: true
              },
            },
            providerList:[],
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
            let currentSupp = this.providerList[index];
            let payload = {
              value: !currentSupp.isOn,
            };
            this.stepOneActive(); // прогрессбар
            axios({url: API_URL + `/supplier/${currentSupp.id}/setonoff`, data: payload, method: 'POST' })
              .then(resp => {
                const error = resp.data.error;
                this.stepLastActive(); // прогрессбар
                if(error){
                  let errorTxt = resp.data.data.msgClient;
                  this.setErrorAlertMsg('Ошибка при блокировке/разблокировке поставщика: ' + errorTxt);
                }else {
                  this.providerList[index].isOn = !this.providerList[index].isOn;
                  let msgS = 'Поставщик ';
                  (this.providerList[index].isOn) ? msgS += 'разблокирован' : msgS += 'заблокирован';
                  this.setSuccessAlertMsg(msgS);
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
                let currentSupp = this.providerList[index];
                let payload = {
                  link: currentSupp.inputsArr['site-url'].value,
                  price_add: currentSupp.inputsArr['profit-percent'].value,
                  sort: currentSupp.inputsArr['profit-val'].value,
                };
                this.stepOneActive(); // прогрессбар
                axios({url: API_URL + `/supplier/${currentSupp.id}`, data: payload, method: 'PUT' })
                  .then(resp => {
                    const error = resp.data.error;
                    this.stepLastActive(); // прогрессбар
                    if(error){
                      let errorTxt = resp.data.data.msgClient;
                      this.setErrorAlertMsg('Ошибка при сохранении данных поставщика: ' + errorTxt);
                    }else {
                      this.providerList[index].catalogSaved = true;
                      this.setSuccessAlertMsg('данные поставщика сохранены');
                    }
                  })
                  .catch(err => {
                    this.setErrorAlertMsg('Ошибка при сохранении данных провайдера');
                    this.stepLastActive(); // прогрессбар
                    console.log(err);
                  });
              }else{
                this.setErrorAlertMsg(`Форма заполненна некорректно`);
              }
            }
          },
          // загрузка каталогов (инициализация)
          onInitProviders(){
            this.stepOneActive(); // прогрессбар
            axios.get( API_URL + '/supplier', { params: {} })
              .then(resp => {
                const error = resp.data.error;
                this.stepLastActive(); // прогрессбар
                if(error){
                  let errorTxt = resp.data.data.msgClient;
                  this.setErrorAlertMsg(`Ошибка при загрузке каталогов`);
                }else {
                  //this.setSuccessAlertMsg(`Каталоги загружены`);
                  let arrayList = resp.data.data;
                  this.providerList.init = [];
                  for (let supplier of arrayList) {
                    // копируем список инпутов
                    let inputsProfit = Object.assign({},this.inputsArr['profit-val']);
                    let inputsSite = Object.assign({},this.inputsArr['site-url']);
                    let inputsPercent = Object.assign({},this.inputsArr['profit-percent']);
                    let inputs ={
                      'profit-val' : inputsProfit,
                      'site-url' : inputsSite,
                      'profit-percent' : inputsPercent
                    };
                    // подготовили структуру для двбавления в список поставщиков
                    let currentSup = {
                      name: supplier.title,
                      showConfig: false,
                      isOn: +supplier.importIsActive,
                      id: supplier.id,
                      catalogFileUrl: '',
                      catalogSaved: true,
                      inputsArr: inputs
                    };
                    currentSup.inputsArr['profit-val'].value  = +supplier.sort;
                    currentSup.inputsArr['site-url'].value = supplier.link;
                    currentSup.inputsArr['profit-percent'].value = +supplier.price_add;

                    this.providerList.push(currentSup);
                  }
                }
              })
              .catch(err => {
                this.setErrorAlertMsg(`Ошибка при загрузке каталогов`);
                this.stepLastActive(); // прогрессбар
                console.log(err);
              });
          }
        },
        mounted(){
          this.onInitProviders();
        }
    }
</script>

<style lang="sass">
    /*@import 'assets/sass/main.sass';*/
</style>
