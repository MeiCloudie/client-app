import { Project } from "./Project";

export interface Process {
  title: string;
  description: string;
  isDone: boolean;
  projectId: string;
  project: Project;
}

export class Process implements Process {
  title = "";
  description = "";
  constructor(init?: ProcessFormValues) {
    Object.assign(this, init);
  }
}

export class ProcessFormValues {
  title?: string = "";
  description?: string = "";
  constructor(process?: Process) {
    if (process) {
      this.title = process.title;
      this.description = process.description;
    }
  }
}
