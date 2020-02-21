<template>
    <div class="grid grid-cols-1 gap-6 border border-black-500 py-4">
        <div v-for="item in getVideoData" class="mx-auto">
            <app-card-template :item="item" :key="item.id"></app-card-template>
        </div>
        <div class="mx-auto">
            <app-pagination></app-pagination>
        </div>
    </div>
</template>

<script>
    import cardTemplate from '@/components/video/cardTemplate';
    import pagination from '@/components/Pagination';
    import { mapActions, mapGetters } from 'vuex'

    export default {
        computed: {
            ...mapGetters([
                'getVideoData'
            ])
        },
        methods: {
            ...mapActions([
                'uploadData'
            ])
        },
        components: {
            'appCardTemplate': cardTemplate,
            'appPagination': pagination
        },
        beforeMount() {
            this.uploadData()
        }

    }
</script>

