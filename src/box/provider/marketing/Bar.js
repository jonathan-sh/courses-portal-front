/**
 * Created by Igor Martucelli on 26/08/2017.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Grade from './Grade';

class Bar extends Component
{
    constructor(props)
    {
        super(props);
        this.state ={showGrade:false};
    };

    fncShowGrade = () => this.setState({showGrade: true});

    render()
    {
        return(
            <div>
                {this.state.showGrade ? <Grade/>  : null}
                <h3 className="title">Categorias</h3>
                <RaisedButton
                    label={"CATEGORIA A"}
                    fullWidth={true}
                    backgroundColor="#2dc7a2"
                    labelStyle={{color: '#FFF'}}
                    style={{marginTop: '10px'}} />
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