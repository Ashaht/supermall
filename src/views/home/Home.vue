<template>
    <div id="home">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
         <tab-control :title="['流行', '新款', '精选']" 
            @tabclick="tabClick" ref="tabControl1"
            class="tab-control" v-show="isTabFixed"/>
        <scroll class="content" 
        ref="scroll" 
        :probe-type="3" 
        :pull-up-load="true"
        @scroll="contentScroll"
        @pullingUp="loadMore">
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
            <recommend-view :recommends="recommends" />
            <feature-view />
            <tab-control :title="['流行', '新款', '精选']" 
            @tabclick="tabClick" 
            ref="tabControl2"/>
            <goods-list :goods="showGoods"/>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from '@/components/common/navbar/NavBar'
import TabControl from '@/components/content/tabControl/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'
import Scroll from '@/components/common/scroll/Scroll'
import BackTop from '@/components/content/backTop/BackTop'

import {getHomeMultidata, getHomeGoods} from '@/network/home'
import {debounce} from '@/components/common/utils/utils.js'

export default {
    name: "Home",
    components: {
        HomeSwiper,
        RecommendView,
        FeatureView,
        NavBar,
        GoodsList,
        TabControl,
        Scroll,
        BackTop
    },
    data() {
        return {
            banners: [],
            recommends: [],
            goods: {
                'pop': {page: 0, list: []},
                'new': {page: 0, list: []},
                'sell': {page: 0, list: []},
            },
            currentType: 'pop',
            isShowBackTop: false,
            tabOffsetTop: 0,
            isTabFixed: false,
            saveY: 0,

        }
    },
    computed: {
        showGoods() {
            return this.goods[this.currentType].list;
        }
    },
    destroyed() {
        console.log('Home Destroy');
    },
    activated() {
        this.$refs.scroll.scrollTo(0, this.saveY, 0);
        this.$refs.scroll.refresh();
    },
    deactivated() {
        // 1.保存Y值
        this.saveY = this.$refs.scroll.getScrollY();

        // 2.取消全局事件的监听
        //this.$bus.%off('itemImageLoad', this.itemImgListener)  itemImgListener为要取消的函数
    },
    created() {
        //1. 请求多个数据
        this.getHomeMultidata()

        //2. 请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')

    },
    mounted() {
        //1.监听item中的图片加载完成
        const refresh = debounce(this.$refs.scroll.refresh, 200)
        this.$bus.$on('itemImageLoad', () => {
            refresh()
        })

    },
    methods: {
        /**
         * 事件监听相关的方法
         */
        tabClick(index){
            switch (index) {
                case 0:
                    this.currentType = 'pop'
                    break
                case 1:
                    this.currentType = 'new'
                    break
                case 2:
                    this.currentType = 'sell'
                    break
            }
            this.$refs.tabControl1.currentIndex = index;
            this.$refs.tabControl2.currentIndex = index;
        },
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 500)
        },
        contentScroll(position) {
            //1.判断BackTop是否显示
            this.isShowBackTop = position.y < -1000

            //2.决定tabControl是否吸顶(positon: fixed)
            this.isTabFixed = (-position.y) > this.tabOffsetTop
        },
        loadMore() {
            this.getHomeGoods(this.currentType);
            this.$refs.scroll.scroll.refresh()
        },
        swiperImageLoad() {
            //2.获取tabControl的offsetTop
            //所有的组件都有一个属性 $el: 用于获取组件中的元素
            this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        },

        /**
         * 网络请求相关的方法
         */
        getHomeMultidata() {
            getHomeMultidata().then(res => {
                //this.result = res;  //箭头函数中,this会往上寻找this
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;
            })
        },
        getHomeGoods(type) {
            const page = this.goods[type].page + 1;
            getHomeGoods(type, 1).then(res => {
                this.goods[type].list.push(...res.data.list)
                this.goods[type].page += 1

                this.$refs.scroll.finishPullUp();
            })
        }
    }
}
</script>

<style scoped>
    #home {
        /* padding: 44px 0 39px; */
        height: 100vh;
    }
    .home-nav {
        background-color: var(--color-text);
        color: #fff;
        /* position: fixed;
        top: 0%;
        left: 0%;
        right: 0%;
        z-index: 9; */
    }


    .content {
        overflow: hidden;

        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }

    .tab-control {
        position: relative;
        z-index: 9;
    }
    /* .content {
        height: calc(100% - 93px);
        overflow: hidden;
        margin-top: 44px;
    } */
</style>