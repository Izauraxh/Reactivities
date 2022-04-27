import React, { useState } from "react";
import { Button, Grid, Header, Input, Label, Tab } from "semantic-ui-react";
import MyTextArea from "../../app/common/form/MyTextArea";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";
interface Props {
    profile: Profile;
}
export default function ProfileAbout({profile}:Props){
    const {profileStore:{isCurrentUser}}=useStore();
    const [addEditMode, setAddEditMode] = useState(false);
    return(
        <Tab.Pane>
        <Grid>
        <Grid.Column width={16}>
                    <Header floated='left' icon='bio' content='About' />
                    {isCurrentUser && (
                        <Button floated="right" basic
                            content={addEditMode ? 'Cancel' : 'Edit'}
                            onClick={() => setAddEditMode(!addEditMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                {addEditMode ? (<>
                <MyTextInput name="displayname" label="Display Name" type="text" placeholder={profile.displayName}/>
                <MyTextArea name="bio" rows={5} placeholder={profile.bio || 'bio'} /> 
                </>
                ) :
                <Label>Display</Label>}
                </Grid.Column>

        </Grid>
         
        </Tab.Pane>
      
    
    )
}