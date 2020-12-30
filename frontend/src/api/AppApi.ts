import {Settings} from "./Settings";
import {authorizationHeaderValue} from "../jira/AP";

export async function postSettings(settings: Settings) {
    return fetch("/settings", {
        method: "PUT",
        headers: {
            "Authorization": await authorizationHeaderValue(),
            'Content-Type': "application/json"
        },
        body: JSON.stringify(settings)
    })
}

export async function getSettings(): Promise<Settings> {
    return fetch("/settings", {
        "headers": {
            "Authorization": await authorizationHeaderValue()
        }
    }).then(resp => resp.json())
}