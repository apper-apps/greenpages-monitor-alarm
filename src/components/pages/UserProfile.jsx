import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import { useUser } from '@/context/UserContext';
import userService from '@/services/api/userService';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    preferences: {
      notifications: true,
      newsletter: true,
      marketingEmails: false
    }
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        address: user.address || '',
        preferences: {
          notifications: user.preferences?.notifications || true,
          newsletter: user.preferences?.newsletter || true,
          marketingEmails: user.preferences?.marketingEmails || false
        }
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('preferences.')) {
      const prefKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefKey]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateProfile = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!validateProfile()) return;
    
    setIsLoading(true);
    try {
      const updatedUser = await userService.updateProfile(user.Id, formData);
      updateUser(updatedUser);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;
    
    setIsLoading(true);
    try {
      await userService.changePassword(user.Id, passwordData);
      setShowPasswordForm(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      toast.success('Password changed successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  const getMembershipColor = (tier) => {
    switch (tier) {
      case 'Premium': return 'exotic-gold';
      case 'Pro': return 'forest-green';
      default: return 'gray';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="text-center p-8">
          <ApperIcon name="User" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-display font-bold text-gray-900 mb-2">Please Log In</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to view your profile.</p>
          <Button onClick={() => navigate('/')}>Go to Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900">Profile Settings</h1>
              <p className="text-gray-600">Manage your account settings and preferences</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="flex items-center"
            >
              <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>

          {/* Profile Overview */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-forest-green to-leaf-green rounded-full flex items-center justify-center">
                  <ApperIcon name="User" className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-gray-900">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge color={getMembershipColor(user.membershipTier)}>
                      {user.membershipTier} Member
                    </Badge>
                    <span className="text-sm text-gray-500">
                      Joined {new Date(user.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/membership')}
                >
                  <ApperIcon name="Crown" className="w-4 h-4 mr-1" />
                  Upgrade
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                >
                  <ApperIcon name="Key" className="w-4 h-4 mr-1" />
                  Password
                </Button>
              </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleProfileSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    error={errors.firstName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    error={errors.lastName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    value={user.email}
                    disabled={true}
                    className="bg-gray-50"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="123 Main St, City, State, ZIP"
                  />
                </div>
              </div>

              {/* Preferences */}
              <div className="mt-8">
                <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
                  Notification Preferences
                </h3>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="preferences.notifications"
                      checked={formData.preferences.notifications}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="rounded border-gray-300 text-forest-green focus:ring-forest-green"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Email notifications for strain updates and messages
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="preferences.newsletter"
                      checked={formData.preferences.newsletter}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="rounded border-gray-300 text-forest-green focus:ring-forest-green"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Weekly newsletter with market trends and new listings
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="preferences.marketingEmails"
                      checked={formData.preferences.marketingEmails}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="rounded border-gray-300 text-forest-green focus:ring-forest-green"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Marketing emails about promotions and special offers
                    </span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                {isEditing ? (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </>
                ) : (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => setIsEditing(true)}
                  >
                    <ApperIcon name="Edit" className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </form>
          </Card>

          {/* Password Change Form */}
          {showPasswordForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
                  Change Password
                </h3>
                <form onSubmit={handlePasswordSubmit}>
                  <div className="space-y-4">
                    <Input
                      name="currentPassword"
                      type="password"
                      placeholder="Current Password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      error={errors.currentPassword}
                    />
                    <Input
                      name="newPassword"
                      type="password"
                      placeholder="New Password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      error={errors.newPassword}
                    />
                    <Input
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm New Password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      error={errors.confirmPassword}
                    />
                  </div>
                  <div className="flex justify-end space-x-3 mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowPasswordForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Updating...' : 'Update Password'}
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;