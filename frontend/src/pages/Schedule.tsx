import React from 'react';
import { Clock, Users, MapPin } from 'lucide-react';
import { useUser } from '@clerk/react';
import { demoStorage, type DemoBooking } from '../utils/demoStorage';
import CalendarModal from '../components/CalendarModal';

type ClassItem = {
  name: string;
  instructor: string;
  time: string;
  duration: string;
  capacity: number;
  location: string;
  date: string;
};

const DEFAULT_CLASSES: ClassItem[] = [
  {
    name: 'Morning Yoga',
    instructor: 'Emma Wilson',
    time: '08:00 AM',
    duration: '60 min',
    capacity: 12,
    location: 'Studio A',
    date: 'Today'
  },
  {
    name: 'HIIT Training',
    instructor: 'Mike Johnson',
    time: '10:00 AM',
    duration: '45 min',
    capacity: 8,
    location: 'Studio B',
    date: 'Today'
  },
  {
    name: 'Pilates',
    instructor: 'Sarah Chen',
    time: '02:00 PM',
    duration: '50 min',
    capacity: 10,
    location: 'Studio A',
    date: 'Today'
  },
  {
    name: 'Strength Training',
    instructor: 'Alex Thompson',
    time: '04:00 PM',
    duration: '60 min',
    capacity: 6,
    location: 'Studio C',
    date: 'Today'
  }
];

const classKey = (classItem: ClassItem) =>
  `${classItem.name}|${classItem.instructor}|${classItem.time}|${classItem.date}`;

