const apiPort = 81;
const genRequestUrl = () => `${window.location.protocol}//${window.location.host.split(':')[0]}:${apiPort}/api`;
// const genRequestUrl = () => `http://192.168.1.25:${apiPort}/api`;

export const state = () => ({
  requestUrl: genRequestUrl(),
  locales: ['de', 'en'],
  locale: 'de',
  status: 'loading',
  config: {},
  system: {
    network: {}
  },
  iwlist: [],
  convolver: {
    choices: []
  },
  lmsEnabled: false,
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

      let out = config.audio_output
      const ms = out.slice(-2) == 'ms'
      if (ms) {
        out = out.slice(0, -2)
      }
      if (out.indexOf('vol-plug') == 0)
        out = 'raw_player';

      const keys = Object.keys(config)
      const ins_keys = keys.filter((key) => {
        let key_ms = key.indexOf('ms') > 0
        if (!ms)
          key_ms = !key_ms;
        return key.indexOf(out) >= 0 && key_ms
      })
      ins_keys.forEach((key) => {
        if (config[key] == 'squeezelite') {
          state.lmsEnabled = true
        }
        if (key.indexOf('squeezelite') > 0 && config[key] == 'ON') {
          state.lmsEnabled = true
        }
      })
    }
  },
  LOAD_FILTERS(state, convolver) {
    if (convolver)
      state.convolver = convolver;
  },
  LOAD_SYSTEM(state, system) {
    if (system)
      state.system = system;
  },
  SET_VALUE(state, {section, key, value}) {
    if (!state.dirty)
      state.dirty = state.config[key] !== value;
    state.config[key] = value

    if (section == 'BRUTEFIR') {
      if (key == 'def_coeff') {
        this.dispatch('APPLY_DEF_COEFF')
      }
    } if (section == 'AUDIO') {
      if (key.indexOf('raw_player') == 0)
        state.lmsEnabled = value == 'squeezelite';
      else
        if (key.split('_')[0] == state.config.audio_output)
          if (key.split('_')[1] == 'squeezelite')
            state.lmsEnabled = value == 'ON' ? true : false;
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
  async nuxtServerInit({ commit, state }) {
    const requestUrl = state.requestUrl;
    const res = await this.$axios.get(requestUrl);
    Promise.all([
      commit('LOAD_CONFIG', res.data.config),
      commit('LOAD_FILTERS', res.data.convolver),
      commit('LOAD_SYSTEM', res.data.system),
      commit('STATUS', res.data.status)
    ]);
  },
  async SAVE_CONFIG({ commit, state }) {
    const requestUrl = `${genRequestUrl()}`;
    await commit('STATUS', state.STATUS_SAVING);
    const res = await this.$axios.put(requestUrl, {
      'config': state.config
    });
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
  },
  async SEARCH_UPDATE({ commit, state }) {
    const requestUrl = `${genRequestUrl()}/system/update`
    return await this.$axios.get(requestUrl)
  }
}
