<template>
    <div class="background">
        <div class="main-layout">
            <aside :class="{ open: isAsideOpen || !isSmallScreen }">
                <button class="close-btn" v-if="isSmallScreen" @click="toggleAside">×</button>
                <img alt="Vue logo" src="@/assets/logo-decameron.png" class="logo">
                <ul class="mt-5">
                    <li><router-link to="/">Inicio</router-link></li>
                    <li><router-link to="/hoteles">Hoteles</router-link></li>
                    <li><router-link to="/distribucion">Distribución</router-link></li>
                </ul>
            </aside>
            <main>
                <header class="menu-header" v-if="isSmallScreen">
                    <button @click="toggleAside">
                        <i class="fas fa-bars"></i> Menú
                    </button>
                </header>
                <div class="content">
                    <p>
                        <router-view></router-view>
                    </p>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import { onBeforeMount, onMounted, ref } from 'vue';

export default {
    setup() {

        const isAsideOpen = ref(false);
        const isSmallScreen = ref(false);

        const checkScreenSize = () => {
            isSmallScreen.value = window.innerWidth < 768;
            if (!isSmallScreen.value) {
                isAsideOpen.value = true;
            }
        };

        const toggleAside = () => {
            isAsideOpen.value = !isAsideOpen.value;
        };

        onMounted(() => {
            checkScreenSize();
            window.addEventListener('resize', checkScreenSize);
        });

        onBeforeMount(() => {
            window.removeEventListener('resize', checkScreenSize);
        });

        return {
            isAsideOpen,
            isSmallScreen,
            checkScreenSize,
            toggleAside,
        };
    }
};
</script>

<style scoped>

.background {
    height: 100vh;
    background-image: url('@/assets/background.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    color: aliceblue;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.main-layout {
    display: flex;
    width: 80%;
    height: 70%;
    background: white;
    border-radius: 8px;
    overflow: hidden;
}

aside {
    width: 250px;
    background: #f4f4f4;
    padding: 20px;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    z-index: 999;
}

aside.open {
    transform: translateX(0);
}

aside h4 {
    margin-bottom: 20px;
}

aside ul {
    list-style: none;
    padding: 0;
}

aside ul li {
    margin: 10px 0;
}

aside ul li a {
    text-decoration: none;
    color: #333;
}

.close-btn {
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
}

main {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    color: #000;
}

.menu-header {
    width: 100%;
    background: #007bff;
    color: white;
    padding: 10px 15px;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
}

.menu-header button {
    background: transparent;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.menu-header button i {
    margin-right: 10px;
}

@media (max-width: 768px) {
    aside {
        position: fixed;
        height: 100%;
    }

    main {
        margin-left: 0;
    }

    .menu-header {
        display: flex;
    }

    .main-layout {
        width: 100%;
        height: 85%;
    }

    .background {
        background: #fff;
    }
}

.logo {
    width: 60%;
}

</style>
