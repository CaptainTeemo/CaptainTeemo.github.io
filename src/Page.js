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

        this.state = {name: props.name, source: ""};
    }

    fetchData() {
        $.ajax({
            url: '/articles/' + this.state.name + '.md',
            method: 'get',
            success: (result, status, xh) => {
                this.setState({source: Marked(result)});
            },
            error: (xhr, status, error) => {
                console.log(error);
            }
        });
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return(
            <article
            className="markdown-body"
            dangerouslySetInnerHTML={{__html: this.state.source}}
            style={{
                width: '70%',
                margin: '20px auto 20px auto'
            }}>
            </article>
        );
    }
}

export default Page;
