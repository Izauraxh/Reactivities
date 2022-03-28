import React from 'react';
import NavBar from '../layout/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';


function App() {
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <Route exact path='/' component={HomePage}></Route>
        <Route exact path='/activities' component={ActivityDashboard}></Route>
        <Route path='/activities/:id' component={ActivityDetails}></Route>
        <Route path={['/createActivity','/manage/:id']} component={ActivityForm}></Route>
      </Container>
    </>
  );
}

export default observer(App);
