<script setup lang="ts">
import { computed } from 'vue';
import { useNetworkStore } from '../stores/networkStore';

defineProps<{
  loading: boolean;
}>();

const networkStore = useNetworkStore();

const activeConnection = computed(() => {
  return networkStore.connectionType || 'Unknown';
});

const connectionSpeed = computed(() => {
  return networkStore.connectionSpeed || 'Unknown';
});

const signalStrength = computed(() => {
  const strength = networkStore.signalStrength;
  if (!strength) return 0;
  return Math.min(100, Math.max(0, strength));
});

const signalClass = computed(() => {
  const strength = signalStrength.value;
  if (strength > 70) return 'bg-success-500';
  if (strength > 30) return 'bg-warning-500';
  return 'bg-error-500';
});
</script>

<template>
  <div class="status-card">
    <h3 class="text-lg font-medium mb-4">Connection Details</h3>
    
    <div v-if="loading">
      <div class="h-24 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"></div>
    </div>
    <div v-else class="space-y-4">
      <div class="flex flex-col sm:flex-row justify-between gap-6">
        <div>
          <p class="text-sm text-neutral-500 dark:text-neutral-400">Connection Type</p>
          <p class="text-lg font-medium">{{ activeConnection }}</p>
        </div>
        <div>
          <p class="text-sm text-neutral-500 dark:text-neutral-400">Connection Speed</p>
          <p class="text-lg font-medium">{{ connectionSpeed }}</p>
        </div>
        <div>
          <p class="text-sm text-neutral-500 dark:text-neutral-400">Signal Strength</p>
          <div class="flex items-center">
            <div class="w-32 h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
              <div 
                class="h-full transition-all duration-500" 
                :class="signalClass"
                :style="`width: ${signalStrength}%`"
              ></div>
            </div>
            <span class="ml-2 text-sm font-medium">{{ signalStrength }}%</span>
          </div>
        </div>
      </div>
      
      <div class="pt-4 border-t border-neutral-200 dark:border-neutral-700">
        <div class="flex items-center">
          <div class="w-2 h-2 rounded-full mr-2" :class="networkStore.isOnline ? 'bg-success-500' : 'bg-error-500'"></div>
          <span class="text-sm">
            {{ networkStore.isOnline ? 'Network is active and healthy' : 'Network connection issues detected' }}
          </span>
        </div>
        <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
          Last updated: {{ networkStore.lastUpdated }}
        </p>
      </div>
    </div>
  </div>
</template>