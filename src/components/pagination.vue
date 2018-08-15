<!--Пагинация-->
<template>
  <!--pagination.vue-->
  <div class="col-12">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <router-link :to="'/catalog/' + prevPage"
                         tag="li"
                         class="page-item"  >
              <a class="page-link" href="#" aria-label="Previous" @click= "$emit('pageChange')">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Предыдущая</span>
              </a>
            </router-link>
            <router-link :to="'/catalog/' + value"
                         tag="li"
                         class="page-item"
                         :key="value"
                         :class="{'is-active': value == currentPage}"
                         v-for="(value, index) in (1, countPage)">
              <a class="page-link" href="#" @click= "$emit('pageChange')" >{{value}}</a>
            </router-link>
            <router-link :to="'/catalog/' + nextPagePag"
                         tag="li"
                         class="page-item" >
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Следующая</span>
              </a>
            </router-link>
            <!--<router-link v-for="(item, index) in menuList"-->
                         <!--:key="index"-->
                         <!--:to="item.url"-->
                         <!--tag="li"-->
            <!--&gt;-->
              <!--<a>{{ item.text }}</a>-->
            <!--</router-link>-->

            <!--<li class="page-item is-active"><a class="page-link" href="#">1</a></li>-->
            <!--<li class="page-item dots-pag"><a class="page-link" href="#">...</a></li>-->
            <!--<li class="page-item"><a class="page-link" href="#">2</a></li>-->
            <!--<li class="page-item"><a class="page-link" href="#">3</a></li>-->
            <!--<li class="page-item"><a class="page-link" href="#">4</a></li>-->
            <!--<li class="page-item dots-pag"><a class="page-link" href="#">...</a></li>-->
            <!--<li class="page-item"><a class="page-link" href="#">15</a></li>-->

          </ul>
        </nav>
      </div>
</template>

<script>
  export default {
    name: 'pagination',
    data () {
      return {
        msg: 'pagination'
      }
    },
    computed: {
      currentPage(){ // текущая страница, передаётся в url в качестве параметра
        return +this.$route.params.page || 1;
      },
      prevPage(){
        let page = (+this.currentPage === 1) ? 1 : --this.currentPage;
        return page;
      },
      nextPagePag(){
        let page = (+this.currentPage == +this.countPage) ? this.countPage : ++this.currentPage;
        return page;
      },
    },
    methods: {
      pageChange(){
        this.$emit('pageChange')
      }
    },
    props: [
      'currentPage',
      'countPage'
    ]

  }
</script>

<style lang="sass">
  /*@import 'assets/sass/main.sass';*/
</style>
