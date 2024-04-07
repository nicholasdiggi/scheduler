import React, { useState } from 'react';
import './App.css';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

// const schedule = {
//   title: "CS Courses for 2018-2019",
//   "courses": {
//     "F101" : {
//       "id" : "F101",
//       "meets" : "MWF 11:00-11:50",
//       "title" : "Computer Science: Concepts, Philosophy, and Connections"
//     },
//     "F110" : {
//       "id" : "F110",
//       "meets" : "MWF 10:00-10:50",
//       "title" : "Intro Programming for non-majors"
//     },
//     "S313" : {
//       "id" : "S313",
//       "meets" : "TuTh 15:30-16:50",
//       "title" : "Tangible Interaction Design and Learning"
//     },
//     "S314" : {
//       "id" : "S314",
//       "meets" : "TuTh 9:30-10:50",
//       "title" : "Tech & Human Interaction"
//     }
//   }
// };

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
);

// Get the schedule JSON data
const fetchSchedule = async () => {
  const url = 'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php';
  const response = await fetch(url);
  if (!response.ok) throw response;
  return addScheduleTimes(await response.json());
};

const Main = () => {
  const { data: schedule, error, isLoading } = useQuery({
    queryKey: ['schedule'],
    queryFn: fetchSchedule
  });

  if (error) return <h1>An error has occurred: {error.message}</h1>;
  if (isLoading) return <h1>Loading the schedule...</h1>;

  return (
    <div className='container'>
      <Banner title={ schedule.title } />
      <CourseList courses={ schedule.courses } />
    </div>
  );
};

// Banner component
const Banner = ({ title }) => (
  <h1>{ title }</h1>
);

// CourseList component
const CourseList = ({ courses }) => {
  const [term, setTerm] = useState('Fall'); // selected term (quarter)
  const [selected, setSelected] = useState([]); // selected courses
  
  // Find the courses that match the selected term
  const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course));

  return (
    <>
      <TermSelector term={term} setTerm={setTerm} />
      <div className='course-list'>
        {/* Display all courses */}
        {/* { Object.values(courses).map(course => <Course key={course.id} course={course} />) } */}

        {/* Only display the courses that match the selected term */}
        { termCourses.map(course =>
          <Course key={course.id} course={course}
            selected={selected} setSelected={ setSelected } />) }
      </div>
    </>
  );
};

// Course component helper functions
const terms = { F: 'Fall', W: 'Winter', S: 'Spring' };

//// Original getCourseTerm function (before using url data)
// const getCourseTerm = course => (
//   terms[course.id.charAt(0)]
// );

//// Original getCourseNumber function (before using url data)
// const getCourseNumber = course => (
//   course.id.slice(1, 4)
// );

const getCourseTerm = course => course.term;

// Creates a new list with the newly selected course or
// without the newly unselected course
const toggle = (x, lst) => (
  lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst]
);

// Tells us when a course conflicts with a set of selected courses
const hasConflict = (course, selected) => (
  selected.some(selection => courseConflict(course, selection))
);

// Uses a regular expression to parse meeting time string into dictionary
// Ex: 'TuTh 10:00-11:20' -> { days: 'TuTh', hours: { start: 600, end: 680 } }
const meetsPat = /^ *((?:M|Tu|W|Th|F)+) +(\d\d?):(\d\d) *[ -] *(\d\d?):(\d\d) *$/;

const timeParts = meets => {
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

const addScheduleTimes = schedule => ({
  title: schedule.title,
  courses: mapValues(addCourseTimes, schedule.courses)
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

// Course component
const Course = ({ course, selected, setSelected }) => {
  const isSelected = selected.includes(course);
  const isDisabled = !isSelected && hasConflict(course, selected);
  const style = {
    backgroundColor: isDisabled? 'lightgrey' : isSelected ? '#B0E5A4' : 'white'
  };

  return (
    <div className='card m-1 p-2'
      style={style}
      onClick={isDisabled ? null : () => setSelected(toggle(course, selected))}>
      <div className='card-body'>
        <div className='card-title'>{ course.term } CS { course.number }</div>
        <div className='card-text'>{ course.title }</div>
        <div className='card-text'>{ course.meets }</div>
      </div>
    </div>
  );
};

// TermSelector component
const TermSelector = ({term, setTerm}) => (
  <div className='btn-group'>
    {
      Object.values(terms).map(value =>
        <TermButton key={value} term={value} setTerm={setTerm} checked={value === term} />)
    }
  </div>
);

// TermButton component
const TermButton = ({term, setTerm, checked}) => (
  <>
    <input type='radio' id={term} className='btn-check' checked={checked} autoComplete='off'
      onChange={ () => setTerm(term) } />
    <label class='btn btn-success m-1 p-2' htmlFor={term}>
      {term}
    </label>
  </>
);

export default App;