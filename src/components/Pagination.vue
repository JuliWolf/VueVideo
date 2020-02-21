<template>
    <div class="inline-flex">
        <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                @click="getPrevPageData"
                :class = "{'cursor-not-allowed': pageNumber === 0}"
                :disabled="pageNumber === 0">
            Prev
        </button>
        <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                @click="getNextPageData"
                :class="{'cursor-not-allowed': pageNumber >= pageCount -1}"
                :disabled="pageNumber >= pageCount -1">
            Next
        </button>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        methods: {
            ...mapActions([
                'getPrevPageData',
                'getNextPageData'
            ]),

        },
        computed: {
            ...mapGetters([
                'pageNumber',
                'pageCount'
            ])
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
