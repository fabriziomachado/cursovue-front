<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12">

          <div>{{ new Date() | dateFormat('DD/MM/YYYY') }}</div>
          <div>{{ 1000000 | numericFormat }}</div>

          <b-card class="p-2 h-100" no-body>
              <div class="text-right">
                <button class="btn btn-success" @click="orderChange">Mudar</button>
                <b-button @click="orderChange" class="ml-2">Order by {{ order }}</b-button>
                <label class="mx-4">{{ order }}</label>
                <router-link class="ml-auto btn btn-warning" to="new">Novo</router-link>
              </div>
              <div>
                <b-form-select v-model="order" :options="options"></b-form-select>
              </div>
              <b-table class="table-dark" striped hover :items="orderedItens"></b-table>
          </b-card>

        </b-col>
      </b-row>
    </div>
  </div>

</template>

<script>
export default {
    data: () => {
     return {
        items: [
          { id: 1, name: 'Dickerso', phone: 'Macdonald' , email: "john@doe.com.br" },
          { id: 2, name: 'Larsen', phone: 'Shaw' , email: "john@doe.com" },
          { id: 3, name: 'Geneva', phone: 'Wilson' , email: "john@doe.com" },
          { id: 4, name: 'Jami', phone: 'Carney' , email: "john@doe.com" }
        ],
        order: 'id'
      }
    },
    methods: {
        orderChange(){
            this.order = this.order === 'id' ? 'name' : 'id';
            // Success notification
            this.$noty.success("Your profile has been saved!")
        }
    },
    computed: {
      options () {
        return [
          { value: 'name', text: 'Nome' },
          { value: 'id', text: 'ID' },
          { value: 'phone', text: 'Número de telefone' },
        ]
      },
        orderedItens () {
            const compare = (a, b) => (a[this.order] > b[this.order]) - (a[this.order] < b[this.order])
            const ordered =  [...this.items].sort(compare)
           
            return ordered
        }
    }

}
</script>

<style>

</style>