import mockUsers from '@/services/mockData/users.json';

const userService = {
  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return users without passwords
    return mockUsers.map(({ password, ...user }) => user);
  },

  async getById(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Validate id is integer
    const userId = parseInt(id);
    if (isNaN(userId)) {
      throw new Error('Invalid user ID');
    }
    
    const user = mockUsers.find(u => u.Id === userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  async create(userData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Auto-generate integer Id
    const newId = Math.max(...mockUsers.map(u => u.Id)) + 1;
    
    const newUser = {
      Id: newId,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: userData.password || 'defaultpass',
      role: userData.role || 'user',
      membershipTier: userData.membershipTier || 'Basic',
      joinDate: new Date().toISOString().split('T')[0],
      isActive: userData.isActive !== undefined ? userData.isActive : true,
      avatar: userData.avatar || null,
      phone: userData.phone || '',
      address: userData.address || '',
      preferences: userData.preferences || {
        notifications: true,
        newsletter: true,
        marketingEmails: false
      }
    };
    
    mockUsers.push(newUser);
    
    // Return user without password
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  async update(id, userData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Validate id is integer
    const userId = parseInt(id);
    if (isNaN(userId)) {
      throw new Error('Invalid user ID');
    }
    
    const userIndex = mockUsers.findIndex(u => u.Id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    // Update user data (prevent Id changes)
    const updatedUser = {
      ...mockUsers[userIndex],
      ...userData,
      Id: userId // Ensure Id cannot be changed
    };
    
    mockUsers[userIndex] = updatedUser;
    
    // Return user without password
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  },

  async delete(id) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Validate id is integer
    const userId = parseInt(id);
    if (isNaN(userId)) {
      throw new Error('Invalid user ID');
    }
    
    const userIndex = mockUsers.findIndex(u => u.Id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    mockUsers.splice(userIndex, 1);
    return { message: 'User deleted successfully' };
  },

  async updateProfile(id, profileData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Use the update method but only allow profile fields
    const allowedFields = ['firstName', 'lastName', 'phone', 'address', 'avatar', 'preferences'];
    const filteredData = {};
    
    allowedFields.forEach(field => {
      if (profileData[field] !== undefined) {
        filteredData[field] = profileData[field];
      }
    });
    
    return this.update(id, filteredData);
  },

  async changePassword(id, passwordData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const userId = parseInt(id);
    if (isNaN(userId)) {
      throw new Error('Invalid user ID');
    }
    
    const user = mockUsers.find(u => u.Id === userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Check current password
    if (user.password !== passwordData.currentPassword) {
      throw new Error('Current password is incorrect');
    }
    
    // Update password
    user.password = passwordData.newPassword;
    
    return { message: 'Password updated successfully' };
  }
};

export default userService;