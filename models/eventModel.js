// models/eventModel.js
const fs = require('fs');
const path = require('path');

// In-memory storage
let events = [];

// File path for the JSON file backup
const filePath = path.join(__dirname, '../data/events_backup.json');

// Function to read events from the JSON file (for initial loading if needed)
const loadEventsFromFile = () => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    events = JSON.parse(data);
    console.log('Events loaded from backup file.');
  } catch (err) {
    console.error('Error loading events from file, starting with empty memory:', err);
    events = [];
  }
};

// Function to write events to the JSON file (for backup)
const backupEventsToFile = () => {
    try {
      fs.writeFileSync(filePath, JSON.stringify(events, null, 2), 'utf8');
      console.log('Events backed up to file successfully.');
    } catch (err) {
      console.error('Error writing events to file:', err);
      return false; // Return false to indicate failure
    }
    return true; // Return true to indicate success
  };
  

// Load events from file on server start (optional)
loadEventsFromFile();

module.exports = {
  events,
  backupEventsToFile,
};
