<template>
    <video class="h-40" :src="video.gif_preview" :poster="video.main_poster">
    </video>
</template>

<script>
    export default {
        props: ['video']
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
