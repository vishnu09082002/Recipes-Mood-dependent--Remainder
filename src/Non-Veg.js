import React,{useState,useEffect} from 'react';

function NonVeg() {
  const nonvegItems = [
    { name: 'Butter Chicken', image: 'nonveg-images/Butter Chicken.jpg' },
    { name: 'Chicken Alfredo Pasta', image: 'nonveg-images/Chicken Alfredo Pasta.jpg' },
    { name: 'Chicken Biryani', image: 'nonveg-images/Chicken Biryani.jpg' },
    { name: 'Chicken Tikka Masala', image: 'nonveg-images/Chicken Tikka Masala.jpg' },
    { name: 'Crispy Korean Fried Chicken', image: 'nonveg-images/Crispy Korean Fried Chicken.jpg' },
    { name: 'Herb-Roasted Garlic Chicken', image: 'nonveg-images/Herb-Roasted Garlic Chicken.jpg' },
    { name: 'Honey Garlic Glazed Chicken', image: 'nonveg-images/Honey Garlic Glazed Chicken.jpg' },
    { name: 'Lemon Herb Grilled Chicken', image: 'nonveg-images/Lemon Herb Grilled Chicken.jpg' },
    { name: 'Spicy Chicken Tandoori', image: 'nonveg-images/Spicy Chicken Tandoori.jpg' },
    { name: 'Thai Green Curry Chicken', image: 'nonveg-images/Thai Green Curry Chicken.jpg' },
  ];
  // State for reminder popup and notification
      const [isReminderOpen, setIsReminderOpen] = useState(false);
      const [selectedItem, setSelectedItem] = useState('');
      const [selectedTime, setSelectedTime] = useState('');
      const [showConfirmation, setShowConfirmation] = useState(false);
      const [reminder, setReminder] = useState(null); // Store item and time together
    
      // Request notification permission on mount
      useEffect(() => {
        if (Notification.permission !== 'granted') {
          Notification.requestPermission().then(permission => {
            console.log('Notification Permission:', permission);
          });
        }
      }, []);
    
      // Check time and trigger notification
      useEffect(() => {
        if (!reminder) return;
    
        const interval = setInterval(() => {
          const now = new Date();
          const currentTimestamp = now.getTime();
          console.log('Current Time:', now.toLocaleTimeString(), 'Reminder Time:', new Date(reminder.timestamp).toLocaleTimeString());
    
          if (currentTimestamp >= reminder.timestamp) {
            console.log('Time matched! Firing notification...');
            if (Notification.permission === 'granted') {
              new Notification(`Time to order ${reminder.item}!`, {
                body: `Your reminder for ${reminder.item} is now!`,
              });
              setReminder(null); // Clear after firing
            } else {
              alert(`Time to order ${reminder.item}! (Notifications not allowed)`); // Fallback
            }
          }
        }, 1000); // Check every second
    
        return () => clearInterval(interval); // Cleanup on unmount
      }, [reminder]);
    
      // Handle reminder submission
      const handleReminderSubmit = () => {
        if (selectedItem && selectedTime) {
          const now = new Date();
          const [hours, minutes] = selectedTime.split(':');
          const reminderDate = new Date(now);
          reminderDate.setHours(parseInt(hours, 10));
          reminderDate.setMinutes(parseInt(minutes, 10));
          reminderDate.setSeconds(0);
    
          // If time is earlier today, assume next day
          if (reminderDate < now) {
            reminderDate.setDate(reminderDate.getDate() + 1);
          }
    
          setReminder({ item: selectedItem, timestamp: reminderDate.getTime() });
          setShowConfirmation(true);
          setTimeout(() => setShowConfirmation(false), 2000); // Hide after 2 seconds
          setIsReminderOpen(false);
          setSelectedItem('');
          setSelectedTime('');
        } else {
          alert('Please select an item and time!');
        }
      };
    
      // Get current time and max time (12 hours from now)
      const now = new Date();
      const maxTime = new Date(now.getTime() + 12 * 60 * 60 * 1000); // 12 hours in ms
      const minTimeString = now.toTimeString().slice(0, 5); // e.g., "14:30"
      const maxTimeString = maxTime.toTimeString().slice(0, 5); // e.g., "02:30"
  return (
    <div className="NonVeg">
      <h2>Non-Veg Menu</h2>
      <div className="food-grid">
        {nonvegItems.map((item, index) => (
          <div key={index} className="food-card">
            <img src={item.image} alt={item.name} className="food-image" />
            <p className="food-name">{item.name}</p>
          </div>
        ))}
      </div>
    
            {/* Reminder Section - Already Sticky with position: fixed */}
            <div className="reminder-section">
        <button
          onClick={() => setIsReminderOpen(true)}
          className="reminder-button"
        >
          Set Reminder
        </button>

        {isReminderOpen && (
          <div className="reminder-popup">
            <h3>Set a Reminder</h3>
            <select
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              className="reminder-select"
            >
              <option value="">Select Item</option>
              {nonvegItems.map((item, index) => (
                <option key={index} value={item.name}>{item.name}</option>
              ))}
            </select>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              min={minTimeString}
              max={maxTimeString}
              className="reminder-time"
            />
            <div className="reminder-actions">
              <button onClick={handleReminderSubmit} className="submit-button">
                Submit
              </button>
              <button
                onClick={() => setIsReminderOpen(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Confirmation Message */}
        {showConfirmation && (
          <div className="reminder-confirmation">
            Reminder Set Successfully!
          </div>
        )}
      </div>
      </div>
  );
}

export default NonVeg;