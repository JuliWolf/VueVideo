<template>
    <div class="max-w-sm w-full lg:max-w-full lg:flex">
        <div class="overflow-hidden text-center lg:w-5/6 flex-none">
            <video :src="item.gif_preview" :poster="item.main_poster">
            </video>
        </div>
        <div class="flex flex-col">
            <p class="text-sm text-gray-600 flex items-center">
                Text
            </p>
        </div>

    </div>
</template>

<script>
    export default {
        props: ['item']
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
