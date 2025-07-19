import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import { useUser } from '@/context/UserContext';
import membershipService from '@/services/api/membershipService';
import { toast } from 'react-toastify';
import { cn } from '@/utils/cn';

const Membership = () => {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const [tiers, setTiers] = useState([]);
  const [currentMembership, setCurrentMembership] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMembershipData();
  }, [user]);

  const loadMembershipData = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const [tiersData, membershipData] = await Promise.all([
        membershipService.getAllTiers(),
        membershipService.getUserMembership(user.Id)
      ]);
      
      setTiers(tiersData);
      setCurrentMembership(membershipData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgrade = async (tierName) => {
    if (!user || tierName === user.membershipTier) return;
    
    setIsUpgrading(true);
    setSelectedTier(tierName);
    
    try {
      // Simulate payment processing
      const tier = tiers.find(t => t.name === tierName);
      if (tier.price > 0) {
        await membershipService.processPayment(user.Id, tierName, {
          // Mock payment details
          cardNumber: '**** **** **** 1234',
          amount: tier.price
        });
      }
      
      const result = await membershipService.upgradeMembership(user.Id, tierName);
      updateUser(result.user);
      toast.success(result.message);
      await loadMembershipData();
    } catch (err) {
      toast.error(err.message || 'Upgrade failed');
    } finally {
      setIsUpgrading(false);
      setSelectedTier(null);
    }
  };

  const getTierColor = (tierName) => {
    switch (tierName) {
      case 'Premium': return 'bg-gradient-to-br from-yellow-400 to-yellow-600';
      case 'Pro': return 'bg-gradient-to-br from-forest-green to-medium-green';
      default: return 'bg-gradient-to-br from-gray-400 to-gray-600';
    }
  };

  const getTierIcon = (tierName) => {
    switch (tierName) {
      case 'Premium': return 'Crown';
      case 'Pro': return 'Star';
      default: return 'User';
    }
  };

  const canUpgrade = (tierName) => {
    if (!user || !currentMembership) return false;
    
    const currentTierIndex = tiers.findIndex(t => t.name === user.membershipTier);
    const targetTierIndex = tiers.findIndex(t => t.name === tierName);
    
    return targetTierIndex > currentTierIndex;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="text-center p-8">
          <ApperIcon name="Crown" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-display font-bold text-gray-900 mb-2">Please Log In</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to view membership options.</p>
          <Button onClick={() => navigate('/')}>Go to Home</Button>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadMembershipData} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Button 
                variant="outline" 
                onClick={() => navigate(-1)}
                className="absolute left-0"
              >
                <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-4xl font-display font-bold text-gray-900">
                Membership Plans
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your cannabis marketplace needs. 
              Upgrade anytime to unlock more features and grow your business.
            </p>
          </div>

          {/* Current Membership Status */}
          {currentMembership && (
            <Card className="p-6 bg-gradient-to-r from-forest-green to-medium-green text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center",
                    getTierColor(user.membershipTier)
                  )}>
                    <ApperIcon name={getTierIcon(user.membershipTier)} className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold">
                      Current Plan: {user.membershipTier}
                    </h3>
                    <p className="text-green-100">
                      Member since {new Date(user.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {currentMembership.canUpgrade && (
                  <Badge color="white" className="text-forest-green">
                    Upgrade Available
                  </Badge>
                )}
              </div>
            </Card>
          )}

          {/* Membership Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier) => {
              const isCurrentTier = user.membershipTier === tier.name;
              const canUpgradeToTier = canUpgrade(tier.name);
              const isUpgradingThis = selectedTier === tier.name && isUpgrading;

              return (
                <motion.div
                  key={tier.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: tier.Id * 0.1 }}
                  className={cn(
                    "relative",
                    tier.isPopular && "transform scale-105"
                  )}
                >
                  {tier.isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge color="forest-green" className="px-4 py-1 text-sm font-medium">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <Card className={cn(
                    "p-6 h-full flex flex-col",
                    isCurrentTier && "ring-2 ring-forest-green bg-forest-green/5",
                    tier.isPopular && "shadow-xl border-forest-green/20"
                  )}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        getTierColor(tier.name)
                      )}>
                        <ApperIcon name={getTierIcon(tier.name)} className="w-5 h-5 text-white" />
                      </div>
                      {isCurrentTier && (
                        <Badge color="forest-green" size="sm">Current</Badge>
                      )}
                    </div>

                    <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
                      {tier.name}
                    </h3>
                    
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-gray-900">
                        ${tier.price}
                      </span>
                      <span className="text-gray-600">/{tier.billingPeriod}</span>
                    </div>

                    <p className="text-gray-600 mb-6">
                      {tier.description}
                    </p>

                    <ul className="space-y-3 mb-8 flex-grow">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <ApperIcon name="Check" className="w-5 h-5 text-forest-green mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto">
                      {isCurrentTier ? (
                        <Button variant="outline" className="w-full" disabled>
                          Current Plan
                        </Button>
                      ) : canUpgradeToTier ? (
                        <Button
                          variant="primary"
                          className="w-full"
                          onClick={() => handleUpgrade(tier.name)}
                          disabled={isUpgrading}
                        >
                          {isUpgradingThis ? (
                            <div className="flex items-center justify-center">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              Upgrading...
                            </div>
                          ) : (
                            `Upgrade to ${tier.name}`
                          )}
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full" disabled>
                          {tier.price === 0 ? 'Downgrade Not Available' : 'Lower Tier'}
                        </Button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* FAQ Section */}
          <Card className="p-8">
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-6 text-center">
              Frequently Asked Questions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Can I change my plan anytime?</h4>
                <p className="text-gray-600 text-sm">
                  Yes, you can upgrade your plan at any time. Downgrades take effect at the end of your current billing cycle.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h4>
                <p className="text-gray-600 text-sm">
                  We accept all major credit cards, PayPal, and bank transfers for annual plans.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h4>
                <p className="text-gray-600 text-sm">
                  All new users start with our Basic plan for free. You can upgrade when you're ready for more features.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h4>
                <p className="text-gray-600 text-sm">
                  Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Membership;