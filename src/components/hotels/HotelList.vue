<template>
    <h3 class="mb-5"> Listado de Hoteles </h3>
    <div class="row">
        <div class="col-lg-10 offset-lg-2" style="text-align: right;">
            <router-link to="/hoteles/registro">
                <button class="btn btn-primary btn-sm mb-3">
                    <i class="fas fa-plus"></i>
                    Registrar  
                </button>
            </router-link>
        </div>
    </div>
    <vue-good-table :columns="columns" :rows="rows" :pagination-options="paginationOptions"
        :searchOptions="searchOptions" :line-numbers="true" theme="polar-bear" styleClass="vgt-table bordered"
        compactMode />
</template>
<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { VueGoodTable } from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css';

export default {
    setup() {

        const styleColumn = {
            tdClass : 'text-center',
            thClass : 'text-center'
        };

        const hotelList = ref([]);
        const columns = ref([
            {
                label: 'Nombre',
                field: 'name',
                ...styleColumn
            },
            {
                label: 'Nit',
                field: 'nit',
                ...styleColumn
            },
            {
                label: 'Ciudad',
                field: 'city',
                ...styleColumn
            },
            {
                label: 'N° Cuartos',
                field: 'number_room',
                ...styleColumn
            },
            {
                label: 'Dirección',
                field: 'address',
                ...styleColumn
            },
        ]);

        const paginationOptions = ref({
            enabled: true,
            perPage: 5,
            perPageDropdownEnabled: false,
            nextLabel: '',
            prevLabel: ''
        })

        const searchOptions = ref({
            enabled: true,
            placeholder: 'Buscar'
        })

        const rows = ref([]);

        onMounted(() => {
            axios.get('/hotels/list').then(function (response) {
                hotelList.value = response.data
                rows.value = response.data
            })
        })

        return {
            hotelList,
            columns,
            rows,
            paginationOptions,
            searchOptions
        }
    },
    components: {
        VueGoodTable
    },
}
</script>