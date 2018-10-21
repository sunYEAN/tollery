<template>
    <div class="tollery">
        <ul>
            <li :class="{'active': index === curReward}" v-for="(item, index) in cards">{{item.title}}</li>
        </ul>
        <button :class="{'disabled': isLoading}" class="btn" @click="initTollery">開始抽獎</button>
    </div>
</template>

<script>
const roundCircle = () => [4, 5, 6];
  export default {
    name: "tollery",
    data () {
      return {
        curReward: 0,
        cards: [
          {
            id: '1',
            title: '100代金券'
          },
          {
            id: '2',
            title: '200代金券'
          },
          {
            id: '3',
            title: '300代金券'
          },
          {
            id: '4',
            title: '400代金券'
          },
          {
            id: '5',
            title: '500代金券'
          },
          {
            id: '6',
            title: '600代金券'
          }
        ],
        curCircle: 0,
        curIndex: 0,
        targetIndex: 0,
        max: roundCircle()[0],
        count: 6,
        speed: 200,
        timer: null,
        isLoading: false
      }
    },
    methods: {
      getCardsInfo () {},
      initTollery () {
        const _this = this;

        if (  this.isLoading ) return;


        /**
         * 清理定時器和初始化數據
         */
        this.clearInterval();
        this.isLoading = true;

        // 隨機選取最大圈數
        this.max = roundCircle()[Math.floor( Math.random() * 3 )];

        let curReward = this.curReward; // 這個用來判斷圈數
        let currentReward = this.curReward; // 這個用來記錄獎品跑起來時候步數的遞增

        function startReward() {

          console.log('start');

          if (_this.curCircle > _this.max) {

            // 處理邏輯 慢慢走到中獎項目
            // 判斷該位置到中獎物品的距離 然後做動畫展示

            const targetIndex = _this.targetIndex;

            // 計算到目的地還有多少步
            const disSteps = _this.count - (curReward - targetIndex);

            console.log(disSteps, curReward, targetIndex);

            let runSteps = disSteps < _this.count ? disSteps + _this.count : disSteps;
            let timer = null;

            console.log('end');

            // 情況定時器
            clearTimeout(_this.timer);

            const stepTime = 1000 / runSteps;

            function gotoReward () {

              console.log(runSteps);

              if (runSteps <= 0) {

                // 初始數據
                _this.isLoading = false;
                _this.curCircle = 0;
                _this.speed = 200;

                // 顯示彈窗提示用戶
                alert(_this.cards[_this.curReward].title);

                clearTimeout(timer);

              } else {

                runSteps--;
                _this.curReward = currentReward % _this.count;
                currentReward++;
                _this.speed += stepTime;
                const speed = !runSteps ? 0 : _this.speed;
                timer = setTimeout(gotoReward, speed);
              }
            }

            gotoReward();

            return;
          }


          // 定義速度
          _this.curCircle <= _this.max / 1.5 ? _this.speed-=10 : _this.speed+=10;
          _this.speed = Math.max(50, Math.min(400, _this.speed));

          // 顯示的物品 + 1;
          _this.curReward = currentReward % _this.count;

          currentReward++;

          // 當前顯示的物品等於起點的時候  圈數+1
          _this.curReward === curReward && _this.curCircle++;

          _this.timer = setTimeout(startReward, _this.speed);
        }
        startReward();
      },
      loop () {
        const _this = this;
        let currentReward = _this.curReward;
        this.timer = setInterval(() => {
          _this.curReward = currentReward % _this.count;
          currentReward++;
        }, _this.speed * 3);
      },
      clearInterval () {
        clearInterval(this.timer);
        this.curCircle = 0;
      },
      /**
       * 獲取用戶抽獎的中獎信息
       */
      getUserRewardInfo () {
        return {
          index: 0,
          count: 6,
          speed: 50,
          times: 0,
          cycle: 10,
          price: 5,
          curIndex: 0
        }
      }
    },
    mounted () {
      this.loop();
    }
  }
