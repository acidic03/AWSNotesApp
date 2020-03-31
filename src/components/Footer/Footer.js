import React, { useState } from 'react';
import { Button, Modal, InputGroup} from 'react-bootstrap';
import dJSON from 'dirty-json';
import './Footer.css';

function Footer({addTodo}) {
    // Options modal
    const [showOptionsModal, setShowOptionsModal] = useState(false);
    const [options, setOptions] = useState({});

    const handleOptionsDisplay = () => setShowOptionsModal(!showOptionsModal);

    const handleOptionsSubmit = () => {
        if (options.download) {
            
            const url = "https://eupvcmbvv6.execute-api.us-east-2.amazonaws.com/notes-api/download?type=DOWNLOAD";

            fetch(url, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setTimeout(getDownloadLink, 5000, data.token);
                // getDownloadLink(data.token);
            })
            .catch(err => {
                throw err;
            })
        }
        setShowOptionsModal(!showOptionsModal);
    };

    const getDownloadLink = (token) => {
        const dataUrl = `https://eupvcmbvv6.execute-api.us-east-2.amazonaws.com/notes-api/result?token=${token}`;
        fetch(dataUrl, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            let data = "";
            try {
                data = res.json();
            } catch(err) {
                throw err;
            }
            return data;
        })
        .then(outputData => {
            console.log(outputData);
        })
        .catch(err => {
            throw err;
        })
    }

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