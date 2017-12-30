import React, { Component } from 'react';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import Theme from './utils/theme';
import Api from './lib/Api';

const imageStyle = {
    height: '20px',
};

const toolBarStyle = {
    alignItems: 'center',
    backgroundColor: Theme.palette.primary1Color,
    color: Theme.palette.alternateTextColor,
};

class NavigationBar extends Component {
    render() {
        return (
            <Toolbar style={ toolBarStyle }>
                <a href={Api.baseUrl}>
                    <img src={`${Api.baseUrl}/api/26/staticContent/logo_banner`} style={ imageStyle }
                         alt="dhis2"
                    />
                </a>
                <ToolbarTitle text="DHIS2 Analyzer App"/>
            </Toolbar>
        );
    }
}

export default NavigationBar;