// controllers/eventController.js
const { events, backupEventsToFile } = require('../models/eventModel');
  
// Record a new event
exports.recordEvent = (req, res) => {
    const { timestamp, eventType, account, user } = req.body;
  
    if (!timestamp || !eventType || !account || !user) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    // Check for existing event with the same account and user
    const existingEvent = events.find(event => event.account === account && event.user === user);
    
    if (existingEvent) {
      return res.status(409).json({ message: "Event already recorded for this account and user combination." });
    }
  
    const newEvent = { timestamp, eventType, account, user };
    events.push(newEvent); // Add new event to the array
  
    // Backup the updated events to the JSON file
    backupEventsToFile();
  
    res.status(201).json({ message: "Event recorded successfully", event: newEvent });
  };
  
  // Get metrics for the last 24 hours

exports.getMetrics = (req, res) => {
    const { accountId } = req.query;
  
    if (!accountId) {
      return res.status(400).json({ message: "Account ID is required" });
    }
  
    const now = new Date(); // Current time
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000); // Time 24 hours ago

  
    // Filter events for the specified account and within the last 24 hours
    const filteredEvents = events.filter(event => {
      const eventDate = new Date(event.timestamp);
      const isInTimeframe = eventDate >= twentyFourHoursAgo && eventDate <= now; // Ensure it's also less than or equal to now
   
      return event.account === accountId && isInTimeframe;
    });
  
   
  
    // Count occurrences of each event type and track unique users
    const counts = {};
    const uniqueUsers = new Set();
  
    filteredEvents.forEach(event => {
      // Count event type occurrences
      counts[event.eventType] = (counts[event.eventType] || 0) + 1;
      
      // Track unique users for each event type
      uniqueUsers.add(event.user);
    });
  


    res.json({
      counts,
      uniqueUsers: uniqueUsers.size
    });
  };
  
  
  
