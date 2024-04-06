import React from 'react';
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
  return await response.json();
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
const CourseList = ({ courses }) => (
  <div className='course-list'>
    { Object.values(courses).map(course => <Course key={course.id} course={course} />) }
  </div>
);

// Course component helper functions
// const terms = { F: 'Fall', W: 'Winter', S: 'Spring' };

// const getCourseTerm = course => (
//   terms[course.id.charAt(0)]
// );

// const getCourseNumber = course => (
//   course.id.slice(1, 4)
// );

// Course component
const Course = ({ course }) => (
  <div className='card m-1 p-2'>
    <div className='card-body'>
      <div className='card-title'>{ course.term } CS { course.number }</div>
      <div className='card-text'>{ course.title }</div>
      <div className='card-subtext'>{ course.meets }</div>
    </div>
  </div>
);

export default App;