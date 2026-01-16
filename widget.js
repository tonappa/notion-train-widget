const { useState, useEffect } = React;
const { Train, Clock, ArrowRight, ChevronLeft, ChevronRight } = lucideReact;

const TrainWidget = () => {
  const [direction, setDirection] = useState('outbound');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hoursOffset, setHoursOffset] = useState(0);

  const schedulesOutbound = [
    { departure: '05:42', arrival: '06:22', type: 'REG', platform: '1' },
    { departure: '06:42', arrival: '07:22', type: 'REG', platform: '1' },
    { departure: '07:15', arrival: '07:55', type: 'REG', platform: '1' },
    { departure: '08:15', arrival: '08:55', type: 'REG', platform: '1' },
    { departure: '09:15', arrival: '09:55', type: 'REG', platform: '1' },
    { departure: '10:15', arrival: '10:55', type: 'REG', platform: '1' },
    { departure: '11:15', arrival: '11:55', type: 'REG', platform: '1' },
    { departure: '12:15', arrival: '12:55', type: 'REG', platform: '1' },
    { departure: '13:15', arrival: '13:55', type: 'REG', platform: '1' },
    { departure: '14:15', arrival: '14:55', type: 'REG', platform: '1' },
    { departure: '15:15', arrival: '15:55', type: 'REG', platform: '1' },
    { departure: '16:15', arrival: '16:55', type: 'REG', platform: '1' },
    { departure: '17:15', arrival: '17:55', type: 'REG', platform: '1' },
    { departure: '18:15', arrival: '18:55', type: 'REG', platform: '1' },
    { departure: '19:15', arrival: '19:55', type: 'REG', platform: '1' },
    { departure: '20:15', arrival: '20:55', type: 'REG', platform: '1' },
    { departure: '21:15', arrival: '21:55', type: 'REG', platform: '1' },
    { departure: '22:15', arrival: '22:55', type: 'REG', platform: '1' },
  ];

  const schedulesReturn = [
    { departure: '06:05', arrival: '06:45', type: 'REG', platform: '2' },
    { departure: '07:05', arrival: '07:45', type: 'REG', platform: '2' },
    { departure: '08:05', arrival: '08:45', type: 'REG', platform: '2' },
    { departure: '09:05', arrival: '09:45', type: 'REG', platform: '2' },
    { departure: '10:05', arrival: '10:45', type: 'REG', platform: '2' },
    { departure: '11:05', arrival: '11:45', type: 'REG', platform: '2' },
    { departure: '12:05', arrival: '12:45', type: 'REG', platform: '2' },
    { departure: '13:05', arrival: '13:45', type: 'REG', platform: '2' },
    { departure: '14:05', arrival: '14:45', type: 'REG', platform: '2' },
    { departure: '15:05', arrival: '15:45', type: 'REG', platform: '2' },
    { departure: '16:05', arrival: '16:45', type: 'REG', platform: '2' },
    { departure: '17:05', arrival: '17:45', type: 'REG', platform: '2' },
    { departure: '18:05', arrival: '18:45', type: 'REG', platform: '2' },
    { departure: '19:05', arrival: '19:45', type: 'REG', platform: '2' },
    { departure: '20:05', arrival: '20:45', type: 'REG', platform: '2' },
    { departure: '21:05', arrival: '21:45', type: 'REG', platform: '2' },
  ];

  const schedules = direction === 'outbound' ? schedulesOutbound : schedulesReturn;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const getFilteredSchedules = () => {
    const referenceTime = new Date(currentTime);
    referenceTime.setHours(referenceTime.getHours() + hoursOffset);
    
    return schedules.filter(schedule => {
      const departureTime = parseTime(schedule.departure);
      const diffMs = departureTime - referenceTime;
      const diffHours = diffMs / (1000 * 60 * 60);
      return diffHours >= 0 && diffHours <= 6;
    });
  };

  const getTimeDiff = (timeStr) => {
    const departureTime = parseTime(timeStr);
    const referenceTime = new Date(currentTime);
    referenceTime.setHours(referenceTime.getHours() + hoursOffset);
    
    const diffMs = departureTime - referenceTime;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffMinutes < 0) return 'Partito';
    if (diffMinutes === 0) return 'In partenza';
    if (diffMinutes < 60) return `Tra ${diffMinutes} min`;
    
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `Tra ${hours}h ${minutes}m`;
  };

  const formatCurrentTime = () => {
    const refTime = new Date(currentTime);
    refTime.setHours(refTime.getHours() + hoursOffset);
    return refTime.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
  };

  const filteredSchedules = getFilteredSchedules();

  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><rect width="16" height="16" x="4" y="3" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><path d="m8 19-2 3"/><path d="m18 22-2-3"/><path d="M8 15h0"/><path d="M16 15h0"/></svg>
          <h1 className="text-2xl font-bold text-gray-800">Orari Treni</h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>{formatCurrentTime()}</span>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => {
            setDirection('outbound');
            setHoursOffset(0);
          }}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
            direction === 'outbound'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <span>Pietrasanta</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            <span>Pisa S.R.</span>
          </div>
        </button>
        <button
          onClick={() => {
            setDirection('return');
            setHoursOffset(0);
          }}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
            direction === 'return'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <span>Pisa S.R.</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            <span>Pietrasanta</span>
          </div>
        </button>
      </div>

      <div className="flex items-center justify-between mb-4 bg-white rounded-lg p-3 shadow-sm">
        <button
          onClick={() => setHoursOffset(Math.max(0, hoursOffset - 3))}
          disabled={hoursOffset === 0}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        
        <div className="text-center">
          <div className="text-sm text-gray-600">Mostrando orari da</div>
          <div className="font-semibold text-gray-800">
            {hoursOffset === 0 ? 'Adesso' : `Adesso +${hoursOffset}h`}
          </div>
        </div>

        <button
          onClick={() => setHoursOffset(hoursOffset + 3)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredSchedules.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nessun treno disponibile in questo orario
          </div>
        ) : (
          filteredSchedules.map((train, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-center">
