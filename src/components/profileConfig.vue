<!--Профиль клиента-->
<template>
    <!--profileConfig.vue-->

    <!--
      todo: API - включение/отключение уведомлений
    -->
    <div class="profileUser-c">
        <div class="row">
            <div class="col-12">
              <div class="white-block-r">
                <div class="title-user">
                  <div class="ava-big-c">
                    <img :src="avatarUrl" alt="">
                  </div>
                </div>
                <div class="user-info">
                  <div class="user-name">
                    {{ userName + ' ' + profile.surname}}
                  </div>
                  <div class="user-contacts">
                    <div class="c-i" v-if="profile.email">
                      {{profile.email}}
                    </div>
                    <div class="c-i" v-if="profile.site">
                      {{profile.site}}
                    </div>
                    <div class="c-i" v-if="profile.phone">
                      {{profile.phone}}
                    </div>
                  </div>
                  <div class="label-c">
                    <label for="file" class="uploadProfileAva">
                      <appUpload
                        type="button"
                        inputId="file"
                        :url="imageUploadUrl"
                        @changeImage="onChangeImage($event)"
                      ></appUpload>
                    </label>

                  </div>
                </div>
              </div>
            </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="white-block-r22">
              <div class="row">
                <div class="col-12">
                  <h4>
                    ПРОФИЛЬ
                  </h4>
                </div>
              </div>
              <div class="row">
                <div class="col-3 " v-for="(elem, index) in inputsArr" >
                  <appInput class="appInputLabel"
                            :key="index"
                            :input="elem"
                            @changedata="onChangeData(index, $event)"
                  >
                  </appInput>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <button @click="updateUserProfile" type="button" class="btn btn-success" >Обновить</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="white-block-r22">
              <div class="row">
                <div class="col-12">
                  <h4>
                    ЗАМЕНА ПАРОЛЯ
                  </h4>
                </div>
              </div>
              <div class="row">
                <div class="col-3" v-for="(elem, index) in acountArr" >
                  <appInput class="appInputLabel"
                            :key="index"
                            :input="elem"
                            @changedata="onChangeDataAccaount(index, $event)"
                  >
                  </appInput>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <button @click="updateUserPwd" type="button" class="btn btn-success" >Обновить</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="white-block-r22">
              <div class="row">
                <div class="col-12">
                  <h4>
                    УВЕДОМЛЕНИЯ
                  </h4>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="fewSwitches">
                    <appSwitcher  v-for="(item, index) in notifications"
                                  :key = "index"
                                  :txt="item.txt"
                                  :switcherActive="item.switched"
                                  @switchToogle="onSwitchToogle(index)">
                    </appSwitcher>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';
    import {mapMutations} from  'vuex';
    import appInput from './inputValid'
    import {API_URL} from '../constants';
    import axios from 'axios';
    import appSwitcher from './switcher'
    import appUpload from './uploadFIles';
    export default {
        name: 'profileConfig',
        data () {
            return {
              msg: 'profileConfig',
              avatarImg:'',
              inputsArr:{ // Редактируемые поля профиля -- Ассоциативный массив для быстрого доступа к элементов
              'surname-i':{
              id: 'surname-i',
              showError: false,
              validFeedback: "",
              invalidFeedback: "Фамилия введена неверно",
              placeholder: "Фамилия",
              type: "text",
              required: "false",
              pattern: /^[а-яА-Яa-zA-Z]{2,15}$/,
              value: '',
              isValid: false
              },
              'name-i':{
              id: 'name-i',
              showError: false,
              validFeedback: "",
              invalidFeedback: "Имя введено неверно",
              placeholder: "Имя",
              type: "text",
              required: "false",
              pattern: /^[а-яА-Яa-zA-Z]{2,15}$/,
              value: '',
              isValid: false
              },
              'lastName-i':{
              id: 'lastName-i',
              showError: false,
              validFeedback: "",
              invalidFeedback: "Отчество введено неверно",
              placeholder: "Отчество",
              type: "text",
              required: "false",
              pattern: /^[а-яА-Яa-zA-Z]{2,15}$/,
              value: '',
              isValid: false
              },
              'login-i':{
              id: 'login-i',
              showError: false,
              validFeedback: "",
              invalidFeedback: "Логин введён неверно",
              placeholder: "Логин",
              type: "text",
              required: "true",
              pattern: /^[a-zA-Z0-9_@.]{6,30}$/,
              value: '',
              isValid: false
              },
              'email-i':{
              id: 'email-i',
              showError: false,
              validFeedback: "",
              invalidFeedback: "Email введён неверно",
              placeholder: "Email",
              type: "text",
              required: "true",
              pattern: /^[a-zA-Z0-9_@.]{6,30}$/,
              value: '',
              isValid: false
              },
              //todo: добавить маску для телефона
              'phone-i':{
              id: 'phone-i',
              showError: false,
              validFeedback: "",
              invalidFeedback: "Телефон введен неверно",
              placeholder: "Телефон",
              type: "tel",
              required: "false",
              pattern: /^[0-9()\-+]{1,14}$/,
              value: '',
              isValid: false
              },
              'site-i':{
              id: 'site-i',
              showError: false,
              validFeedback: "",
              invalidFeedback: "Сайт введен неверно",
              placeholder: "Сайт",
              type: "text",
              required: "false",
              pattern: /^[а-яА-Яa-zA-Z0-9_.\/#:]{5,100}$/,
              value: '',
              isValid: false
              },
              },
              acountArr:{ // Редактируемые поля профиля -- Ассоциативный массив для быстрого доступа к элементов
              'oldpass-i':{
              id: 'oldpass-i',
              showError: false,
              validFeedback: "",
              invalidFeedback: "Пароль введен неверно",
              placeholder: "Старый пароль",
              type: "text",
              required: "true",
              pattern: /^[0-9a-zA-Z!@#$%^&*]{6,}$/,
              value: '',
              isValid: false
              },
              'newpass-i':{
              id: 'newpass-i',
              showError: false,
              validFeedback: "",
              invalidFeedback: "Пароль введен неверно",
              placeholder: "Новый пароль",
              type: "password",
              required: "true",
              pattern: /^[0-9a-zA-Z!@#$%^&*]{6,}$/,
              value: '',
              isValid: false
              },
              'newpassrepeat-i':{
              id: 'newpassrepeat-i',
              showError: false,
              validFeedback: "",
              invalidFeedback: "Пароли не совпадают",
              placeholder: "Повторите новый пароль",
              type: "password",
              required: "true",
              pattern: /^[0-9a-zA-Z!@#$%^&*]{6,}$/,
              value: '',
              isValid: false
              },
              },
              notifications: {
              'newFeatures': {
              txt: 'Уведомлять меня о новых возможностях сервиса',
              switched: false,
              },
              'newCatalog': {
              txt: 'Уведомлять меня о новых каталогах',
              switched: false,
              },
              'newNews': {
              txt: 'Держать меня в курсе новостей сервиса',
              switched: false,
              },
              }
            }
        },
        computed: {
          ...mapGetters('user',
            {
              avatar: 'avatar',
              userName: 'name',
              userRole: 'role',
              profile: 'profile',
              id: 'id'
            }),
          profileFormValid(){
            return this.FormValid(this.inputsArr, 'email-i');
          },
          acountFormValid(){
            return this.FormValid(this.acountArr, 'oldpass-i');
          },
          imageUploadUrl(){
            return `/user/${this.id}/saveimage`;
          },
          avatarUrl(){
            return (this.avatarImg.length > 0) ? this.avatarImg : this.avatar;
          }
        },
        components: {
          appInput,
          appSwitcher,
          appUpload
        },
        methods:{
          ...mapMutations('progress',{
            setProgStateWidth: 'setProgStateWidth',
            setProgShow: 'setProgShow',
            stepOneActive: 'stepOneActive',
            stepTwoActive: 'stepTwoActive',
            stepLastActive: 'stepLastActive',
          }),
          ...mapMutations('user',{
            setStateName: 'setName',
            setAvatar: 'setAvatar'
          }),
          ...mapActions('user',{
            userRequest: 'USER_REQUEST',
          }),
          ...mapActions('alerts',{
            setErrorAlertMsg: 'setErrorAlertMsg',
            setSuccessAlertMsg: 'setSuccessAlertMsg',
          }),
          //проверка на валидацию всех полей в форме, возвращает true если все поля валидны
          FormValid(objectArr, firstKey){
            //objectArr - массив инпатов(форма, которую надо проверить на валидацию)
            //firstKey - любой ключ в массиве инпатов
            let isValid = objectArr[firstKey].isValid;
            for(let key in objectArr){
              isValid = isValid && objectArr[key].isValid;
            }
            return isValid;
          },
          // меняем фото после загрузки
          onChangeImage(e){
            this.setAvatar(e);
            this.avatarImg = e;
          },
          //обновление профиля пользователя
          updateUserProfile(){
            let payload = {
              surname: this.inputsArr['surname-i'].value,
              patronymic: this.inputsArr['lastName-i'].value,
              login: this.inputsArr['login-i'].value,
              email: this.inputsArr['email-i'].value,
              phone: this.inputsArr['phone-i'].value,
              site: this.inputsArr['site-i'].value,
              name: this.inputsArr['name-i'].value,
            };
            //
            this.stepOneActive(); // прогрессбар
            axios({url: API_URL + '/user/' + this.id, data: payload, method: 'PUT' })
              .then(resp => {
                const error = resp.data.error;
                this.stepLastActive(); // прогрессбар
                if(error){
                  this.stepLastActive();
                  let errorTxt = resp.data.data.msgClient;
                  this.setErrorAlertMsg('Ошибка при обновлении профиля: ' + errorTxt);
                }else {
                  this.stepLastActive();
                  //this.switcherActive = !this.switcherActive;
                  //this.usersList[index].blocked = !this.usersList[index].blocked;
                  this.setStateName(payload.name);
                  this.setSuccessAlertMsg('Профиль обновлён');
                }
              })
              .catch(err => {
                this.setErrorAlertMsg('Ошибка при обновлении профиля');
                console.log(err);
                this.stepLastActive();
              });
          },
          //обновление пароля пользователя
          updateUserPwd(){
            let oldpass = this.acountArr['oldpass-i'].value,
              newpass = this.acountArr['newpass-i'].value,
              newpassrepeat = this.acountArr['newpassrepeat-i'].value;
            let payload = {
              password: oldpass,
              newpassword: newpass,
            },
            samePwd = false;//флаг совпадения паролей

            if(newpass === newpassrepeat){
              samePwd = true;
            }

            this.stepOneActive(); // прогрессбар
            if(samePwd === true && this.acountFormValid === true){ // проверяем корректность заполнения полей
              axios({url: API_URL + `/user/${this.id}/password`, data: payload, method: 'PUT' })
                .then(resp => {
                  const error = resp.data.error;
                  this.stepLastActive(); // прогрессбар
                  if(error){
                    this.stepLastActive();
                    let errorTxt = resp.data.data.msgClient;
                    this.setErrorAlertMsg('Ошибка при обновлении профиля: ' + errorTxt);
                  }else {
                    this.stepLastActive();
                    this.setSuccessAlertMsg('Пароль обновлён');
                  }
                })
                .catch(err => {
                  this.setErrorAlertMsg('Ошибка при обновлении пароля');
                  console.log(err);
                  this.stepLastActive();
                });
            }else{
              let errorTxt = !samePwd ? ': пароли не совпадают' : '';
              this.setErrorAlertMsg(`Форма заполненна некорректно ${errorTxt}`);
              this.stepLastActive();
            }
          },
          //для инпата
          onChangeData(index, data){ // для компонента input
            this.inputsArr[index].value = data.value;
            this.inputsArr[index].isValid = data.valid;
          },
          //для компонента input
          onChangeDataAccaount(index, data){
            this.acountArr[index].value = data.value;
            this.acountArr[index].isValid = data.valid;
          },
          // для переключения тригеров в this.notifications, key - имя ключа(атрибута)
          onSwitchToogle(key){
            console.log('switched = ', key);
            this.notifications[key].switched = !this.notifications[key].switched;
          }
        },
        mounted(){
          //Задаём начальные значения
          this.userRequest()
            .then( result => {
                this.inputsArr['surname-i'].value = this.profile.surname;
                this.inputsArr['name-i'].value = this.userName;
                this.inputsArr['lastName-i'].value = this.profile.patronymic;
                this.inputsArr['login-i'].value = this.profile.login;
                this.inputsArr['email-i'].value = this.profile.email;
                this.inputsArr['phone-i'].value = this.profile.phone;
                this.inputsArr['site-i'].value = this.profile.site;
              });


        }
    }
</script>

<style lang="sass">
    /*@import 'assets/sass/main.sass';*/
</style>
