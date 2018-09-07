<!--Список пользователей-->
<template>
  <!--usersList.vue-->

  <!--todocomplete: API - блокировка пользователя
      todo: API - список незаблокированных пользователей
      todocomplete: API - список всех пользователей (заблокированные и активные)
      todo: API - список активных пользователей
      todo: API - поиск пользователей по подстроке
  -->

  <!--
    todocomplete: переделать ассециативный массив, на обычный usersList
    todocomplete: модалка для добавления пользователя
  -->

  <div class="container">
    <div class="white-block-r">
      <div class="row align-items-center">
        <div class="col-6">
          <div class="user-cntr-bar">
            <appSwitcher  txt="Все пользователи"
                          :switcherActive="switcherActive"
                          @switchToogle="onSwitchToogle">
            </appSwitcher>
            <div class="new-usr-i" >
              <button type="button" @click="showRegPanel(true)" class="btn btn-outline-secondary" v-if="!showSignup">Новый пользователь</button>
              <button type="button" @click="showRegPanel(false)" class="btn btn-outline-secondary" v-else>Скрыть панель регистрации</button>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="find-b justify-content-end d-flex">
            <div class="input-group ">
              <input v-model.lazy="findUserStr" v-on:keyup.enter="findUser" type="text" class="form-control" placeholder="Найти" aria-label="Recipient's username" aria-describedby="button-addon2">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="findUser">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="17px" height="17px">
                    <path fill-rule="evenodd"  fill="rgb(131, 147, 167)"
                          d="M15.919,15.813 C15.525,16.207 14.887,16.207 14.494,15.813 L11.403,12.723 C10.235,13.594 8.792,14.117 7.223,14.117 C3.357,14.117 0.223,10.983 0.223,7.117 C0.223,3.251 3.357,0.117 7.223,0.117 C11.088,0.117 14.222,3.251 14.222,7.117 C14.222,8.686 13.700,10.130 12.828,11.298 L15.919,14.388 C16.312,14.782 16.312,15.420 15.919,15.813 ZM7.223,2.117 C4.461,2.117 2.222,4.355 2.222,7.117 C2.222,9.879 4.461,12.117 7.223,12.117 C9.984,12.117 12.223,9.879 12.223,7.117 C12.223,4.355 9.984,2.117 7.223,2.117 Z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template v-for="(userItem, index) in usersList">
      <appUserItem :key="index"
        :user="userItem"
        @deleteUser="openRemoveModal(index)"
        @onSwitchIsActive="isOnToogle(index)"
      >
      </appUserItem>
    </template>

    <!-- Modal RemoveUser -->
    <appModal
      headerText="Подтвердите удаление пользователя"
      keyId="confirmDeleteModal"
      :deleteIcon="true"
      positiveActionText="Удалить пользователя"
      negativeActionText="Отмена"
      :actionIndex="removeUserIndex"
      :inputsArr="inputsArr"
      buttonClass="btn-danger"
      necessaryEvent="pageChange"
      @pageChange="deleteUser(removeUserIndex)">
    </appModal>
    <!-- Modal AddUser -->
    <appModal
      headerText="Добавить нового пользователя"
      keyId="confirmAddModal"
      :deleteIcon="false"
      positiveActionText="Добавить пользователя"
      negativeActionText="Отмена"
      :actionIndex="addUserIndex"
      :inputsArr="inputsAddArr"
      buttonClass="btn-success"
      necessaryEvent="pageChange"
      @pageChange="AddUser()">
    </appModal>
  </div>
</template>

