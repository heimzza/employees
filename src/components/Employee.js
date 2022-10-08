import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import {AddDepModal} from './AddDepModal';
import {EditDepModal} from './EditDepModal';
import {Button, ButtonToolbar} from 'react-bootstrap';

export class Employee extends Component {
    constructor(props){
        super(props);
        this.state={
            emps:[],
            addModalShow:false,
            editModalShow:false
        }
    }
    componentDidMount() {
        this.refleshList();
    }
    componentDidUpdate(prevProps, prevState) {
        this.refleshList();
    }
    
    refleshList(){
        fetch('http://localhost:57594/api/employee')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    emps:data
                });
            });
    }

    deleteEmp(empID){
        if (window.confirm('Are you sure?')) {
            fetch('http://localhost:57594/api/employee/' + empID, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }
    render() {
        const{emps, empID, empName}=this.state;
        let addModalClose = () => this.setState({addModalShow:false})
        let editModalClose = () => this.setState({editModalShow:false})
        return (
            <div>
                <Table className='mt-4' striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th>EmployeeID</th>
                            <th>EmployeeName</th>
                            <th>Department</th>
                            <th>MailID</th>
                            <th>DOJ</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp =>
                            <tr key={emp.EmployeeID}>
                                <td>{emp.EmployeeID}</td>
                                <td>{emp.EmployeeName}</td>
                                <td>{emp.Department}</td>
                                <td>{emp.MailID}</td>
                                <td>{emp.DOJ}</td>
                                <td>{emp.Option}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button onClick={() => this.setState({
                                            editModalShow:true,
                                            empID:emp.EmployeeID,
                                            empName:emp.EmployeeName
                                        })}>
                                            Edit
                                        </Button>
                                        <Button className='ms-2' variant='danger' 
                                        onClick={() => this.deleteEmp(emp.EmployeeID)}>
                                            Delete
                                        </Button>
                                        <EditDepModal 
                                        show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        empID={empID}
                                        empName={empName}
                                        />

                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button onClick={() => this.setState({
                        addModalShow:true
                    })}>
                        Add Employee
                    </Button>
                </ButtonToolbar>
                <AddDepModal show={this.state.addModalShow} onHide={addModalClose}/>
            </div>
        );
    }
}
