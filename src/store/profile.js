const state = () => {
  return {
    user: {}
  }
}

const getters = {
  profileImage(state) {
    return  (state.user && state.user.url) || 'img/profile.png' // verificar se não é nullo e existe
  }
}

const mutations = {
  setUserProfile(state, user) {
    console.log(user)
    state.user = user
  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  //actions,
}
