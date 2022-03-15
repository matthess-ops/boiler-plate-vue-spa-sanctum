import axios from 'axios'

export default {
  namespaced: true,

  state: {
    authenticated: false,
    // isAdmin:false,
    user: null
  },

  getters: {
    authenticated (state) {
      return state.authenticated
    },

    user (state) {
      return state.user
    },
    // isAdmin (state) {
    //   return state.isAdmin
    // },
  },

  mutations: {
    SET_AUTHENTICATED (state, value) {
      state.authenticated = value
    },

    SET_USER (state, value) {
      state.user = value
    },
    // SET_ISADMIN (state, value) {
    //   state.isAdmin = value
    // }
  },

  actions: {

    // checkIfAdmin({ commit, state,dispatch }){
    //   console.log("?????")
    //   console.log(state.user.is_admin)
    //   if(state.user.is_admin == true){
    //     commit('SET_ISADMIN', true)

    //   }
    
    // },


 

    async signIn ({ dispatch }, credentials) {
      await axios.get('/sanctum/csrf-cookie')
      await axios.post('/login', credentials)

      return dispatch('me')
    },

    async signOut ({ dispatch }) {
      await axios.post('/logout')

      return dispatch('me')
    },

    me ({ commit,dispatch}) {
      return axios.get('/api/user').then((response) => {
        commit('SET_AUTHENTICATED', true)
        commit('SET_USER', response.data)
        // dispatch('checkIfAdmin')
    
     
      }).catch(() => {
        commit('SET_AUTHENTICATED', false)
        commit('SET_USER', null)
        // commit('SET_ISADMIN', false)

      })
    }
  }
}