<template>
  <div class="d-inline">
    <input
      @change="onFileChange"
      :accept="accept"
      ref="inputFileUpload"
      type="file"
      class="d-none" />

    <b-button
      :disabled="isUploading"
      @click="$refs.inputFileUpload.click()"
      class="mt-3"
      variant="success">
      <slot></slot>
    </b-button>
  </div>
</template>

<script>
import { getClient } from '@/services/http'


export default {
  props: {
    accept: {
      type: String,
      default(){
        return "*/*"
      }
    },
    uploadURL: {
      type: String,
      required: true
    },
    fildName: {
      type: String,
      default() {
        return 'file'
      }
    }
  },
  data() {
    return {
      isUploading: false
    }
  },
  methods: {
   async onFileChange(){
      this.isUploading = true
      try {
        const [ file ]  = this.$refs.inputFileUpload.files

        //if (true) throw "erro!!!"

        if(file){
          let formData = new FormData()
          formData.append(this.fildName, file)
          // chamar API com headers
          // post(this.uploadURL, formData, { headers: {'Content-Type':'multipart/form-data'}})
          
          const header = {'Content-Type':'multipart/form-data'}
          const { data } = await getClient(header).post(this.uploadURL, formData)

          this.$emit('uploaded', data)
        }

      } catch (error) {
        this.$emit('error', error)
      }

      this.isUploading = false
    }
  }
}
</script>

<style>

</style>
