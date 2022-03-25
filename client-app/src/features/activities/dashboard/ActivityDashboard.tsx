import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponents from "../../../app/layout/LoadingComponents";

import { useStore } from "../../../app/stores/store";
import ActivityList from '../dashboard/ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';


export default observer(function ActivityDashboard() {
    const { activityStore } = useStore();
    const { selectedactivity, editMode } = activityStore;


    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore])


    if (activityStore.loadingInitial) return <LoadingComponents content='Loading app' />
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedactivity && !editMode &&
                    <ActivityDetails />}
                {editMode &&
                    <ActivityForm />}
            </Grid.Column>
        </Grid>
    )
})