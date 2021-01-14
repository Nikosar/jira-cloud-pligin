import {AP} from "./AP";
import JiraProject from "./JiraProject";
import JiraUser from "./JiraUser";

const MAX_RESULTS = 10;

type JiraResponse = {
    body: string
}
type Page<T> = {
    values: T[]
}

const body = <T>(response: JiraResponse): T => JSON.parse(response.body)

export function getProjects(query: string): Promise<JiraProject[]> {
    return AP.request({
        url: `/rest/api/3/project/search?query=${query}&maxResults=${MAX_RESULTS}`,
        type: "GET",
        headers: {
            'Accept': 'application/json'
        }
    })
        .then((response: JiraResponse) => body<Page<JiraProject>>(response))
        .then((body: Page<JiraProject>) => body.values)
}

export function getUsersByProject(query: string, projectKey: string): Promise<JiraUser[]> {
    return AP.request({
        url: `/rest/api/3/user/viewissue/search?query=${query}&projectKey=${projectKey}`,
        type: "GET",
        headers: {
            'Accept': 'application/json'
        }
    })
        .then((response: JiraResponse) => body<JiraUser[]>(response))
}

export function evaluateJiraExpression(expression: string): Promise<string> {
    return AP.request({
        url: `/rest/api/2/expression/eval`,
        type: "POST",
        contentType: 'application/json',
        headers: {
            'Accept': 'application/json',
        },
        data: JSON.stringify({"expression": expression})
    })
        .then((response: JiraResponse) => body<string>(response))
}