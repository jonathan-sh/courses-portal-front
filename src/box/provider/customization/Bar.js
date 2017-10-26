/**
 * Created by Igor Martucelli on 26/08/2017.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Grade from './Grade';
import PubSub from 'pubsub-js';
import DeleteIco from 'material-ui/svg-icons/content/delete-sweep';
import NewIco from 'material-ui/svg-icons/content/add';
import ProviderRepository from './../../../repository/ProviderRepository';

class Bar extends Component
{
    constructor(props)
    {
        super(props);
        this.providerRepository = new ProviderRepository();
        this.state =
        {
            showGrade: false,
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

    fncHideGrade = (topic, object) =>
    {
        this.setState({'showGrade': object.showGrade});
        if(object.message !== null && object.message !== undefined)
        {
            PubSub.publish('show-message', object.message);
        }
    };

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

    makeUpdateProvider = (message) =>
    {
        this.providerRepository
            .update(this.state.provider)
            .then(success => this.responseUpdate(success, message))
            .catch(error => PubSub.publish('show-message', error));
    };

    responseUpdate = (response, message) =>
    {
        response.password = null;
        this.setState({'provider':response});
        localStorage.setItem('provider', JSON.stringify(response));
        PubSub.publish('list-grade', this.state.provider);
        PubSub.publish('show-message', message);

    };

    fncDeleteGrade = (object, position, attribute) =>
    {
        let provider = this.state.provider;
        provider[attribute].splice(position , 1);
        this.setState({'provider': provider});
        const message =  'Grade ' + object.description + ' deletada com sucesso!';
        this.makeUpdateProvider(message);
    };

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
            </div>
        );
    };
}

export default Bar;