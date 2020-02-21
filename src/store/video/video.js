import data from '@/static/data.json'
import VueLocalStorage from "vue-localstorage/src/VueLocalStorage";

const state = {
    videoData: [],
    videosPerPage: [],
    itemsPerPage: 10,
    pageNumber: 0,
    pageCount: 1,
    clientPreferableVideoId: [],
    maxLikesPerPerson: 50,
    clientLikes: VueLocalStorage.get('likesAmount') ? VueLocalStorage.get('likesAmount')*1 : 0
};

const mutations = {
    UPDATE_VIDEO_DATA (state){
        state.videoData = data;
    },
    UPDATE_DATA_PER_PAGE (state) {
        let start = state.pageNumber * state.itemsPerPage;
        let end = start + state.itemsPerPage;
        state.videosPerPage = state.videoData.slice(start, end)
    },
    GET_NEXT_PAGE (state) {
        state.pageNumber++
    },
    GET_PREV_PAGE (state) {
        state.pageNumber--
    },
    COUNT_PAGES (state) {
        let l = state.videoData.length;
        let s = state.itemsPerPage;
        state.pageCount = Math.ceil(l / s)
    },
    UPDATE_LIKES_DATA (state) {
        state.clientPreferableVideoId = VueLocalStorage.get('likes').split(',');
        VueLocalStorage.set('likesAmount', state.clientPreferableVideoId.length);
        for(var i = state.clientPreferableVideoId.length, length = 0; i > length; i-- ){
            let index = state.videoData.findIndex((el) => { return el.id == state.clientPreferableVideoId[i-1]});
            if( state.videoData[index]['likes'] !== undefined){
                state.videoData[index].likes++;
            }else{
                state.videoData[index].likes = 1;
            }
        }
    },
    FILTER_DATA (state){
        state.videoData.sort((prev, next) => {
            return (next.likes || 0) - (prev.likes || 0)
        });
    },
    UPDATE_LIKES (state, id) {
        let index = state.videosPerPage.findIndex((el) => { return el.id == id});
        if( state.videosPerPage[index]['likes'] !== undefined){
            state.videosPerPage[index]['likes']++;
        }else{
            state.videosPerPage[index]['likes'] = 1;
        }
    },
    UPDATE_PREFERABLE_VIDEO_LIST (state, id){
        state.clientPreferableVideoId.push(id);
    },
    UPDATE_LOCAL_STORAGE_LIKES (state) {
        VueLocalStorage.set('likes', state.clientPreferableVideoId);
        let likesAmount = VueLocalStorage.get('likesAmount');
        VueLocalStorage.set('likesAmount', likesAmount = likesAmount*1 + 1);
    },
    UPDATE_CLIENTS_LIKES_AMOUNT (state){
        state.clientLikes++;
    }

};

const actions = {
    async uploadData ( {commit, dispatch } ) {
        await dispatch('updateVideoData');
        if(VueLocalStorage.get('likes')){
            await dispatch('updateLikesData');
            await dispatch('filterDataByLikes');
            await dispatch('pageCount');
        }else{
            await dispatch('pageCount');
        }
        await dispatch('getDataForPage');
    },
    updateVideoData ( { commit, dispatch} ){
        return new Promise((resolve, reject) => {
            commit('UPDATE_VIDEO_DATA');
            resolve();
        });
    },
    updateLikesData ( {commit}) {
        return new Promise((resolve, reject) => {
            commit('UPDATE_LIKES_DATA');
            resolve();
        })
    },
    filterDataByLikes( { commit }){
        return new Promise((resolve, reject) => {
            commit('FILTER_DATA');
            resolve();
        })
    },
    pageCount ({ commit }) {
        return new Promise((resolve, reject) => {
            commit('COUNT_PAGES');
            resolve()
        })
    },
    getDataForPage ({ commit }) {
        return new Promise((resolve, reject) => {
            commit('UPDATE_DATA_PER_PAGE')
        })
    },
    async getNextPageData ({ commit, dispatch }) {
        await dispatch('getNextPage');
        await dispatch('getDataForPage');
    },
    getNextPage ({ commit }) {
        return new Promise((resolve, reject) => {
            commit('GET_NEXT_PAGE');
            resolve()
        })
    },
    async getPrevPageData ({ commit, dispatch }) {
        await dispatch('getPrevPage');
        await dispatch('getDataForPage');

    },
    getPrevPage ({ commit }) {
        return new Promise((resolve, reject) => {
            commit('GET_PREV_PAGE');
            resolve()
        })
    },
    async likePost ({ commit, dispatch }, data) {
        await dispatch('updateFavouriteList', data);
        await dispatch('updateLocalStorage');
        await commit('UPDATE_LIKES', data);
    },
    updateFavouriteList ( { commit }, id){
        return new Promise((resolve, reject) => {
            commit('UPDATE_PREFERABLE_VIDEO_LIST', id);
            resolve()
        })
    },
    updateLocalStorage( { commit } ){
        return new Promise((resolve, reject) => {
            commit('UPDATE_LOCAL_STORAGE_LIKES');
            resolve()
        });
    },
    updateClientsLikes( {commit} ){
        commit('UPDATE_CLIENTS_LIKES_AMOUNT')
    }
};

const getters = {
    getVideoData: state => {
        return state.videosPerPage;
    },
    pageNumber: state => {
        return state.pageNumber
    },
    pageCount: state => {
        return state.pageCount
    },
    getMaxLikesPerPerson: state => {
       return state.maxLikesPerPerson;
    },
    getClientLikes: state => {
        return state.clientLikes;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}