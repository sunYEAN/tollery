<template>
    <div class="pictures_preview" ref="preview" v-if="imgs.length" @click="onBack">
        <div class="action_bar">
            <span class="icon icon_close"></span>
        </div>
        <swiper class="mainSwiper"
                ref="mainSwiper"
                :between="between"
                :current="current"
                :direction="direction"
                :imageLen="images.length"
                @end="onEnd">
            <div class="imgBox">
                <img :src="img.src"
                     ref="imgs"
                     alt="">
            </div>
        </swiper>
        <div class="dots">
            <span class="dot">{{this.currentIndex + 1}}</span>/<span>{{images.length}}</span>
        </div>
    </div>
</template>

<script>
  function getRound(value) {
    return Math.round(value * 100) / 100;
  }

  import Swiper from '../swiper';

  export default {
    name: "index",
    components: {Swiper},
    props: {
      direction: {
        type: String,
        default: 'vertical'
      },
      images: {
        type: Array,
        default() {
          return []
        }
      },
      between: {
        type: Number,
        default: 30
      },
      current: {
        type: Number,
        default: 1
      },
      freeStyle: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        imgs: [],
        currentIndex: 0,
        step: 0,
        cur: 1,
        isFull: false,
        fullSrc: '',
        touchDistance: 0,
        startTouch: {
          x: 0,
          y: 0,
          timestamp: 0
        },
        endTouch: {
          x: 0,
          y: 0,
          timestamp: 0
        }
      }
    },
    methods: {
      /**
       * 图片预加载
       */
      preloadImages(imgs) {
        return new Promise((resolve, reject) => {
          let imgArr = [], count = 0;
          function preloadImg() {
            console.log(count);
            const img = new Image();
            img.src = imgs[count].src;
            img.onload = function () {
              imgArr.push({
                src: img.src,
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight,
              });
              count++;
              if (count >= imgs.length) {
                resolve(imgArr);
              } else {
                preloadImg();
              }
            }
          }

          preloadImg();
        })
      },
      initImageStyle(imgs) {
        this.$nextTick(() => {
          const mainSwiper = this.$refs.mainSwiper.$el;
          imgs.forEach(item => {
            const screenRate = mainSwiper.clientWidth / mainSwiper.clientHeight;
            const naturalRate = item.naturalWidth / item.naturalHeight;
            const bo = screenRate > naturalRate;
            this.$set(item, 'type', bo ? 'fullHeight' : 'fullWidth');
          });
        })
      },

      onBack () {

      },
      onEnd (index) {
        console.log(index)
      },
      async init() {

        // 预加载后的图片信息
        this.imgs = await this.preloadImages(this.images);

        this.initImageStyle(this.imgs);
        this.currentIndex = this.current;

        this.$nextTick(() => {
          const preview = this.$refs.preview;

        })
      }
    },
    async mounted() {
      this.init();
    }
  }
</script>

<style scoped lang="less">
    .pictures_preview {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        .action_bar, .dots {
            position: absolute;
            width: 100%;
            z-index: 10;
        }
        .action_bar {
            left: 0;
            top: 0;
            display: flex;
            justify-content: flex-end;
            padding: 10px;
            box-sizing: border-box;
            .icon {
                display: block;
                width: 25px;
                height: 25px;
                border-radius: 25px;
                background-color: orange;
            }
        }
        .dots {
            color: #666;
            left: 0;
            bottom: 0;
            .dot {
                color: #bbb;
            }
        }
        .mainSwiper {
            .imgBox {
                position: relative;
                width: 100%;
                height: 100%;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    box-sizing: border-box;
                    padding: 0 6px;
                }
            }
        }
    }
</style>