import Swal from "sweetalert2"

export default {
  methods: {
    $confirm(title, text) {
      return Swal.fire({
            title,
            text,
           // type: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sim'
          })
          .then( ({value}) => {
            return value
          })



    }
  }

}
