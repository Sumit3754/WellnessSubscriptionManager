import React from 'react';
import { Check } from 'lucide-react';
import { useUser } from '@clerk/react';
import { demoStorage, type DemoSubscription } from '../utils/demoStorage';

type Plan = {
  name: string;
  price: string;
  period: string;
  features: string[];
  color: string;
  popular?: boolean;
};

const DEFAULT_PLANS: Plan[] = [
  {
    name: 'Basic',
    price: '$29',
    period: 'month',
    features: [
      'Basic workout tracking',
      '5 class bookings per month',
      'Basic nutrition tracking',
      'Email support',
      'Mobile app access'
    ],
    color: 'emerald'
  },
  {
    name: 'Pro',
    price: '$49',
    period: 'month',
    features: [
      'Advanced workout tracking',
      'Unlimited class bookings',
      'Advanced nutrition tracking',
      'Priority email support',
      'Mobile app access',
      'Personalized workout plans',
      'Progress analytics'
    ],
    color: 'blue',
    popular: true
  },
  {
    name: 'Elite',
    price: '$79',
    period: 'month',
    features: [
      'Everything in Pro',
      '1-on-1 coaching sessions',
      'Custom meal plans',
      '24/7 priority support',
      'Advanced analytics',
      'Group fitness classes',
      'Wellness workshops'
    ],
    color: 'purple'
  }
];

const PlansBase = () => {
  const handleMissingClerk = () => {
    window.alert('Please configure Clerk (VITE_CLERK_PUBLISHABLE_KEY) and sign in to activate a plan.');
  };

  const plans = DEFAULT_PLANS;

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan for your wellness journey. All plans include access to our core features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                plan.popular ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 sm:px-4 py-1 rounded-bl-lg text-xs sm:text-sm">
                  Most Popular
                </div>
              )}
              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className={`h-5 w-5 ${
                        plan.color === 'emerald' ? 'text-emerald-500' :
                        plan.color === 'blue' ? 'text-blue-500' :
                        'text-purple-500'
                      } mr-2 flex-shrink-0`} />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 px-6 rounded-lg text-white font-semibold ${
                    plan.color === 'emerald' ? 'bg-emerald-500 hover:bg-emerald-600' :
                    plan.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600' :
                    'bg-purple-500 hover:bg-purple-600'
                  } transition-colors duration-200`}
                  onClick={handleMissingClerk}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PlansWithClerk = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const userId = user?.id;

  const plans = [
    {
      name: 'Basic',
      price: '$29',
      period: 'month',
      features: [
        'Basic workout tracking',
        '5 class bookings per month',
        'Basic nutrition tracking',
        'Email support',
        'Mobile app access'
      ],
      color: 'emerald'
    },
    {
      name: 'Pro',
      price: '$49',
      period: 'month',
      features: [
        'Advanced workout tracking',
        'Unlimited class bookings',
        'Advanced nutrition tracking',
        'Priority email support',
        'Mobile app access',
        'Personalized workout plans',
        'Progress analytics'
      ],
      color: 'blue',
      popular: true
    },
    {
      name: 'Elite',
      price: '$79',
      period: 'month',
      features: [
        'Everything in Pro',
        '1-on-1 coaching sessions',
        'Custom meal plans',
        '24/7 priority support',
        'Advanced analytics',
        'Group fitness classes',
        'Wellness workshops'
      ],
      color: 'purple'
    }
  ];

  const plansTyped: Plan[] = plans;

  const [subscription, setSubscription] = React.useState<DemoSubscription | null>(null);

  React.useEffect(() => {
    if (!isLoaded || !userId) {
      setSubscription(null);
      return;
    }
    setSubscription(demoStorage.getSubscription(userId));
  }, [isLoaded, userId]);

  const handleActivate = (plan: Plan) => {
    if (!isLoaded) return;
    if (!isSignedIn || !userId) {
      window.alert('Please sign in to activate a plan.');
      return;
    }

    const sub: DemoSubscription = {
      planName: plan.name,
      price: plan.price,
      period: plan.period,
      startedAt: new Date().toISOString(),
      status: 'active',
    };

    demoStorage.setSubscription(userId, sub);
    setSubscription(sub);
    window.alert('Demo payment successful. Subscription activated.');
  };

  const handleCancel = () => {
    if (!userId) return;
    demoStorage.cancelSubscription(userId);
    setSubscription(demoStorage.getSubscription(userId));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan for your wellness journey. All plans include access to our core features.
          </p>
        </div>

        {isLoaded && isSignedIn && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">My Subscription</h2>
            {!subscription ? (
              <p className="text-gray-600">No active subscription.</p>
            ) : (
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-medium text-gray-900">{subscription.planName}</div>
                  <div className="text-sm text-gray-600">
                    Status: {subscription.status} · Started: {new Date(subscription.startedAt).toLocaleString()}
                  </div>
                </div>
                {subscription.status === 'active' ? (
                  <button
                    className="text-sm px-3 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 transition-colors"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                ) : null}
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {plansTyped.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                plan.popular ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 sm:px-4 py-1 rounded-bl-lg text-xs sm:text-sm">
                  Most Popular
                </div>
              )}
              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className={`h-5 w-5 ${
                        plan.color === 'emerald' ? 'text-emerald-500' :
                        plan.color === 'blue' ? 'text-blue-500' :
                        'text-purple-500'
                      } mr-2 flex-shrink-0`} />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 px-6 rounded-lg text-white font-semibold ${
                    plan.color === 'emerald' ? 'bg-emerald-500 hover:bg-emerald-600' :
                    plan.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600' :
                    'bg-purple-500 hover:bg-purple-600'
                  } transition-colors duration-200`}
                  onClick={() => handleActivate(plan)}
                >
                  {subscription?.status === 'active' && subscription.planName === plan.name ? 'Current Plan' : 'Get Started'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Plans = () => {
  const clerkEnabled = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
  return clerkEnabled ? <PlansWithClerk /> : <PlansBase />;
};

export default Plans;