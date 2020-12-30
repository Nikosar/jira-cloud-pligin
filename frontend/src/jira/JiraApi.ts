import {AP} from "./AP";
import JiraProject from "./JiraProject";
import JiraUser from "./JiraUser";

export function getProjects(query: string): Promise<JiraProject[]> {
    return AP.request({
        url: `/rest/api/3/project/search?query=${query}`,
        type: "GET",
        headers: {
            'Accept': 'application/json'
        }
    })
        .then((response: any) => JSON.parse(response.body))
        .then((body: any) => Object.values(body.values))
}

export function getUsersByProject(query: string, projectKey: string): Promise<JiraUser[]> {
    return AP.request({
        url: `/rest/api/3/user/viewissue/search?query=${query}&projectKey=${projectKey}`,
        type: "GET",
        headers: {
            'Accept': 'application/json'
        }
    })
        .then((response: any) => JSON.parse(response.body))
        .then((body: any) => Object.values(body))
}