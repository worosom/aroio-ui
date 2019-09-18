const apiPort = 5000;
//const genRequestUrl = () => `${window.location.protocol}//${window.location.host.split(':')[0]}:${apiPort}/api`;
const genRequestUrl = () => `http://10.0.1.37:${apiPort}/api`;

export const state = () => ({
  locales: ['de', 'en'],
  locale: 'de',
  status: 'loading',
  config: {},
  network: {},
  iwlist: [],
  convolver: {
    choices: []
  },
  dirty: false,
  STATUS_LOADING: 'loading',
  STATUS_SAVING: 'config_saving',
  STATUS_SAVED: 'config_saved',
  STATUS_REBOOT: 'reboot',
  STATUS_REBOOTING: 'rebooting',
  STATUS_IDLE: 'idle'
})

export const getters = {
  loading: state => state.status === state.STATUS_LOADING,
  saving: state => state.status === state.STATUS_SAVING,
  saved: state => state.status === state.STATUS_SAVED,
  rebooting: state => state.status === state.STATUS_REBOOTING || state.status === state.STATUS_REBOOT
}

export const mutations = {
  LOAD_CONFIG(state, config) {
    if (config) {
      state.config = config;
      state.dirty = false;
    }
  },
  LOAD_FILTERS(state, convolver) {
    if (convolver)
      state.convolver = convolver;
  },
  LOAD_NETWORK(state, network) {
    if (network)
      state.network = network;
  },
  SET_VALUE(state, {section, key, value}) {
    if (!state.dirty)
      state.dirty = state.config[key] !== value;
    state.config[key] = value
    if (section == 'BRUTEFIR') {
      if (key == 'def_coeff') {
	this.dispatch('APPLY_DEF_COEFF')
      }
    }
  },
  SET_AUDIO_INPUT(state, {section, key, value}) {
    if (!state.dirty)
      state.dirty = state.config[key] !== value;
    state.config[key] = value
  },
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  STATUS(state, status) {
    state.status = status
  },
  IWLIST(state, list) {
    state.iwlist = list
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const requestUrl = `${genRequestUrl()}`;
    console.log(requestUrl);
    const res = await this.$axios.get(requestUrl);
    console.log(res.data);
    Promise.all([
      commit('LOAD_CONFIG', res.data.config),
      commit('LOAD_FILTERS', res.data.convolver),
      commit('LOAD_NETWORK', res.data.network),
      commit('STATUS', res.data.status)
    ]);
  },
  async SAVE_CONFIG({ commit, state }) {
    const requestUrl = `${genRequestUrl()}`;
    await commit('STATUS', state.STATUS_SAVING);
    const res = await this.$axios.put(requestUrl, {
      'config': state.config
    });
    console.log(res.data);
    await commit('LOAD_CONFIG', res.data.config);
    await commit('STATUS', res.data.status);
  },
  async REBOOT({ commit, state }) {
    const requestUrl = `${genRequestUrl()}/system`;
    await commit('STATUS', state.STATUS_REBOOT);
    this.$axios.post(requestUrl, { reboot: true }).catch(() => {});
  },
  async GET_IWLIST({ commit, state }) {
    const requestUrl = `${genRequestUrl()}/iwlist`;
    const res = await this.$axios.get(requestUrl);
    await commit('IWLIST', res.data.iwlist)
  },
  async APPLY_DEF_COEFF({ commit, state }) {
    const requestUrl = `${genRequestUrl()}/convolver/set_active_filter`;
    await this.$axios.put(requestUrl, {
      'active_filter': state.config.def_coeff
    })
  }
}
