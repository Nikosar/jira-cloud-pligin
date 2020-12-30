import PageHeader from "@atlaskit/page-header";
import Textfield from "@atlaskit/textfield";
import Checkbox from "@atlaskit/checkbox";
import Button from "@atlaskit/button";
import React, {useEffect, useState} from "react";
import {Project, Settings} from "../api/Settings";
import {getSettings, postSettings} from "../api/AppApi";
import JiraProject from "../jira/JiraProject";
import {ProjectsLayout} from "./ProjectsLayout";
import './Settings.css';

const initialState = new Settings("", [new Project(new JiraProject(), [])], false)

export const SettingsPage = () => {
    const [settings, setSettings] = useState<Settings>(initialState);

    useEffect(() => {
        getSettings().then(settings => {
            setSettings(settings)
        })
    }, [])

    const setSetting = (name: string, value: any) => {
        setSettings(prevState => ({
            ...prevState, [name]: value
        }))
    }

    const submit = () => {
        postSettings(settings).then()
    }

    return <div className={"settings"}>
        <PageHeader>Settings</PageHeader>
        <div className={"row"}>
            <label>Name</label>
            <Textfield name={"name"}
                       label={"Name"}
                       isCompact={true}
                       value={settings.name}
                       onChange={(e: any) => setSetting("name", e.target.value)}/>
        </div>
        <div className={"row"}>
            <Checkbox name={"flag"}
                      isChecked={settings.flag}
                      onChange={(e: any) => setSetting("flag", e.target.checked)}
                      label={"Flag"}/>
        </div>
        <ProjectsLayout projects={settings.projects}
                        setSettings={(stateMutationFunc: (prevState: Settings) => Settings) =>
                            setSettings(stateMutationFunc)
                        }/>
        <div className={"button-block"}>
            <Button appearance="primary" onClick={submit}>Save</Button>
        </div>
    </div>
}