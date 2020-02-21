import data from '@/static/data.json'
import VueLocalStorage from "vue-localstorage/src/VueLocalStorage";

const state = {
    videoData: [],
    videosPerPage: [],
    itemsPerPage: 10,
    pageNumber: 0,
    pageCount: 1,
    clientPreferableVideoId: [],
    maxLikesPerPerson: 50
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
                state.videoData[index]['likes']++;
            }else{
                state.videoData[index]['likes'] = 1;
            }
        }
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
    }

};

const actions = {
    uploadData ( {commit, dispatch } ) {
        dispatch('updateVideoData').then(res => {
            if(VueLocalStorage.get('likes')){
                commit('UPDATE_LIKES_DATA');
                dispatch('pageCount');
            }else{
                dispatch('pageCount');
            }
        })
        .then(res => {
            dispatch('getDataForPage');
        })
    },
    updateVideoData ( { commit, dispatch} ){
        return new Promise((resolve, reject) => {
            commit('UPDATE_VIDEO_DATA');
            resolve();
        });
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
    getNextPageData ({ commit, dispatch }) {
        dispatch('getNextPage').then(() => {
            dispatch('getDataForPage')
        })
    },
    getNextPage ({ commit }) {
        return new Promise((resolve, reject) => {
            commit('GET_NEXT_PAGE');
            resolve()
        })
    },
    getPrevPageData ({ commit, dispatch }) {
        dispatch('getPrevPage').then(() => {
            dispatch('getDataForPage')
        })
    },
    getPrevPage ({ commit }) {
        return new Promise((resolve, reject) => {
            commit('GET_PREV_PAGE');
            resolve()
        })
    },
    likePost ({ commit, dispatch }, data) {
        dispatch('updateFavouriteList', data).then(res => {
            dispatch('updateLocalStorage').then(res => {
                commit('UPDATE_LIKES', data);
            })
        })
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
    }
};

const getters = {
    getVideoData(state){
        return state.videosPerPage;
    },
    pageNumber: state => {
        return state.pageNumber
    },
    pageCount: state => {
        return state.pageCount
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}