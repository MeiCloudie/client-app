import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Project, ProjectFormValues } from "../models/Project";
import agent from "../api/agent";

export default class ProjectStore {
  projects: Project[] = new Array<Project>();
  selectedProject: Project | undefined = undefined;
  isLoading: boolean = false

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.selectedProject,
      (project) => {
        console.log("This is the project: " + project);
      }
    );
    reaction(
      () => this.projects,
      () => {
        console.log("Project list change");
      }
    );
  }

  get projectList() {
    return this.projects;
  }

  loadProjects = async () => {
    this.isLoading = true
    try {
      const projects = await agent.Projects.list();
      runInAction(() => {
        this.projects = projects;
      });
    } catch (error) {
      console.log(error);
    }
    finally {
      this.isLoading = false
    }
  };

  loadProject = async (id: string) => {
    this.isLoading = true
    try {
      const project = await agent.Projects.details(id);
      runInAction(() => {
        this.selectedProject = project;
      });
      return project;
    } catch (error) {
      console.log(error);
    }
    finally {
      this.isLoading = false
    }
  };

  loadProcesses = async () => {
    this.isLoading = true
    try {
      const processes = await agent.Projects.processList(this.selectedProject!.name);
      runInAction(() => {
          this.selectedProject!.processes = [...processes]
      })
    } catch (error) {
      console.log(error)
    }
    finally {
      this.isLoading = false
    }
  }

  createProject = async (projectFormValues: ProjectFormValues) => {
    try {
      await agent.Projects.create(projectFormValues);
      const newProject = new Project(projectFormValues);
      runInAction(() => {
        this.selectedProject = newProject;
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateProject = async (id: string, projectFormValues: ProjectFormValues) => {
    try {
      await agent.Projects.update(id, projectFormValues);
      const updateProject = new Project(projectFormValues);
      runInAction(() => {
        this.selectedProject = updateProject;
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteProject = async (id: string) => {
    try {
      await agent.Projects.delete(id);
      runInAction(() => {
        this.selectedProject = undefined;
      });
    } catch (error) {
      console.log(error);
    }
  };
}
