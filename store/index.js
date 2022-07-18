export const state = () => ({
  email: '',
  password: '',
  name: '',
  number: '',
  post: '',
  postDetail: '',
  cardNumbers: null,
});

export const mutations = {
  SET_INFO(state, data) {
    if (data.email) state.email = data.email;
    if (data.password) state.password = data.password;
    if (data.name) state.name = data.name;
    if (data.number) state.number = data.number;
    if (data.post) state.post = data.post;
    if (data.postDetail) state.postDetail = data.postDetail;
    if (data.cardNumbers) state.cardNumbers = data.cardNumbers;
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
