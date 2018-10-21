<template>
    <div class="swiper"
         :class="[direction === 'vertical' ? 'vertical' : 'horizontal']"
         ref="swiper"
         @touchstart="enabled && onTouchStart($event)"
         @touchmove="enabled && onTouchMove($event)"
         @touchend="enabled && onTouchEnd($event)"
    >
        <div class="wrapper"
             ref="wrapper"
             :style="{'transform': `translate${type}(${offset}px)`, 'transition': transition}"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: "swiper",
    props: {
      direction: {
        type: String,
        default: 'vertical'
      },
      loop: {
        type: Boolean,
        default: false
      },
      canTouch: {
        type: Boolean,
        default: true
      },
      current: {
        type: Number,
        default: 1
      },
      threshold: {
        type: Number,
        default: 50
      },
      interval: {
        type: Number,
        default: 200
      },
      imageLen: {
        type: Number,
        default: 0
      },
      between: {
        type: Number,
        default: 30
      },
      fastTouch: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      type () {
        return this.direction === 'vertical' ?  'Y' : 'X';
      },
      transition () {
        return `${!this.touch.moving ? `${this.interval / 1000}s linear` : 'none'}`;
      }
    },
    data() {
      return {
        offset: 0,
        enabled: true,
        currentOffset: 0,
        begin: false,
				touch: {
          startX: 0,
          startY: 0,
          timestamp: 0,
          moving: true,
          moveDirection: '',
          moveDistanceX: 0,
          moveDistanceY: 0,
        }
      }
    },
    watch: {
      imageLen: {
        handler: function () {
          this.$nextTick(() => {
            this.init();
          })
        }
      }
    },
    methods: {

      async init () {
        const swiper = this.$refs.swiper;

        this.enabled = true;

        this[`moveDistance${this.type}`] = 0;

        // 总宽度|高度
        this[`full${this.type}`] = swiper[`client${this.type === 'X' ? 'Width' : 'Height'}`] * this.imageLen + this.between * this.imageLen;

        // 一步的宽度|高度
        this[`step${this.type}`] = swiper[`client${this.type === 'X' ? 'Width' : 'Height'}`] + this.between;

        console.log(this[`step${this.type}`], 'step');

        this[`client${this.type}`] = swiper[`client${this.type === 'X' ? 'Width' : 'Height'}`];

        // 当前显示的第一张
        this.currentIndex = -this.current;

        this.offset = this.currentIndex * this[`step${this.type}`];

        console.log(this.currentIndex, 'this.currentIndex')
        console.log(this.type, this[`full${this.type}`], '总宽|高');
        console.log(this.type, this[`step${this.type}`], '一步的宽|高');
        console.log(this.currentIndex, '当前显示的第几张')
      },
      calculate ( offsetObj ) {
        const start = offsetObj[`start${this.type}`];
        const move = offsetObj[`move${this.type}`];
        const currentOffset = offsetObj.currentOffset;

        const max = this[`step${this.type}`] - this[`full${this.type}`];

        const target = move - start;

        let offset = currentOffset +  target;

        if (offset > 0) offset = offset / 5;
        if (offset < max) offset = max + ( offset - max ) / 5;

        return offset;
      },
      onTouchStart (e) {
        e.preventDefault();
        this.touch[`start${this.type}`] = e.touches[0][`page${this.type}`];
        this.touch.timestamp = Date.now();
        this.touch.move = false;
        this.currentOffset = this.offset;
        this.$emit('start', this.touch);
      },
      onTouchMove (e) {
        e.preventDefault();
        this.touch.moving = true;
        const offsetObj = {};
        offsetObj[`start${this.type}`] = this.touch[`start${this.type}`];
        offsetObj[`move${this.type}`] = e.touches[0][`page${this.type}`];
        offsetObj.currentOffset = this.currentOffset;
        this.offset = this.calculate( offsetObj );

        this.touch[`moveDistance${this.type}`] = e.touches[0][`page${this.type}`] - this.touch[`start${this.type}`];
        this.touch.moveDirection = this.touch[`moveDistance${this.type}`] > 0 ? 'right' : 'left';
        // 滑动的距离

        this.$emit('move', this.touch);
      },
      onTouchEnd (e) {
      	e.preventDefault();
        this.touch.moving = false;
        const TimeOffset = Date.now() - this.touch.timestamp;
        const isFastDistance = Math.abs( this.touch[`moveDistance${this.type}`] ) > 10;

        // 判断是否是快速滑动
        if (TimeOffset < 200 && isFastDistance && this.fastTouch) {
          //判断是否在可滑动区域内
          if (this.offset < 0 && this.offset > this[`step${this.type}`] - this[`full${this.type}`]) {
            const direction = this.touch.moveDirection === 'left' ? 'floor' : 'ceil';
            this.currentIndex = Math[direction](this.offset / this[`step${this.type}`]);
          }
        } else {
          this.currentIndex = Math.round(this.offset / this[`step${this.type}`]);
        }

        this.$emit('end', Object.assign({}, this.touch, {
          currentIndex: this.currentIndex,
          timeOffset: TimeOffset,
          isFast: isFastDistance
        }));

        this.translate();
        this.play();
      },
      translate () {
        let offset = this.currentIndex * this[`step${this.type}`];

        if ( offset > 0 ) offset = 0;
        if (offset < this[`step${this.type}`] - this[`full${this.type}`]) offset = this[`step${this.type}`] - this[`full${this.type}`];
        this.offset = offset;
      },
      play () {},
    },
    async mounted() {
      this.init();

			document.body.addEventListener('touchmove', function (e) {
				e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
			}, {passive: false}); //passive 参数不能省略，用来兼容ios和android
    }
  }
</script>

<style scoped lang="less">
.swiper{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.horizontal {
    .wrapper{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        div{
            position: relative;
            width: 100%;
            height: 100%;
            flex-shrink: 0;
        }
    }
}
.vertical{
    .wrapper{
        height: 100%;
        width: 100%;
        .div{
            position: relative;
            width: 100%;
            height: 100%;
        }
    }
}
</style>