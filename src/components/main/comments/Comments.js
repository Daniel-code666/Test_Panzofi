import React, { useState, useEffect } from 'react';
import { Button, Icon, Form } from 'semantic-ui-react';
import { usePost } from '../../../hooks/usePost';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Comments.css';
import Swal from 'sweetalert2';

export function Comments() {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(null);
    const [replyTarget, setReplyTarget] = useState({ commentId: null, responseId: null });
    const [replyContent, setReplyContent] = useState('');
    const [showResponses, setShowResponses] = useState({});

    const { commentsData, getCommentsData } = usePost()

    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            ['link', 'image'],
            [{ align: [] }],
            [{ color: [] }, { background: [] }],
            ['clean']
        ]
    };

    const handleCommentChange = (value) => {
        setComment(value);
    };

    const handleReplyChange = (value) => {
        setReplyContent(value);
    };

    const handleCommentSubmit = () => {
        const plainComment = comment.replace(/<[^>]+>/g, '').trim();

        if (plainComment === '') {
            Swal.fire('Error', 'El comentario no puede estar vacío', 'error');
            return;
        }

        Swal.fire({
            title: '¿Está seguro?',
            text: '¿Desea enviar este comentario?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, enviar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                const newComment = {
                    id: comments?.length + 1,
                    username: 'Anónimo',
                    role: 'Member',
                    date: new Date().toISOString(),
                    content: plainComment,
                    votes: 0,
                    userVote: null,
                    responses: []
                };

                setComments([newComment, ...comments]);
                setComment('');
                Swal.fire('¡Comentario enviado!', 'Tu comentario ha sido publicado con éxito.', 'success');
            }
        });
    };

    const handleReplySubmit = () => {
        const plainReply = replyContent.replace(/<[^>]+>/g, '').trim();

        if (plainReply === '') {
            Swal.fire('Error', 'La respuesta no puede estar vacía', 'error');
            return;
        }

        const newReply = {
            id: Date.now(), // Unique ID based on timestamp
            username: 'Anónimo',
            role: 'Member',
            date: new Date().toISOString(),
            content: plainReply,
            votes: 0,
            userVote: null,
            responses: []
        };

        const updatedComments = addReplyToTarget(comments, replyTarget.commentId, replyTarget.responseId, newReply);

        setComments(updatedComments);
        setReplyTarget({ commentId: null, responseId: null });
        setReplyContent('');
        Swal.fire('¡Respuesta enviada!', 'Tu respuesta ha sido publicada con éxito.', 'success');
    };

    const addReplyToTarget = (commentsArray, commentId, responseId, newReply) => {
        return commentsArray.map(comment => {
            if (comment.id === commentId) {
                if (responseId === null) {
                    // Responding to the main comment
                    return {
                        ...comment,
                        responses: [...comment.responses, newReply],
                    };
                } else {
                    // Searching deeper in the responses
                    return {
                        ...comment,
                        responses: addReplyToTarget(comment.responses, responseId, null, newReply),
                    };
                }
            } else if (comment.responses.length > 0) {
                return {
                    ...comment,
                    responses: addReplyToTarget(comment.responses, commentId, responseId, newReply),
                };
            }
            return comment;
        });
    };

    const handleVote = (id, type, isResponse = false, parentId = null) => {
        const updateVotes = (commentsArray) => {
            return commentsArray.map(comment => {
                if (comment.id === id && !isResponse) {
                    return updateCommentVote(comment, type);
                } else if (isResponse && comment.id === parentId) {
                    const updatedResponses = comment.responses.map(response => {
                        if (response.id === id) {
                            return updateCommentVote(response, type);
                        }
                        return response;
                    });
                    return { ...comment, responses: updatedResponses };
                } else if (comment.responses.length > 0) {
                    return { ...comment, responses: updateVotes(comment.responses) };
                }
                return comment;
            });
        };
        setComments(updateVotes(comments));
    };

    const updateCommentVote = (comment, type) => {
        if (type === 'up') {
            if (comment.userVote === 'up') {
                return { ...comment, votes: comment.votes - 1, userVote: null };
            } else if (comment.userVote === 'down') {
                return { ...comment, votes: comment.votes + 1, userVote: 'up' };
            } else {
                return { ...comment, votes: comment.votes + 1, userVote: 'up' };
            }
        } else if (type === 'down') {
            if (comment.userVote === 'down') {
                return { ...comment, votes: comment.votes + 1, userVote: null };
            } else if (comment.userVote === 'up') {
                return { ...comment, votes: comment.votes - 1, userVote: 'down' };
            } else {
                return { ...comment, votes: comment.votes - 1, userVote: 'down' };
            }
        }
        return comment;
    };

    const toggleResponses = (commentId) => {
        setShowResponses((prev) => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));
    };

    const handleReplyToggle = (commentId, responseId = null) => {
        if (replyTarget.commentId === commentId && replyTarget.responseId === responseId) {
            setReplyTarget({ commentId: null, responseId: null });
        } else {
            setReplyTarget({ commentId, responseId });
        }
        setReplyContent(''); // Clear reply content when toggling reply editor
    };

    const renderReplies = (responses, parentId) => {
        return responses.map((response) => (
            <div key={response.id} className="response__item">
                <div className="response__header">
                    <span className="response__username">{response.username}</span>
                    <span className="response__role">({response.role})</span>
                    <span className="response__date"> • {new Date(response.date).toLocaleDateString()}</span>
                </div>
                <div className="response__content" style={{ textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: response.content }}></div>
                <div className="response__footer">
                    <span className="response__votes">
                        <Icon name="thumbs up" link onClick={() => handleVote(response.id, 'up', true, parentId)} className={response.userVote === 'up' ? 'active' : ''} />
                        {response.votes}
                        <Icon name="thumbs down" link onClick={() => handleVote(response.id, 'down', true, parentId)} className={response.userVote === 'down' ? 'active' : ''} />
                    </span>
                    <Button size="mini" onClick={() => handleReplyToggle(parentId, response.id)}>Responder</Button>
                    {replyTarget.commentId === parentId && replyTarget.responseId === response.id && (
                        <div className="reply__section">
                            <ReactQuill
                                value={replyContent}
                                onChange={handleReplyChange}
                                className="reply__editor"
                                style={{ backgroundColor: '#ffffff', color: '#000000' }}
                                modules={modules}
                            />
                            <Button primary onClick={handleReplySubmit} className="reply__submit-button">
                                <Icon name="send" /> Responder
                            </Button>
                        </div>
                    )}
                    {response.responses && response.responses.length > 0 && renderReplies(response.responses, response.id)}
                </div>
            </div>
        ));
    };

    useEffect(() => {
        getCommentsData(1)
    }, [])

    useEffect(() => {
        if (commentsData) {
            setComments(commentsData);
        }
    }, [commentsData]);

    return (
        <div className="comments">
            <div className="comment__input-section">
                <Form>
                    <ReactQuill
                        value={comment}
                        onChange={handleCommentChange}
                        className="comment__editor"
                        style={{ backgroundColor: '#ffffff', color: '#000000' }}
                        modules={modules}
                    />
                    <div className="comment__actions">
                        <Button primary onClick={handleCommentSubmit} className="comment__submit-button">
                            <Icon name="send" /> Comment
                        </Button>
                    </div>
                </Form>
            </div>
            <div className="comment__list">
                {comments?.map((comment) => (
                    <div key={comment.id} className="comment__item">
                        <div className="comment__header">
                            <span className="comment__username">{comment.username}</span>
                            <span className="comment__role">({comment.role})</span>
                            <span className="comment__date"> • {new Date(comment.date).toLocaleDateString()}</span>
                        </div>
                        <div className="comment__content" style={{ textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: comment.content }}></div>
                        <div className="comment__footer">
                            <span className="comment__votes">
                                <Icon name="thumbs up" link onClick={() => handleVote(comment.id, 'up')} className={comment.userVote === 'up' ? 'active' : ''} />
                                {comment.votes}
                                <Icon name="thumbs down" link onClick={() => handleVote(comment.id, 'down')} className={comment.userVote === 'down' ? 'active' : ''} />
                            </span>
                            <Button size="mini" onClick={() => handleReplyToggle(comment.id)}>Responder</Button>
                            <Button size="mini" onClick={() => toggleResponses(comment.id)}>
                                {showResponses[comment.id] ? 'Ocultar respuestas' : `Ver respuestas (${comment.responses.length})`}
                            </Button>
                        </div>
                        {replyTarget.commentId === comment.id && replyTarget.responseId === null && (
                            <div className="reply__section">
                                <ReactQuill
                                    value={replyContent}
                                    onChange={handleReplyChange}
                                    className="reply__editor"
                                    style={{ backgroundColor: '#ffffff', color: '#000000' }}
                                    modules={modules}
                                />
                                <Button primary onClick={handleReplySubmit} className="reply__submit-button">
                                    <Icon name="send" /> Responder
                                </Button>
                            </div>
                        )}
                        {showResponses[comment.id] && comment.responses.length > 0 && (
                            <div className="comment__responses">
                                {renderReplies(comment.responses, comment.id)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
