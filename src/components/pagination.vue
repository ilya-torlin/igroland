<!--Пагинация-->
<template>
  <!--pagination.vue-->
  <div class="col-12">
        <nav aria-label="Page navigation example">
          <ul class="pagination" v-if="routerOn">
            <router-link :to="routerLink + prevPage"
                         tag="li"
                         class="page-item"  >
              <a class="page-link" href="#" aria-label="Previous" @click= "$emit('pageChange')">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Предыдущая</span>
              </a>
            </router-link>
            <router-link :to="routerLink + value"
                         tag="li"
                         class="page-item"
                         :key="value"
                         :class="{'is-active': value === currentPage}"
                         v-for="(value, index) in paginationArray">
              <a class="page-link" href="#" @click= "$emit('pageChange')" >{{value}}</a>
            </router-link>
            <router-link :to="routerLink + nextPagePag"
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
          <ul class="pagination" v-else>

            <li class="page-item">
              <a class="page-link" @click.prevent= "pageChange(prevPage)" href="#" aria-label="Previous" >
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Предыдущая</span>
              </a>
            </li>
            <li class="page-item"
                :class="{'is-active': value === currentPage}"
                v-for="(value, index) in paginationArray">
                <a class="page-link" href="#" @click.prevent= "pageChange(value)" >
                  {{value}}
                </a>
            </li>
            <li class="page-item">
              <a class="page-link" @click.prevent= "pageChange(nextPagePag)" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Следующая</span>
              </a>
            </li>

          </ul>
        </nav>
      </div>
</template>

<script>
  export default {
    name: 'pagination',
    data () {
      return {
        msg: 'pagination',
        pageCur: 1
      }
    },
    computed: {
      currentPage(){ // текущая страница, передаётся в url в качестве параметра
        if (this.routerOn){
          return +this.$route.params.page || 1;
        }else {
          return this.pageCur;
        }
      },
      prevPage(){
        let page = (+this.currentPage === 1) ? 1 : this.currentPage - 1;
        return page;
      },
      nextPagePag(){
        let page = (+this.currentPage == +this.countPage) ? this.countPage : this.currentPage + 1;
        return page;
      },
      paginationArray(){
        if (this.countPage === 1)
          return [this.pageNum];
        if (this.countPage === 2)
          return [1,2];
        if (this.currentPage === 1)
          return [this.currentPage,this.nextPagePag,this.nextPagePag+1];
        if (this.currentPage === this.countPage)
          return [this.prevPage-1,this.prevPage,this.currentPage];
        return [this.prevPage,this.currentPage,this.nextPagePag];
      }
    },
    methods: {
      //изменение страницы
      pageChange(clickedPage){
        console.log('clickedPage',clickedPage);
        this.pageCur = clickedPage || 1;
        let resVal = {
          currentPage: this.currentPage,
          prevPage: this.prevPage,
          nextPagePag: this.nextPagePag
        };
        this.$emit('pageChange', {'value': resVal});
      }
    },
    props: [
      'countPage',
      'routerLink',
      'routerOn',
      'pageNum'
    ]

  }
</script>

<style lang="sass">
  /*@import 'assets/sass/main.sass';*/
</style>
