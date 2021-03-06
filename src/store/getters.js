const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  bilingualMode: state => state.app.bilingualMode,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
export default getters
