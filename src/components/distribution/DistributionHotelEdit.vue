<template>
    <div>
        <h3 class="mb-5"> Editar Distribución </h3>
        <DistributionForm :infoDistribution="infoDistribution" />
    </div>
</template>
<script>

import DistributionForm from './DistributionHotelForm.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';

export default {
    components: {
        DistributionForm
    },
    setup() {
        const route = useRoute();
        const infoDistribution = ref({});

        onMounted(() => {
            try {
                const ruta = `/distribution/edit/${route.params.distributionHotel}`;
                axios.get(ruta).then(function (response) {
                    if (response.data.type == 'success') {
                        infoDistribution.value = response.data.data;
                    }
                });
            } catch (error) {
                toast.error(error);
            }
        });

        return {
            infoDistribution
        }
    },

}
</script>