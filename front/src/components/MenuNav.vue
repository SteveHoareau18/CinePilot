<template>
    <Menubar :model="items">
        <template #item="{ item, props, hasSubmenu, root }">
            <span class="flex items-center gap-2 p-2">
                <i :class="`${item.icon} ${item.color} h-fit`"></i>
                <span>{{ item.label }}</span>
                <i v-if="hasSubmenu"
                    :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
            </span>
        </template>
        <template #end>
            <Button variant="text" @click="userMenuVisible = true" v-if="user != null">
                <Avatar v-if="user.picture" :image="user.picture" :alt="`image du ${user.name}`" shape="circle" />
                <Avatar v-else icon="pi pi-user" :alt="`image par défaut`" shape="circle" />
                <span class="font-bold text-sm block">{{ userStore.getUserFullname }}</span>
            </Button>
            <Button variant="text" @click="router.push('/login')">
                <Avatar icon="pi pi-user" :alt="`image par défaut`" shape="circle" />
                <span class="font-bold text-sm block">Se connecter</span>
            </Button>
        </template>
    </Menubar>

    <Drawer v-model:visible="userMenuVisible" position="right">
        <template #header>
            <span class="font-bold text-xl">Menu utilisateur</span>
        </template>
    </Drawer>
</template>

<script setup>
import { useAppStore } from "@/stores/app";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { useRouter } from "vue-router";

const appStore = useAppStore()
const userStore = useUserStore();
const router = useRouter()
const items = ref(appStore.getMenuNav);
const user = ref(userStore.getUser)
const userMenuVisible = ref(false)
</script>
