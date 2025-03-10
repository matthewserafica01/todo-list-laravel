<template>
    <div class="min-h-full">
        <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
            <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center">
                        <div class="shrink-0">
                            <img class="size-8"
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                alt="Your Company" />
                        </div>
                        <div class="hidden md:block">
                            <div class="flex items-baseline ml-10 space-x-4">
                                <RouterLink v-for="item in navigation" :key="item.name" :to="item.to"
                                    :class="[$route.name === item.to.name ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"
                                    :aria-current="$route.name === item.to.name ? 'page' : undefined">
                                    {{ item.name }}
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                    <div class="hidden md:block">
                        <div class="flex items-center ml-4 md:ml-6">

                            <!-- Profile dropdown -->
                            <Menu as="div" class="relative ml-3">
                                <div>
                                    <MenuButton
                                        class="relative flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span class="absolute -inset-1.5" />
                                        <span class="sr-only">Open user menu</span>
                                        <img class="rounded-full size-8" alt="" />
                                    </MenuButton>
                                </div>
                                <transition enter-active-class="transition duration-100 ease-out"
                                    enter-from-class="transform scale-95 opacity-0"
                                    enter-to-class="transform scale-100 opacity-100"
                                    leave-active-class="transition duration-75 ease-in"
                                    leave-from-class="transform scale-100 opacity-100"
                                    leave-to-class="transform scale-95 opacity-0">
                                    <MenuItems
                                        class="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none">
                                        <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                                        <a v-if="item.name !== 'Sign out'" :href="item.href"
                                            :class="[active ? 'bg-gray-100 outline-none' : '', 'block px-4 py-2 text-sm text-gray-700']">
                                            {{ item.name }}
                                        </a>
                                        <button v-else @click="logout"
                                            :class="[active ? 'bg-gray-100 outline-none w-full text-start' : '', 'block px-4 py-2 text-sm text-gray-700']">
                                            {{ item.name }}
                                        </button>
                                        </MenuItem>
                                    </MenuItems>
                                </transition>
                            </Menu>
                        </div>
                    </div>
                    <div class="flex -mr-2 md:hidden">
                        <!-- Mobile menu button -->
                        <DisclosureButton
                            class="relative inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span class="absolute -inset-0.5" />
                            <span class="sr-only">Open main menu</span>
                            <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
                            <XMarkIcon v-else class="block size-6" aria-hidden="true" />
                        </DisclosureButton>
                    </div>
                </div>
            </div>

            <DisclosurePanel class="md:hidden">
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <RouterLink v-for="item in navigation" :key="item.name" :to="item.to"
                        :class="[$route.name === item.to.name ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"
                        :aria-current="$route.name === item.to.name ? 'page' : undefined">
                        {{ item.name }}
                    </RouterLink>
                </div>
                <div class="pt-4 pb-3 border-t border-gray-700">
                    <div class="flex items-center px-5">
                        <div class="shrink-0">
                            <img class="rounded-full size-10" :src="user.imageUrl" alt="" />
                        </div>
                        <div class="ml-3">
                            <div class="font-medium text-white text-base/5">{{ user.name }}</div>
                            <div class="text-sm font-medium text-gray-400">{{ user.email }}</div>
                        </div>
                    </div>
                    <div class="px-2 mt-3 space-y-1" v-for="item in userNavigation" :key="item.name">
                        <DisclosureButton v-if="item.name !== 'Sign out'" as="a" :href="item.href"
                            class="block w-full px-3 py-2 text-base font-medium text-gray-400 rounded-md text-start hover:bg-gray-700 hover:text-white">
                            {{ item.name }}
                        </DisclosureButton>
                        <DisclosureButton v-else as="button" @click="logout"
                            class="block w-full px-3 py-2 text-base font-medium text-gray-400 rounded-md text-start hover:bg-gray-700 hover:text-white">
                            {{ item.name }}
                        </DisclosureButton>
                    </div>
                </div>
            </DisclosurePanel>
        </Disclosure>

        <RouterView />
    </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import axiosClient from '../axios';
import router from '../router';
import useUserStore from '../store/user';
import { computed } from 'vue';

const userStore = useUserStore();

const user = computed(() => userStore.user);

const navigation = [
    { name: 'Upload', to: { name: 'Home' } },
    { name: 'My Images', to: { name: 'MyImages' } },
];
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
];

function logout() {

    axiosClient.post("/logout")
        .then((response) => {
            router.push({ name: 'Login' })
        });
}
</script>