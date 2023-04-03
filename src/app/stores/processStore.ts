import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Process, ProcessFormValues } from "../models/Process";
import agent from "../api/agent";

export default class ProcessStore {
    processes: Process[] = new Array<Process>();
    selectedProcess: Process | undefined = undefined;
    isLoading: boolean = false

    constructor() {
        makeAutoObservable(this);
        reaction(
            () => this.selectedProcess,
            (Process) => {
                console.log("This is the Process: " + Process);
            }
        );
        reaction(
            () => this.processes,
            () => {
                console.log("Process list change");
            }
        );
    }

    get processList() {
        return this.processes;
    }

    loadProcesss = async () => {
        this.isLoading = true
        try {
            const processes = await agent.Processes.list();
            runInAction(() => {
                this.processes = processes;
            });
        } catch (error) {
            console.log(error);
        }
        finally {
            this.isLoading = false
        }
    };

    loadProcess = async (id: string) => {
        this.isLoading = true
        try {
            const process = await agent.Processes.details(id);
            runInAction(() => {
                this.selectedProcess = process;
            });
            return process;
        } catch (error) {
            console.log(error);
        }
        finally {
            this.isLoading = false
        }
    };

    createProcess = async (processFormValues: ProcessFormValues) => {
        try {
            await agent.Processes.create(processFormValues);
            const newProcess = new Process(processFormValues);
            runInAction(() => {
                this.selectedProcess = newProcess;
            });
        } catch (error) {
            console.log(error);
        }
    };

    updateProcess = async (id: string, processFormValues: ProcessFormValues) => {
        try {
            await agent.Processes.update(id, processFormValues);
            const updateProcess = new Process(processFormValues);
            runInAction(() => {
                this.selectedProcess = updateProcess;
            });
        } catch (error) {
            console.log(error);
        }
    };

    deleteProcess = async (id: string) => {
        try {
            await agent.Processes.delete(id);
            runInAction(() => {
                this.selectedProcess = undefined;
            });
        } catch (error) {
            console.log(error);
        }
    };
}
