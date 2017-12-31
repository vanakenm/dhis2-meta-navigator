import React, { Component } from "react";
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import Api from "./lib/Api";

const imageStyle = {
    height: "20px"
};

class NavigationBar extends Component {
    render() {
        const classes = {
            flex: 1,
            margin: "auto"
        };

        return (
          <AppBar position="static">
            <Toolbar>
                <IconButton color="contrast" aria-label="Menu">
                <a href={Api.baseUrl}>
                    <img
                        src={`${Api.baseUrl}/api/26/staticContent/logo_banner`}
                        style={imageStyle}
                        alt="dhis2"
                    />
                </a>
                </IconButton>
                <Typography title="DHIS2 Analyzer App" color="inherit" style={{margin: 'auto'}}>
                    DHIS2 Analyzer App
                </Typography>
            </Toolbar>
          </AppBar>
        );
    }
}

export default NavigationBar;
