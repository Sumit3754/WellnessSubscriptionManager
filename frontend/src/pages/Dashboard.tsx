import React from 'react';
import { Activity, Calendar, TrendingUp, Award, Clock, Heart } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Active Workouts',
      value: '12',
      icon: Activity,
      color: 'emerald'
    },
    {
      title: 'Upcoming Classes',
      value: '3',
      icon: Calendar,
      color: 'blue'
    },
    {
      title: 'Progress Score',
      value: '85%',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      title: 'Achievements',
      value: '8',
      icon: Award,
      color: 'amber'
    }
  ];

  const recentActivities = [
    {
      type: 'workout',
      title: 'Morning Yoga',
      time: '2 hours ago',
      icon: Clock
    },
    {
      type: 'nutrition',
      title: 'Meal Plan Updated',
      time: '4 hours ago',
      icon: Heart
    },
    {
      type: 'class',
      title: 'HIIT Training',
      time: 'Yesterday',
      icon: Calendar
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-4">
      <div className="container mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back, Sarah!</h1>
          <p className="text-gray-600">Here's your wellness overview for today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`p-2 rounded-lg ${
                  stat.color === 'emerald' ? 'bg-emerald-100' :
                  stat.color === 'blue' ? 'bg-blue-100' :
                  stat.color === 'purple' ? 'bg-purple-100' :
                  'bg-amber-100'
                }`}>
                  <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${
                    stat.color === 'emerald' ? 'text-emerald-600' :
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'purple' ? 'text-purple-600' :
                    'text-amber-600'
                  }`} />
                </div>
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <h3 className="text-gray-600">{stat.title}</h3>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="p-2 rounded-lg bg-emerald-100 mr-4">
                  <activity.icon className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{activity.title}</h3>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 