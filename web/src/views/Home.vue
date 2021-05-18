<template>
  <div>
    <swiper ref="mySwiper" :options='swiperOptions'>
      <swiper-slide>
        <img src="../assets/images/210.jpeg" class="w-100">
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/210.jpeg" class="w-100">
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/images/210.jpeg" class="w-100">
      </swiper-slide>
       <div class="swiper-pagination text-right px-3 pb-1" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons text-dark-1 pt-3 text-center bg-white mt-3">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
        <i class="sprite sprite-news"></i>
        <div class="py-2">爆料站</div>
      </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mx-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons -->
    
    <m-list-card icon='menu1' title='新闻资讯' :categories='newsCats'>
      <template #items='{category}'>
        <router-link tag="div" :to='`/articles/${item._id}`'
        v-for="(item,i) in category.newsList" :key="i" class="py-2 fs-lg d-flex">
        <span class="text-info">[{{item.categoryName}}]</span>
        <span class="px-1">|</span>
        <span class="flex-1 pr-2 text-dark-1 text-ellipses">{{item.title}}</span>
        <span class="text-grey-1 fs-sm">{{item.createdAt | date}}</span>
      </router-link>
      </template>
      
    </m-list-card>

    <!-- 英雄列表 -->
    <m-list-card icon='card-hero' title='英雄列表' :categories='heroCats'>
      <template #items='{category}'>
        <div class="d-flex flex-wrap" style='margin: 0 -0.5rem'>
          <router-link tag="div" :to='`/heroes/${hero._id}`'
           v-for="(hero,i) in category.heroList" :key="i" 
          class="p-2 text-center"
          style='width:20%'>
          <img :src="hero.avatar" alt="" class="w-100">
          <div>{{hero.name}}</div>
        </router-link>
      </div>
      </template>
    </m-list-card>

    <m-list-card icon='menu1' title='精彩视频' :categories='[]'></m-list-card>
    <m-list-card icon='menu1' title='图文攻略' :categories='[]'></m-list-card>
    
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  filters: {
    date(val) {
      return dayjs(val).format('MM/DD')
    }
  },
  data () {
    return {
      newsCats: [
        //   name: '热门',
        //   newsList: new Array.fill().map(() => ({
        //       categoryName: 'news',
        //       title: '标题',
        //       date: '06/01'
        //     }))
        // },
      ],
      heroCats: [],
      swiperOptions: {
        loop:true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
        },
        // 显示分页
        pagination: {
          el: '.swiper-pagination',
          // 允许分页点击跳转
          clcikable: true
        },
        // 设置点击箭头
        // navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev'
        // }
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  methods: {
    async fetchNewsCats(){
      const res = await this.$http.get('/news/list')
      this.newsCats = res.data
    },
    async fetchHeroCats(){
      const res = await this.$http.get('/heroes/list')
      this.heroCats = res.data
    },
  },
  created() {
    this.fetchNewsCats()
    this.fetchHeroCats()
  }
}
</script>

<style lang='scss'>
@import '../assets/scss/variables';
.swiper-pagination {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($map: $colors, $key: 'white');
    &.swiper-pagination-bullet-active {
      background: map-get($map: $colors, $key: 'info')
    }
  }
}
.nav-icons {
  border-top: solid 1px $border-color;
  border-bottom: solid 1px $border-color;
  .nav-item {
    width: 25%;
    border-left: 1px solid $border-color;
    &:nth-child(4n+1) {
      border-left: none;
    }
  }
}
</style>
