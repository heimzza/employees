import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

export class Department extends Component {
    constructor(props){
        super(props);
        this.state={
            deps:[]
        }
    }
    componentDidMount() {
        this.refleshList();
    }
    
    refleshList(){
        this.setState({
            deps:[
                {"DepartmentID":1,"DepartmentName":"IT"},
                {"DepartmentID":2,"DepartmentName":"Finace"},
                {"DepartmentID":3,"DepartmentName":"Support"}
            ]
        });
    }

    render() {
        const{deps}=this.state;
        return (
            <Table className='mt-4' stripped bordered hover size='sm'>
                <thead>
                    <tr>
                        <th>DepartmentID</th>
                        <th>DepartmentName</th>
                    </tr>
                </thead>
                <tbody>
                    {deps.map(dep => 
                        <tr key={dep.DepartmentID}>
                        <td>{dep.DepartmentID}</td>
                        <td>{dep.DepartmentName}</td>
                    </tr>
                    )}
                </tbody>
            </Table>
        );
    }
}
