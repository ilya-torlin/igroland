<!--Шаблонный компонент-->
<template>
    <!--componentTemplate.vue-->
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

  import {API_URL} from '../constants';
  import axios from 'axios';
  import {mapGetters} from 'vuex';
  import {mapMutations} from 'vuex';

    export default {
      name: 'componentTemplate',
      data () {
          return {
              msg: 'template'
          }
      },
      computed: {
        ...mapGetters('alerts', {
          succesAlert: 'succesAlert',
          errorAlert: 'errorAlert'
        }),
        ...mapGetters('progress', {
          progStateWidth: 'progStateWidth',
          progShow: 'progShow'
        }),
      },
      props: [],
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
      },
    }
</script>

<style lang="sass">
    /*@import 'assets/sass/main.sass';*/
</style>
