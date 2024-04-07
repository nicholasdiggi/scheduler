


// Given three numbers, timeUntilDeadline, estimatedCompletionTime, importance, 
// return a number that states the priority. The higher the number, the more priority 
// that the Assignment is given in the priority queue. 
const calculatePriority = (timeUntilDeadline, estimatedCompletionTime, importance) => {
    // Assign weights to factors
    const completionTimeWeight = 0.33;
    const importanceWeight = 0.66;
    const duetimeweight = 1.0;

    // Calculate priority using weighted sum
    const priority = (duetimeweight* timeUntilDeadline) +
                     (completionTimeWeight * estimatedCompletionTime) +
                     (importanceWeight * (1 / importance));

    return priority;
};

export const addPriority = data => {
  const newData = {
    ...data,
    timeUntilDeadline: new Date(data.dueDate + 'T' + data.dueTime).getTime() - Date.now()
  };

  return {
    ...newData,
    priority: calculatePriority(newData.timeUntilDeadline, newData.estimatedCompletionTime, newData.importance)
  };
};