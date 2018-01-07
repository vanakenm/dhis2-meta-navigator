import React, { Component } from "react";
import { Link } from "react-router-dom";
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Api from "./lib/Api";

const imageStyle = {
    height: "20px"
};

class NavigationBar extends Component {
    render() {
        return (
          <AppBar position="static">
            <Toolbar>
                <IconButton color="contrast" aria-label="Menu">
                <Link to={'/'}>
                    <img
                        src={`${Api.baseUrl}/api/26/staticContent/logo_banner`}
                        style={imageStyle}
                        alt="dhis2"
                    />
                </Link>
                </IconButton>
                <Typography title="DHIS2 Meta Navigator App" color="inherit" style={{margin: 'auto'}}>
                    DHIS2 Meta Navigator App
                </Typography>
            </Toolbar>
          </AppBar>
        );
    }
}

export default NavigationBar;
