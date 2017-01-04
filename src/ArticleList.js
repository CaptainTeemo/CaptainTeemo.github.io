import React from 'react';
import {Card, CardTitle, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {articles: props.articles};
    }

    render() {
        return (
            <List style={{
                width: '70%',
                margin: '0 auto',
            }}>
                {this.state.articles.map((article, index) => {
                    return (
                        <Card key={index}>
                            <CardTitle
                                title={article["title"]}
                                subtitle={article["subtitle"]}
                            >
                            </CardTitle>
                            <CardActions>
                                <FlatButton label="View Details" />
                            </CardActions>
                        </Card>
                    );
                })}
            </List>
        );
    }
}

export default ArticleList;
