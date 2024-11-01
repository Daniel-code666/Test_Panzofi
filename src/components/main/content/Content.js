import React, { useState, useEffect } from 'react';
import { Icon, Button } from 'semantic-ui-react';
import { Comments } from '../comments';
import { usePost } from '../../../hooks/usePost';
import './Content.css';

export function Content() {
    const { post, getPost} = usePost()
    const [votes, setVotes] = useState(0);
    const [userVote, setUserVote] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleUpvote = () => {
        if (userVote === 'up') {
            setVotes(votes - 1);
            setUserVote(null);
        } else if (userVote === 'down') {
            setVotes(votes + 2);
            setUserVote('up');
        } else {
            setVotes(votes + 1);
            setUserVote('up');
        }
    };

    const handleDownvote = () => {
        if (userVote === 'down') {
            setVotes(votes + 1);
            setUserVote(null);
        } else if (userVote === 'up') {
            setVotes(votes - 2);
            setUserVote('down');
        } else {
            setVotes(votes - 1);
            setUserVote('down');
        }
    };

    const toggleSubscription = () => setIsSubscribed(!isSubscribed);

    useEffect(()=> {
        getPost(1)
    }, [])

    useEffect(() => {
        if (post) {
            setVotes(post.votes);
        }
    }, [post]);
    
    return (
        <div className="content">
            <div className="content__vote">
                <Button icon onClick={toggleSubscription} className="subscribe-button">
                    <Icon name={isSubscribed ? 'bell' : 'bell outline'} />
                </Button>
                <br></br>
                <Button icon onClick={handleUpvote} className={`vote-button ${userVote === 'up' ? 'active' : ''}`}>
                    <Icon name="arrow up" />
                </Button>
                <span className="vote-count">{votes}</span>
                <Button icon onClick={handleDownvote} className={`vote-button ${userVote === 'down' ? 'active' : ''}`}>
                    <Icon name="arrow down" />
                </Button>
            </div>
            <div className="content__main">
                <div className="content__header">
                    <div className="content__metadata">
                        <span className="content__topic">{post?.topic_title}</span> •
                        <span className="content__author">Posted by u/{post?.topic_by}</span> •
                        <span className="content__date">{new Date(post?.post_date).toLocaleDateString()}</span>
                    </div>
                    <h2 className="content__title">{post?.post_title}</h2>
                    <h4 className="content__subtitle">{post?.post_subtitle}</h4>
                    <p className="content__description">
                        {post?.post_content}
                    </p>
                </div>
                <div className="content__footer">
                    <Button icon labelPosition="left" className="content__comments">
                        <Icon name="comment" />
                        {post?.comments}
                    </Button>
                    <Button icon labelPosition="left" className="content__share-button">
                        <Icon name="share alternate" />
                        Share
                    </Button>
                    <Button icon labelPosition="left" className="content__save-button">
                        <Icon name="save" />
                        Save
                    </Button>
                </div>
                <Comments />
            </div>
        </div>
    );
}
