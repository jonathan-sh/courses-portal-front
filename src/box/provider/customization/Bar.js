/**
 * Created by Igor Martucelli on 26/08/2017.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Grade from './Grade';
import PubSub from 'pubsub-js';
import DeleteIco from 'material-ui/svg-icons/content/delete-sweep';
import NewIco from 'material-ui/svg-icons/content/add';
import Snackbar from 'material-ui/Snackbar';
import httpService from './../../../service/HttpService';

class Bar extends Component
{
    constructor(props)
    {
        super(props);
        this.httpService = new httpService();
        this.state =
        {
            showGrade: false,
            showAction: false,
            messageAction: 'Test is success',
            provider: JSON.parse(localStorage.getItem('provider')),
            grades: '',
            whatGrade: '',
            index: ''
        };
    };

    componentDidMount()
    {
        PubSub.subscribe('list-grade', this.fncListGrade);
        PubSub.subscribe('show-grade', this.fncHideGrade);
        this.fncListGrade();
    };

    fncHideGrade = (topic, open) => this.setState({'showGrade': open});

    fncListGrade = () =>
    {
        this.setState({'provider': JSON.parse(localStorage.getItem('provider'))});

        if (this.state.provider.grades !== null)
        {
            let grades = this.state.provider.grades.map((grade, index) =>
                <div key={index}>
                    <RaisedButton
                        label={grade.description}
                        backgroundColor="#2dc7a2"
                        labelStyle={{color: '#FFF'}}
                        style={{marginTop: '10px', width: '80%'}}
                        onTouchTap = {(object, position) => this.fncShowGrade(grade, index)}
                    />
                    <RaisedButton
                        label="delete"
                        backgroundColor="#ff2930"
                        icon={<DeleteIco color="#FFF"/>}
                        style={{marginLeft:'1%',width: '19%'}}
                        labelStyle={{color: 'white'}}
                        onTouchTap = {(object, position) => this.fncDeleteGrade(grade, index, 'grades')}
                    />
                </div>
            );

            this.setState({'grades': grades});
        }
    };

    fncShowGrade = (object, position) =>
    {
        this.setState({'whatGrade': object});
        this.setState({'index': position});
        this.setState({'showGrade': true});
    };

    makeUpdateProvider = () =>
    {
        this.httpService.put('/provider', this.state.provider, localStorage.getItem('auth-token'))
            .then(response => {
                if (response.status !== 501 )
                {
                    return response.json();
                }
                this.setState({'messageAction': 'Erro ao deletar grade.'});
                throw new Error('Falha de autenticação.');
            })
            .then(success => {
                this.responseUpdate(success);
            })
            .catch(error => { console.log(error);});
    };

    responseUpdate = (response) =>
    {
        response.password = null;
        this.setState({'provider':response});
        this.setState({'showAction':true});
        localStorage.setItem('provider', JSON.stringify(response));
        PubSub.publish('list-grade', this.state.provider);
    };

    fncDeleteGrade = (object, position, attribute) =>
    {
        let provider = this.state.provider;
        provider[attribute].splice(position , 1);
        this.setState({'provider': provider});
        this.setState({'messageAction':'Grade ' + object.description + ' deletada com sucesso!'});
        this.makeUpdateProvider();
    };

    handleRequestClose = () => this.setState({'showAction': false});

    render()
    {
        return(
            <div>
                {this.state.showGrade ? <Grade grade={this.state.whatGrade} index={this.state.index} />  : null}
                {this.state.grades}
                <RaisedButton
                    onTouchTap={() => this.fncShowGrade()}
                    label="adicinar categoria"
                    backgroundColor="#0ac752"
                    icon={<NewIco color="#FFF"/>}
                    labelStyle={{color: 'white'}}
                    style={{float: 'right',width: '19%', marginTop:'20px'}}
                />
                <Snackbar
                    open={this.state.showAction}
                    message={this.state.messageAction}
                    autoHideDuration={2000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    };
}

export default Bar;