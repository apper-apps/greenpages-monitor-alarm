import mockMemberships from '@/services/mockData/memberships.json';
import userService from './userService';

const membershipService = {
  async getAllTiers() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...mockMemberships];
  },

  async getTierById(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const tierId = parseInt(id);
    if (isNaN(tierId)) {
      throw new Error('Invalid tier ID');
    }
    
    const tier = mockMemberships.find(t => t.Id === tierId);
    if (!tier) {
      throw new Error('Membership tier not found');
    }
    
    return { ...tier };
  },

  async getUserMembership(userId) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const user = await userService.getById(userId);
    const tier = mockMemberships.find(t => t.name === user.membershipTier);
    
    return {
      user: user,
      currentTier: tier,
      joinDate: user.joinDate,
      canUpgrade: tier && tier.name !== 'Premium'
    };
  },

  async upgradeMembership(userId, targetTierName) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const targetTier = mockMemberships.find(t => t.name === targetTierName);
    if (!targetTier) {
      throw new Error('Invalid membership tier');
    }
    
    // Update user's membership tier
    const updatedUser = await userService.update(userId, {
      membershipTier: targetTierName
    });
    
    return {
      user: updatedUser,
      newTier: targetTier,
      message: `Successfully upgraded to ${targetTierName} membership!`
    };
  },

  async getMembershipStats() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const users = await userService.getAll();
    const stats = {};
    
    mockMemberships.forEach(tier => {
      stats[tier.name] = users.filter(user => user.membershipTier === tier.name).length;
    });
    
    return {
      totalMembers: users.length,
      tierDistribution: stats,
      activeMembers: users.filter(user => user.isActive).length
    };
  },

  async processPayment(userId, tierName, paymentDetails) {
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In real app, would integrate with payment processor
    // For demo, just simulate success
    if (Math.random() > 0.1) { // 90% success rate
      return {
        success: true,
        transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        amount: mockMemberships.find(t => t.name === tierName)?.price || 0,
        currency: 'USD',
        timestamp: new Date().toISOString()
      };
    } else {
      throw new Error('Payment processing failed. Please try again.');
    }
  }
};

export default membershipService;