<script>
  import appSwitcher from './switcher';
  import {API_URL} from '../constants';
  import axios from 'axios';
  import {mapActions} from 'vuex';
  import {mapMutations} from 'vuex';
  import appInput from './inputValid';
  import appSignup from './SignUp';
  import appModal from  './modalWindow'
  import appUserItem from './userItem'
  export default {
    name: 'usersList',
    data () {
      return {
        usersList: [

        ],
        switcherActive: true, // все пользователи
        findUserStr: '', // Подстрока для поиска пользователя
        removeUserIndex: 0, // Ид пользователя для удаления
        addUserIndex: 0,
        inputsArr:[
          {
            id: 'confirmDelete',
            showError: '',
            validFeedback: "",
            invalidFeedback: "Email введен неверно",
            placeholder: "Введите Email пользователя, которого хотите удалить",
            type: "text",
            required: "true",
            pattern: /[^]*/,
            value: '',
            isValid: false
          }
        ],
        inputsAddArr:[
          {
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
          {
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
          {
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
          {
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
        ],
        regBtnTxt: 'Зарегистрировать нового пользователя',// текст кнопки регистрации
        showSignup: false, // показывать окно для регистрации нового пользователя
      }
    },
    computed: {
      currentPage(){ // текущая страница, передаётся в url в качестве параметра
        return this.$route.params.page || 1;
      },
      formValid(){
        let isValid = this.inputsAddArr[0].isValid;
        for(let item of this.inputsAddArr){
          isValid = isValid && item.isValid;
        }
        return isValid;
      }
    },
    components: {
      appSwitcher,
      appInput,
      appSignup,
      appModal,
      appUserItem
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
      onSwitchToogle(){// переключение "Все пользователи"

        let payload = this.switcherActive;
        this.stepOneActive(); // прогрессбар

        axios({url: API_URL + '/user/userlist', data: payload, method: 'POST' })
          .then(resp => {
            const error = resp.data.error;
            this.stepLastActive(); // прогрессбар
            if(error){
              this.stepLastActive();
              let errorTxt = resp.data.data.msgClient;
              this.setErrorAlertMsg('Ошибка при фильтрации пользователей: ' + errorTxt);
            }else {
              this.stepLastActive();
              this.switcherActive = !this.switcherActive;
              this.usersList[index].blocked = !this.usersList[index].blocked;
              this.setSuccessAlertMsg('Пользователи отфильтрованы');
            }
          })
          .catch(err => {
            this.setErrorAlertMsg('Ошибка при фильтрации пользователей');
            console.log(err);
            this.stepLastActive();
          });
      },
      isOnToogle(index){ // заблокировать/разблокировать пользователя
        let payload = {
          value: !this.usersList[index].isActive
        };
        let userId = this.usersList[index].id;
        this.stepOneActive(); // прогрессбар

        axios({url: API_URL + '/user/' + userId + '/setonoff', data: payload, method: 'POST' })
          .then(resp => {
            const error = resp.data.error;
            this.stepLastActive(); // прогрессбар
            if(error){
              let errorTxt = resp.data.data.msgClient;
              this.setErrorAlertMsg('Ошибка при блокировке пользователя: ' + errorTxt);
            }else {
              this.usersList[index].isActive = !this.usersList[index].isActive;
              let msgS = 'Пользователь ';
              (this.usersList[index].isActive) ? msgS += 'разблокирован' : msgS += 'заблокирован';
              this.setSuccessAlertMsg(msgS);
            }
          })
          .catch(err => {
            this.setErrorAlertMsg('Ошибка при блокировке пользователя');
            this.stepLastActive(); // прогрессбар
            console.log(err);
          });

      },
      findUser(){
        let payload = this.findUserStr;

        this.stepOneActive(); // прогрессбар

        axios({url: API_URL + '/user/finduser', data: payload, method: 'POST' })
          .then(resp => {
            const error = resp.data.error;
            this.stepLastActive(); // прогрессбар
            if(error){
              let errorTxt = resp.data.data.msgClient;
              this.setErrorAlertMsg(`Ошибка при поиске пользователя по запросу '${this.findUserStr}'; ${errorTxt}`);
            }else {
              this.setSuccessAlertMsg(`Пользователи по запросу '${this.findUserStr}'`);
            }
          })
          .catch(err => {
            this.setErrorAlertMsg(`Ошибка при поиске пользователя по запросу '${this.findUserStr}'`);
            this.stepLastActive(); // прогрессбар
            console.log(err);
          });
      },
      deleteUser(index){
        console.log('delete user', index);
        if(this.inputsArr[0].value === this.usersList[index].email){
          let payload = this.usersList[index].id;
          this.stepOneActive(); // прогрессбар
          axios({url: API_URL + '/user/'+ payload, method: 'DELETE' })
            .then(resp => {
              const error = resp.data.error;
              this.stepLastActive(); // прогрессбар
              if(error){
                let errorTxt = resp.data.data.msgClient;
                this.setErrorAlertMsg('Ошибка при удалении пользователя: ' + errorTxt);
              }else{
                this.$delete(this.usersList, index, this.usersList[index]);
                this.setSuccessAlertMsg('Пользователь удалён');
              }
            })
            .catch(err => {
              this.setErrorAlertMsg('Ошибка при удалении пользователя ');
              this.stepLastActive(); // прогрессбар
              console.log(err);
            });
        }else{
          this.setErrorAlertMsg('Ошибка при удалении пользователя: имена не совпадают');
        }
      },
      openRemoveModal(index){ // открытие окна подтверждения для удаления пользователя
        this.removeUserIndex = index;
        $('#confirmDeleteModal').modal();
      },
      onChangeData(index, data){ // для компонента input
        this.inputsArr[index].value = data.value;
        this.inputsArr[index].isValid = data.valid;
      },
      showRegPanel(showPanel){
        $('#confirmAddModal').modal();
        //this.showSignup = showPanel;
      },
      AddUser(){
        let pwdVal, confirmVal, samePwd = false;
        for(let item of this.inputsAddArr){
          if(item.id === 'newpass-i'){
            pwdVal = item;
          }
          if(item.id === 'newpassrepeat-i'){
            confirmVal = item;
          }
          if(!item.isValid){
            item.showError = true;
          }
        }
        if(pwdVal.value === confirmVal.value){
          samePwd = true;
        }
        if(!samePwd){
          confirmVal.showError = true;
        }
        if(this.formValid && samePwd){
          let payload = {
            email: this.inputsAddArr[0].value,
            login: this.inputsAddArr[1].value,
            password: pwdVal.value,
          };
          this.stepOneActive(); // прогрессбар
          axios({url: API_URL + '/login/registration', data: payload, method: 'POST' })
            .then(resp => {
              const error = resp.data.error;
              this.stepLastActive(); // прогрессбар
              if(error){
                this.stepLastActive();
                let errorTxt = resp.data.data.msgClient;
                this.setErrorAlertMsg('Ошибка при добавлении пользователя: ' + errorTxt);

              }else{
                this.stepLastActive();
                this.setSuccessAlertMsg('Пользователь добавлен');
              }
            })
            .catch(err => {
              this.setErrorAlertMsg('Ошибка при добавлении пользователя (' + err + ')');
              this.stepLastActive();
            });
        }
        else{
          this.setErrorAlertMsg('Ошибка в форме');
          this.stepLastActive();
        }
      },
      initUsersList(){
        axios({url: API_URL + '/user', method: 'GET' })
          .then(resp => {
            const error = resp.data.error;
            this.stepLastActive(); // прогрессбар
            if(error){
              let errorTxt = resp.data.data.msgClient;
              this.setErrorAlertMsg('Ошибка при получении списка пользователей: ' + errorTxt);
            }else{
              let arrayList = resp.data.data;
              this.usersList = [];
              arrayList.forEach(value => {
                this.usersList.push(value);
                //this.$set(this.catalogList, value.id, value);
              })
            }
          })
          .catch(err => {
            this.setErrorAlertMsg('Ошибка при получении списка пользователей');
            this.stepLastActive(); // прогрессбар
            console.log(err);
          });
      }
    },
    mounted() {
      this.initUsersList();
    }
  }
</script>

<style lang="sass">
  /*@import 'assets/sass/main.sass';*/
</style>
