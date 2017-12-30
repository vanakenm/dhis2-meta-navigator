import React, { Component } from "react";
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import Api from "./lib/Api";

const imageStyle = {
    height: "20px"
};

class NavigationBar extends Component {
    render() {
        return (
          <AppBar position="static">
            <Toolbar>
                <a href={Api.baseUrl}>
                    <img
                        src={`${Api.baseUrl}/api/26/staticContent/logo_banner`}
                        style={imageStyle}
                        alt="dhis2"
                    />
                </a>
                <Typography type="DHIS2 Analyzer App" color="inherit" className={{flex: 1}}>
                    DHIS2 Analyzer App
                </Typography>
            </Toolbar>
          </AppBar>
        );
    }
}

export default NavigationBar;
