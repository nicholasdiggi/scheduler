const PriorityQueue = require("js-priority-queue");
const AssignmentClass = require('./assignment.js');
var assert = require('assert');

var comparePriority = function(assign1, assign2) {return assign1.priority - assign2.priority}
var assignqueue = new PriorityQueue({comparator: comparePriority});
// initialize the priority queue this way 


