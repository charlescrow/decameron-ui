<template>
    <h3> Listado de Hoteles </h3>
    <br><br>
    <vue-good-table 
        :columns="columns" 
        :rows="rows" 
        :pagination-options="paginationOptions"
        :searchOptions="searchOptions" 
        :line-numbers="true"
        theme="polar-bear" 
        styleClass="vgt-table bordered" 
        compactMode 
    />
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
        }

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
            prevLabel: '',
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
        VueGoodTable,
    },
}
</script>