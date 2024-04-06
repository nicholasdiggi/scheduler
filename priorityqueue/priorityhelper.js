
// timeUntilDeadline
// Function to calculate days and hours until deadline
function timeUntilDeadline(year, month, day, hour, minute) {
    // Create a Date object for the deadline
    const deadlineDate = new Date(year, month - 1, day, hour, minute);

    // Get the current date and time
    const currentDate = new Date();

    // Calculate the difference between the current date and the deadline
    const timeUntilDeadline = deadlineDate - currentDate;

    // Convert milliseconds to seconds
    const remainingSeconds = Math.floor(timeUntilDeadline / 1000);

    // Calculate remaining hours and minutes
    const remainingHours = Math.floor(remainingSeconds / 3600);
    const remainingMinutes = Math.floor((remainingSeconds % 3600) / 60);

    let timeLeftInt = remainingHours * 60 + remainingMinutes;

    return timeLeftInt;
}

// parseTime 
// to parse the time when given in "xx:xx AM" format 
function parseTime(inputtime) {
    // Split the input string into parts based on the colon (:)
    const parts = inputtime.split(':');
    
    // Extract the hour and minute from the parts
    let hour = parseInt(parts[0]);
    let minute = parseInt(parts[1].substr(0, 2)); // Take only the first two characters for minutes
    
    // Check if the time is in the afternoon and adjust the hour accordingly
    if (inputtime.includes('PM') && hour !== 12) {
        hour += 12;
    }
    
    // If the time is "12:xx AM", it should be midnight (0:xx)
    if (inputtime.includes('AM') && hour === 12) {
        hour = 0;
    }
    
    return { hour, minute };
}

// priorityhelper
// Given three numbers, timeUntilDeadline, estimatedCompletionTime, importance, 
// return a number that states the priority. The higher the number, the more priority 
// that the Assignment is given in the priority queue. 
function calculatePriority(timeUntilDeadline, estimatedCompletionTime, importance) {
    // Assign weights to factors
    const completionTimeWeight = 0.33;
    const importanceWeight = 0.66;
    const duetimeweight = 1.0;

    // Calculate priority using weighted sum
    const priority = (duetimeweight* timeUntilDeadline) +
                     (completionTimeWeight * estimatedCompletionTime) +
                     (importanceWeight * (1 / importance));

    return priority;
}

module.exports = { calculatePriority, parseTime, timeUntilDeadline };