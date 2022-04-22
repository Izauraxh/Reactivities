import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Card,Image, Header, Tab, Grid, Button } from "semantic-ui-react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import { Profile } from "../../app/models/profile";
import ProfileStore from "../../app/stores/profileStore";
import { useStore } from "../../app/stores/store";
interface Props {
    profile : Profile;
}
export default observer( function ProfilePhotos({profile}:Props){
    const {profileStore:{isCurrentUser}}= useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
  return (
    <Tab.Pane>
        <Grid>
            <Grid.Column width={16}>
            <Header floated='left' icon='image' content='photos'/>
            {isCurrentUser && (
                <Button floated="right" basic 
                content={addPhotoMode? 'Cancel' : 'Add Photo'}
                onClick={()=> setAddPhotoMode(!addPhotoMode)}
                />
            )}
            </Grid.Column>
            <Grid.Column width={16}>
             {addPhotoMode ? (<PhotoUploadWidget/>) :
             
             (  <Card.Group itemsPerRow={5}>
            {profile.photos?.map(photo =>(
                <Card key={photo.id}>
                <Image src={photo.url}/>
            </Card> 
            ))}       
            
        </Card.Group>)}
            </Grid.Column>
   
        </Grid>
       
      
    </Tab.Pane>
  )
})