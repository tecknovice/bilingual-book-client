import Cookies from 'js-cookie';

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus')
      ? !!+Cookies.get('sidebarStatus')
      : true,
    withoutAnimation: false,
  },
  device: 'desktop',
  bilingualMode: Cookies.get('bilingualMode')
    ? !!+Cookies.get('bilingualMode')
    : true,
};

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1);
    } else {
      Cookies.set('sidebarStatus', 0);
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0);
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  },
  TOGGLE_BILINGUAL_MODE: (state, bilingualMode) => {
    state.bilingualMode = bilingualMode;
    if (state.bilingualMode) {
      Cookies.set('bilingualMode', 1);
    } else {
      Cookies.set('bilingualMode', 0);
    }
  },
};

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR');
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation);
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device);
  },
  toggleBilingualMode({ commit }, bilingualMode) {
    commit('TOGGLE_BILINGUAL_MODE', bilingualMode);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
