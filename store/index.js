export const state = () => ({
  email: '',
  password: '',
  name: '',
  number: '',
  post: '',
  postDetail: '',
  info: null,
});

export const mutations = {
  SET_INFO(state, data) {
    state.info = data;
  },
};

export const actions = {
  async fetchInfo({ commit }, data) {
    try {
      commit('SET_INFO', data);
    } catch (e) {
      throw e;
    }
  },
};
