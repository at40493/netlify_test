<script setup lang="ts">
defineProps<{
  status: string;
  statusColor: string;
  refreshing: boolean;
}>();

const emit = defineEmits(['refresh']);

function handleRefresh() {
  emit('refresh');
}
</script>

<template>
  <header class="animate-fade-in">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-3xl font-semibold tracking-tight">
          Device Status
        </h1>
        <div class="flex items-center mt-2">
          <div 
            :class="`w-3 h-3 rounded-full mr-2 ${
              statusColor === 'success' ? 'bg-success-400' : 'bg-error-500'
            } ${refreshing ? 'animate-pulse' : ''}`"
          ></div>
          <span class="text-sm font-medium text-neutral-600 dark:text-neutral-300">
            Status: {{ status }}
          </span>
        </div>
      </div>
      
      <button 
        @click="handleRefresh"
        :disabled="refreshing"
        class="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg flex items-center gap-2 transition-colors duration-200 disabled:opacity-70"
      >
        <span v-if="refreshing">Refreshing...</span>
        <span v-else>Refresh</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-4 w-4" 
          :class="{ 'animate-spin': refreshing }"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
          />
        </svg>
      </button>
    </div>
    
    <div class="mt-4 p-4 bg-primary-50 dark:bg-neutral-800 rounded-lg border border-primary-100 dark:border-neutral-700">
      <p class="text-sm text-neutral-700 dark:text-neutral-300">
        View and manage your device's network information. This page displays real-time data about your network configuration and status.
      </p>
    </div>
  </header>
</template>