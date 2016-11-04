import React from 'react';
import {List, ListItem} from 'material-ui/List';

class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {articles: props.articles};
    }

    render() {
        return (
            <List>
                {this.state.articles.map((article, index) => {
                    return (
                        <ListItem
                        key={index}
                        primaryText={article["title"]}
                        secondaryText={article["subtitle"]}
                        >
                        </ListItem>
                    );
                })}
            </List>
        );
    }
}

export default ArticleList;
