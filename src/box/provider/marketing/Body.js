/**
 * Created by Igor Martucelli on 26/08/2017.
 */
import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

class Body extends Component
{
    render()
    {
        return(
            <div {...this.props}>
                <TextField
                    id="description"
                    hintText="Descrivo"
                    floatingLabelText="Descrivo"
                    fullWidth={true}
                    errorText={''}
                />
                <TextField
                    id="about"
                    hintText="Sobre"
                    floatingLabelText="Sobre"
                    fullWidth={true}
                />
            </div>
        );
    };
}

export default Body;