<template>
    <div class="card">
        <DataView :value="movie" :layout="layout" paginator :rows="itemPerPage">
            <template #header>
                <div class="flex justify-end gap-4">
                    <SplitButton v-if="appStore.isAppAdminMode" label="Créer un film" icon="pi pi-plus"
                        :model="SplitButtonAdmin"
                        @click="toast.add({ severity: 'success', summary: 'Bientôt disponible', detail: 'Cette fonctionnalité deviendra une modale pour créer un film', life: 7000 })" />
                    <SelectButton v-model="layout" :options="options" :allowEmpty="false">
                        <template #option="{ option }">
                            <i :class="[option === 'list' ? 'pi pi-bars' : 'pi pi-table']" />
                        </template>
                    </SelectButton>
                </div>
            </template>

            <template #list="slotProps">
                <div class="flex flex-col">
                    <div v-for="(item, index) in slotProps.items" :key="index">
                        <div class="flex flex-col sm:flex-row sm:items-center p-12 gap-6"
                            :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                            <img class="rounded w-auto md:h-40" :src="item.image" :alt="item.nom" />
                            <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-12">
                                <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                    <div>
                                        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{
                                            item.genre }}</span>
                                        <div class="text-lg font-medium mt-1">{{ item.nom }} ({{ item.annee }})</div>
                                        <div class="text-lg font-medium mt-1">Réalisateur : {{ item.realisateur }}</div>
                                        <div class="text-lg font-thin text-surface-400 mt-1">{{ item.duree }}</div>
                                    </div>
                                    <div class="bg-surface-100 p-1" style="border-radius: 30px">
                                        <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                                            style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                            <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                                            <i class="pi pi-star-fill text-yellow-500"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-col md:items-end gap-20">
                                    <div class="flex flex-row-reverse md:flex-row gap-2">
                                        <Button :icon="item.favorite ? 'pi pi-heart-fill' : 'pi pi-heart'"
                                            :class="{ 'text-red-500': item.favorite }"
                                            @click="item.favorite = !item.favorite" outlined></Button>
                                        <Button icon="pi pi-ticket" label="Je réserve ma place"
                                            :disabled="item.inventoryStatus === 'OUTOFSTOCK'"
                                            class="flex-auto md:flex-initial whitespace-nowrap"></Button>
                                        <SplitButton label="Gérer le film" icon="pi pi-wrench"
                                            v-if="appStore.isAppAdminMode" :model="SplitButtonAdmin" />
                                    </div>
                                    <div class="flex flex-col md:flex-row gap-5">
                                        <span class="text-xl font-semibold">Enfants (+6 ans) : {{ item.price.child }}
                                            €</span>
                                        <span class="text-xl font-semibold">Étudiants : {{ item.price.student }}
                                            €</span>
                                        <span class="text-xl font-semibold">Adultes : {{ item.price.adult }} €</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <template #grid="slotProps">
                <div class="grid grid-cols-12 gap-4">
                    <div v-for="(item, index) in slotProps.items" :key="index"
                        class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-6 p-2">
                        <div
                            class="p-12 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col h-full justify-between">
                            <div class="bg-surface-50 flex justify-center rounded p-6 h-1/2">
                                <img class="rounded w-auto md:h-40" :src="item.image" :alt="item.nom" />
                            </div>
                            <div class="h-1/2 flex flex-col justify-around">
                                <div class="flex flex-col md:flex-row justify-between items-start gap-2">
                                    <div>
                                        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{
                                            item.genre }}</span>
                                        <div class="text-lg font-medium mt-1">{{ item.nom }} ({{ item.annee }})</div>
                                        <div class="text-lg font-medium mt-1">Réalisateur : {{ item.realisateur }}</div>
                                        <div class="text-lg font-thin text-surface-400 mt-1">{{ item.duree }}</div>
                                    </div>
                                    <div class="bg-surface-100 p-1" style="border-radius: 30px">
                                        <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                                            style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                            <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                                            <i class="pi pi-star-fill text-yellow-500"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-col gap-12 mt-12">
                                    <div class="flex flex-col md:flex-row justify-around">
                                        <span class="text-2xl font-semibold">Enfants (+6 ans) : {{ item.price.child }}
                                            €</span>
                                        <span class="text-2xl font-semibold">Étudiants : {{ item.price.student }}
                                            €</span>
                                        <span class="text-2xl font-semibold">Adultes : {{ item.price.adult }} €</span>
                                    </div>
                                    <div class="flex gap-2">
                                        <Button icon="pi pi-ticket" label="Je réserve ma place"
                                            :disabled="item.inventoryStatus === 'OUTOFSTOCK'"
                                            class="flex-auto whitespace-nowrap"></Button>
                                        <Button :icon="item.favorite ? 'pi pi-heart-fill' : 'pi pi-heart'"
                                            :class="{ 'text-red-500': item.favorite }"
                                            @click="item.favorite = !item.favorite" outlined></Button>
                                        <SplitButton label="Gérer le film" icon="pi pi-wrench"
                                            v-if="appStore.isAppAdminMode" :model="SplitButtonAdmin" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </DataView>
    </div>
</template>

<script setup>
import Movie from "@/services/Movie";
import { useAppStore } from "@/stores/app";
import { useToast } from "primevue";
import { ref, onBeforeMount } from "vue";

onBeforeMount(async () => {
    movie.value = Movie.getMovies()
    // const {data} = await Movie.getMoviesFromBackend()
    // if (data.member) {
    //     movie.value = data.member
    // }
});

const appStore = useAppStore()
const movie = ref();
const itemPerPage = ref(5);
const layout = ref('list');
const options = ref(['list', 'grid']);
const toast = useToast()
const SplitButtonAdmin = [
    {
        label: 'Modifier',
        icon: 'pi pi-pencil',
        command: () => {
            toast.add({ severity: 'success', summary: 'Bientôt disponible', detail: "Cette fonctionnalité deviendra une modale pour modifier un film", life: 7000 });
        }
    },
    {
        label: 'Supprimer',
        icon: 'pi pi-trash',
        command: () => {
            toast.add({ severity: 'warn', summary: 'Bientôt disponible', detail: "Cette fonctionnalité deviendra une modale pour supprimer un film", life: 7000 });
        }
    },
];

</script>
