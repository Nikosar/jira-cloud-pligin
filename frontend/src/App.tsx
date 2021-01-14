import React, {useState} from 'react';
import './App.css';
import {SettingsPage} from "./SettingsPage/SettingsPage";
import {BrowserRouter, Route} from "react-router-dom";
import {Switch} from 'react-router';
import {evaluateJiraExpression} from "./jira/JiraApi";
import TextArea from '@atlaskit/textarea';
import Button from "@atlaskit/button";
import PageHeader from "@atlaskit/page-header";
import Page, {Grid, GridColumn} from "@atlaskit/page";

function App() {
    return (
        <BrowserRouter>
            <div className={"content"}>
                <Switch>
                    <Route path={"/app/settings"} component={SettingsPage}/>
                    <Route path={"/app/hello1"} component={Component}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

const Component = () => {

    const [text, setText] = useState<string>("")
    const [resp, setResp] = useState<string>("")

    const evaluate = () => {
        evaluateJiraExpression(text)
            .then((resp) => setResp(JSON.stringify(resp, null, 2)))
            .catch((err) => setResp(JSON.stringify(JSON.parse(err.xhr.responseText), null, 2)));
    }

    return <div>
        <Page>
            <PageHeader>Evaluate jira expression</PageHeader>
            <Grid>
                <GridColumn medium={6}>
                    <TextArea value={text} onChange={(e: any) => setText(e.target.value)}/>
                    <Button onClick={evaluate}>Evaluate</Button>
                </GridColumn>
                <GridColumn medium={6}>
                    <TextArea value={resp} isDisabled={true}/>
                </GridColumn>
            </Grid>
        </Page>
    </div>
}

export default App;


