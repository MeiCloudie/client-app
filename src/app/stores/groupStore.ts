import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Group, GroupFormValues } from "../models/Group";
import agent from "../api/agent";

export default class GroupStore {
  groups: Group[] = new Array<Group>();
  selectedGroup: Group | undefined = undefined;
  isLoading = false

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.selectedGroup,
      (group) => {
        console.log("This is the group: " + group);
      }
    );
    reaction(
      () => this.groups,
      () => {
        console.log("Group list change");
      }
    );
  }

  get groupList() {
    return this.groups;
  }

  get currentGroup() {
    return this.selectedGroup
  }

  loadGroups = async () => {
    this.isLoading = true
    try {
      const groups = await agent.Groups.list();
      runInAction(() => {
        this.groups = groups;
      });
    } catch (error) {
      console.log(error);
    }
    finally {
      this.isLoading = false
    }
  };

  loadGroup = async (id: string) => {
    this.isLoading = true
    try {
      const group = await agent.Groups.details(id);
      runInAction(() => {
        this.selectedGroup = group;
      });
      return group;
    } catch (error) {
      console.log(error);
    }
    finally {
      this.isLoading = false
    }
  };

  loadProjects = async (name: string, forSelectedGroup: boolean = false) => {
    this.isLoading = true
    try {
      const projects = await agent.Groups.projectList(name);
      runInAction(() => {
        if (!forSelectedGroup) {

          const group = this.groups.find(x => x.name === name)
          if (group?.projects === undefined)
            group!.projects = [...projects]
        }
        else {
          this.selectedGroup!.projects = [...projects]
        }
      })
    } catch (error) {
      console.log(error)
    }
    finally {
      this.isLoading = false
    }
  }

  loadProjectsForGroups = async () => {
    this.isLoading = true
    try {
      const promises = this.groupList.map((g) => this.loadProjects(g.name));
      await Promise.all(promises);

    }
    catch (error) {
      console.log(error)
    }
    finally {
      this.isLoading = false
    }
  }

  createGroup = async (groupFormValues: GroupFormValues) => {
    try {
      await agent.Groups.create(groupFormValues);
      const newGroup = new Group(groupFormValues);
      runInAction(() => {
        this.selectedGroup = newGroup;
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateGroup = async (id: string, groupFormValues: GroupFormValues) => {
    try {
      await agent.Groups.update(id, groupFormValues);
      const updateGroup = new Group(groupFormValues);
      runInAction(() => {
        this.selectedGroup = updateGroup;
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteGroup = async (id: string) => {
    try {
      await agent.Groups.delete(id);
      runInAction(() => {
        this.selectedGroup = undefined;
      });
    } catch (error) {
      console.log(error);
    }
  };
}
