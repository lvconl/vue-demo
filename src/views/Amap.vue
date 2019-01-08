<template>
    <div>
        <mt-header fixed :title="location?location:'定位中...'">
        </mt-header>
        <h1>{{ msg }}</h1>
        <div class="amap-box">
        </div>
    </div>
</template>
<script>
import { lazyAMapApiLoaderInstance } from 'vue-amap'
import AMap from 'AMap'
var map
export default {
  name: 'amap-demo',
  data: function () {
    return {
      msg: 'vue-amap-demo',
      location: ''
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
      })
    })
  },
  methods: {
    onComplete (data) {
      this.msg = data.formattedAddress
      this.location = data.formattedAddress
    }
  }
}
</script>
<style scoped>
.amap-box{
    margin: 0 auto;
    width: 20rem;
    height: 20rem;
}
</style>
