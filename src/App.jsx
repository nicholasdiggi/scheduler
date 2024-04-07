import React, { useState } from 'react';
import './App.css';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
// import { addScheduleTimes } from './utilities/times.js';
// import CourseList from './components/CourseList.jsx';
import { useData } from './utilities/firebase.js';
// import EditForm from './components/EditForm.jsx';
import AssignmentForm from './components/AssignmentForm.jsx';
import './fonts/fonts.css';
import AssignmentTable from './components/AssignmentTable.jsx';
import { addAssignmentsInfo } from './utilities/priority.js';


const queryClient = new QueryClient();

const App = () => (
  <div style={{backgroundColor: '#bd93bd', minHeight: '100vh'}} >
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  </div>
);

const Main = () => {
  const [data, loading, error] = useData('/', addAssignmentsInfo);

  if (error) return <h1>An error has occurred: {error.message}</h1>;
  if (loading) return <h1>Loading...</h1>;

  return (
    <div className='container' style={{backgroundColor: '#f1ffe0', fontFamily: 'GoogleFont'}}>
      <div className='container' style={{backgroundColor: '#f1ffe0', fontFamily: 'ALBA', color: '#52007a'}} >
        <Banner title={data.title} />
      </div>
      <AssignmentForm />
      <AssignmentTable assignments={data.assignments} />
    </div>
  );
};

// Banner component
const Banner = ({ title }) => (
  <h1>{ title }</h1>
  
);

export default App;
