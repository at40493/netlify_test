import { ref, readonly } from 'vue';

// Simulate network data
function generateMockNetworkData() {
  const ipBlocks = [];
  for (let i = 0; i < 4; i++) {
    ipBlocks.push(Math.floor(Math.random() * 256));
  }
  
  const ip = ipBlocks.join('.');
  const subnet = "255.255.255.0";
  const gateway = `${ipBlocks[0]}.${ipBlocks[1]}.${ipBlocks[2]}.1`;
  const dnsServers = "8.8.8.8, 8.8.4.4";
  
  // Generate random uptime
  const days = Math.floor(Math.random() * 30);
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  const uptime = `${days} days, ${hours} hours, ${minutes} minutes`;
  
  // Additional connection details
  const connectionTypes = ['Wi-Fi', 'Ethernet', 'Cellular'];
  const connectionType = connectionTypes[Math.floor(Math.random() * connectionTypes.length)];
  
  const speeds = ['10 Mbps', '100 Mbps', '1 Gbps', '2.4 Gbps'];
  const connectionSpeed = speeds[Math.floor(Math.random() * speeds.length)];
  
  const signalStrength = Math.floor(Math.random() * 100);
  
  const now = new Date();
  const lastUpdated = now.toLocaleString();
  
  return {
    ipAddress: ip,
    subnetMask: subnet,
    gateway,
    dnsServers,
    uptime,
    isOnline: Math.random() > 0.1, // 90% chance of being online
    connectionType,
    connectionSpeed,
    signalStrength,
    lastUpdated,
  };
}

// Create a store for network information
export function useNetworkStore() {
  // State
  const ipAddress = ref('');
  const subnetMask = ref('');
  const gateway = ref('');
  const dnsServers = ref('');
  const uptime = ref('');
  const isOnline = ref(true);
  const connectionType = ref('');
  const connectionSpeed = ref('');
  const signalStrength = ref(0);
  const lastUpdated = ref('');
  
  // Actions
  async function fetchNetworkData() {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // In a real app, this would be an API call to get network info
    const data = generateMockNetworkData();
    
    // Update state
    ipAddress.value = data.ipAddress;
    subnetMask.value = data.subnetMask;
    gateway.value = data.gateway;
    dnsServers.value = data.dnsServers;
    uptime.value = data.uptime;
    isOnline.value = data.isOnline;
    connectionType.value = data.connectionType;
    connectionSpeed.value = data.connectionSpeed;
    signalStrength.value = data.signalStrength;
    lastUpdated.value = data.lastUpdated;
  }
  
  return {
    // State (expose as readonly for components)
    ipAddress: readonly(ipAddress),
    subnetMask: readonly(subnetMask),
    gateway: readonly(gateway),
    dnsServers: readonly(dnsServers),
    uptime: readonly(uptime),
    isOnline: readonly(isOnline),
    connectionType: readonly(connectionType),
    connectionSpeed: readonly(connectionSpeed),
    signalStrength: readonly(signalStrength),
    lastUpdated: readonly(lastUpdated),
    
    // Actions
    fetchNetworkData,
  };
}