import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";

export class EditEmpModal extends Component {
    constructor(props){
        super(props);
        this.state={
            deps: [],
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

    componentDidMount() {
        fetch('http://localhost:57594/api/department').then(response => response.json())
        .then(data => {
            this.setState({
                deps:data
            })
        })
    }
    

    handleSubmit(e) {
        e.preventDefault();

        fetch('http://localhost:57594/api/employee', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmployeeID: e.target.EmployeeID.value,
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
                                            Employee ID
                                        </Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='EmployeeID'
                                            disabled
                                            defaultValue={this.props.empID}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>
                                            Employee Name
                                        </Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='EmployeeName'
                                            required
                                            defaultValue={this.props.empName}
                                            placeholder='EmployeeName'
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>
                                            Department
                                        </Form.Label>
                                        <Form.Control name='Department' as='select' defaultValue={this.props.dep}>
                                            {this.state.deps.map(dep => 

                                                <option key={dep.DepartmentID}>
                                                    {dep.DepartmentName}
                                                </option>
                                            )}
                                            
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>
                                            MailID
                                        </Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='MailID'
                                            required
                                            defaultValue={this.props.mailID}
                                            placeholder='MailID'
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>
                                            DOJ
                                        </Form.Label>
                                        <Form.Control
                                            type='date'
                                            name='DOJ'
                                            required
                                            defaultValue={this.props.doj}
                                            placeholder='DOJ'
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