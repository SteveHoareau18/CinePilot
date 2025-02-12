<template>
    <div class="flex min-h-screen">
        <div class="bg-surface-0 dark:bg-surface-950 col-span-12 lg:col-span-10 w-full md:w-6/12 p-12">
            <section>
                <div class="flex justify-center">
                    <img src="https://cdn.cookielaw.org/logos/09f2ba89-076e-413b-b34f-a8d20370f3f5/35c98a5f-cba8-4b1a-959f-c5a7c260dfda/e0191cfb-2e2a-43c1-a11f-929eb86731a0/logo.png"
                        alt="Image" height="150" class="mb-4" />
                </div>
                <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium">Bienvenue</div>
                <span class="text-surface-600 dark:text-surface-200 font-medium mr-2">Déjà un compte ?</span>
                <a class="font-medium no-underline text-blue-500 cursor-pointer" @click="router.push('/login')">Je me connecte !</a>
            </section>
            <Form v-slot="$form" :initialValues :resolver @submit="login" class="grid grid-cols-12 col-span-12 lg:col-span-10 gap-8 w-full pt-8">
                <div class="col-span-12 lg:col-span-6">
                    <FloatLabel>
                        <InputText fluid name="firstname" :disabled="loading" v-model="initialValues.firstname" />
                        <label for="firstname">Prénom</label>
                    </FloatLabel>
                    <Message v-if="$form.firstname?.invalid" severity="error" size="small" variant="simple">{{
                        $form.firstname.error?.message }}</Message>
                </div>
                <div class="col-span-12 lg:col-span-6">
                    <FloatLabel>
                        <InputText fluid name="lastname" :disabled="loading" v-model="initialValues.lastname" />
                        <label for="lastname">Nom</label>
                    </FloatLabel>
                    <Message v-if="$form.lastname?.invalid" severity="error" size="small" variant="simple">{{
                        $form.lastname.error?.message }}</Message>
                </div>
                <div class="col-span-12 lg:col-span-6">
                    <FloatLabel>
                        <InputText fluid name="username" :disabled="loading" v-model="initialValues.username" />
                        <label for="username">Nom d'utilisateur</label>
                    </FloatLabel>
                    <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{
                        $form.username.error?.message }}</Message>
                </div>
                <div class="col-span-12 lg:col-span-6">
                    <FloatLabel>
                        <InputText fluid name="email" :disabled="loading" v-model="initialValues.email" />
                        <label for="email">Adresse email</label>
                    </FloatLabel>
                    <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{
                        $form.email.error?.message }}</Message>
                </div>
                <div class="col-span-12 lg:col-span-6">
                    <FloatLabel>
                        <Password fluid name="password" :disabled="loading" v-model="initialValues.password" toggleMask />
                        <label for="password">Mot de passe</label>
                    </FloatLabel>
                    <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{
                        $form.password.error?.message }}</Message>
                </div>
                <div class="col-span-12 lg:col-span-6">
                    <FloatLabel>
                        <Password :feedback="false" fluid name="passwordConfirm" :disabled="loading" toggleMask
                            v-model="initialValues.passwordConfirm" />
                        <label for="passwordConfirm">Confirmer votre mot de passe</label>
                    </FloatLabel>
                    <Message v-if="$form.passwordConfirm?.invalid" severity="error" size="small" variant="simple">{{
                        $form.passwordConfirm.error?.message }}</Message>
                </div>

                <Button label="Créer mon compte" icon="pi pi-user" class="col-span-full py-2" :loading="loading"
                    type="submit"></Button>
            </Form>
        </div>
        <div class="hidden md:block w-6/12 bg-no-repeat bg-cover"
            style="background-image: url('https://lcrarchitectes.fr/media/pages/projets/campus-numerique-ynov-montpellier/b5c7e974c0-1719480923/svs4yn5c7gmeo0r_ynov_pers-parvis-1440x-q93.jpg')">
        </div>
    </div>
</template>

<script setup>
import Auth from '@/services/Auth';
import { zodResolver } from "@primevue/forms/resolvers/zod"
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { z } from 'zod';

const router = useRouter()

const initialValues = reactive({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
});

const resolver = ref(zodResolver(
    z.object({
        firstname: z.string().min(1, "Votre prénom doit comporter plus d'un caractère").refine((val) => val.trim().length > 1),
        lastname: z.string().min(1, "Votre nom doit comporter plus d'un caractère").refine((val) => val.trim().length > 1),
        email: z.string().email("Votre email semble incorrect, vérifiez votre saisie"),
        password: z
            .string()
            .min(12, { message: 'Minimum 12 caractères.' })
            .refine((value) => /[a-z]/.test(value), {
                message: 'Au moins une lettre minuscule'
            })
            .refine((value) => /[A-Z]/.test(value), {
                message: 'Au moins une lettre majuscule.'
            })
            .refine((value) => /d/.test(value), {
                message: 'Au moins un chiffre.'
            }),
        passwordConfirm: z.string(),
        username: z.string().min(3, { message: 'Minimum 3 caractères.' })
    }).refine((value) => value.password == value.passwordConfirm, {
        message: "Les mots de passe ne correspondent pas",
        path: ["passwordConfirm"],
    })
))

const loading = ref(false)

const login = async ({ valid }) => {
    loading.value = true

    if (valid) {
        const {data} = await Auth.createUser(
            {
                fullName: `${initialValues.lastname.toUpperCase()} ${initialValues.firstname}`,
                username: initialValues.username,
                email: initialValues.email,
                password: initialValues.password
            }
        )
        console.log(data);
    }

    loading.value = false
}
</script>