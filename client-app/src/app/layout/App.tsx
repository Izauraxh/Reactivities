import React from 'react';
import NavBar from '../layout/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';


function App() {
  const location = useLocation();
  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar/>
     <Route exact path='/' component={HomePage}/>
     <Route 
     path={'/(.+)'}
     render = {()=> (
       <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>       
        <Route exact path='/activities' component={ActivityDashboard}></Route>
        <Route path='/activities/:id' component={ActivityDetails}></Route>
        <Route key={location.key} path={['/createActivity','/manage/:id']} component={ActivityForm}></Route>
        <Route path='/errors' component={TestErrors}></Route>
      </Container>
       </>
     )}
     />
      
    </>
  );
}

export default observer(App);
