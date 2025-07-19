import mockUsers from "@/services/mockData/users.json";
// Simulate logged-in user storage
let currentUser = null;

const authService = {
  async login(credentials) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const { email, password } = credentials;
    
    // Find user by email
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Simple password check (in real app, would use proper hashing)
    if (user.password !== password) {
      throw new Error('Invalid password');
    }
    
    // Remove password from returned user data
    const { password: _, ...userWithoutPassword } = user;
    currentUser = userWithoutPassword;
    
    return userWithoutPassword;
  },

  async register(userData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const { email, password, firstName, lastName } = userData;
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      throw new Error('User already exists with this email');
}
    
    // Create new user
    const newUser = {
      Id: Math.max(...mockUsers.map(u => u.Id)) + 1,
      email,
      password,
      firstName,
      lastName,
      birthDate: '',
      state: '',
      role: 'user',
      membershipTier: 'Basic',
      joinDate: new Date().toISOString().split('T')[0],
      isActive: true,
      avatar: null,
      phone: '',
      address: '',
      preferences: {
        notifications: true,
        newsletter: true,
        marketingEmails: false
      }
    };
    
    // Add to mock data (in real app, would make API call)
    mockUsers.push(newUser);
    
    // Remove password from returned user data
    const { password: _, ...userWithoutPassword } = newUser;
    currentUser = userWithoutPassword;
    
    return userWithoutPassword;
  },

  async logout() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    currentUser = null;
  },

  async getCurrentUser() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (!currentUser) {
      throw new Error('No user logged in');
    }
    
    return currentUser;
  },

  async resetPassword(email) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      throw new Error('User not found');
    }
    
    // In real app, would send reset email
    return { message: 'Password reset email sent' };
  }
};

export default authService;