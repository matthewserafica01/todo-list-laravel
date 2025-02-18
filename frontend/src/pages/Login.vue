<template>
    <GuestLayout>
        <h2 class="mt-10 font-bold tracking-tight text-center text-gray-900 text-2xl/9">Sign in to your account</h2>

        <div class="flex flex-col items-center justify-center flex-1">
            <div v-if="errorMessage" class="px-3 py-2 mt-4 text-center text-white bg-red-400 rounded lg:w-1/4 sm:w-1/2">
                {{ errorMessage }}
            </div>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form @submit.prevent="submit" class="space-y-6">
                <div>
                    <label for="email" class="block font-medium text-gray-900 text-sm/6">Email address</label>
                    <div class="mt-2">
                        <input type="email" name="email" id="email" autocomplete="email" required=""
                            v-model="data.email"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block font-medium text-gray-900 text-sm/6">Password</label>
                        <div class="text-sm">
                            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                        </div>
                    </div>
                    <div class="mt-2">
                        <input type="password" name="password" id="password" autocomplete="current-password" required=""
                            v-model="data.password"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                        in</button>
                </div>
            </form>

            <p class="mt-10 text-center text-gray-500 text-sm/6">
                Not a member?
                {{ ' ' }}
                <RouterLink :to="{ name: 'Signup' }" class="font-semibold text-indigo-600 hover:text-indigo-500">
                    Create an account
                </RouterLink>
            </p>
        </div>
    </GuestLayout>
</template>

<script setup>
import { ref } from 'vue';
import GuestLayout from '../components/GuestLayout.vue';
import axiosClient from '../axios';
import router from '../router';

const data = ref({
    email: '',
    password: '',
});

const errorMessage = ref('')

function submit() {
    axiosClient.get('/sanctum/csrf-cookie')
        .then(response => {
            axiosClient.post("/login", data.value, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    router.push({ name: 'Home' });
                })
                .catch(error => {
                    console.log(error.response)
                    errorMessage.value = error.response.data.message;
                });
        });
}
</script>