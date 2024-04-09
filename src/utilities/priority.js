import { MinPriorityQueue } from '@datastructures-js/priority-queue';

const mapValues = (fn, obj) => (
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, fn(value)]))
);

// Given three numbers, timeUntilDeadline, estimatedCompletionTime, importance, 
// return a number that states the priority. The higher the number, the more priority 
// that the Assignment is given in the priority queue. 
const calculatePriority = (timeUntilDeadline, estimatedCompletionTime, importance) => {
    // Assign weights to factors
    const completionTimeWeight = 0.33;
    const importanceWeight = 0.66;
    const dueTimeWeight = 1.0;

    // Calculate priority using weighted sum
    const priority = (dueTimeWeight * timeUntilDeadline) +
                     (completionTimeWeight * estimatedCompletionTime) +
                     (importanceWeight * (5 - importance));

    return priority;
};

// Add timeUntilDeadline and priority fields to the assignment object
const addPriority = assignment => {
  const newAssignment = {
    ...assignment,
    timeUntilDeadline: new Date(assignment.dueDate + 'T' + assignment.dueTime).getTime() - Date.now()
  };

  return {
    ...newAssignment,
    priority: calculatePriority(newAssignment.timeUntilDeadline, newAssignment.estimatedCompletionTime, newAssignment.importance)
  };
};

const addAssignmentId = assignment => {
  // Combine course and name after removing spaces from both
  // const assignmentId = assignment.course.replace(/\s/g, '') + assignment.name.replace(/\s/g, '');
  const assignmentId = assignment.course + assignment.name;
  return {
    ...assignment,
    id: assignmentId
  };
};

const addAssignmentCompleted = assignment => {
  return {
    ...assignment,
    completed: false
  };
};

const addAssignmentInfo = assignment => {
  return addAssignmentCompleted(addAssignmentId(addPriority(assignment)));
};

// Add timeUntilDeadline, priority, id, and completed fields to the assignment objects
export const addAssignmentsInfo = data => ({
  title: data.title,
  courses: data.courses,
  assignments: mapValues(addAssignmentInfo, data.assignments)
});

export const sortAssignments = assignments => {
  const priorityQueue = new MinPriorityQueue();
  Object.values(assignments).forEach(assignment => {
    priorityQueue.enqueue(assignment, assignment.priority);
  });

  const sortedAssignments = [];
  while (!priorityQueue.isEmpty()) {
    sortedAssignments.push(priorityQueue.dequeue());
  }

  return sortedAssignments;
};