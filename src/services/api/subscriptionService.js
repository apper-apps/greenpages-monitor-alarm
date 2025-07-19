import mockSubscriptions from "@/services/mockData/subscriptions.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let subscriptions = [...mockSubscriptions];

export const getSellerSubscription = async (sellerId) => {
  await delay(200);
  const subscription = subscriptions.find(s => s.sellerId === sellerId);
  if (!subscription) {
    return {
      sellerId,
      status: "expired",
      plan: "none",
      daysRemaining: 0
    };
  }
  return { ...subscription };
};

export const updateSubscription = async (sellerId, subscriptionData) => {
  await delay(300);
  
  const index = subscriptions.findIndex(s => s.sellerId === sellerId);
  if (index === -1) {
    const newSubscription = {
      Id: Math.max(...subscriptions.map(s => s.Id)) + 1,
      sellerId,
      ...subscriptionData,
      updatedAt: new Date().toISOString()
    };
    subscriptions.push(newSubscription);
    return { ...newSubscription };
  }
  
  subscriptions[index] = {
    ...subscriptions[index],
    ...subscriptionData,
    updatedAt: new Date().toISOString()
  };
  
  return { ...subscriptions[index] };
};