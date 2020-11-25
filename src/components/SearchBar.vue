<template>
  <b-form inline @submit.prevent="$emit('refresh')">
    <label class="d-none d-sm-inline">Pesquisa</label>

    <b-input-group class="col-12 col-sm">
      <b-input
        :value="value"
        @input="onInputHandle"
      > </b-input>
    </b-input-group>

    <b-input-group-addon append v-if="!!value">
      <b-btn @click="reset" variant="link text-danger" class="border-top border-bottom">
        <i class="fa fa-times"></i>
      </b-btn>
    </b-input-group-addon>

     <b-input-group-addon append>
      <b-btn type="submit" variant="success">
      <i class="fa fa-search mr-2"></i>
      <span class="d-none d-sm-inline ml-1">Buscar</span>
      </b-btn>
    </b-input-group-addon>
    <slot></slot>
  </b-form>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    onInputHandle($event) {
      this.$emit('input', $event)
    },
    reset() {
      //this.value = ""
      this.$emit('input', '')
      this.$emit('refresh')

    }
  },
  //computed: {
  //  realValue() {
  //    return this.value
  //  }
  //}
}

</script>
