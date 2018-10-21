<template>
    <div class="main">
        <picture-previw class="picture" @closing="closing" :direction="direction" :images="images">
        </picture-previw>
    </div>

</template>

<script>
import PicturePreviw from '../../components/picture_preview';
  export default {
    name: "test",
    components: {PicturePreviw},
    data () {
      const images = () => [
        {
          src: require('./images/a.jpg'),
          title: 'asd1'
        },
        {
          src: require('./images/b.jpg'),
          title: 'asd2'
        },
        {
          src: require('./images/c.png'),
          title: 'asd3'
        }
      ];
      return {
        images: images(),
        direction: 'horizontal'
      }
    },
    methods: {
			closing (res) {
				console.log(res);
      }
    }
  }
</script>

<style scoped lang="less">
    *{
        padding: 0;
        margin: 0;
    }
    html{
        background-color: black;
    }
    .main{
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }
    .picture{
        height: 100%;
        position: relative;
    }
</style>