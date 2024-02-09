<script setup lang="ts">
import { z } from 'zod';
import { toFormValidator } from '@vee-validate/zod';
import { useField, useForm } from 'vee-validate';
import type { UserForm } from '@/shared/interfaces';
import { createUser } from '@/shared/services/user.service';
import { useRouter } from 'vue-router';

const router = useRouter();

const validationSchema = toFormValidator(z.object({
    name: z.string({ required_error: 'Vous devez renseigner ce champ' }).min(2, 'Trop court'),
    email: z.string({ required_error: 'Vous devez renseigner ce champ' }).email('Format email incorrect'),
    password: z.string({ required_error: 'Vous devez renseigner ce champ' }).min(5, 'Le mot de passe doit faire au moins 5 caractères'),
}));

const { handleSubmit, setErrors } = useForm({
    validationSchema
});

const submit = handleSubmit(async (formValue: UserForm) => {
    try {
        await createUser(formValue);
        router.push('/connexion');
    } catch (e) {
        console.log(e);
    }
})

const { value: nameValue, errorMessage: nameError } = useField('name');
const { value: emailValue, errorMessage: emailError } = useField('email');
const { value: passwordValue, errorMessage: passwordError } = useField('password');

</script> 

<template>
    <div class="container d-flex flex-row p-20 justify-content-center align-items-start">
        <form @submit="submit" class="card">
            <h2 class="mb-20">Inscription</h2>
            <div class="d-flex flex-column mb-10">
                <label for="name" class="mb-5">Nom*</label>
                <input v-model="nameValue" id="name" type="text">
                <p v-if="nameError" class="form-error">{{ nameError }}</p>
            </div>
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
                <button class="btn btn-primary">Inscription</button>
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