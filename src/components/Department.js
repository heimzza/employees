import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import {AddDepModal} from './AddDepModal';
import {EditDepModal} from './EditDepModal';
import {Button, ButtonToolbar} from 'react-bootstrap';

export class Department extends Component {
    constructor(props){
        super(props);
        this.state={
            deps:[],
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
        fetch('http://localhost:57594/api/department')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    deps:data
                });
            });
    }

    deleteDep(depID){
        if (window.confirm('Are you sure?')) {
            fetch('http://localhost:57594/api/department/' + depID, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    render() {
        const{deps, depID, depName}=this.state;
        let addModalClose = () => this.setState({addModalShow:false})
        let editModalClose = () => this.setState({editModalShow:false})
        return (
            <div>
                <Table className='mt-4' striped bordered hover size='sm'>
                    <thead>
                        <tr>
                            <th>DepartmentID</th>
                            <th>DepartmentName</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep =>
                            <tr key={dep.DepartmentID}>
                                <td>{dep.DepartmentID}</td>
                                <td>{dep.DepartmentName}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button onClick={() => this.setState({
                                            editModalShow:true,
                                            depID:dep.DepartmentID,
                                            depName:dep.DepartmentName
                                        })}>
                                            Edit
                                        </Button>
                                        <Button className='ms-2' variant='danger' 
                                        onClick={() => this.deleteDep(dep.DepartmentID)}>
                                            Delete
                                        </Button>
                                        <EditDepModal 
                                        show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        depID={depID}
                                        depName={depName}
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
                        Add Department
                    </Button>
                </ButtonToolbar>
                <AddDepModal show={this.state.addModalShow} onHide={addModalClose}/>
            </div>
        );
    }
}
