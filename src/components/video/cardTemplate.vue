<template>
    <div class="flex">
        <div>
            <app-video-template :video="item"></app-video-template>
        </div>
        <div class="mx-10 flex content-center">
            <img class="h-10 inline self-center" src="@/assets/like.png" alt="Like" @click="addLike(item.id)">
            <p class="mx-3 text-sm text-gray-600 self-center">
                <strong>{{ likes }}</strong> Like
            </p>
        </div>

    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import videoTemplate from '@/components/video/VideoTemplate'

    export default {
        props: ['item'],
        data() {
            return{
                likes: this.item.likes ? this.item.likes : ""
            }
        },
        components: {
            appVideoTemplate: videoTemplate
        },
        methods: {
            ...mapActions([
                'likePost',
                'updateClientsLikes'
            ]),
            addLike(id){
                if(this.getClientLikes < this.getMaxLikesPerPerson){
                    this.likePost(id);
                    this.likes ? this.likes++ : this.likes = 1;
                    this.updateClientsLikes();
                }
            }
        },
        computed: {
            ...mapGetters([
                'getMaxLikesPerPerson',
                'getClientLikes'
            ])
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
