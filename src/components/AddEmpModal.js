import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";

export class AddEmpModal extends Component {
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

        fetch('http://localhost:57594/api/employee', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmployeeID: null,
                EmployeeName: e.target.EmployeeName.value,
                Department: e.target.Department.value,
                MailID: e.target.MailID.value,
                DOJ: e.target.DOJ.value
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
                            Add Employee
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>
                                            Employee Name
                                        </Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='EmployeeName'
                                            required
                                            placeholder='EmployeeName'
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>
                                            Department Name
                                        </Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='Department'
                                            required
                                            placeholder='Department'
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>
                                            MailID
                                        </Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='MailID'
                                            required
                                            placeholder='MailID'
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>
                                            DOJ
                                        </Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='DOJ'
                                            required
                                            placeholder='DOJ'
                                        />
                                    </Form.Group>
                                    <Form.Group className='mt-3'>
                                        <Button variant='primary' type='submit'>
                                            Add
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