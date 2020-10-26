<template>
  <div class="app flex-row align-items-center">
    <div class="container-fluid">
      <b-row>
        <b-col class="ml-auto" md="5">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your accounts</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input v-model="usermal" type="text" class="form-control" placeholder="usermal" autocomplete="usermal" />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input v-model="password" type="password" class="form-control" placeholder="Password" autocomplete="current-password" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button @click.prevent="login()" variant="primary" class="px-4" type="submit">Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Forgot password?</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { login  } from "@/services/auth";

export default {
  name: 'Login',
  data () {
    return {
      usermal:'',
      password: ''
    }
  },
  methods: {
    login () {
      console.log(this.usermal, this.password)
      if(login(this.usermal, this.password)) {
        this.$router.replace( this.$route.query.redirect || '/')
      }
    
      this.$noty.error('Usuário ou senha incorretos!');
    
    }
  }
}
</script>

<style lang="scss" scoped>
.app {
  background-image: url('https://source.unsplash.com/random');
  background-size: cover;
}
</style>
