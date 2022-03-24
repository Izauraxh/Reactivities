import React, { useEffect, useState } from 'react';
import NavBar from '../layout/NavBar';
import LoadingComponents from '../layout/LoadingComponents';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Container } from 'semantic-ui-react';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';




function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])



  
  if (activityStore.loadingInitial) return <LoadingComponents content='Loading app' />
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>

        <ActivityDashboard />
      </Container>

    </>
  );
}

export default observer(App);
