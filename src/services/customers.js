import { getClient } from "./http";

class CustomerService {

    findAll({ limit=10, page=1, filter=''}) {
        return getClient().get(`/customers?page=${page}&limit=${limit}&filter=${filter}`)
    }

    findById(id) {
      return getClient().get(`/customers/${id}`)
    }

    save(record) {
      if (record.id) {
        return getClient().put(`/customers/${record.id}`, record)
      } else {
        return getClient().post(`/customers`, record)
      }
    }

    remove(id) {
      return getClient().delete(`customers/${id}`)
    }
}

export default CustomerService
