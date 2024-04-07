import React, { useState } from 'react';
import './App.css';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { addScheduleTimes } from './utilities/times.js';
import CourseList from './components/CourseList.jsx';
import { useData } from './utilities/firebase.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditForm from './EditForm.jsx';
import AssignmentForm from './components/AssignmentForm.jsx';
import { addPriority } from './utilities/priority.js';
import './fonts/fonts.css';

const queryClient = new QueryClient();

const App = () => (
  <div style={{backgroundColor: '#bd93bd', minHeight: '100vh'}} >
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
  </div>
);

const Main = () => {
  // const [data, loading, error] = useData('/');

  // if (error) return <h1>An error has occurred: {error.message}</h1>;
  // if (loading) return <h1>Loading...</h1>;

  return (
    <div className = 'container' style={{backgroundColor: '#f1ffe0', fontFamily: 'GoogleFont'}}>
    <div className='container' style={{backgroundColor: '#f1ffe0', fontFamily: 'ALBA', color: '#52007a'}} >
      <Banner title="TaskHub"/>
      
      {/* <BrowserRouter>
        <Routes>
          <Route path='/' element={<CourseList courses={ schedule.courses } />} />
          <Route path='/edit' element={ <EditForm /> } />
        </Routes>
      </BrowserRouter> */}
    </div>
    <AssignmentForm />
    </div>
  );
};

// Banner component
const Banner = ({ title }) => (
  <h1>{ title }</h1>
  
);

export default App;
