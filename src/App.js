import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blue400} from 'material-ui/styles/colors';
import Page from './Page';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import injectTapEventPlugin from 'react-tap-event-plugin';

import $ from 'jquery';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: blue400
    }
}, {
    avatar: {
        borderColor: null,
    }
});

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: [
                "Welcome",
                "Automatic Bounds Checking for NSArray",
                "UIColor with Hex"
            ],
            drawerOpen: false,
            currentName: "Welcome"
        };
    }

    componentDidMount() {
        $.ajax({
            url: '/articles',
            method: 'get',
            success: (result, status, xh) => {
                console.log(result);
            },
            error: (xhr, status, error) => {
                console.log(error);
            }
        })
    }

    handleToggle() {
        this.setState({drawerOpen: !this.state.drawerOpen});
    }

    handleClose(index) {
        this.setState({drawerOpen: false});
        let title = this.state.articles[index];
        this.setState({currentName: title});
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
            <div>
                <AppBar
                    title="Teemo's Swift Hut"
                    onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
                />
                <Drawer
                    docked={false}
                    width={300}
                    open={this.state.drawerOpen}
                    onRequestChange={(open) => this.setState({drawerOpen:open})}
                    >
                <List>
                    {this.state.articles.map((article, index) => {
                        return (
                            <ListItem key={index} onClick={this.handleClose.bind(this, index)}>
                                {article}
                            </ListItem>
                        );
                    })}
                </List>
                </Drawer>
                <div style={{padding: '0 20px'}}>
                    <Page name={this.state.currentName} />
                </div>
            </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
