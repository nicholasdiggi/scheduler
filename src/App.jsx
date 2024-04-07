import React, { useState } from 'react';
import './App.css';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { addScheduleTimes } from './utilities/times.js';
import CourseList from './components/CourseList.jsx';
import { useData } from './utilities/firebase.js';

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
  // const { data: schedule, error, isLoading } = useQuery({
  //   queryKey: ['schedule'],
  //   queryFn: fetchSchedule
  // });

  const [schedule, loading, error] = useData('/', addScheduleTimes);

  if (error) return <h1>An error has occurred: {error.message}</h1>;
  if (loading) return <h1>Loading the schedule...</h1>;

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

export default App;