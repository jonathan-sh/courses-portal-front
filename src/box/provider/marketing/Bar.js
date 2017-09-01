/**
 * Created by Igor Martucelli on 26/08/2017.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Grade from './Grade';
import PubSub from 'pubsub-js';

class Bar extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            showGrade:false,
            provider: JSON.parse(localStorage.getItem('provider')),
            grades:''
        };
    };

    componentDidMount(){
        PubSub.subscribe('new-grade', this.fncListGrade);
        this.fncListGrade();
    }

    fncListGrade = () =>
    {
        this.setState({'provider': JSON.parse(localStorage.getItem('provider'))});

        if (this.state.provider.grades !== null) {
            let grades = this.state.provider.grades.map((grade, index) =>
                <RaisedButton
                    key={index += 1}
                    label={grade.description}
                    fullWidth={true}
                    backgroundColor="#2dc7a2"
                    labelStyle={{color: '#FFF'}}
                    style={{marginTop: '10px'}}
                />
            );

            this.setState({'grades': grades});
        }
    };

    fncShowGrade = () => this.setState({showGrade: true});

    render()
    {
        return(
            <div>
                {this.state.showGrade ? <Grade/>  : null}
                <h3 className="title">Categorias</h3>
                {this.state.grades}
                <RaisedButton
                    onTouchTap={() => this.fncShowGrade()}
                    label="adicinar categoria"
                    backgroundColor="#0ac752"
                    labelStyle={{color: 'white'}}
                    style={{float: 'right', margin: '20px 0 20px 20px'}} />

            </div>
        );
    };
}

export default Bar;