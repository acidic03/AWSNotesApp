import React, { useState } from 'react';
import { Button, Modal, Form} from 'react-bootstrap';
import fileDownload from 'js-file-download';
import './Footer.css';

function Footer({todos}) {
    // Options modal
    const [showOptionsModal, setShowOptionsModal] = useState(false);
    //const [options, setOptions] = useState({});
    const [langOption, setlangOption] = useState("ar");
    const [submitBtnText, setSubmitBtnText] = useState("Submit");

    const handleOptionsDisplay = () => setShowOptionsModal(!showOptionsModal);

    const handleOptionsSubmit = () => {
        setSubmitBtnText("Translating...");
        const todosCpy = [...todos];
        const url = "https://eupvcmbvv6.execute-api.us-east-2.amazonaws.com/notes-api/download";
        const dataToSend = {
            lang: langOption,
            todos: todosCpy
        };

        fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log("data recieved: ");
                console.log(data);

                buildCSV(data.todos);
                setSubmitBtnText("Submit");
                setShowOptionsModal(!showOptionsModal);
            })
            .catch(err => {
                alert("There was an error translating your data.");
                setSubmitBtnText("Submit");
                throw err;
            })
        
        // setShowOptionsModal(!showOptionsModal);
    };

    const buildCSV = data => {
        console.log("buildCSV: " + data);
        if (data) {
            let file = "id,task\n";
            for (let i = 0; i < data.length; i++) {
                file += `${data[i].id},${data[i].result.TranslatedText}\n`;
            }
            let filename = "todos-";
            filename += new Date().toISOString();
            filename += ".csv";

            fileDownload(file, filename);
        }
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
                    {/* <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Checkbox  id="downloadTasks" aria-label="Checkbox for following text input" onChange={e => setOptions({download: e.target.checked})} />
                        </InputGroup.Prepend>
                        <InputGroup.Text>
                            Download Tasks
                        </InputGroup.Text>                        
                    </InputGroup> */}
                    <Form>
                        <Form.Group>
                            <Form.Label>Translate Text To</Form.Label>
                            <Form.Control as="select" onChange={(e) => setlangOption(e.target.value)} >
                                <option value="ar">Arabic</option>
                                <option value="zh">Chinese (Simplified)</option>
                                <option value="zh-TW">Chinese (Traditional)</option>
                                <option value="en">English</option>
                                <option value="fr">French</option>
                                <option value="es">Spanish</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleOptionsDisplay}>Close</Button>
                <Button variant="primary" onClick={handleOptionsSubmit} >{submitBtnText}</Button>
                </Modal.Footer>
            </Modal>


        </footer>
    );
}

export default Footer;