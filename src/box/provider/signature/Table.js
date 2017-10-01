import React, {Component} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import httpService from '../../../service/HttpService';
import RaisedButton from 'material-ui/RaisedButton';
import BuildIco from 'material-ui/svg-icons/av/playlist-play';
import TextField from 'material-ui/TextField';
import _ from 'lodash';


class TableSignature extends Component {


    constructor() {
        super();
        this.state = {rows: [], signatures: []};
        this.httpService = new httpService();

    }

    componentDidMount() {
        this.fncGetSignatures();
    }

    styles = {
        tableHeader: {backgroundColor: '#f1f1f1', textAlign: 'left', fontSize: '20px'},
        tableBody: {cursor: 'pointer'},
    };

    fncChangeSignatureStatus = (student) => {
        let signature = {
            "_id": student._id,
            "signature": !student.signature
        };
        this.fncUpdateSignature(signature);
    };

    fncFilterRows = () => {
        let filter = this.search.input.value;
        filter = filter.toUpperCase();
        let result = _.filter(this.state.signatures, (o) => {
            let name = o.name.toUpperCase();
            return name.includes(filter);
        });
        this.fncMakeRows(result);
    };


    fncUpdateSignature = (data) => {
        this.httpService.put('/student', data, localStorage.getItem('auth-token'))
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(success => {
                let signatures = _.remove(this.state.signatures, (o) => {
                    return o._id !== success._id
                })
                signatures.push(success);
                this.setState({signatures: signatures})
                this.fncMakeRows(this.state.signatures);
            })
            .catch(error => {
                this.setState({msg: error.message});
            });
    };

    fncGetSignatures = () => {
        this.httpService.get('/student/signature', localStorage.getItem('auth-token'))
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(success => {
                this.setState({signatures: success})
                this.fncMakeRows(this.state.signatures);
            })
            .catch(error => {
                this.setState({msg: error.message});
            });
    };


    fncMakeRows = (signatures) => {

        signatures = _.sortBy(signatures, ['name', 'email']);

        let rows = signatures.map((student) =>
            <TableRow key={student._id}>
                <TableRowColumn>{student.name}</TableRowColumn>
                <TableRowColumn>{student.email}</TableRowColumn>
                <TableRowColumn>{student.signature ? 'ativa' : 'desativa'}</TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        label={student.signature ? 'desativar' : 'ativar'}
                        backgroundColor={student.signature ? '#ff2930' : '#25576f'}
                        onTouchTap={() => this.fncChangeSignatureStatus(student)}
                        icon={<BuildIco color="#FFF"/>}
                        labelStyle={{color: 'white'}}/>
                </TableRowColumn>
            </TableRow>
        );

        this.setState({'rows': rows});
    };


    render() {
        return (

            <div>
                <span className="display-block">
                    <TextField
                        hintText="informe o nome do aluno"
                        floatingLabelText="Pesquisar assinatura"
                        type="text"
                        fullWidth={true}
                        onChange={() => this.fncFilterRows()}
                        ref={(input) => this.search = input}/>
                </span>

                <Table>
                    <TableHeader
                        adjustForCheckbox={false}
                        enableSelectAll={false}
                        displaySelectAll={false}
                        style={this.styles.tableHeader}>
                        <TableRow>
                            <TableHeaderColumn>Nome do aluno</TableHeaderColumn>
                            <TableHeaderColumn>Email do aluno</TableHeaderColumn>
                            <TableHeaderColumn>Situação da assinatura</TableHeaderColumn>
                            <TableHeaderColumn>Ação</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}
                               showRowHover={true}
                               style={this.styles.tableBody}>
                        {this.state.rows}
                    </TableBody>
                </Table>

            </div>

        )
    }
}

export default TableSignature;
