<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              
              <b-form @submit.prevent="registerUser">

                <h1>Register</h1>
                <p class="text-muted">Create your account</p>
                
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                  </b-input-group-prepend>
                
                  <b-form-input 
                      v-model="user.name"
                      type="text" 
                      class="form-control" 
                      placeholder="Username" 
                      autocomplete="username" />
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                      <b-input-group-text><i class="icon-phone"></i></b-input-group-text>
                  </b-input-group-prepend>
                
                  <b-form-input 
                      v-model="user.phone"
                      type="text" 
                      class="form-control" 
                      placeholder="Phone" 
                      autocomplete="phone" />
                </b-input-group>
                

                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>@</b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input 
                      v-model="user.email"
                      type="text" 
                      class="form-control" 
                      placeholder="Email" 
                      autocomplete="email" />
                  </b-input-group>

                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input 
                      v-model="user.password"
                      type="password" 
                      class="form-control" 
                      placeholder="Password" 
                      autocomplete="new-password" />
                  </b-input-group>

                  <!-- <b-input-group class="mb-4">
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input 
                    
                    type="password" 
                    class="form-control" 
                    placeholder="Repeat password" 
                    autocomplete="new-password" />
                  </b-input-group> -->

                <b-button variant="success" type="submit" block>Create Account</b-button>
                <b-button variant="primary" to="/login" block>Voltar</b-button>
              </b-form>
            </b-card-body>

          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { registerUser, login } from '@/services/auth'
export default {
  name: 'Register',
  data() {
    return {
      user: {}
    }
  },
  methods: {
    async registerUser() {
      try {
        const response = await registerUser(this.user)
        await login(this.user.email, this.user.password)
        this.$router.replace('/')
      } catch (error){
        this.$noty.error(error.response.data.message)
        console.log(error.response.data.details)
      }

    }
  }
}

</script>
