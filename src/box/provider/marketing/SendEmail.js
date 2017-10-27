import React, {Component} from "react";
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import _ from 'lodash';
import Dialog from 'material-ui/Dialog';
import PubSub from 'pubsub-js';
import TextField from 'material-ui/TextField';
import {Step, StepLabel, Stepper,} from 'material-ui/Stepper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import httpService from '../../../service/http/HttpService';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';

class SendEmail extends Component {
    constructor(props)
    {
        super(props);
        this.state =
        {
            stepIndex: 0, open: true, email: {subject: "", html: "", text: "", recipients: []},
            makeSend: false,
            errorText: {subject: "", text: "", html: "", recipients: ""},
            signatures: [],
            rows: [],
            sending:false,
            response:false,
        };
        this.keyRowsSelected = [];
    };

    componentDidMount()
    {
        this.fncGetStudents()
    };

    fncGetStudents = () =>
    {
        httpService.make().get('/student/signature')
                          .then(success => {
                              this.setState({signatures: success});
                              this.fncMakeRows(this.state.signatures);
                          })
                          .catch(error => {
                              this.setState({msg: error.message});
                          });
    };

    fncSendEmail = (data) =>
    {
        this.setState({sending: true});
        httpService.make().post('/provider/send-email', data)
            .then(success =>
            {
                this.setState({sending: false});
                this.setState({response: success});
            })
            .catch(error =>
            {
                this.setState({msg: error.message});
            });
    };

    fncCanStep = () =>
    {
        PubSub.publish('close-send-email');
        this.setState({open: false});
    };

    fncSetData = (event, value, attribute) =>
    {
        let email = this.state.email;
        email[attribute] = value;
        this.setState(email);
    };

    fncValidAndSendEmail = () =>
    {
        let email =
        {
            subject: this.state.email.subject,
            html: this.state.email.html,
            text: this.state.email.text,
            recipients: this.keyRowsSelected
        };
        this.fncSendEmail(email);

    };

    fncHandleNext = () =>
    {
        const {stepIndex} = this.state;
        let status = true;

        let errorText = {subject: "", text: "", recipients: ""};
        let email = {
            'subject': this.state.email.subject,
            'text': this.state.email.text,
            'html': this.state.email.html
        };

        this.setState({'errorText': errorText});

        _.forEach(email, (value, key) => {
            if (!this.fncValidValue(value)) {
                status = false;
                errorText[key] = 'Informe este campo';
            }
        });

        if (stepIndex < 1 && status) {
            this.setState({stepIndex: stepIndex + 1});
        }
    };

    fncValidValue = (value) =>
    {
        return value !== undefined && value !== ""
    };

