import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, Clock, Users, MapPin } from 'lucide-react';
import { DemoBooking } from '../utils/demoStorage';

type CalendarModalProps = {
  isOpen: boolean;
  onClose: () => void;
  bookings: DemoBooking[];
  onDateSelect: (date: string) => void;
  selectedDate: string | null;
};

const CalendarModal: React.FC<CalendarModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onDateSelect,
  selectedDate
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  if (!isOpen) return null;

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const formatDateKey = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${year}-${month}-${dayStr}`;
  };

  const getBookingsForDate = (dateKey: string) => {
    return bookings.filter(booking => {
      // Handle "Today" bookings by converting to today's date
      if (booking.date === 'Today') {
        const today = new Date();
        const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        return booking.date === dateKey || todayKey === dateKey;
      }
      return booking.date === dateKey;
    });
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateClick = (day: number | null) => {
    if (!day) return;
    const dateKey = formatDateKey(day);
    onDateSelect(dateKey);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days = getDaysInMonth(currentMonth);
  const selectedDateBookings = selectedDate ? getBookingsForDate(selectedDate) : [];

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate || !day) return false;
    const dateKey = formatDateKey(day);
    return dateKey === selectedDate;
  };

  const hasBookings = (day: number) => {
    if (!day) return false;
    const dateKey = formatDateKey(day);
    return getBookingsForDate(dateKey).length > 0;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Class Calendar</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            {/* Calendar */}
            <div>
              {/* Month Navigation */}
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={handlePreviousMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                </button>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <button
                  onClick={handleNextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Week day headers */}
                {weekDays.map(day => (
                  <div key={day} className="text-center text-xs sm:text-sm font-medium text-gray-600 py-1 sm:py-2">
                    {day}
                  </div>
                ))}
                
                {/* Calendar days */}
                {days.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateClick(day)}
                    disabled={!day}
                    className={`
                      relative p-1 sm:p-2 text-xs sm:text-sm rounded-lg transition-colors
                      ${!day ? 'invisible' : ''}
                      ${isToday(day) ? 'bg-emerald-100 text-emerald-900 font-bold' : ''}
                      ${isSelected(day) ? 'bg-emerald-500 text-white' : ''}
                      ${!isToday(day) && !isSelected(day) ? 'hover:bg-gray-100' : ''}
                    `}
                  >
                    {day}
                    {hasBookings(day) && (
                      <div className={`absolute bottom-0.5 sm:bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${isSelected(day) ? 'bg-white' : 'bg-emerald-500'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings for selected date */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                {selectedDate ? `Bookings for ${selectedDate}` : 'Select a date to view bookings'}
              </h3>
              
              {selectedDateBookings.length === 0 ? (
                <div className="text-center py-6 sm:py-8 text-gray-500">
                  <Calendar className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-sm sm:text-base">No classes booked for this date</p>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {selectedDateBookings.map(booking => (
                    <div key={booking.id} className="bg-gray-50 rounded-lg p-3 sm:p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{booking.className}</h4>
                        <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                          Booked
                        </span>
                      </div>
                      
                      <div className="space-y-1 text-xs sm:text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                          {booking.time} ({booking.duration})
                        </div>
                        <div className="flex items-center">
                          <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                          {booking.instructor}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                          {booking.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
