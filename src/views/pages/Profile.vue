<template>
<div class="wrapper">
  <div class="animated fadeIn">
      <b-row>

        <b-col cols="12" md="4">
          <!-- AVATAR -->
          <b-card class="text-center" >
            <b-img center width="220" :src="profileImage" />
               <!-- <b-button class="mt-3" variant="success">Alterar</b-button> -->

              <FileUpload
                fildName="image"
                accept="image/*"
                uploadURL="@me/image"
                @uploaded="onFileUpload"
                @error="onError"
              >
              <i class="fa fa-file mr-2"></i>
              Alterar
              </FileUpload>

              <b-button class="mt-3 ml-2"  @click="removeProfileImage" variant="danger">Remover</b-button>
          </b-card>
        </b-col>

        <b-col cols="12" md="8">
          <!-- FORMULARIO -->
          <b-card>
            <b-form @submit.prevent="updateProfile">
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
            <b-form @submit.prevent="updatePassword">

              <b-form-row>

                <b-form-group class="col-md-4" label="Senha atual">
                  <b-form-input
                    v-model="passwords.password"
                    type="password"
                    placeholder="senha atual"
                  ></b-form-input>
                </b-form-group>

                <b-form-group class="col-md-4" label="Nova Senha">
                  <b-form-input
                    v-model="passwords.newPassword"
                    type="password"
                    placeholder="senha atual"
                  ></b-form-input>
                </b-form-group>

                <b-form-group class="col-md-4" label="Repita a senha">
                  <b-form-input
                    v-model="passwords.repeatPassword"
                    type="password"
                    placeholder="repita a senha"
                  ></b-form-input>
                </b-form-group>

              </b-form-row>

            <div class="text-right">
              <b-button  type="submit" variant="success">Atualizar a senha</b-button>
            </div>

            </b-form>

          </b-card>
        </b-col>
      </b-row>
  </div>
</div>
</template>

<script>
//import { store } from "@/store.js";
import FileUpload from '@/components/FileUpload.vue'
import { getProfile, updatePassword, updateProfile, removeProfileImage } from '@/services/auth'

import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  components: { FileUpload },
  data () {
    return {
      profile: {},
      passwords: {},
    }
  },
  async mounted () {
    this.profile = await getProfile()
  },
  methods: {
    ...mapMutations('profile', ['setUserProfile']),

    async updateProfile() {
      this.profile = await updateProfile(this.profile)
      console.log(this.profile)
      this.setUserProfile(this.profile)  // store
      //const {status, message} = this.profile
      this.$noty.success('Salvo com sucesso')

      return true
    },
    async removeProfileImage() {
        await removeProfileImage(this.profile)
        this.setUserProfile(this.profile)
        this.profile = await getProfile()
        this.setUserProfile(this.profile) // store

        //store.state.profileURL = 'img/profile.png'

        this.$noty.success('Imagem removida com sucesso!')
    },
    async updatePassword() {
      //console.log(JSON.stringify(this.passwords))

      try {
        const {status, message} = await updatePassword(this.passwords)
        this.$noty.[status](message)
        return true
      } catch (  { response: { data: { status, message } }} ) {
        // error.response.data.message|status
        //const { status, message } = error.response.data
        this.$noty.[status](message)
        return false
      }

    },
    onFileUpload(newProfile) {
      this.$noty.success(newProfile.message)
      this.profile = newProfile.data
      this.setUserProfile(this.profile)

      //store.state.profileURL = newProfile.data.url

      //console.log( store.state)
      //console.log(JSON.stringify(this.profile))
    },
    onError(error) {
        this.$noty.error(`Problemas no upload${error.message}`)
        console.error(error)
    },
  },
  computed: {
    ...mapGetters('profile',[ 'profileImage' ])


    //profileImage(){ return this.profile.url ?? 'img/profile.png'}
  }
}
</script>
