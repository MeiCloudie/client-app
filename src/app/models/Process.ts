import { Project } from "./Project";

export interface Process {
  id: string
  title: string;
  description: string;
  isDone: boolean;
  projectId: string;
  project: Project;
}

export class Process implements Process {
  id = "";
  title = "";
  description = "";
  isDone = false
  constructor(init?: ProcessFormValues) {
    Object.assign(this, init);
  }
}

export class ProcessFormValues {
  id?: string = ""
  title?: string = "";
  description?: string = "";
  projectName: string = ""
  constructor(process?: Process) {
    if (process) {
      this.title = process.title;
      this.description = process.description;
    }
  }
}
