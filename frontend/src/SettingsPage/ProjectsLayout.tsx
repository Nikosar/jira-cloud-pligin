import {Project, Settings} from "../api/Settings";
import {ProjectSettings} from "./ProjectSettings";
import React from "react";
import Button from "@atlaskit/button";

type ProjectsLayoutType = {
    projects: Project[],
    setProjects: (value: (oldProjects: Project[]) => Project[]) => void
}

export const ProjectsLayout = ({projects, setProjects}: ProjectsLayoutType) => {
    const appendProject = () => {
        setProjects(oldProjects => [...oldProjects, new Project()])
    }

    const changeProject = (project: Project, elementIndex: number) => {
        setProjects(oldProjects => {
            let newProjects = [...oldProjects]
            newProjects[elementIndex] = project;
            return newProjects;
        })
    }

    const removeProject = (elementIndex: number) => {
        setProjects(oldProjects =>
            oldProjects.filter((value, index) => index !== elementIndex))
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