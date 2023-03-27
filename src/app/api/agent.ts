import axios, { AxiosResponse } from 'axios'
import Mission from '../models/Mission'

axios.defaults.baseURL = 'https://plantogetherdotnetapi.azurewebsites.net/api'

const responseBody = <T>(response : AxiosResponse<T>) => response.data

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string, body: {}) => axios.delete<T>(url, body).then(responseBody),
    patch: <T>(url: string, body: {}) => axios.patch<T>(url, body).then(responseBody),
}

const Missions = {
    list: () => requests.get<Mission[]>('/Missions'),
    details: (id: string) => requests.get<Mission>(`/Missions/${id}`),
    create: (mission: Mission) => requests.post('/Missions', mission)
}

const agent = {
    Missions
}

export default agent