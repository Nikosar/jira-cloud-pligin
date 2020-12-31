import React from 'react';
import './App.css';
import {SettingsPage} from "./SettingsPage/SettingsPage";
import {BrowserRouter, Route} from "react-router-dom";
import {Switch} from 'react-router';

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
    return <h1>ЫЫЫЫЫ</h1>
}

export default App;