</script>

<style scoped lang="less">
    .tollery{
        ul{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
            li{
                width: 30%;
                height: 50px;
                margin: 5px;
                align-self: center;
                box-sizing: border-box;
                border-radius: 10px;
            }
            li:nth-of-type(odd){
                background-color: orangered;
            }
            li:nth-of-type(even){
                background-color: blueviolet;
            }
            .active{
                border: 4px solid yellow;
                box-shadow:  0 0 10px #fff;
            }
            li:nth-of-type(4){
                order: 6;
            }
            li:nth-of-type(5){
                order: 5;
            }
        }
        >button{
            outline: none;
            border: none;
            width:250px;
            height:45px;
            font-size:16px;
            font-weight:bold;
            color:rgba(255,255,255,1);
            background:linear-gradient(183deg,rgba(254,97,185,1),rgba(171,43,233,1));
            border-radius:45px;
        }
        >button.disabled {
            background: linear-gradient(183deg, #999, #999);
            color: #777;
        }
    }
</style>
<!--<template>-->
    <!--<div class="luckDraw">-->
        <!--<div class="container">-->
            <!--<div class="turntable-wrapper">-->
                <!--<div class="luck-wrapper">-->
                    <!--<p class="integral">我的积分: <span>1000</span></p>-->
                    <!--<ul class="nineGrid">-->
                        <!--<li class="row">-->
                            <!--<div v-for="(n, key) in 3" :key="n" :class="index === key ? `active` : ``">-->
                                <!--<div class="wrapper">-->
                                    <!--<p>8金转</p>-->
                                <!--</div>-->
                                <!--<div class="mask"></div>-->
                            <!--</div>-->
                        <!--</li>-->
                        <!--<li class="row">-->
                            <!--<div :class="index === 7 ? 'active': ''">-->
                                <!--<div class="wrapper">-->
                                    <!--<p>128金转</p>-->
                                <!--</div>-->
                                <!--<div class="mask"></div>-->
                            <!--</div>-->
                            <!--<div class="getLuck" @click="startLottery">-->
                                <!--<p>立即<br>抽奖</p>-->
                            <!--</div>-->
                            <!--<div :class="index === 3 ? 'active': ''">-->
                                <!--<div class="wrapper">-->
                                    <!--<p>128金转</p>-->
                                <!--</div>-->
                                <!--<div class="mask"></div>-->
                            <!--</div>-->
                        <!--</li>-->
                        <!--<li class="row">-->
                            <!--<div v-for="(n, key) in 3" :key="n" :class="index === 6-key ? `active` : ``">-->
                                <!--<div class="wrapper">-->
                                    <!--<p>256金转</p>-->
                                <!--</div>-->
                                <!--<div class="mask"></div>-->
                            <!--</div>-->
                        <!--</li>-->
                    <!--</ul>-->
                <!--</div>-->

                <!--<p class="share">分享领积分 <i class="icon-go"></i></p>-->

                <!--<div class="rule">-->
                    <!--<p class="rule-title">活动规则</p>-->
                    <!--<ul class="rule-main">-->
                        <!--<li>1、活动时间：2017年9月8日起；</li>-->
                        <!--<li>2、活动期间，股事汇用户每次抽奖消耗20积分，抽奖次数不限</li>-->
                        <!--<li>3、金钻可用于向投顾提问、送礼、赞赏；</li>-->
                        <!--<li>4、积分赚取：每日签到、分享文章/问答/直播间、点赞、金钻充值均可获得积分哦</li>-->
                        <!--<li>5、活动最终解释权归股事汇所有。</li>-->
                    <!--</ul>-->
                <!--</div>-->

                <!--<div></div>-->
            <!--</div>-->

        <!--</div>-->
    <!--</div>-->
<!--</template>-->

 <!--<style lang="less">-->

    <!--.luckDraw {-->

    <!--.turntable-wrapper {-->
        <!--padding: 0 38px;-->
        <!--position: relative;-->

    <!--.luck-wrapper {-->
        <!--width: 300px;-->
        <!--height: 377px;-->
        <!--margin: 0 auto;-->
        <!--position: relative;-->
    <!--.integral {-->
        <!--width: 100%;-->
        <!--color: #6d2d00;-->
        <!--font-size: 16px;-->
        <!--font-weight: normal;-->
        <!--text-align: center;-->
        <!--position: absolute;-->
        <!--top: 58px;-->

    <!--span {-->
        <!--font-weight: 600;-->
        <!--color: #ff2f4d;-->
    <!--}-->
    <!--}-->

    <!--.nineGrid {-->
        <!--position: absolute;-->
        <!--top: 86px;-->
        <!--left: 50%;-->
        <!--margin-left: -130px;-->
        <!--width: 260px;-->
        <!--height: 260px;-->

    <!--li {-->
        <!--height: 80px;-->
        <!--display: flex;-->
        <!--margin-top: 5px;-->

    <!--&gt; div {-->
        <!--flex: 1;-->
        <!--margin-right: 5px;-->
        <!--height: 100%;-->
        <!--text-align: center;-->
        <!--position: relative;-->

    <!--.wrapper {-->
        <!--width: 100%;-->
        <!--height: 100%;-->
        <!--margin: 0;-->
    <!--}-->

    <!--img {-->
        <!--width: 46px;-->
        <!--height: 38px;-->
        <!--vertical-align: middle;-->
        <!--margin-top: 8px;-->
    <!--}-->

    <!--.mask {-->
        <!--position: absolute;-->
        <!--top: 0;-->
        <!--left: 0;-->
        <!--width: 100%;-->
        <!--height: 100%;-->
        <!--opacity: 0.5;-->
        <!--border-radius: 10px;-->
        <!--background-color: #000;-->
        <!--display: none;-->
    <!--}-->
    <!--}-->

    <!--&gt; div.active {-->
    <!--.mask {-->
        <!--display: block;-->
    <!--}-->
    <!--}-->

    <!--&gt; div:first-child {-->
        <!--margin-left: 5px;-->
    <!--}-->

    <!--&gt; div.getLuck {-->

    <!--p {-->
        <!--font-size: 20px;-->
        <!--font-weight: 600;-->
        <!--color: #fff;-->
        <!--line-height: 1.1;-->
        <!--margin-top: 11px;-->
    <!--}-->
    <!--}-->
    <!--}-->

    <!--li:last-child {-->
        <!--margin-bottom: 5px;-->
    <!--}-->
    <!--}-->
    <!--}-->

    <!--.share {-->
        <!--width: 160px;-->
        <!--height: 42px;-->
        <!--margin: 0 auto;-->
        <!--text-align: center;-->
        <!--line-height:42px;-->
        <!--margin-top: 22px;-->
        <!--color: #6d2d00;-->
        <!--font-size: 16px;-->
        <!--font-weight: 600;-->

    <!--.icon-go {-->

        <!--display: inline-block;-->
        <!--vertical-align: middle;-->
        <!--margin-bottom: 2px;-->
    <!--}-->
    <!--}-->

    <!--.rule {-->
        <!--margin-top: 14px;-->
        <!--color: #fff;-->
        <!--font-size: 14px;-->
        <!--padding-bottom: 39px;-->

    <!--.rule-title {-->
        <!--text-align: center;-->
        <!--position: relative;-->
        <!--font-size: 16px;-->
        <!--margin-bottom: 14px;-->
    <!--}-->

    <!--.rule-title:before,-->
    <!--.rule-title:after {-->
        <!--content: '';-->
        <!--position: absolute;-->
        <!--top: 52%;-->
        <!--background: #fff;-->
        <!--width: 30%;-->
        <!--height: 1px;-->
    <!--}-->

    <!--.rule-title:before {-->
        <!--left: 0;-->
    <!--}-->

    <!--.rule-title:after {-->
        <!--right: 0;-->
    <!--}-->
    <!--}-->
    <!--}-->
    <!--}-->
<!--</style>-->

<!--<script>-->
  <!--export default {-->
    <!--name: 'luckDraw',-->

    <!--data () {-->
      <!--return {-->
        <!--title: '积分转盘',-->
        <!--index: -1,    // 当前转动到哪个位置，起点位置-->
        <!--count: 8,    // 总共有多少个位置-->
        <!--timer: 0,    // 每次转动定时器-->
        <!--speed: 200,   // 初始转动速度-->
        <!--times: 0,    // 转动次数-->
        <!--cycle: 50,   // 转动基本次数：即至少需要转动多少次再进入抽奖环节-->
        <!--prize: -1,   // 中奖位置-->
        <!--click: true,-->
        <!--showToast: false,-->
        <!--toastType: 'luck',-->
      <!--}-->
    <!--},-->

    <!--props: {-->

    <!--},-->


    <!--methods: {-->
      <!--// 开始抽奖-->
      <!--startLottery () {-->
        <!--if (!this.click) {-->
          <!--return-->
        <!--}-->
        <!--this.speed = 200;-->
        <!--this.click = false-->
        <!--this.startRoll()-->
      <!--},-->

      <!--// 开始转动-->
      <!--startRoll () {-->
        <!--this.times += 1  // 转动次数-->
        <!--this.oneRoll()  // 转动过程调用的每一次转动方法，这里是第一次调用初始化-->

        <!--// 如果当前转动次数达到要求 && 目前转到的位置是中奖位置-->
        <!--if (this.times > this.cycle + 10 && this.prize === this.index) {-->
          <!--clearTimeout(this.timer)   // 清除转动定时器，停止转动-->
          <!--this.prize = -1-->
          <!--this.times = 0-->
          <!--this.click = true-->
          <!--this.showToast = true-->
          <!--this.toastType = 'comeOn'-->
          <!--console.log('你已经中奖了')-->
        <!--} else {-->
          <!--if (this.times < this.cycle) {-->
            <!--this.speed -= 10   // 加快转动速度-->
          <!--} else if (this.times === this.cycle) {    // 随机获得一个中奖位置-->
            <!--const index = parseInt(Math.random() * 10, 0) || 0-->
            <!--this.prize = index-->
            <!--if (this.prize > 7) {-->
              <!--this.prize = 7-->
            <!--}-->
            <!--console.log(`中奖位置${this.prize}`)-->
          <!--} else if (this.times > this.cycle + 10 &&-->
            <!--((this.prize === 0 && this.index === 7) || this.prize === this.index + 1)) {-->
            <!--this.speed += 110-->
          <!--} else {-->
            <!--this.speed += 20-->
          <!--}-->

          <!--if (this.speed < 40) {-->
            <!--this.speed = 40-->
          <!--}-->
          <!--this.timer = setTimeout(this.startRoll, this.speed)-->
        <!--}-->
      <!--},-->

      <!--// 每一次转动-->
      <!--oneRoll () {-->
        <!--let index = this.index  // 当前转动到哪个位置-->
        <!--const count = this.count  // 总共有多少个位置-->
        <!--index += 1-->
        <!--if (index > count - 1) {-->
          <!--index = 0-->
        <!--}-->
        <!--this.index = index-->
      <!--},-->

      <!--// 关闭弹出框-->
      <!--closeToast () {-->
        <!--this.showToast = false-->
      <!--},-->
    <!--},-->

    <!--beforeMount () {-->

    <!--},-->

    <!--created () {-->

    <!--},-->

    <!--beforeDestroy () {-->

    <!--},-->
  <!--}-->
<!--</script>-->