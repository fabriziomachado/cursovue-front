<template>
<div class="wrapper">
  <div class="animated fadeIn">
      <b-row>

        <b-col cols="12" md="4">
          <!-- AVATR -->
          <b-card class="text-center" >
            <b-img class="d-box" width="250" :src="profileImage" />
            <div class="text-center d-inline">
              <b-button class="mt-3" variant="success">Alterar</b-button>
              <b-button class="mt-3 ml-2" variant="danger">Remover</b-button>
            </div>
          </b-card>
        </b-col>

        <b-col cols="12" md="8">
          <!-- FORMULARIO -->
          <b-card>
            <b-form @submit="onSubmit">
              <b-form-group label="Nome">
                <b-form-input
                  v-model="profile.name"
                  required
                  placeholder="Seu nome"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="email">
                <b-form-input
                  v-model="profile.email"
                  required
                  readonly
                  placeholder="Seu email"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Telefone" description="Muito importante um numero válido">
                <b-form-input
                  v-model="profile.phone"
                  required
                  placeholder="Seu número de celeular"
                ></b-form-input>
              </b-form-group>

              <div class="text-right">
                <b-button type="submit" variant="primary">Submit</b-button>
              </div>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <!-- SENHA -->
          <b-card>

            <b-form-row>

              <b-form-group class="col-md-4" label="Senha atual">
                <b-form-input
                  v-model="profile.password"
                  type="password"
                  placeholder="senha atual"
                ></b-form-input>
              </b-form-group>

               <b-form-group class="col-md-4" label="Nova Senha">
                <b-form-input
                  v-model="profile.password"
                  type="password"
                  placeholder="senha atual"
                ></b-form-input>
              </b-form-group>

               <b-form-group class="col-md-4" label="Repita a senha">
                <b-form-input
                  v-model="profile.password"
                  type="password"
                  placeholder="repita a senha"
                ></b-form-input>
              </b-form-group>

            </b-form-row>

            <div class="text-right">
              <b-button variant="success">Atualizar a senha</b-button>
            </div>

          </b-card>
        </b-col>
      </b-row>
  </div>
</div>
</template>

<script>

export default {
  data () {
    return {
      profile: {},
    }
  },
  computed: {
    profileImage(){
      return this.profile.image ?? 'img/profile.png'
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
