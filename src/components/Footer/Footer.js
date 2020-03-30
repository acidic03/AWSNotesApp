import React, { useState } from 'react';
import { Button, Modal, InputGroup} from 'react-bootstrap';
import './Footer.css';

function Footer({addTodo}) {
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
            </div>
            

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