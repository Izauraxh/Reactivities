import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore {

    activities: Activity[] = [];
    selectedactivity: Activity | null = null;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach(activity => {
                    activity.date = activity.date.split('T')[0];
                    this.activities.push(activity);
                })
                this.loadingInitial = false;
            })


        }
        catch (error) {
            console.log(error)
            runInAction(()=>{
                     this.loadingInitial = false; 
            })
      
        }
    }
    setLoadingActivity(){
        
    }



}