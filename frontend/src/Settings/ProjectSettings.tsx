import {AsyncSelect} from "@atlaskit/select";
import React from "react";
import {OptionTypeBase} from "react-select/src/types";
import Button from "@atlaskit/button";
import {Project} from "../api/Settings";
import {Option} from "../api/Option";
import JiraUser from "../jira/JiraUser";
import JiraProject from "../jira/JiraProject";
import {getProjects, getUsersByProject} from "../jira/JiraApi";

type ProjectSettingsType = {
    project: Project,
    onChange: (project: Project) => void,
    onRemove: () => void,
}

export const ProjectSettings = ({project, onChange, onRemove}: ProjectSettingsType) => {
    const onChangeUsers = (e: Option<JiraUser>[]) => {
        let newUsers: JiraUser[] = [];
        if (e) {
            newUsers = Object.values(e).map((user: any) => new JiraUser(user.label, user.value));
        }
        onChange(new Project(project.jiraProject, newUsers))
    };

    const onChangeProjects = (e: Option<JiraProject>) => {
        onChange(new Project(e.object, project.users))
    };

    return <div className={"row"}>
        <label>{"Project"}</label>
        <AsyncSelect name={"project"}
                     value={Option.fromProject(project.jiraProject)}
                     loadOptions={queryProjects}
                     onChange={(e) => onChangeProjects(e as Option<JiraProject>)}
                     isSearchable={true}/>

        <label>{"Users"}</label>
        <AsyncSelect name={"users"}
                     isMulti={true}
                     value={project.users.map((user) => Option.fromUser(user))}
                     loadOptions={(query: string) => queryUsers(query, project.jiraProject.key)}
                     onChange={(e) => onChangeUsers(e as Option<JiraUser>[])}
                     isSearchable={true}/>
        <div className="row">
            <Button onClick={onRemove}>-</Button>
        </div>
    </div>
}

const queryProjects = (query: string): Promise<OptionTypeBase[]> => {
    return getProjects(query)
        .then((projects) => {
            return projects.map(project => Option.fromProject(project))
        });
}

const queryUsers = (query: string, projectKey: string): Promise<OptionTypeBase[]> => {
    return getUsersByProject(query, projectKey)
        .then((users) => users.map(user => ({label: user.displayName, value: user.accountId})));
}