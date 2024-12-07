import { createRouter, createWebHistory } from 'vue-router';
import PrincipalLayout from '@/layouts/PrincipalLayout.vue';
import Index from '@/views/Index.vue';
import HotelList from '@/components/HotelList.vue';
import DistributionHotels from '@/components/DistributionHotels.vue';

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
        ],
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;