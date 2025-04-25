<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import StatusHeader from './StatusHeader.vue';
import StatusCard from './StatusCard.vue';
import DeviceInfo from './DeviceInfo.vue';
import { useNetworkStore } from '../stores/networkStore';

const networkStore = useNetworkStore();
const isLoading = ref(true);
const refreshing = ref(false);

onMounted(async () => {
  await fetchNetworkData();
});

async function fetchNetworkData() {
  try {
    isLoading.value = true;
    await networkStore.fetchNetworkData();
  } catch (error) {
    console.error('Error fetching network data:', error);
  } finally {
    isLoading.value = false;
  }
}

async function refreshData() {
  refreshing.value = true;
  await fetchNetworkData();
  setTimeout(() => {
    refreshing.value = false;
  }, 1000);
}

const networkStatus = computed(() => {
  return networkStore.isOnline ? 'Connected' : 'Offline';
});

const statusColor = computed(() => {
  return networkStore.isOnline ? 'success' : 'error';
});
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <StatusHeader 
      :status="networkStatus" 
      :status-color="statusColor" 
      :refreshing="refreshing" 
      @refresh="refreshData" 
    />
    
    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <StatusCard 
        title="IP Address" 
        :value="networkStore.ipAddress" 
        icon="globe" 
        :loading="isLoading" 
        copyable
      />
      <StatusCard 
        title="Subnet Mask" 
        :value="networkStore.subnetMask" 
        icon="server" 
        :loading="isLoading" 
        copyable
      />
      <StatusCard 
        title="Gateway" 
        :value="networkStore.gateway" 
        icon="router" 
        :loading="isLoading" 
        copyable
      />
      <StatusCard 
        title="DNS Servers" 
        :value="networkStore.dnsServers" 
        icon="dns" 
        :loading="isLoading" 
        copyable
      />
      <StatusCard 
        title="Uptime" 
        :value="networkStore.uptime" 
        icon="clock" 
        :loading="isLoading"
        class="md:col-span-2"
      />
    </div>

    <DeviceInfo class="mt-8" :loading="isLoading" />
  </div>
</template>