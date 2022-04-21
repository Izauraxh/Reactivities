import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity, ActivityFormValues } from "../models/activity";
import { Profile } from "../models/profile";
import { store } from "./store";



export default class ActivityStore {


    activityRegistry = new Map<string, Activity>();
    selectedactivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
            a.date!.getTime() - b.date!.getTime());
    }
    get groupedActivities() {
        return Object.entries(this.activitiesByDate.reduce((activities, activity) => {
            const date = format(activity.date!, 'dd MMM yyyy');
            activities[date] = activities[date] ? [...activities[date], activity] : [activity];
            return activities;
        }, {} as { [key: string]: Activity[] })
        )
    }
    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();

            activities.forEach(activity => { this.setActivity(activity); })
            this.setLoadingInitial(false);
        }
        catch (error) {
            console.log(error)
            this.setLoadingInitial(false);

        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedactivity = activity;
            return activity;
        }
        else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedactivity = activity;
                })

                this.setLoadingInitial(false);
                return activity;
            }
            catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }

    }
    private setActivity = (activity: Activity) => {
        const user = store.userStore.user;
        if (user) {
            activity.isGoing = activity.attendees!.some(a => a.username === user.username);
            activity.isHost = activity.hostUsername === user.username;
            activity.host = activity.attendees?.find(x => x.username === activity.hostUsername);

        }
        activity.date = new Date(activity.date!);
        this.activityRegistry.set(activity.id, activity);
    }
    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createActivity = async (activity: ActivityFormValues) => {
        const user = store.userStore.user;
        const atendee = new Profile(user!);
        try {
            await agent.Activities.create(activity);
            const newActivity = new Activity(activity);
            newActivity.hostUsername = user!.username;
            newActivity.attendees = [atendee];
            this.setActivity(newActivity);
            runInAction(() => {

                this.selectedactivity = newActivity;
            })

        }
        catch (error) {
            console.log(error);

        }

    }
    updateActivity = async (activity: ActivityFormValues) => {

        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                if (activity.id) {
                    let updatedActivity = { ...this.getActivity(activity.id), ...activity }
                    this.activityRegistry.set(activity.id, updatedActivity as Activity);
                    this.selectedactivity = updatedActivity as Activity;
                }

            })
        }
        catch (error) {
            console.log(error);

        }
    }
    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }

    }
    updateAttendance = async () => {
        const user = store.userStore.user;
        this.loading = true;
        try {
            await agent.Activities.attend(this.selectedactivity!.id);
            runInAction(() => {
                if (this.selectedactivity?.isGoing) {
                    this.selectedactivity.attendees = this.selectedactivity.attendees?.filter(a => a.username !== user?.username);
                    this.selectedactivity.isGoing = false;

                }
                else {
                    const attendee = new Profile(user!);
                    this.selectedactivity?.attendees?.push(attendee);
                    this.selectedactivity!.isGoing = true;
                }
                this.activityRegistry.set(this.selectedactivity!.id, this.selectedactivity!)
            })
        }
        catch (error) {
            console.log(error);
        }
        finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    cancelActivityToggle = async () => {
        this.loading = true;
        try {
          await agent.Activities.attend(this.selectedactivity!.id);
           runInAction(()=>{
               this.selectedactivity!.isCancelled =!this.selectedactivity?.isCancelled;
               this.activityRegistry.set(this.selectedactivity!.id,this.selectedactivity!);
           })
        }
        catch (error) {
            console.log(error);
        }
        finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}