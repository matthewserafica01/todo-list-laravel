<template>
    <GuestLayout>
        <h2 class="mt-10 font-bold tracking-tight text-center text-gray-900 text-2xl/9">Create new account</h2>
        <pre>{{ data }}</pre>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form @submit.prevent="submit" class="space-y-6">
                <div>
                    <label for="email" class="block font-medium text-gray-900 text-sm/6">Full Name</label>
                    <div class="mt-2">
                        <input name="name" id="name" required="" v-model="data.name"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

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
                    </div>
                    <div class="mt-2">
                        <input type="password" name="password" id="password" required="" v-model="data.password"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="cPassword" class="block font-medium text-gray-900 text-sm/6">Confirm
                            Password</label>
                    </div>
                    <div class="mt-2">
                        <input type="password" name="cPassword" id="cPassword" required=""
                            v-model="data.password_confirmation"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Create an account
                    </button>
                </div>
            </form>

            <p class="mt-10 text-center text-gray-500 text-sm/6">
                Already have an account?
                {{ ' ' }}
                <RouterLink :to="{ name: 'Login' }" class="font-semibold text-indigo-600 hover:text-indigo-500">
                    Login from here
                </RouterLink>
            </p>
        </div>
    </GuestLayout>
</template>

<script setup>
import { ref } from 'vue';
import axiosClient from '../axios';
import GuestLayout from '../components/GuestLayout.vue';

const data = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

function submit() {
    axiosClient.get("/sanctum/csrf-cookie")
        .then(response => {
            axiosClient.post("/register", data.value, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        })
        .catch(error => {
            console.error(error.response.data);
        });
}
</script>