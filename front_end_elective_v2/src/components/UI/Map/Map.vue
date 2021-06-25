<template>
  <div>
    status de la commande : ok
    <l-map
      :center='center'
      :zoom='zoom'
      class='map'
      ref='map'
      @update:zoom='zoomUpdated'
      @update:center='centerUpdated'
    >
      <l-tile-layer :url='url'></l-tile-layer>
      <div v-for='marker in markers' :key='marker.id'>
        <Icons :marker='marker' />
      </div>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import Icons from './Icons.vue';

export default {
  components: {
    LMap,
    LTileLayer,
    Icons,
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      center: [48.9032190343066, 2.1929470176062846],
      zoom: 17,
      markers: [
        {
          id: 1,
          imageUrl: 'https://img.icons8.com/ios-filled/50/fa314a/marker.png',
          coordinates: [48.9032190343066, 2.1929470176062846],
        },
        {
          id: 2,
          imageUrl: 'https://img.icons8.com/ios-glyphs/30/4a90e2/waiter.png',
          coordinates: [48.90220100045335, 2.1918905029658626],
        },
        {
          id: 3,
          imageUrl:
            'https://img.icons8.com/material-sharp/24/26e07f/restaurant-on-site.png',
          coordinates: [48.903635505430934, 2.192584180083284],
        },
      ],
    };
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
      console.log(this.markers);
    },
    centerUpdated(center) {
      this.center = center;
    },
  },
};
</script>

<style>
.map {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
