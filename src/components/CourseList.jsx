import React, { useState } from 'react';
import { getCourseTerm, terms } from '../utilities/times.js';
import Course from './Course.jsx';

// CourseList component
const CourseList = ({ courses }) => {
  const [term, setTerm] = useState('Fall'); // selected term (quarter)
  const [selected, setSelected] = useState([]); // selected courses

    if (selected.some(course => course !== courses[course.id])) {
      setSelected([])
    };

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
    <label className='btn btn-success m-1 p-2' htmlFor={term}>
      {term}
    </label>
  </>
);

export default CourseList;