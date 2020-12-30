import {Project, Settings} from "../api/Settings";
import {ProjectSettings} from "./ProjectSettings";
import React from "react";
import Button from "@atlaskit/button";

type ProjectsLayoutType = {
    projects: Project[],
    setSettings: (value: (prevState: Settings) => Settings) => void
}

export const ProjectsLayout = ({projects, setSettings}: ProjectsLayoutType) => {
    const appendProject = () => {
        setSettings(prevState => {
            return {
                ...prevState,
                projects: [...prevState.projects, new Project()]
            }
        })
    }

    const changeProject = (project: Project, elementIndex: number) => {
        setSettings(prevState => {
            let newProjects = [...prevState.projects]
            newProjects[elementIndex] = project;
            return {...prevState, projects: newProjects};
        })
    }

    const removeProject = (elementIndex: number) => {
        setSettings(prevState => {
            let newProjects = prevState.projects.filter((value, index) => index !== elementIndex);
            return {...prevState, projects: newProjects}
        })
    }

    const createProjects = (projects: Project[]) => {
        return projects.map((project, index) => {
            return <ProjectSettings project={project}
                                    key={index}
                                    onChange={(project) => changeProject(project, index)}
                                    onRemove={() => removeProject(index)}/>
        })
    }

    return <div>
        {createProjects(projects)}
        <div className={"row"}>
            <Button appearance="primary" onClick={appendProject}>+</Button>
        </div>
    </div>;
}