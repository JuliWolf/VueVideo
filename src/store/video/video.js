import axios from 'axios';
import data from '@/static/data.json'

const state = {
    videoData: []
};

const mutations = {
    UPDATE_VIDEO_DATA (state){
        state.videoData = data;
    }

};

const actions = {
    updateVideoData ( { commit, dispatch} ){
        commit('UPDATE_VIDEO_DATA')
    }
};

const getters = {
    getVideoData(state){
        return state.videoData;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}