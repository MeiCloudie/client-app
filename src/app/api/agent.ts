import axios, { AxiosResponse } from 'axios'
import { Mission, MissionFormValues } from '../models/Mission'
import { Project, ProjectFormValues } from '../models/Project'
import { Group, GroupFormValues } from '../models/Group'
import { ChangePasswordFormValues, User, UserFormValues } from '../models/User'
import { CommentFormValues } from '../models/Comment'
import { Process, ProcessFormValues } from '../models/Process'
import { store } from '../stores/store'
import Profile from '../models/Profile'
import Member from '../models/Member'

axios.defaults.baseURL = 'https://plantogetherdotnetapi.azurewebsites.net/api'

const responseBody = <T>(response : AxiosResponse<T>) => response.data

axios.interceptors.request.use(config => {
    const token = store.commonStore.token
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`
    return config
})

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
    patch: <T>(url: string, body?: {}) => axios.patch<T>(url, body).then(responseBody),
}

const Account : any = {
    current: () => requests.get<User>('/Account'),
    login: (user: UserFormValues) => requests.post<User>('/Account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/Account/register', user),
    changePassword: (changePasswordValues: ChangePasswordFormValues) => requests.post('/Account/change-password', changePasswordValues),
    profile: (name: string) => requests.get<Profile>(`/Account/profile/${name}`)
}

const Missions = {
    list: () => requests.get<Mission[]>('/Missions'),
    details: (id: string) => requests.get<Mission>(`/Missions/${id}`),
    create: (mission: MissionFormValues) => requests.post('/Missions', mission),
    update: (id: string, mission: MissionFormValues) => requests.put(`/Missions/${id}`, mission),
    delete: (id: string) => requests.delete(`/Missions/${id}`),
    memberList: (id: string) => requests.get<Member[]>(`/Missions/${id}/Members`),
    addMember: (id: string, userName: string) => requests.patch(`/Missions/${id}/add-member/${userName}`),
    removeMember: (id: string, userName: string) => requests.patch(`/Missions/${id}/remove-member/${userName}`),
}

const Projects = {
    list: () => requests.get<Project[]>('/Projects'),
    details: (id: string) => requests.get<Project>(`/Projects/${id}`),
    create: (project: ProjectFormValues) => requests.post('/Projects', project),
    update: (id: string, project: ProjectFormValues) => requests.put(`/Projects/${id}`, project),
    delete: (id: string) => requests.delete(`/Projects/${id}`),
    missionList: (name: string) => requests.get<Mission[]>(`/Projects/${name}/Missions`),
    processList: (name: string) => requests.get<Process[]>(`/Projects/${name}/Processes`)
}

const Groups = {
    list: () => requests.get<Group[]>('/Groups'),
    details: (id: string) => requests.get<Group>(`/Groups/${id}`),
    create: (group: GroupFormValues) => requests.post('/Groups', group),
    update: (id: string, group: GroupFormValues) => requests.put(`/Groups/${id}`, group),
    delete: (id: string) => requests.delete(`/Groups/${id}`),
    projectList: (name: string) => requests.get<Project[]>(`/Groups/${name}/Projects`),
    memberList: (name: string) => requests.get<Member[]>(`/Groups/${name}/Members`)
}

const Comments = {
    list: () => requests.get<Comment[]>('/Comment'),
    details: (id: string) => requests.get<Comment>(`/Comments/${id}`),
    create: (comment: CommentFormValues) => requests.post('/Comments', comment),
    update: (id: string, comment: CommentFormValues) => requests.put(`/Comments/${id}`, comment),
    delete: (id: string) => requests.delete(`/Comments/${id}`)
}

const Processes = {
    list: () => requests.get<Process[]>('/Processes'),
    details: (id: string) => requests.get<Process>(`/Processes/${id}`),
    create: (process: ProcessFormValues) => requests.post('/Processes', process),
    update: (id: string, process: ProcessFormValues) => requests.put(`/Processes/${id}`, process),
    delete: (id: string) => requests.delete(`/Processes/${id}`)
}

const agent = {
    Account,
    Missions,
    Projects,
    Groups,
    Comments,
    Processes
}

export default agent