<template>
    <div class="first">
        <ul class="nav_list">
            <li @click="curTag = nav.tag" :class="{'active': curTag === nav.tag}" v-for="(nav, index) in navBooks">{{nav.title}}</li>
        </ul>
        <div class="container"
             ref="swiper"
             @touchstart="start"
             @touchmove="move"
             @touchend="end">
            <div class="wrapper"
                 ref="wrapper"
                 @transitionend="onTransitionEnd"
                 :style="{transform: translate, transition: transition}">
                <div class="book_wrapper"
                     v-for="(bookList, bInde) in navBooks"
                     :style="{'margin-right': between + 'px'}">
                    <div class="loading" v-if="canLoadData === bookList.tag"> 加载中~ </div>
                    <ul class="slide">
                        <li v-for="(book, a) in bookList.books">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import Swiper from './swiper';
const navBooks = () => [
  {
    tag: 'one',
    id: '1',
    title: '现言',
    books: [],
    curPage: 0,
    isLoading: false,
    selectBooks: []
  },
  {
    tag: 'two',
    id: '2',
    title: '古言',
    books: [],
    curPage: 0,
    isLoading: false,
    selectBooks: []
  },
  {
    tag: 'three',
    id: '3',
    title: '幻言',
    books: [],
    curPage: 0,
    isLoading: false,
    selectBooks: []
  },
  {
    tag: 'forth',
    id: '4',
    title: '都市',
    books: [],
    curPage: 0,
    isLoading: false,
    selectBooks: []
  },
  {
    tag: 'five',
    id: '5',
    title: '玄幻',
    books: [],
    curPage: 0,
    isLoading: false,
    selectBooks: []
  },
  {
    tag: 'six',
    id: '6',
    title: '仙侠',
    books: [],
    curPage: 0,
    isLoading: false,
    selectBooks: []
  },
  {
    tag: 'seven',
    id: '7',
    title: '其他',
    books: [],
    curPage: 0,
    isLoading: false,
    selectBooks: []
  }
];
const str2Index = () => ({
  'one': 0,
  'two': 1,
  'three': 2,
  'forth': 3,
  'five': 4,
  'six': 5,
  'seven': 6,
});
  export default {
    name: "a",
    components: {Swiper},
    computed: {
      translate () {
        return `translateX(${this.offset}px)`;
      },
      transition () {
        return `${this.moving ? 'none' : this.interval / 1000 + 's'}`;
      },
      direction(){
        return this.type === 'horizontal' ? 'X' : 'Y';
      },
      len () {
        return this.navBooks.length;
      },
      totalWidth() {
        return ( this.len - 1 ) * this.stepWidth;
      }
    },
    data () {
      return {
        curTag: 'one',
        canLoadData: 'one',
        moving: false,
        stepWidth: 300,
        interval: 500,
        between: 15,
        offset: 0,
        type: 'horizontal',
        navBooks: navBooks(),
        touch: {
          currentOffset: 0,
          startX: 0,
          startY: 0,
        }
      }
    },
    watch: {
      curTag: {
        // 加载
        handler (nval) {
          this.touch.currentOffset = -str2Index()[nval] * this.stepWidth;
        },
        immediate: true
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.stepWidth = this.$refs.swiper.clientWidth + this.between;
      })
    },
    methods: {
      onTransitionEnd (e) {
        setTimeout(() => {
          this.canLoadData = this.curTag;
          console.log(e);
          console.log(`%c 加载${this.curTag}的数据`, 'color: red');
        }, 300);
      },
      start(e) {
        this.touch.startX = e.touches[0].pageX;
        this.touch.startY = e.touches[0].pageY;
      },
      move(e) {
        this.moving = true;
        let disX = e.touches[0].pageX - this.touch.startX,
          disY = e.touches[0].pageY - this.touch.startY;

        // const direction = Math.abs(disY) - Math.abs(disX) > 0 ? 'Y' : 'X';
        // if ( direction === 'X' ) {
        //   e.preventDefault();
          this.touch.moveX = disX;
          if ( this.offset < -this.totalWidth || this.offset > 0 ) {
            disX = disX / 3;
          }
          this.offset = this.touch.currentOffset + disX;
        // }

      },
      end(e) {
        this.moving = false;

        let index = -Math.round(this.offset / this.stepWidth);
        // if (this.touch.moveX < -50) index++;
        // if (this.touch.moveX > 50) index--;
        index = Math.max(0, Math.min(this.len - 1, index));
        this.offset = -index * this.stepWidth;
        this.touch.currentOffset = this.offset;
        this.curTag = this.navBooks[index].tag;
      },
    }
  }
</script>

<style scoped lang="less">
.first{
    padding: 20px;
    background-color: orangered;
    color: #fff;
    .nav_list{
        display: flex;
        justify-content: space-between;
        li{
            list-style: none;
        }
        .active{
            color: #000;
        }
    }
}
.container{
    width: 100%;
    overflow: hidden;
    .wrapper{
        display: flex;
        justify-content: flex-start;
        .book_wrapper{
            width: 100%;
            min-height: 300px;
            flex-shrink: 0;
            .slide{
                width: 100%;
            }
            .loading{
                position: absolute;
                width: 100%;
                text-align: center;
            }
        }
        .book_wrapper:nth-of-type(odd){
            background-color: blueviolet;
        }
        .book_wrapper:nth-of-type(even){
            background-color: rebeccapurple;
        }
    }
}
</style>