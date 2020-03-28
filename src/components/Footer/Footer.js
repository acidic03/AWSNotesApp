import React, { useState } from 'react';
import { Button, Modal, InputGroup, FormControl} from 'react-bootstrap';
import './Footer.css';

function Footer({addTodo}) {
    // Create task modal
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [todoValue, setTodoValue] = useState("");

    const handleTodoDisplay = () => setShowCreateModal(!showCreateModal);

    const handleTodoSubmit = () => {
        // check if the todo value isn't empty
        if (todoValue) {
            addTodo(todoValue);
        }
        setShowCreateModal(!showCreateModal);
    };

    // Options modal
    const [showOptionsModal, setShowOptionsModal] = useState(false);
    const [options, setOptions] = useState({});

    const handleOptionsDisplay = () => setShowOptionsModal(!showOptionsModal);

    const handleOptionsSubmit = () => {
        if (options.download) {
            console.log("checkbox checked");
        }
        setShowOptionsModal(!showOptionsModal);
    };

    

    return(
        <footer className="footer">
            <div className="container">
                <span className="text-muted options-menu" onClick={handleOptionsDisplay}>
                    Options
                </span>
                <div className="create-button" data-toggle="modal" data-target="#createTodoModal" aria-hidden="true" onClick={handleTodoDisplay}>
                    <svg className="bi bi-plus-circle-fill" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z" clipRule="evenodd"/>
                    </svg>
                </div>
            </div>

            {/* Create new todo modal */}
            <Modal show={showCreateModal} onHide={handleTodoDisplay}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup>
                        <FormControl onChange={e => setTodoValue(e.target.value)} placeholder="Enter the task..." aria-label="Enter the task..." aria-describedby="basic-addon1" />
                    </InputGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleTodoDisplay}>Close</Button>
                    <Button variant="primary" onClick={handleTodoSubmit}>Ok</Button>
                </Modal.Footer>
            </Modal>
            

            {/* Options modal */}
            <Modal show={showOptionsModal} onHide={handleOptionsDisplay}>
                <Modal.Header closeButton>
                    <Modal.Title>Options</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Checkbox  id="downloadTasks" aria-label="Checkbox for following text input" onChange={e => setOptions({download: e.target.checked})} />
                        </InputGroup.Prepend>
                        <InputGroup.Text>
                            Download Tasks
                        </InputGroup.Text>                        
                    </InputGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleOptionsDisplay}>Close</Button>
                    <Button variant="primary" onClick={handleOptionsSubmit} disabled={!options.download}>Ok</Button>
                </Modal.Footer>
            </Modal>


        </footer>
    );
}

export default Footer;