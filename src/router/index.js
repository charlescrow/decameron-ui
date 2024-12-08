import { createRouter, createWebHistory } from 'vue-router';
import PrincipalLayout from '@/layouts/PrincipalLayout.vue';
import Index from '@/views/Index.vue';
import HotelList from '@/components/hotels/HotelList.vue';
import DistributionHotels from '@/components/distribution/DistributionHotels.vue';
import HotelRegister from '@/components/hotels/HotelRegister.vue';

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
                name: 'distribution-hotels',
                component: DistributionHotels,
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
        ],
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;