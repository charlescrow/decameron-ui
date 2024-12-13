<template>
    <div class="container">
        <div v-if="errorsForm.length" class="alert alert-danger">
            <ul>
                <li style="text-align: left;" v-for="(error, index) in errorsForm" :key="index">{{ error }}</li>
            </ul>
        </div>
        <form autocomplete="off" @submit.prevent="submitForm">
            <div class="row">
                <div class="col-lg-6 col-12">
                    <div class="form-floating mb-3">
                        <input type="text" v-model="form.name" id="name" class="form-control"
                            placeholder="Nombre del Hotel">
                        <label>Nombre</label>
                        <span class="showErrors" v-if="showErrors && v$?.name?.$invalid">
                            Nombre es requerido
                        </span>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" v-model="form.city" id="city" class="form-control" placeholder="Ciudad">
                        <label>Ciudad</label>
                        <span class="showErrors" v-if="showErrors && v$?.city?.$invalid">
                            Ciudad es requerido
                        </span>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" v-model="form.address" id="address" class="form-control"
                            placeholder="Dirección">
                        <label>Dirección</label>
                        <span class="showErrors" v-if="showErrors && v$?.address?.$invalid">
                            Dirección es requerido
                        </span>
                    </div>
                </div>
                <div class="col-lg-6 col-12">
                    <div class="form-floating mb-3">
                        <input type="text" v-model="form.nit" id="nit" class="form-control" placeholder="NIT">
                        <label>NIT</label>
                        <span class="showErrors" v-if="showErrors && v$?.nit?.$invalid">
                            Número tributario requerido
                        </span>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" v-model="form.number_room" id="number_room" class="form-control"
                            placeholder="Número habitaciones">
                        <label>Número habitaciones</label>
                        <span class="showErrors" v-if="showErrors && v$?.number_room?.$invalid"> Número requerido</span>
                    </div>
                </div>
            </div>
            <div class="mt-5"> 
                <button @click="formReset" id="cleanButton" class="btn btn-default" type="button">Limpiar</button>
                <button class="btn btn-success" type="submit">Enviar</button>
            </div>
        </form>
    </div>
</template>
<script>
import router from '@/router';
import useVuelidate from '@vuelidate/core';
import { numeric, required } from '@vuelidate/validators';
import axios from 'axios';
import {reactive, ref, watch } from 'vue';
import { toast } from 'vue3-toastify';

export default {
    props: {
        infoHotel : {
            type: Object,
            default: () => null
        }
    },
    setup(props) {
        
        let formDefault = {
            name: '',
            nit: '',
            city: '',
            address: '',
            number_room: ''
        }

        const form = reactive({ ...formDefault });

        watch(
            () => props.infoHotel,
            (newInfoHotel) => {
                if (newInfoHotel) {
                    for (const key in form) {
                        if (key in newInfoHotel) {
                            form[key] = newInfoHotel[key];
                        }
                    }
                    form['id'] = newInfoHotel['id'];
                }
            },
            { immediate: true } 
        );

        const rules = {
            name: { required },
            nit: { required, numeric },
            city: { required },
            address: { required },
            number_room: { required, numeric }
        }

        const v$ = useVuelidate(rules, form);
        const showErrors = ref(false);
        const errorsForm = ref([]);

        const submitForm = () => {
            v$.value.$validate();
            if (!v$.value.$invalid) {
                registerHotel()
            } else {
                showErrors.value = true;
            }
        }

        const registerHotel = async () => {
            try {
                let routeAxios = 'hotels/store'; 
                let typeRoute = 'post';
                if (props.infoHotel) { 
                    routeAxios = `hotels/update/${props.infoHotel.id}`;
                    typeRoute = 'patch';
                }
                const response = await axios[typeRoute](routeAxios, form)
                let data = response.data;
                toast[data.type](data.msg);
                if (data.type == 'success') {
                    setTimeout(() => {
                        router.push('/hoteles');
                    }, 2000);
                }
            } catch (error) {
                errorsForm.value = Object.values(error.response.data.errors).flat();
            }
        };

        const formReset = () => {
            Object.assign(form, formDefault);
            showErrors.value = false;
            errorsForm.value = [];
        }

        return {
            v$,
            submitForm,
            form,
            showErrors,
            formReset,
            errorsForm,
            props
        }
    }
}
</script>
<style scoped>
.showErrors {
    color: red
}
</style>