<template>

  <div class="wrapper">
    <div class="animated fadeIn">

      <b-row>
        <b-col md="8" class="mx-auto">
          <!-- card formulario de clientes -->
          <b-card show-footer>
            <div slot="header">
              <strong>Cliente </strong> <small>Form</small>
            </div>
            <b-row>
              <b-col sm="12">
                <!-- formulário principal -->
                <b-form @submit.prevent="onSubmit">

                  <b-form-group label="Your Name:">
                    <b-form-input
                      v-model="form.name"
                      required
                      placeholder="Enter name"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group label="Email address:">
                    <b-form-input
                      v-model="form.email"
                      type="email"
                      required
                      placeholder="Enter email"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group label="Phone:">
                    <b-form-input
                      v-model="form.phone"
                      required
                      placeholder="Enter phone"
                    ></b-form-input>
                  </b-form-group>

                  <div class="text-right" slot="footer">
                    <b-button type="submit" variant="primary">
                        <i class="fa fa-save mr-2"></i>Salvar
                    </b-button>
                    <b-button class="ml-2" @click="$router.go(-1)" variant="danger">
                        <i class="fa fa-times-circle mr-2"></i>Cancelar
                    </b-button>
                  </div>

                </b-form>
              </b-col>
            </b-row>

          </b-card>
        </b-col>
      </b-row>


      <b-row>
        <b-col cols="12">
          <!-- card de uploads -->
          <b-card>
            <div slot="header">
              <strong>Upload </strong> <small>files</small>
            </div>

           <!-- Lista de uploads -->
            <ul>
              <li v-for="(file, index) in files" :key="file.id">
                {{index}} - <span>{{file.name}}</span> - <span>{{file.size | formatSize}}</span> -
                <b-badge v-if="file.error" pill variant="danger">{{file.error}}</b-badge>
                <b-badge v-else-if="file.success" pill variant="success">Success</b-badge>
                <b-badge v-else-if="file.active" pill variant="primary">active</b-badge>
                <span v-else></span>
              </li>
            </ul>

            <file-upload
              class="btn btn-primary"
              post-action="/upload/post"
              extensions="gif,jpg,jpeg,png,webp"
              accept="image/png,image/gif,image/jpeg,image/webp"
              :multiple="true"
              :size="1024 * 1024 * 10"
              v-model="files"
              @input-filter="inputFilter"
              @input-file="inputFile"
              ref="upload">
              <i class="fa fa-plus"></i>
              Select files
            </file-upload>

            <button type="button" class="btn btn-success" v-if="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true">
              <i class="fa fa-arrow-up" aria-hidden="true"></i>
              Start Upload
            </button>
            <button type="button" class="btn btn-danger"  v-else @click.prevent="$refs.upload.active = false">
              <i class="fa fa-stop" aria-hidden="true"></i>
              Stop Upload
            </button>

          </b-card>
        </b-col>
      </b-row>

    </div>
  </div>
</template>


<script>
import data from './customers.json'
import FileUpload from 'vue-upload-component'

export default {
    components: {
      FileUpload,
    },

    data() {
      return {
        files: [],
        form: {
          email: '',
          name: '',
          phone: '',
        }
      }
    },
    mounted() {
      if(this.$route.params.id){
        this.form = data.find(item => item.id == this.$route.params.id)
      }
    },
    methods: {
      onSubmit() {
        console.log(JSON.stringify(this.form))
      },
      inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Before adding a file
        // Filter system files or hide files
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent()
        }
        // Filter php html js file
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent()
        }
      }
    },
      inputFile(newFile, oldFile) {
      if (newFile && !oldFile) {
        console.log('add', newFile)
      }
      if (newFile && oldFile) {
        console.log('update', newFile)
      }
      if (!newFile && oldFile) {
        console.log('remove', oldFile)
      }
    }

    }
  }
</script>

<style>
</style>
