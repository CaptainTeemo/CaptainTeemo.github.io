import React from 'react';
// import ReactMarkdown from 'react-markdown';
import HighlightJS from 'highlight.js';
import Marked from 'marked';
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
            success: (result, status, xh) => {
                this.setState({lastName: this.props.name, source: Marked(result)});
            },
            error: (xhr, status, error) => {
                console.log(error);
            }
        });
    }

    render() {
        if (this.state.lastName !== this.props.name) {
            this.fetchData();
        }
        return(
            <article
            className="markdown-body"
            dangerouslySetInnerHTML={{__html: this.state.source}}
            style={{
                width: '100%',
                maxWidth: '1200px',
                margin: '20px auto'
            }}>
            </article>
        );
    }
}

export default Page;
