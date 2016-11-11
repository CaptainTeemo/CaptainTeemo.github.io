import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blue400} from 'material-ui/styles/colors';
import Page from './Page';
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
        this.state = {articles: [
            {"title": "test", "subtitle": "hello world"},
            {"title": "Warming up", "subtitle": "welcome"}
        ]};
    }

    componentDidMount() {
        $.ajax({
            url: "/articles",
            method: 'get',
            success: (result, status, xh) => {
                console.log(result);
            },
            error: (xhr, status, error) => {
                console.log(error);
            }
        });
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
            <div>
                <AppBar title="Teemo's Swift Hut" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
                {/* <ArticleList articles={this.state.articles}>

                </ArticleList> */}
                <Page
                name="Automatic Bounds Checking for NSArray"
                />
            </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
