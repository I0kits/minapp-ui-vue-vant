<template>
  <div id="amap-page-container">
  </div>
</template>

<style lang="less" scoped>
  #amap-page-container {
    height: 100vh;
  }
</style>

<script>
export default {
  name: 'Main',
  components: {
  },
  methods: {
  },
  data() {
    return {
      zoom: 16,
      center: [116.387014, 39.911436],
      markers: [
        { title: '不明气体', position: [116.384313, 39.912584] },
        { title: '野生动物', position: [116.388879, 39.91481] },
        { title: '生活垃圾', position: [116.387344, 39.925036] },
      ],
    };
  },
  mounted() {
    window.mymap = new window.AMap.Map('amap-page-container', {
      lang: 'zh_cn',
      zoom: this.zoom,
      center: this.center,
      doubleClickZoom: false,
      layers: [
        // new window.AMap.TileLayer.RoadNet(),
        new window.AMap.TileLayer.Satellite(),
      ],
    });

    window.mymap.on('click', (ev) => {
      const { lnglat } = ev;
      console.log(`${window.mymap.getZoom()}:`, lnglat);
      console.log('Now the center is:', window.mymap.getCenter());

      this.$router.push('/report');
    });

    const markers = this.markers.map((m) => new window.AMap.Marker({
      title: m.title,
      // map: window.mymap,
      position: m.position,
    }));

    window.mymap.add(markers);
  },
};
</script>
