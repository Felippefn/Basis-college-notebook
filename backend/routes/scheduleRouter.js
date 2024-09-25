const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Helper function to read JSON file
const readJSONFile = () => {
  const filePath = path.join(__dirname, 'schedules.json'); // Adjust path if needed
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } else {
    return []; // Return empty array if file doesn't exist
  }
};

// Helper function to write to JSON file
const writeJSONFile = (data) => {
  const filePath = path.join(__dirname, 'schedules.json'); // Adjust path if needed
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};


router.get('/schedules', (req, res) => {
  const schedules = readJSONFile();
  res.json(schedules);
});

router.post('/schedules', (req, res) => {
  const newSchedule = req.body; // Expecting a new schedule object from the request body
  const schedules = readJSONFile();
  
  // Add new schedule to the list
  schedules.push(newSchedule);
  
  // Save the updated schedule list back to the JSON file
  writeJSONFile(schedules);
  
  res.status(201).json(newSchedule); // Return the created schedule
});

module.exports = router;
