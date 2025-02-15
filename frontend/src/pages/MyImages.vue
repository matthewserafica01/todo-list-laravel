<template>
    <header class="bg-white shadow">
        <div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900">My Images</h1>
        </div>
    </header>
    <main>
        <div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div v-for="image in images" :key="image.id" class="overflow-hidden bg-white rounded-lg shadow">
                    <img :src="image.url" alt="Image" class="object-contain w-full h-48">
                    <div class="px-4 py-4">
                        <h3 class="text-lg font-semibold text-gray-900">{{ image.name }}</h3>
                        <p class="mb-4 text-sm text-gray-500">{{ image.label }}</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
const images = [
    { id: 1, label: 'Test', url: 'http://localhost' },
    { id: 2, label: 'Test', url: 'http://localhost' },
    { id: 3, label: 'Test', url: 'http://localhost' },
];
</script>