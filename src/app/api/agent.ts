import axios, { AxiosResponse } from 'axios'
import { Mission, MissionFormValues } from '../models/Mission'
import { Project } from '../models/Project'
import { Group } from '../models/Group'
import { User, UserFormValues } from '../models/User'

axios.defaults.baseURL = 'https://plantogetherdotnetapi.azurewebsites.net/api'

const responseBody = <T>(response : AxiosResponse<T>) => response.data

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string, body: {}) => axios.delete<T>(url, body).then(responseBody),
    patch: <T>(url: string, body: {}) => axios.patch<T>(url, body).then(responseBody),
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user),
}

const Missions = {
    list: () => requests.get<Mission[]>('/Missions'),
    details: (id: string) => requests.get<Mission>(`/Missions/${id}`),
    create: (mission: MissionFormValues) => requests.post('/Missions', mission),
    update: (id: string, mission: MissionFormValues) => requests.put(`/Missions/${id}`, mission)
}

const Projects = {
    list: () => requests.get<Project[]>('/Projects'),
    details: (id: string) => requests.get<Project>(`/Projects/${id}`),
}

const Groups = {
    list: () => requests.get<Group[]>('/Groups'),
    details: (id: string) => requests.get<Group>(`/Groups/${id}`),
}

const agent = {
    Account,
    Missions,
    Projects,
    Groups
}

export default agent