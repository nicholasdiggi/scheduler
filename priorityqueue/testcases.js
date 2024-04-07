const PriorityQueue = require("js-priority-queue");
const AssignmentClass = require('./assignment.js');
var assert = require('assert');
const test = require('test');

var comparePriority = function(assign1, assign2) {return assign1.priority - assign2.priority}

test('basic test case with 2 elements', t => {
    var assignqueue = new PriorityQueue({comparator: comparePriority});

    const assign1 = new AssignmentClass.Assignment("Essay 1", 40, 20, 3);
    const assign2 = new AssignmentClass.Assignment("HW 2", 100, 60, 1); 

    // priority of assign1 greater than assign2
    assignqueue.queue(assign1);
    assignqueue.queue(assign2);
    var first = assignqueue.dequeue();
    var second = assignqueue.dequeue();

    assert(first === assign1);
    assert(second === assign2);
})

test('2 elements, deadline is the same', t =>{
    var assignqueue = new PriorityQueue({comparator: comparePriority});

    const assign1 = new AssignmentClass.Assignment("Essay 1", 40, 20, 3);
    const assign2 = new AssignmentClass.Assignment("HW 2", 40, 60, 2); 
    assignqueue.queue(assign1);
    assignqueue.queue(assign2);

    var first = assignqueue.dequeue();
    var second = assignqueue.dequeue();

    assert(first === assign1);
    assert(second === assign2);
})

test('3 elements, diff highest variable', t =>{
    var assignqueue = new PriorityQueue({comparator: comparePriority});

    const assign1 = new AssignmentClass.Assignment("Essay 1", 60, 20, 3);
    const assign2 = new AssignmentClass.Assignment("HW 2", 20, 60, 2);
    const assign3 = new AssignmentClass.Assignment("HW 3", 30, 30, 5);  
    assignqueue.queue(assign1);
    assignqueue.queue(assign2);
    assignqueue.queue(assign3);
    
    var first = assignqueue.dequeue();
    var second = assignqueue.dequeue();
    var third = assignqueue.dequeue();
    // console.log(assign1.priority);
    // console.log(assign2.priority);
    // console.log(assign3.priority);

    assert(first === assign3);
    assert(second === assign2);
    assert(third === assign1);
})

test('5 elements', t =>{
    var assignqueue = new PriorityQueue({comparator: comparePriority});

    const assign1 = new AssignmentClass.Assignment("Essay 1", 60, 20, 3);
    const assign2 = new AssignmentClass.Assignment("HW 2", 20, 60, 2);
    const assign3 = new AssignmentClass.Assignment("HW 3", 30, 30, 5);  
    const assign4 = new AssignmentClass.Assignment("HW 4", 82, 95, 4);  
    const assign5 = new AssignmentClass.Assignment("HW 5", 59, 31, 1);  
    assignqueue.queue(assign1);
    assignqueue.queue(assign2);
    assignqueue.queue(assign3);
    assignqueue.queue(assign4);
    assignqueue.queue(assign5);
    
    var first = assignqueue.dequeue();
    var second = assignqueue.dequeue();
    var third = assignqueue.dequeue();
    var fourth = assignqueue.dequeue();
    var fifth = assignqueue.dequeue();
    // console.log(assign1.priority);
    // console.log(assign2.priority);
    // console.log(assign3.priority);
    // console.log(assign4.priority);
    // console.log(assign5.priority);

    assert(first === assign3);
    assert(second === assign2);
    assert(third === assign1);
    assert(fourth === assign5);
    assert(fifth === assign4);
})

