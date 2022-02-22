import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import ActivityList from '../dashboard/ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface Props {
    activities: Activity[];
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default observer(function ActivityDashboard({
    activities, deleteActivity, submitting, createOrEdit }: Props) {
    const { activityStore } = useStore();
    const { selectedactivity, editMode } = activityStore;
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities}
                    deleteActivity={deleteActivity}
                    submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedactivity && !editMode &&
                    <ActivityDetails />}
                {editMode &&
                    <ActivityForm
                        createOrEdit={createOrEdit}
                        submitting={submitting} />}
            </Grid.Column>
        </Grid>
    )
})