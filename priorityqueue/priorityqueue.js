const PriorityQueue = require("js-priority-queue");
const AssignmentClass = require('./assignment.js');
var assert = require('assert');

var comparePriority = function(assign1, assign2) {return assign1.priority - assign2.priority}
var assignqueue = new PriorityQueue({comparator: comparePriority});

const assign1 = new AssignmentClass.Assignment("Essay 1", 40, 20, 3);
const assign2 = new AssignmentClass.Assignment("HW 2", 100, 60, 1);

// obv assign1 > assign2 in priority
//console.log(assign1.deadline);

// basic test case
// assignqueue.queue(assign1);
// assignqueue.queue(assign2);
// var first = assignqueue.dequeue();
// var second = assignqueue.dequeue();

// assert(first == assign1);



