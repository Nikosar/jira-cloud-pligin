import JiraProject from "../jira/JiraProject";
import JiraUser from "../jira/JiraUser";

export class Settings {
    name: string;
    projects: Project[];
    flag: boolean;

    constructor(name: string, projects: Project[], flag: boolean) {
        this.name = name;
        this.projects = projects;
        this.flag = flag;
    }
}

export class Project {
    jiraProject: JiraProject
    users: JiraUser[]

    constructor(jiraProject: JiraProject = new JiraProject(), users: JiraUser[] = []) {
        this.jiraProject = jiraProject;
        this.users = users;
    }
}

