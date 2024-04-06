const PriorityHelper = require('./priorityhelper.js');

class Assignment {
    name; // name of assignment, probably a string 
    deadline; // from deadlinemin
    esttime; // direct user input (in hours)
    importance; // direct user input, 1-5, higher = more important
    priority;

    constructor(name, deadline, esttime, importance) {
        this.name = name; 
        this.deadline = deadline;  
        this.esttime = esttime;
        this.importance = importance; 
        this.priority = PriorityHelper.calculatePriority(this.deadline, this.esttime, this.importance);
    }

}

module.exports = { Assignment };


