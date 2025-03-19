import React, { useState, useEffect } from 'react';

function VegMenu() {
  const vegItems = [
    { name: 'BananaCurry', image: 'images/BananaCurry.jpg' },
    { name: 'Curry Oatmeal', image: 'images/Curry Oatmeal.jpg' },
    { name: 'Flavourful Pea Pulao', image: 'images/Flavourful Pea Pulao.jpg' },
    { name: 'Indian Spiced Shaak', image: 'images/Indian Spiced Shaak.jpg' },
    { name: 'Irish Bombay Potatoes', image: 'images/Irish Bombay Potatoes.jpg' },
    { name: 'Mush Room Bhaji', image: 'images/mushroombhaji.jpg' },
    { name: 'One Pot Veg-Biryani', image: 'images/onepotveg-biryani.jpg' },
    { name: 'Sweet Potato Curry', image: 'images/sweetpotatocurry.jpg' },
    { name: 'Paneer Salad', image: 'images/Paneer Salad.jpg' },
    { name: 'Tofu in Indian Sauce', image: 'images/Tofu in Indian Sauce.jpg' },
    { name: 'Tomato Curry Rice', image: 'images/Tomato Curry Rice.jpg' },
    { name: 'Vegan Coconut Curry', image: 'images/Vegan Coconut Curry.jpg' },
    { name: 'Vegan Korma', image: 'images/Vegan Korma.jpg' },
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
    <div className="veg-menu">
      <h2>Veg Menu</h2>
      <div className="food-grid">
        {vegItems.map((item, index) => (
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
              {vegItems.map((item, index) => (
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

export default VegMenu;