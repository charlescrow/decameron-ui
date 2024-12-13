<template>
    <div>
        <h3 class="mb-5"> Editar Hotel </h3>
        <HotelForm :infoHotel="infoHotel" />
    </div>
</template>
<script>
import { useRoute } from 'vue-router';
import HotelForm from './HotelForm.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';

export default {
    components: {
        HotelForm
    },
    setup() {
        const route = useRoute();
        const infoHotel = ref({});
        
        onMounted(() => {
            try  {
                const ruta = `/hotels/edit/${route.params.hotel}`;
                axios.get(ruta).then(function (response) {
                    if (response.data.type == 'success') {
                        infoHotel.value = response.data.data;
                    }
                });
            } catch (error) {
                toast.error(error);
            }
        });

        return {
            infoHotel
        }
    },
    
}
</script>
