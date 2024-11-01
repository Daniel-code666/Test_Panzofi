import React, { useState } from 'react';
import { Button, Icon, Form, Dropdown, Input } from 'semantic-ui-react';
import { CommentsArr } from './CommentsArr';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Comments.css';
import Swal from 'sweetalert2';

export function Comments() {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(CommentsArr);
    const [replyCommentId, setReplyCommentId] = useState(null);
    const [replyContent, setReplyContent] = useState('');

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
                    id: comments.length + 1,
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

    const handleReplySubmit = (parentId, parentArray = comments, isTopLevel = true) => {
        const plainReply = replyContent.replace(/<[^>]+>/g, '').trim();

        if (plainReply === '') {
            Swal.fire('Error', 'La respuesta no puede estar vacía', 'error');
            return;
        }

        const updatedComments = parentArray.map(comment => {
            if (comment.id === parentId) {
                const newReply = {
                    id: comment.responses.length + 1,
                    username: 'Anónimo',
                    role: 'Member',
                    date: new Date().toISOString(),
                    content: plainReply,
                    votes: 0,
                    userVote: null,
                    responses: []
                };
                return {
                    ...comment,
                    responses: [...comment.responses, newReply],
                };
            } else if (comment.responses.length > 0) {
                return {
                    ...comment,
                    responses: handleReplySubmit(parentId, comment.responses, false),
                };
            }
            return comment;
        });

        if (isTopLevel) {
            setComments(updatedComments);
            setReplyCommentId(null);
            setReplyContent('');
            Swal.fire('¡Respuesta enviada!', 'Tu respuesta ha sido publicada con éxito.', 'success');
        }
        return updatedComments;
    };

    const handleVote = (id, type) => {
        const updateVotes = (commentsArray) => {
            return commentsArray.map(comment => {
                if (comment.id === id) {
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
                } else if (comment.responses.length > 0) {
                    return { ...comment, responses: updateVotes(comment.responses) };
                }
                return comment;
            });
        };
        setComments(updateVotes(comments));
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
                        <Icon name="thumbs up" link onClick={() => handleVote(response.id, 'up')} className={response.userVote === 'up' ? 'active' : ''} />
                        {response.votes}
                        <Icon name="thumbs down" link onClick={() => handleVote(response.id, 'down')} className={response.userVote === 'down' ? 'active' : ''} />
                    </span>
                    <Button size="mini" onClick={() => setReplyCommentId(response.id)}>Responder</Button>
                    {replyCommentId === response.id && (
                        <div className="reply__section">
                            <ReactQuill
                                value={replyContent}
                                onChange={handleReplyChange}
                                className="reply__editor"
                                style={{ backgroundColor: '#ffffff', color: '#000000' }}
                                modules={modules}
                            />
                            <Button primary onClick={() => handleReplySubmit(response.id)} className="reply__submit-button">
                                <Icon name="send" /> Responder
                            </Button>
                        </div>
                    )}
                    {response.responses.length > 0 && renderReplies(response.responses, response.id)}
                </div>
            </div>
        ));
    };

    return (
        <div className="comments">
            <div className="comment__list">
                {comments.map((comment) => (
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
                            <Button size="mini" onClick={() => setReplyCommentId(comment.id)}>Responder</Button>
                            {replyCommentId === comment.id && (
                                <div className="reply__section">
                                    <ReactQuill
                                        value={replyContent}
                                        onChange={handleReplyChange}
                                        className="reply__editor"
                                        style={{ backgroundColor: '#ffffff', color: '#000000' }}
                                        modules={modules}
                                    />
                                    <Button primary onClick={() => handleReplySubmit(comment.id)} className="reply__submit-button">
                                        <Icon name="send" /> Responder
                                    </Button>
                                </div>
                            )}
                            {comment.responses.length > 0 && renderReplies(comment.responses, comment.id)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
