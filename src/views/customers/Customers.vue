<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12">

          <div>{{ new Date() | dateFormat('DD/MM/YYYY') }}</div>
          <div>{{ 1000000 | numericFormat }}</div>

          <b-card class="p-2 h-100" no-body>
              <!--
              <div class="text-right">
                <button class="btn btn-success" @click="orderChange">Mudar</button>
                <b-button @click="orderChange" class="ml-2">Order by {{ order }}</b-button>
                <label class="mx-4">{{ order }}</label>
                <router-link class="ml-auto btn btn-warning" to="new">Novo</router-link>
              </div>
              <div>
                <b-form-select v-model="order" :options="options"></b-form-select>
              </div>
              -->

              <SearchBar @refresh="load" v-model="filter">
                <b-button class="mt-2 mt-sm-0" to="new" type="submit" variant="primary">
                  <i class="fa fa-plus mr-2"></i>
                  <span>Novo Cliente</span>
                </b-button>
              </SearchBar>

              <b-table
                responsive
                class="-table-dark mt-2"
                striped
                hover
                :fields="tableFields"
                :items="items">

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
//import data from './customers.json'
import CustomerService from '@/services/customers'
import SearchBar from '@/components/SearchBar'
import ConfirmMixin from '@/mixins/confirm'

export default {
    components: {
      SearchBar
    },
    mixins: [ConfirmMixin],
    data: () => {
     return {
        items: [], //data,
        filter: '',
        page: 1,
        total: 0,
        perPage: 5,
        order: 'id'
      }
    },
    mounted(){
      this.$service = new CustomerService()
      this.load()
    },
    watch: {
      page(){
        this.load()
      }
    },
    methods: {
        async load() {
          const { data } = await this.$service.findAll({ limit: this.perPage, page: this.page, filter: this.filter})
          this.items = data.data
          this.total = data.total
        },
        async remove({id, name}) {
          const value = await this.$confirm(
            'Deseja realmente deletar?',
            'Nao poderá mais desfazer'
          )

          if(value){
            try {
              await this.$service.remove(id)
              this.$noty.success(`Excluido o registro ${name} (${id})`)
              this.load()
            } catch (error) {
              this.$noty.error('Erro ao excluir o cliente!')
              console.error(error)
            }
          }
        },
        orderChange(){
            this.order = this.order === 'id' ? 'name' : 'id';
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
          { key: 'address', label: 'address'},
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
