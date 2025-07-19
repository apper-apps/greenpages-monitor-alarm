import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import { useUser } from '@/context/UserContext';
import userService from '@/services/api/userService';
import membershipService from '@/services/api/membershipService';
import { toast } from 'react-toastify';
import { cn } from '@/utils/cn';

const UserManagement = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterMembership, setFilterMembership] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Check if user is admin
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    
    loadData();
  }, [user, navigate]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [usersData, statsData] = await Promise.all([
        userService.getAll(),
        membershipService.getMembershipStats()
      ]);
      
      setUsers(usersData);
      setStats(statsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || u.role === filterRole;
    const matchesMembership = filterMembership === 'all' || u.membershipTier === filterMembership;
    
    return matchesSearch && matchesRole && matchesMembership;
  });

  const handleEditUser = (userToEdit) => {
    setSelectedUser({ ...userToEdit });
    setShowEditModal(true);
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;
    
    setIsUpdating(true);
    try {
      const updatedUser = await userService.update(selectedUser.Id, {
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        role: selectedUser.role,
        membershipTier: selectedUser.membershipTier,
        isActive: selectedUser.isActive
      });
      
      setUsers(prev => prev.map(u => u.Id === updatedUser.Id ? updatedUser : u));
      setShowEditModal(false);
      toast.success('User updated successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to update user');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }
    
    try {
      await userService.delete(userId);
      setUsers(prev => prev.filter(u => u.Id !== userId));
      toast.success('User deleted successfully!');
      await loadData(); // Refresh stats
    } catch (err) {
      toast.error(err.message || 'Failed to delete user');
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'red';
      case 'seller': return 'forest-green';
      default: return 'gray';
    }
  };

  const getMembershipBadgeColor = (tier) => {
    switch (tier) {
      case 'Premium': return 'exotic-gold';
      case 'Pro': return 'forest-green';
      default: return 'gray';
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="text-center p-8">
          <ApperIcon name="Shield" className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-display font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">You need admin privileges to access this page.</p>
          <Button onClick={() => navigate('/')}>Go to Home</Button>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600">Manage users, roles, and memberships</p>
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

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <ApperIcon name="Users" className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalMembers}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-forest-green to-medium-green rounded-lg flex items-center justify-center">
                    <ApperIcon name="UserCheck" className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeMembers}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                    <ApperIcon name="Crown" className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Premium Members</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.tierDistribution.Premium || 0}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <ApperIcon name="Star" className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pro Members</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.tierDistribution.Pro || 0}</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Filters */}
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="seller">Seller</option>
                <option value="user">User</option>
              </Select>
              <Select
                value={filterMembership}
                onChange={(e) => setFilterMembership(e.target.value)}
              >
                <option value="all">All Memberships</option>
                <option value="Basic">Basic</option>
                <option value="Pro">Pro</option>
                <option value="Premium">Premium</option>
              </Select>
            </div>
          </Card>

          {/* Users Table */}
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Membership
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((userItem) => (
                    <tr key={userItem.Id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-forest-green to-leaf-green rounded-full flex items-center justify-center">
                            <ApperIcon name="User" className="w-5 h-5 text-white" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {userItem.firstName} {userItem.lastName}
                            </div>
                            <div className="text-sm text-gray-500">{userItem.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge color={getRoleBadgeColor(userItem.role)} size="sm">
                          {userItem.role}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge color={getMembershipBadgeColor(userItem.membershipTier)} size="sm">
                          {userItem.membershipTier}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge color={userItem.isActive ? 'forest-green' : 'red'} size="sm">
                          {userItem.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(userItem.joinDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditUser(userItem)}
                          >
                            <ApperIcon name="Edit" className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteUser(userItem.Id)}
                            className="text-red-600 hover:text-red-700 hover:border-red-300"
                          >
                            <ApperIcon name="Trash2" className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <ApperIcon name="Users" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No users found matching your criteria.</p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Edit User Modal */}
        {showEditModal && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowEditModal(false)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-display font-bold text-gray-900">Edit User</h3>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <ApperIcon name="X" className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="First Name"
                      value={selectedUser.firstName}
                      onChange={(e) => setSelectedUser(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                    <Input
                      placeholder="Last Name"
                      value={selectedUser.lastName}
                      onChange={(e) => setSelectedUser(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                  
                  <Select
                    value={selectedUser.role}
                    onChange={(e) => setSelectedUser(prev => ({ ...prev, role: e.target.value }))}
                  >
                    <option value="user">User</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                  </Select>
                  
                  <Select
                    value={selectedUser.membershipTier}
                    onChange={(e) => setSelectedUser(prev => ({ ...prev, membershipTier: e.target.value }))}
                  >
                    <option value="Basic">Basic</option>
                    <option value="Pro">Pro</option>
                    <option value="Premium">Premium</option>
                  </Select>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedUser.isActive}
                      onChange={(e) => setSelectedUser(prev => ({ ...prev, isActive: e.target.checked }))}
                      className="rounded border-gray-300 text-forest-green focus:ring-forest-green"
                    />
                    <span className="ml-2 text-sm text-gray-700">Active User</span>
                  </label>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleUpdateUser}
                    disabled={isUpdating}
                  >
                    {isUpdating ? 'Updating...' : 'Update User'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;