    fncHandlePrev = () =>
    {
        const {stepIndex} = this.state;

        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    fncFilterRows = () =>
    {
        let filter = this.search.input.value;
        filter = filter.toUpperCase();
        let result = _.filter(this.state.signatures, (o) => {
            let name = o.name.toUpperCase();
            return name.includes(filter);
        });
        this.fncMakeRows(result);
    };

    fncMakeRows = (signatures) =>
    {
        signatures = _.sortBy(signatures, ['name', 'email']);
        let rows = signatures.map((student) =>
            <TableRow key={student._id} selected={this.isSelectedRow(student.email)}>
                <TableRowColumn>{student.name}</TableRowColumn>
                <TableRowColumn>{student.email}</TableRowColumn>
                <TableRowColumn>{student.signature ? 'ativa' : 'desativa'}</TableRowColumn>
            </TableRow>
        );

        this.setState({'rows': rows});
    };

    rowSelected = (item) =>
    {
        let rows = this.state.rows;
        this.keyRowsSelected = [];
        if (item === 'all') {
            _.forEach(rows, (item) => {
                let result = _.filter(this.state.signatures, (o) => {
                    return o._id === item.key
                });
                if (result.length > 0) {
                    this.keyRowsSelected.push(result[0].email);
                }

            });
        }

        if (item !== 'all' && item !== 'none') {
            _.forEach(item, (value) => {

                let result = _.filter(this.state.signatures, (o) => {
                    return o._id === rows[value].key
                });
                if (result.length > 0) {
                    this.keyRowsSelected.push(result[0].email);
                }
            });

        }

        let remakeRow = [];
        _.forEach(rows, (item) => {
            let result = _.filter(this.state.signatures, (o) => {
                return o._id === item.key
            });
            if (result.length > 0 && result[0].name !== undefined) {
                remakeRow.push(result[0])
            }
        });

        if (remakeRow.length > 0) {
            this.fncMakeRows(remakeRow);
        }

    };

    isSelectedRow = (id) =>
    {
        let result = _.filter(this.keyRowsSelected, (o) => {
            return o === id
        });
        return result.length > 0;
    };

    getStepContent(stepIndex)
    {
        switch (stepIndex) {
            case 0:
                return (
                    <div>
                        <TextField
                            hintText="Informe o assunto do email"
                            floatingLabelText="Assundo"
                            type="text"
                            disabled={this.state.makeSend}
                            errorText={this.state.errorText.subject}
                            fullWidth={true}
                            ref={(input) => this.subject = input}
                            onChange={(event, value) => this.fncSetData(event, value, 'subject')}
                            value={this.state.email.subject}/>
                        <TextField
                            hintText="Informe o corpo do email (caso o html não carregue)"
                            floatingLabelText="Texto"
                            type="text"
                            disabled={this.state.makeSend}
                            errorText={this.state.errorText.text}
                            fullWidth={true}
                            multiLine={true}
                            ref={(input) => this.text = input}
                            onChange={(event, value) => this.fncSetData(event, value, 'text')}
                            value={this.state.email.text}/>
                        <TextField
                            hintText="Informe o html do email"
                            floatingLabelText="HTML"
                            type="text"
                            disabled={this.state.makeSend}
                            errorText={this.state.errorText.html}
                            fullWidth={true}
                            multiLine={true}
                            ref={(input) => this.html = input}
                            onChange={(event, value) => this.fncSetData(event, value, 'html')}
                            value={this.state.email.html}/>

                    </div>
                );

            case 1:
                return (
                    <div>

                        <span className="display-block">
                             <TextField
                                 hintText="informe o nome do aluno"
                                 floatingLabelText="Pesquisar assinatura"
                                 type="text"
                                 errorText={this.state.errorText.recipients}
                                 fullWidth={true}
                                 onChange={() => this.fncFilterRows()}
                                 ref={(input) => this.search = input}/>
                        </span>
                        <Table
                            height={'300px'}
                            fixedHeader={true}
                            selectable={true}
                            multiSelectable={true}
                            onRowSelection={(item) => this.rowSelected(item)}>
                            <TableHeader
                                style={this.styles.tableHeader}
                                displaySelectAll={true}
                                adjustForCheckbox={true}
                                enableSelectAll={true}>

                                <TableRow>
                                    <TableHeaderColumn>Nome do aluno</TableHeaderColumn>
                                    <TableHeaderColumn>Email do aluno</TableHeaderColumn>
                                    <TableHeaderColumn>Situação da assinatura</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={true}
                                       showRowHover={true}
                                       deselectOnClickaway={false}
                                       style={this.styles.tableBody}>
                                {this.state.rows}
                            </TableBody>
                        </Table>
                    </div>
                );

            default:
                return ((<span>error</span>))
        }
    };

    styles =
    {
            tableHeader: {backgroundColor: '#f1f1f1', textAlign: 'left', fontSize: '20px'},
            tableBody: {cursor: 'pointer'},
            toggle:{ maxWidth: 250, marginTop:'20px'}
    };

    render()
    {
        const {stepIndex} = this.state;

        const actions = [
            <FlatButton
                label={stepIndex === 0 ? 'Cancelar' : 'Voltar'}
                primary={true}
                onTouchTap={stepIndex === 0 ? this.fncCanStep : this.fncHandlePrev}
            />,
            <RaisedButton
                backgroundColor="#0ac752"
                labelStyle={{color: 'white'}}
                label={stepIndex === 1 ? 'Enviar' : 'Proximo'}
                primary={true}
                onTouchTap={stepIndex === 1 ? this.fncValidAndSendEmail : this.fncHandleNext}
                style={{float: 'right', marginRight: '10px'}}/>
            ,
        ];

        return (
            <div>
                <Dialog
                    title="Enviando email"
                    autoScrollBodyContent={true}
                    actions={actions}
                    modal={true}
                    style={{margin:'0',minHeight: '450px', maxHeight: '450px'}}
                    titleStyle={{padding:'30px', marginTop:'-40px'}}
                    contentStyle={{width: '80%', maxWidth: 'none',minHeight: '450px', maxHeight: '450px'}}
                    bodyStyle={{minHeight: '400px', maxHeight: '400px'}}
                    open={this.state.open}
                >
                    {this.state.sending ?<LinearProgress mode="indeterminate" />  : null}

                    <Stepper activeStep={stepIndex} connector={<ArrowForwardIcon/>}>
                        <Step>
                            <StepLabel>Informações básicas</StepLabel>
                        </Step>

                        <Step>
                            <StepLabel>Destinatários</StepLabel>
                        </Step>
                    </Stepper>
                    {this.getStepContent(stepIndex)}
                    <Snackbar
                        open={this.state.response}
                        message="Emails diparados com sucesso."
                        autoHideDuration={5000}
                        onRequestClose={this.fncCanStep}
                    />
                </Dialog>
            </div>
        );
    };

}
export default SendEmail;