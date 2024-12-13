import { createRouter, createWebHistory } from 'vue-router';
import PrincipalLayout from '@/layouts/PrincipalLayout.vue';
import Index from '@/views/Index.vue';
import HotelList from '@/components/hotels/HotelList.vue';
import DistributionHotelList from '@/components/distribution/DistributionHotelList.vue';
import DistributionHotelRegister from '@/components/distribution/DistributionHotelRegister.vue';
import HotelRegister from '@/components/hotels/HotelRegister.vue';
import HotelEdit from '@/components/hotels/HotelEdit.vue';

const routes = [
    {
        path: '/',
        component: PrincipalLayout, 
        children: [
            {
                path: '', 
                name: 'index',
                component: Index,
            },
            {
                path: '/distribucion', 
                name: 'distribution-hotels-list',
                component: DistributionHotelList,
            },
            {
                path: '/distribucion/registro', 
                name: 'distribution-hotels-register',
                component: DistributionHotelRegister,
            },
            {
                path: '/hoteles', 
                name: 'hotel-list',
                component: HotelList,
            },
            {
                path: '/hoteles/registro', 
                name: 'hotel-register',
                component: HotelRegister,
            },
            {
                path: '/hoteles/editar/:hotel', 
                name: 'hotel-edit',
                component: HotelEdit,
            },
        ],
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;