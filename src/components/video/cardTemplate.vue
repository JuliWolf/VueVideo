<template>
    <div class="flex">
        <div>
            <app-video-template :video="item"></app-video-template>
        </div>
        <div class="mx-10 flex content-center">
            <img class="h-10 inline self-center" src="@/assets/like.png" alt="Like">
            <p class="mx-3 text-sm text-gray-600 self-center">
                Like
            </p>
        </div>

    </div>
</template>

<script>
    import videoTemplate from '@/components/video/VideoTemplate'

    export default {
        props: ['item'],
        components: {
            appVideoTemplate: videoTemplate
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
