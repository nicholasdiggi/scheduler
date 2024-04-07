// Course component helper functions
export const terms = { F: 'Fall', W: 'Winter', S: 'Spring' };

export const getCourseTerm = course => course.term;

// Creates a new list with the newly selected course or
// without the newly unselected course
export const toggle = (x, lst) => (
  lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst]
);

// Tells us when a course conflicts with a set of selected courses
export const hasConflict = (course, selected) => (
  selected.some(selection => courseConflict(course, selection))
);

// Uses a regular expression to parse meeting time string into dictionary
// Ex: 'TuTh 10:00-11:20' -> { days: 'TuTh', hours: { start: 600, end: 680 } }
const meetsPat = /^ *((?:M|Tu|W|Th|F)+) +(\d\d?):(\d\d) *[ -] *(\d\d?):(\d\d) *$/;

export const timeParts = meets => {
  const [match, days, hh1, mm1, hh2, mm2] = meetsPat.exec(meets) || [];
  return !match ? {} : {
    days,
    hours: {
      start: hh1 * 60 + mm1 * 1,
      end: hh2 * 60 + mm2 * 1
    }
  };
};

// Helper functions to add the new fields to each course when the courses are first fetched
const mapValues = (fn, obj) => (
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, fn(value)]))
);

const addCourseTimes = course => ({
  ...course,
  ...timeParts(course.meets)
});

// Added by me
const getCourseId = course => {
  const termInitial = course.term.charAt(0);
  return `${termInitial}${course.number}`;
};

const addCourseId = course => ({
    ...course,
    id: getCourseId(course)
});

const addCourseTimesAndId = course => {
  return addCourseId(addCourseTimes(course));
};

// End of functions added by me

export const addScheduleTimes = schedule => ({
  title: schedule.title,
  courses: mapValues(addCourseTimesAndId, schedule.courses)
});

const days = ['M', 'Tu', 'W', 'Th', 'F'];

// Check if days overlap
const daysOverlap = (days1, days2) => (
  days.some(day => days1.includes(day) && days2.includes(day))
);

// Check if hours overlap
const hoursOverlap = (hours1, hours2) => (
  Math.max(hours1.start, hours2.start) < Math.min(hours1.end, hours2.end)
);

// Check if two courses conflict without taking term into account
const timeConflict = (course1, course2) => (
  daysOverlap(course1.days, course2.days) && hoursOverlap(course1.hours, course2.hours)
);

// Check if two courses conflict in the same quarter/term
const courseConflict = (course1, course2) => (
  getCourseTerm(course1) === getCourseTerm(course2)
  && timeConflict(course1, course2)
);
