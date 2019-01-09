<template>
  <div class="header">
    <mt-header fixed :title="location?location:'定位中...'" v-if="selected === 'Home'">
      <mt-button slot="right"><img src="../assets/img/location.svg" alt="位置有错点这里"></mt-button>
    </mt-header>
    <mt-header fixed :title="selected" v-else>
      <mt-button icon="back" slot="left" @click="backToHome"></mt-button>
    </mt-header>
    <mt-tab-container v-model="selected" swipe>
      <mt-tab-container-item id="Home">
        <home-container></home-container>
      </mt-tab-container-item>
      <mt-tab-container-item id="订单">
        <sale-container></sale-container>
      </mt-tab-container-item>
      <mt-tab-container-item id="购物车">
        <shop-container></shop-container>
      </mt-tab-container-item>
      <mt-tab-container-item id="我的">
        <info-container></info-container>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="Home">
        <img slot="icon" src="../assets/img/home.svg" alt="">
        首页
      </mt-tab-item>
      <mt-tab-item id="订单">
        <img slot="icon" src="../assets/img/sale-record.svg" alt="">
        订单
      </mt-tab-item>
      <mt-tab-item id="购物车">
        <img slot="icon" src="../assets/img/shop-cart.svg" alt="">
        购物车
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img slot="icon" src="../assets/img/my-info.svg" alt="">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import { lazyAMapApiLoaderInstance } from 'vue-amap'
import { Toast } from 'mint-ui'
import AMap from 'AMap'
import HomeContainer from '../components/HomeContainer'
import SaleRecordContainer from '../components/SaleRecordContainer'
import ShopCartContainer from '../components/ShopCartContainer'
import MyInfoContainer from '../components/MyInfoContainer'
var map
export default {
  name: 'Home',
  components: {
    'home-container': HomeContainer,
    'sale-container': SaleRecordContainer,
    'shop-container': ShopCartContainer,
    'info-container': MyInfoContainer
  },
  data: function () {
    return {
      location: '',
      selected: 'Home'
    }
  },
  mounted: function () {
    let self = this
    lazyAMapApiLoaderInstance.load().then(() => {
      map = new AMap.Map('amap-box', {
        resizeEnable: true,
        zoom: 20,
        center: new AMap.LngLat(113.309213, 23.146569)
      })
      map.plugin('AMap.Geolocation', function () {
        let geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 10000,
          buttonOffset: new AMap.Pixel(10, 20),
          zoomToAccuracy: true,
          buttonPosition: 'RB'
        })
        map.addControl(geolocation)
        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', self.onComplete)
        AMap.event.addListener(geolocation, 'error', self.onError)
      })
    })
  },
  methods: {
    onComplete (data) {
      this.location = data.formattedAddress
      console.log(data.formattedAddress)
    },
    onError (data) {
      if (data.info === 'NOT_SUPPORTED') {
        Toast({
          message: '当前设备不支持定位...',
          duration: 1500,
          position: 'middle',
          iconClass: 'iconfont icon-error'
        })
        this.location = '定位失败...'
      } else if (data.info === 'FAILED') {
        Toast({
          message: '定位失败--' + data.message,
          duration: 1500,
          position: 'middle',
          iconClass: 'iconfont iconfont-error'
        })
        this.location = '定位失败...'
      }
    },
    backToHome () {
      this.selected = 'Home'
    }
  }
}
</script>
<style scoped>

</style>
