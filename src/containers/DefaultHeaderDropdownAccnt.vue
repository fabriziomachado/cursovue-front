<template>
  <AppHeaderDropdown right no-caret>

    <template slot="header">
      <img
        :src="storeState.profileURL"
        class="img-avatar"
        alt="admin@bootstrapmaster.com" />
    </template>\
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center">
        <strong>User</strong>
      </b-dropdown-header>
      <b-dropdown-item to="/profile"><i class="fa fa-user" /> Profile</b-dropdown-item>
      <b-dropdown-item @click="logout"><i class="fa fa-lock" /> Sair</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { store } from "@/store.js";
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
import { logout, getProfile } from "@/services/auth";
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  data () {
      return {
          profile: {},
          storeState: store.state
      }
  },
  async mounted () {
      this.profile = await getProfile()
      //this.storeState.profileURL = this.profile.url
      store.state.profileURL = this.profile.url ?? 'img/profile.png'

  },
  computed: {
    profileImage(){
      //console.log(this.storeState.profileURL)
      //if(this.storeState.profileURL) return this.storeState.profileURL

      return this.profile.url ?? 'img/profile.png'
    //return  'img/profile.png'

    }
  },
  methods: {
    logout(){
      logout(this.returnLogin)
    },
    returnLogin(){
      this.$router.replace('/login')
    },
  }
}
</script>
<style lang="scss">
ul.dropdown-menu.show {
  width: 12rem;
}
</style>
