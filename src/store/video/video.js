import axios from 'axios';
import data from '@/static/data.json'

const state = {
    videoData: [],
    videosPerPage: [],
    itemsPerPage: 10,
    pageNumber: 0,
    pageCount: 1
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
    }

};

const actions = {
    uploadData ( {commit, dispatch } ) {
        dispatch('updateVideoData')
            .then(res => {
            dispatch('pageCount');
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
    likePost ({ commit }) {

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