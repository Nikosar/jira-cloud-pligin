import {OptionType} from "@atlaskit/select";
import JiraProject from "../jira/JiraProject";
import JiraUser from "../jira/JiraUser";

export class Option<T> implements OptionType {
    label: string;
    value: string | number;
    object: T;

    constructor(label: string = "", value: string | number = "", object: T) {
        this.label = label;
        this.value = value;
        this.object = object
    }

    static fromProject(project: JiraProject): Option<JiraProject> {
        return new Option(project.name, project.id, project)
    }

    static fromUser(user: JiraUser): Option<JiraUser> {
        return new Option<JiraUser>(user.displayName, user.accountId, user)
    }
}