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

              <b-table
                class="-table-dark"
                striped
                hover
                :fields="tableFields"
                :items="orderedItens">

                <template v-slot:cell(email)="{ item }">
                  <a target="_blank" :href="`mailto:${ item.email }`">{{ item.email }}</a>
                </template>

                 <template v-slot:cell(action)="{ item }">
                  <b-button
                    :to="{name: 'Edit', params: { id: item.id }}"
                    variant="link" size=""
                    class="text-primary p-10 mx-1">
                      <i class="fa fa-edit"></i>
                  </b-button>
                  <b-button
                    @click="remove(item)"
                    variant="link" size=""
                    class="text-danger p-10 mx-1">
                      <i class="fa fa-trash"></i>
                  </b-button>
                 </template>

              </b-table>

              <b-pagination
                  v-model="page"
                  :total-rows="total"
                  :per-page="perPage"
                  align="right">
              </b-pagination>

          </b-card>

        </b-col>
      </b-row>
    </div>
  </div>

</template>

<script>
import data from './customers.json'

export default {
    data: () => {
     return {
        items: data,
        page: 1,
        perPage: 20,
        total: 100,
        order: 'id',
      }
    },
    methods: {

        remove({id, name}) {
          this.$noty.success(`${name} (${id}) excluido!`)
        },
        orderChange(){
            this.order = this.order === 'id' ? 'name' : 'id';
            // Success notification
            this.$noty.success("Your profile has been saved!")
        }
    },
    computed: {
      tableFields() {
        return [
          { key: 'id', label: '#', isRowHeader: true},
          { key: 'name', label: 'Nome'},
          { key: 'phone', label: 'Telefone'},
          { key: 'email', label: 'email'},
          { key: 'action', label: '', tdClass: 'text-right'},
        ]
      },
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
