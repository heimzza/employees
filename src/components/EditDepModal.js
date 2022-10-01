import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";

export class EditDepModal extends Component {
    constructor(props){
        super(props);
        this.state={
            snackbarOpen: false,
            snackbarMsg: ''
        }

        this.handleSubmit=this.handleSubmit.bind(this);
    }

    snackbarClose = () =>{
        this.setState({
            snackbarOpen: false
        });
    }
    handleSubmit(e) {
        e.preventDefault();

        fetch('http://localhost:57594/api/department', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                DepartmentID: e.target.DepartmentID.value,
                DepartmentName: e.target.DepartmentName.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    snackbarOpen:true,
                    snackbarMsg:result
                });
            },
                (error) => {
                    this.setState({
                        snackbarOpen:true,
                        snackbarMsg:'Failed'
                    });
                })
    }
    render() {
        return (
            <div className='container'>
                <Snackbar
                anchorOrigin={{vertical:'center',horizontal:'center'}}
                open={this.state.snackbarOpen}
                autoHideDuration={3000}
                onClose={this.snackbarClose}
                message={<span id='message-id'>{this.state.snackbarMsg}</span>}
                action={[
                    <IconButton key='close' aria-label='Close' color='inherit' onClick={this.snackbarClose}>
                        X
                    </IconButton>
                ]}
                />
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Department
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    
                                    <Form.Group>
                                        <Form.Label>
                                            Department ID
                                        </Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='DepartmentID'
                                            required
                                            disabled
                                            defaultValue={this.props.depID}
                                            placeholder='DepartmentID'
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group>
                                        <Form.Label>
                                            Department Name
                                        </Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='DepartmentName'
                                            required
                                            defaultValue={this.props.depName}
                                            placeholder='DepartmentName'
                                        />
                                    </Form.Group>

                                    <Form.Group className='mt-3'>
                                        <Button variant='primary' type='submit'>
                                            Update
                                        </Button>
                                    </Form.Group>

                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='danger' onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}