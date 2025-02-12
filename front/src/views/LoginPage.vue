<template>
    <div class="flex min-h-screen">
        <div class="bg-surface-0 dark:bg-surface-950 flex flex-col justify-around w-full md:w-6/12 p-12">
            <section>
                <div class="flex justify-center">
                    <img src="https://cdn.cookielaw.org/logos/09f2ba89-076e-413b-b34f-a8d20370f3f5/35c98a5f-cba8-4b1a-959f-c5a7c260dfda/e0191cfb-2e2a-43c1-a11f-929eb86731a0/logo.png"
                        alt="Image" height="150" class="mb-4" />
                </div>
                <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium">Bienvenue</div>
                <span class="text-surface-600 dark:text-surface-200 font-medium mr-2">Pas de compte ?</span>
                <a class="font-medium no-underline text-blue-500 cursor-pointer"
                    @click="router.push('/login/create')">Créer mon compte !</a>
            </section>
            <Form v-slot="$form" :initialValues :resolver @submit="login" class="flex flex-col gap-6 w-full">
                <div class="w-full flex flex-col gap-8">
                    <div class="flex flex-col gap-1 w-full">
                        <FloatLabel class="w-full">
                            <InputText fluid name="username" :disabled="loading" v-model="initialValues.username" />
                            <label for="username">Nom d'utilisateur</label>
                        </FloatLabel>
                        <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{
                            $form.username.error?.message }}</Message>
                    </div>

                    <div class="flex flex-col gap-1">
                        <FloatLabel class="w-full">
                            <Password fluid input-id="password" name="password" :feedback="false" :disabled="loading"
                                toggle-mask x v-model="initialValues.password" />
                            <label for="password">Mot de passe</label>
                        </FloatLabel>
                        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{
                            $form.password.error?.message }}</Message>
                    </div>

                    <div class="flex items-center justify-between mb-12">
                        <div class="flex items-center">
                            <Checkbox id="remember" binary class="mr-2" v-model="initialValues.remember"></Checkbox>
                            <label for="remember">Se souvenir de moi</label>
                        </div>
                        <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Mot de passe
                            oublié
                            ?</a>
                    </div>

                    <Button label="Se connecter" icon="pi pi-user" class="w-full p-2" :loading="loading"
                        type="submit"></Button>
                </div>
            </Form>
        </div>
        <div class="hidden md:block w-6/12 bg-no-repeat bg-cover"
            style="background-image: url('https://lcrarchitectes.fr/media/pages/projets/campus-numerique-ynov-montpellier/b5c7e974c0-1719480923/svs4yn5c7gmeo0r_ynov_pers-parvis-1440x-q93.jpg')">
        </div>
    </div>
</template>

<script setup>
import Auth from '@/services/Auth';
import { reactive, ref } from 'vue';
import { useRouter } from "vue-router"
import { zodResolver } from "@primevue/forms/resolvers/zod"
import { z } from 'zod';
import { useUserStore } from '@/stores/user';
import { useToast } from 'primevue';

const router = useRouter()
const userStore = useUserStore()
const toast = useToast()

const initialValues = reactive({
    username: "",
    password: "",
    remember: false
});

const loading = ref(false)

const resolver = ref(
    zodResolver(
        z.object(
            {
                username: z.string().min(3, { message: 'Minimum 3 caractères.' }),
                password: z.string(),
                remember: z.boolean().optional()
            }
        )
    )
)

const login = async ({ valid }) => {
    loading.value = true

    if (valid) {
        const { data } = await Auth.verifyCredentials({ email: initialValues.email, password: initialValues.password })

        if (data.token) {
            userStore.setUser({token: data.token, tkExpireDate: data.expiresIn, username: initialValues.username})
            router.push("/home")
        } else {
            toast.add({
                life: 5000,
                severity: "warn",
                summary: "Une erreur est survenue",
                detail: "Votre mot de passe ou nom d'utilisateur semble incorrect"
            })
        }
    }

    loading.value = false
}
</script>