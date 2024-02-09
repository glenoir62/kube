<script setup lang="ts">
import { z } from 'zod';
import { toFormValidator } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';
import type { LoginForm } from '@/shared/interfaces';
import { useRouter } from 'vue-router';
import { useUser } from '@/shared/stores';

const router = useRouter();
const userStore = useUser();

const validationSchema = toFormValidator(z.object({
    email: z.string({ required_error: 'Vous devez renseigner ce champ' }).email('Format email incorrect'),
    password: z.string({ required_error: 'Vous devez renseigner ce champ' }).min(5, 'Le mot de passe doit faire au moins 5 caractères'),
}));

const { handleSubmit, setErrors } = useForm<{ email: string, password: string }>({
    validationSchema,
});

const submit = handleSubmit(async (formValue: LoginForm) => {
    try {
        await userStore.login(formValue);
        router.push('/profil');
    } catch (e) {
        setErrors({ password: e as string })
    }
})

const { value: emailValue, errorMessage: emailError } = useField('email');
const { value: passwordValue, errorMessage: passwordError } = useField('password');

</script> 

<template>
    <div class="container d-flex flex-row p-20 justify-content-center align-items-start">
        <form @submit="submit" class="card">
            <h2 class="mb-20">Connexion</h2>
            <div class="d-flex flex-column mb-10">
                <label for="email" class="mb-5">Email*</label>
                <input v-model="emailValue" id="email" type="text">
                <p v-if="emailError" class="form-error">{{ emailError }} </p>
            </div>
            <div class="d-flex flex-column mb-10">
                <label for="password" class="mb-5">Mot de passe</label>
                <input v-model="passwordValue" id="password" type="password">
                <p v-if="passwordError" class="form-error">{{ passwordError }}</p>
            </div>
            <div>
                <button class="btn btn-primary">Connexion</button>
            </div>
        </form>
    </div>
</template>


<style scoped lang="scss" >
.card {
    width: 100%;
    width: 500px;
    padding: 20px;
}
</style>