const ScheduleBase = () => {
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);

  const handleMissingClerk = () => {
    window.alert('Please configure Clerk (VITE_CLERK_PUBLISHABLE_KEY) and sign in to book classes.');
  };

  const handleOpenCalendar = () => {
    setIsCalendarOpen(true);
  };

  const handleCloseCalendar = () => {
    setIsCalendarOpen(false);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const classes = DEFAULT_CLASSES;

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Class Schedule</h1>
            <p className="text-gray-600">Book your next fitness class</p>
          </div>
          <button 
            className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors w-full sm:w-auto"
            onClick={handleOpenCalendar}
          >
            View Calendar
          </button>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {classes.map((classItem, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{classItem.name}</h3>
                <span className="text-xs sm:text-sm font-medium text-emerald-600 bg-emerald-50 px-2 sm:px-3 py-1 rounded-full">
                  {classItem.date}
                </span>
              </div>

              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span className="text-sm sm:text-base">{classItem.time} ({classItem.duration})</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span className="text-sm sm:text-base">Instructor: {classItem.instructor}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span className="text-sm sm:text-base">{classItem.location}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                <span className="text-xs sm:text-sm text-gray-500">
                  Capacity: {classItem.capacity} spots
                </span>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
                  onClick={handleMissingClerk}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Modal */}
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={handleCloseCalendar}
        bookings={[]} // No bookings in demo mode without Clerk
        onDateSelect={handleDateSelect}
        selectedDate={selectedDate}
      />
    </div>
  );
};

const ScheduleWithClerk = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const userId = user?.id;
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);

  const handleOpenCalendar = () => {
    setIsCalendarOpen(true);
  };

  const handleCloseCalendar = () => {
    setIsCalendarOpen(false);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const classes = [
    {
      name: 'Morning Yoga',
      instructor: 'Emma Wilson',
      time: '08:00 AM',
      duration: '60 min',
      capacity: 12,
      location: 'Studio A',
      date: 'Today'
    },
    {
      name: 'HIIT Training',
      instructor: 'Mike Johnson',
      time: '10:00 AM',
      duration: '45 min',
      capacity: 8,
      location: 'Studio B',
      date: 'Today'
    },
    {
      name: 'Pilates',
      instructor: 'Sarah Chen',
      time: '02:00 PM',
      duration: '50 min',
      capacity: 10,
      location: 'Studio A',
      date: 'Today'
    },
    {
      name: 'Strength Training',
      instructor: 'Alex Thompson',
      time: '04:00 PM',
      duration: '60 min',
      capacity: 6,
      location: 'Studio C',
      date: 'Today'
    }
  ];

  const classesTyped: ClassItem[] = classes;

  const [bookings, setBookings] = React.useState<DemoBooking[]>([]);

  React.useEffect(() => {
    if (!isLoaded || !userId) {
      setBookings([]);
      return;
    }
    setBookings(demoStorage.getBookings(userId));
  }, [isLoaded, userId]);

  const handleBookNow = (classItem: ClassItem) => {
    if (!isLoaded) return;

    if (!isSignedIn || !userId) {
      window.alert('Please sign in to book a class.');
      return;
    }

    const key = classKey(classItem);
    if (demoStorage.hasBooking(userId, key)) {
      window.alert('You already booked this class.');
      return;
    }

    demoStorage.addBooking(userId, {
      classKey: key,
      className: classItem.name,
      instructor: classItem.instructor,
      time: classItem.time,
      duration: classItem.duration,
      location: classItem.location,
      date: classItem.date,
    });

    setBookings(demoStorage.getBookings(userId));
  };

  const handleCancelBooking = (bookingId: string) => {
    if (!userId) return;
    demoStorage.cancelBooking(userId, bookingId);
    setBookings(demoStorage.getBookings(userId));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Class Schedule</h1>
            <p className="text-gray-600">Book your next fitness class</p>
          </div>
          <button 
            className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors w-full sm:w-auto"
            onClick={handleOpenCalendar}
          >
            View Calendar
          </button>
        </div>

        {isLoaded && isSignedIn && (
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">My Bookings</h2>
            {bookings.length === 0 ? (
              <p className="text-gray-600 text-sm sm:text-base">No bookings yet.</p>
            ) : (
              <div className="space-y-2 sm:space-y-3">
                {bookings.map((b) => (
                  <div key={b.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-0">
                    <div>
                      <div className="font-medium text-gray-900 text-sm sm:text-base">{b.className}</div>
                      <div className="text-xs sm:text-sm text-gray-600">{b.date} · {b.time} · {b.location}</div>
                    </div>
                    <button
                      className="text-xs sm:text-sm px-3 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 transition-colors self-start sm:self-auto"
                      onClick={() => handleCancelBooking(b.id)}
                    >
                      Cancel
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {classesTyped.map((classItem, index) => (
            (() => {
              const key = classKey(classItem);
              const alreadyBooked = Boolean(userId && demoStorage.hasBooking(userId, key));

              return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{classItem.name}</h3>
                <span className="text-xs sm:text-sm font-medium text-emerald-600 bg-emerald-50 px-2 sm:px-3 py-1 rounded-full">
                  {classItem.date}
                </span>
              </div>
              
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span className="text-sm sm:text-base">{classItem.time} ({classItem.duration})</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span className="text-sm sm:text-base">Instructor: {classItem.instructor}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span className="text-sm sm:text-base">{classItem.location}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                <span className="text-xs sm:text-sm text-gray-500">
                  Capacity: {classItem.capacity} spots
                </span>
                <button
                  className={alreadyBooked ? 'bg-gray-200 text-gray-700 px-4 py-2 rounded-lg cursor-not-allowed text-sm sm:text-base' : 'bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base'}
                  onClick={() => handleBookNow(classItem)}
                  disabled={alreadyBooked}
                >
                  {alreadyBooked ? 'Booked' : 'Book Now'}
                </button>
              </div>
            </div>
              );
            })()
          ))}
        </div>
      </div>

      {/* Calendar Modal */}
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={handleCloseCalendar}
        bookings={bookings}
        onDateSelect={handleDateSelect}
        selectedDate={selectedDate}
      />
    </div>
  );
};

const Schedule = () => {
  const clerkEnabled = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
  return clerkEnabled ? <ScheduleWithClerk /> : <ScheduleBase />;
};

export default Schedule;