<template>
    <div class="grid grid-cols-1 gap-6">
      <div v-for="item in getVideoData" class="m-6">
        <app-video-template :item="item" :key="item.id"></app-video-template>
      </div>
    </div>
</template>

<script>
  import videoTemplate from '@/components/video/videoTemplate';
  import { mapActions, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'getVideoData'
      ])
    },
    methods: {
      ...mapActions([
        'updateVideoData'
      ])
    },
    components: {
      'appVideoTemplate': videoTemplate
    },
    beforeMount() {
      this.updateVideoData()
    }

  }
</script>

<style>

</style>
