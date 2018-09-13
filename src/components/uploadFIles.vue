<!-- Компонент загрузки фотографии -->
<template>
  <div>
        <template v-if="type === 'button'">
          Обновить фото
        </template>
        <input type="file" :id="inputId" ref="files" @change="handleFilesUpload" />
  </div>
</template>

<script>
  import axios from "axios";
  import {API_URL} from "../constants";
  import {mapActions} from 'vuex';

  export default {
    name: 'UploadFiles',
    data(){
      return {
        files: []
      }
    },
    props: ['type', 'url','image','inputId'],
    methods: {
      ...mapActions('alerts',{
        setErrorAlertMsg: 'setErrorAlertMsg',
        setSuccessAlertMsg: 'setSuccessAlertMsg',
      }),
      /* label for отрабатывает */
      addFiles(){
        console.log('click');
        //this.$refs.files.click();
      },
      submitFiles(){
        let formData = new FormData();
        for( let i = 0; i < this.files.length; i++ ){
          let file = this.files[i];
          formData.append("id", this.inputId);
          formData.append(this.inputId + '[' + i + ']', file);
        }
        axios.post( API_URL + this.url, formData, { headers: { 'Content-Type': 'multipart/form-data', Authorization: 'Bearer ' + localStorage.getItem('user-token') } })
          .then(resp => {
            const error = resp.data.error;
            if(error){
              let errorTxt = resp.data.data.msgClient;
              this.setErrorAlertMsg('Ошибка при загрузке: ' + errorTxt);
            }else {
              this.setSuccessAlertMsg('Файл добавлен');
              this.$emit('changeImage', resp.data.data.image);
              console.log(resp);
            }
          })
          .catch(err =>  {
            this.setErrorAlertMsg('Ошибка при загрузке');
            console.log(err);
          });
      },
      handleFilesUpload(){
        let uploadedFiles = this.$refs.files.files;
        for( var i = 0; i < uploadedFiles.length; i++ ){
          this.files.push( uploadedFiles[i] );
        }
        this.submitFiles();
      },
      removeFile( key ){
        this.files.splice( key, 1 );
      }
    }
  }
</script>

<style scoped>
  input[type="file"]{
    position: absolute;
    top: -500px;
  }

  div.file-listing{
    width: 200px;
  }

  span.remove-file{
    color: red;
    cursor: pointer;
    float: right;
  }
</style>
