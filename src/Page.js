import React from 'react';
// import ReactMarkdown from 'react-markdown';
import HighlightJS from 'highlight.js';
import Marked from 'marked';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {blue400} from 'material-ui/styles/colors';
import $ from 'jquery';

Marked.setOptions({
    highlight: function (code) {
        return HighlightJS.highlightAuto(code).value;
    }
});

class Page extends React.Component {
    constructor(props) {
        super(props);

        this.state = {lastName: "", source: ""};
    }

    fetchData() {
        $.ajax({
            url: '/articles/' + this.props.name + '.md',
            method: 'get',
            success: (result, status, xhr) => {
                this.setState({lastName: this.props.name, source: Marked(result)});
            },
            error: (xhr, status, error) => {
                console.log(error);
                this.setState({lastName: ""});
            }
        });
    }

    render() {
        if (this.state.lastName !== this.props.name) {
            this.fetchData();
            return (
                <div>
                    <RefreshIndicator
                        size={50}
                        left={window.innerWidth / 2 - 25}
                        top={window.innerHeight / 2 - 25}
                        loadingColor={blue400}
                        status="loading"
                        style={{
                            container: {
                                position: 'relative',
                            },
                            refresh: {
                                display: 'inline-block',
                                position: 'relative',
                            }
                        }}
                    />
                </div>
            );
        }
        return(
            <div>
                <article
                className="markdown-body"
                dangerouslySetInnerHTML={{__html: this.state.source}}
                style={{
                    width: '100%',
                    maxWidth: '1200px',
                    margin: '20px auto'
                }}>
                </article>
            </div>
        );
    }
}

export default Page;
