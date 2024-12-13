<template>
    <h3 class="mb-5"> Listado de Distribución de Hoteles </h3>
    <div class="row">
        <div class="col-lg-10 offset-lg-2" style="text-align: right;">
            <router-link to="/distribucion/registro">
                <button class="btn btn-primary btn-sm mb-3">
                    <i class="fas fa-plus"></i>
                    Registrar
                </button>
            </router-link>
        </div>
    </div>
    <vue-good-table :columns="columns" :rows="rows" :pagination-options="paginationOptions"
        :searchOptions="searchOptions" :line-numbers="true" theme="polar-bear" styleClass="vgt-table bordered"
        compactMode>
        <template #table-row="props">
            <span v-if="props.column.field == 'actions'">
                <router-link :to="{ path: `/distribucion/editar/${props.row.id}` }">
                    <button title="Editar Distribución" class="btn btn-sm fas fas fa-pen text-success"></button>
                </router-link>
            </span>
        </template>
    </vue-good-table>
</template>
<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { VueGoodTable } from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css';

export default {
    setup() {

        const styleColumn = {
            tdClass: 'text-center',
            thClass: 'text-center'
        };

        const columns = ref([
            {
                label: 'Hotel',
                field: 'hotel.name',
                ...styleColumn
            },
            {
                label: '# habitaciones',
                field: 'number_room',
                ...styleColumn
            },
            {
                label: 'Tipo cuarto',
                field: 'type_room.name',
                ...styleColumn
            },
            {
                label: 'Acomodación',
                field: 'accommodation_room.name',
                ...styleColumn
            },
            {
                label: 'Acciones',
                field: 'actions',
                slot: "actions",
                ...styleColumn
            }
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
            axios.get('/distribution/list').then(function (response) {
                rows.value = response.data
            })
        })

        return {
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