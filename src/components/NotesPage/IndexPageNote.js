import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { GrLinkPrevious } from "react-icons/gr";
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Spinner, Container, Row, Col } from 'react-bootstrap';

function IndexPageNote() {
  const { topicId, noteId } = useParams();
  const [note, setNote] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState('');
  const [typing, setTyping] = useState(false);
  const navigate = useNavigate();

  // Fetch the note using topicId and noteId
  useEffect(() => {
    axios.get(`http://localhost:5000/api/topics/${topicId}/notes/${noteId}`)
      .then(res => {
        setNote(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch(err => console.error(err));
  }, [topicId, noteId]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/topics/${topicId}/notes/`)
      .then(res => {
        setTopic(res.data.name)
      })
      .catch(err => console.error(err));
  }, [topicId]);

  // Handle save action, either auto-save or button click
  const saveNote = useCallback(() => {
    axios.put(`http://localhost:5000/api/topics/${topicId}/notes/${noteId}`, {
      title,
      content
    })
      .then(res => {
        setNote(res.data);
        setIsEditingTitle(false);
        setIsEditingContent(false);
      })
      .catch(err => console.error(err));
  }, [title, content, topicId, noteId]); // Add dependencies that affect saveNote

  // Auto-save when user stops typing for 2 seconds
  useEffect(() => {
    if (typing) {
      const timeout = setTimeout(() => {
        saveNote(); // Trigger save when user stops typing
        setTyping(false);
      }, 2000); // Auto-save after 2 seconds of inactivity

      return () => clearTimeout(timeout);
    }
  }, [typing, saveNote]);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setTyping(true); // Set typing state for auto-save
  };

  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-3">
        <Col xs="auto">
          <GrLinkPrevious onClick={() => navigate(-1)}
           className="back-button"/>
        </Col>
        <Col>
          <h1 className="text-center">{topic}</h1>
        </Col>
      </Row>

      {note ? (
        <Form>
          {/* Title Editing */}
          <Form.Group className="mb-3">
            {isEditingTitle ? (
              <Form.Control
                type="text"
                value={title}
                onChange={handleInputChange(setTitle)}
                onBlur={() => setIsEditingTitle(false)}
                autoFocus
                className="editing-input" // Apply custom class
              />
            ) : (
              <h3
                onClick={() => setIsEditingTitle(true)}
                className="non-editing-text"
                style={{ cursor: 'pointer' }}
              >
                {title || 'Untitled Note'}
              </h3>
            )}
          </Form.Group>

          {/* Content Editing */}
          <Form.Group className="mb-4">
            {isEditingContent ? (
              <Form.Control
                as="textarea"
                value={content}
                onChange={handleInputChange(setContent)}
                onBlur={() => setIsEditingContent(false)}
                autoFocus
                rows={5}
                className="editing-textarea" // Apply custom class
              />
            ) : (
              <p
                onClick={() => setIsEditingContent(true)}
                className="non-editing-text"
                style={{ backgroundColor: 'transparent', padding: '10px', cursor: 'pointer', borderRadius: '5px' }}
              >
                {content || 'No content available. Click to add.'}
              </p>
            )}
          </Form.Group>

          {/* Save Button */}
          <Button variant="primary" onClick={saveNote}>
            Save Changes
          </Button>
        </Form>
      ) : (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p>Loading note...</p>
        </div>
      )}
    </Container>
  );
}

export default IndexPageNote;
