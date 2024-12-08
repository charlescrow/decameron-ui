<template>
    <h3 class="mb-5"> Distribución de Hotel </h3>
    <div class="container">
        <form autocomplete="off" @submit.prevent="submitForm">
            <div class="row">
                <div class="col-lg-6 col-12">
                    <div class="form-floating mb-3">
                        <select v-model="form.hotel_id" class="form-control">
                            <option v-for="(type, index) in infoHotel" :key="index" :value="type.id">{{ type.name }}
                            </option>
                        </select>
                        <label>Nombre del Hotel</label>
                        <span class="showErrors" v-if="showErrors && v$?.hotel_id?.$invalid">
                            Nombre de Hotel es requerido
                        </span>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" v-model="form.number_room" id="number_room" class="form-control"
                            placeholder="Número de habitaciones">
                        <label>Número de habitaciones</label>
                        <span class="showErrors" v-if="showErrors && v$?.number_room?.$invalid">
                            Número de habitaciones es requerido
                        </span>
                    </div>
                </div>
                <div class="col-lg-6 col-12">
                    <div class="form-floating mb-3">
                        <select v-model="form.type_room_id" class="form-control">
                            <option v-for="(type, index) in typeRoom" :key="index" :value="type.id">{{ type.name }}
                            </option>
                        </select>
                        <label>Tipo de habitación</label>
                        <span class="showErrors" v-if="showErrors && v$?.type_room_id?.$invalid">
                            Tipo de habitación es requerido
                        </span>
                    </div>
                    <div class="form-floating mb-3">
                        <select v-model="form.accommodation_room_id" class="form-control">
                            <option v-for="(type, index) in accomodationRoom" :key="index" :value="type.id">{{ type.name }}
                            </option>
                        </select>
                        <label>Tipo de acomodación</label>
                        <span class="showErrors" v-if="showErrors && v$?.accommodation_room_id?.$invalid">
                            Tipo de acomodación es requerido
                        </span>
                    </div>
                </div>
            </div>
            <div class="mt-5">
                <button @click="formReset" class="btn btn-default" type="button">Limpiar</button>
                <button class="btn btn-success" type="submit">Enviar</button>
            </div>
        </form>
    </div>
</template>
<script>
import router from '@/router';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';
import { toast } from 'vue3-toastify';

export default {
    setup() {

        const formDefault = {
            hotel_id: '',
            number_room: '',
            type_room_id: '',
            accommodation_room_id: ''

        }

        const form = reactive({ ...formDefault });

        const rules = {
            hotel_id: { required },
            number_room: { required },
            type_room_id: { required },
            accommodation_room_id: { required }
        }

        const v$ = useVuelidate(rules, form);

        const showErrors = ref(false);
        const typeRoom = ref([]);
        const accomodationRoom = ref([]);
        const infoHotel = ref([]);

        const submitForm = () => {
            v$.value.$validate();
            if (!v$.value.$invalid) {
                registerDistribution()
            } else {
                showErrors.value = true;
            }
        }

        const registerDistribution = async () => {
            try {
                const response = await axios.post('distribution/store', form)
                let data = response.data;
                toast[data.type](data.msg);
                if (data.type == 'success') {
                    setTimeout(() => {
                        router.push('/distribucion');
                    }, 2000);
                }
            } catch (error) {
                console.error('Error al enviar los datos:', error);
            }
        };

        const formReset = () => {
            Object.assign(form, formDefault);
            showErrors.value = false;
        }

        onMounted(() => {
            axios.get('/distribution/get-info-select')
            .then(function(response) {
                typeRoom.value = response.data.type_room;
                accomodationRoom.value = response.data.accommodation_room;
                infoHotel.value = response.data.hotels;
            });
        })

        return {
            v$,
            submitForm,
            form,
            showErrors,
            formReset,
            typeRoom,
            accomodationRoom,
            infoHotel
        }
    }
}
</script>
<style scoped>
.showErrors {
    color: red
}
</style>