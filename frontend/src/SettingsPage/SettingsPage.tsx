import PageHeader from "@atlaskit/page-header";
import Textfield from "@atlaskit/textfield";
import Checkbox from "@atlaskit/checkbox";
import Button from "@atlaskit/button";
import React, {useEffect, useState} from "react";
import {Project, Settings} from "../api/Settings";
import {getSettings, postSettings} from "../api/AppApi";
import JiraProject from "../jira/JiraProject";
import {ProjectsLayout} from "./ProjectsLayout";
import './SettingsPage.css';
import Page, {Grid, GridColumn} from "@atlaskit/page";

const initialState = new Settings("", [new Project(new JiraProject(), [])], false)

export const SettingsPage = () => {
    const [settings, setSettings] = useState<Settings>(initialState);

    useEffect(() => {
        getSettings().then(settings => {
            setSettings(settings)
        }).catch((e) => setSettings(initialState))
    }, [])

    const setSetting = (name: string, value: any) => {
        setSettings(prevState => ({
            ...prevState, [name]: value
        }))
    }

    const setProjects = (newProjects: (oldProjects: Project[]) => Project[]) => {
        setSettings(prevState => ({
            ...prevState,
            projects: newProjects(prevState.projects)
        }))
    }

    const submit = () => {
        postSettings(settings).then()
    }

    return <div>
        <Page>
            <Grid>
                <GridColumn medium={6}>
                    <PageHeader>Settings</PageHeader>
                    <div className={"row"}>
                        <label>Name</label>
                        <Textfield name={"name"}
                                   label={"Name"}
                                   isCompact={true}
                                   value={settings.name}
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSetting("name", e.target.value)}/>
                    </div>
                    <div className={"row"}>
                        <Checkbox name={"flag"}
                                  isChecked={settings.flag}
                                  onChange={(e) => setSetting("flag", e.target.checked)}
                                  label={"Flag"}/>
                    </div>
                    <ProjectsLayout projects={settings.projects}
                                    setProjects={setProjects}/>
                    <div className={"button-block"}>
                        <Button appearance="primary" onClick={submit}>Save</Button>
                    </div>
                </GridColumn>
            </Grid>
        </Page>
    </div>
}