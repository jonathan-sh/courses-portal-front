/**
 * Created by Igor Martucelli on 26/08/2017.
 */
import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

class Footer extends Component
{
    render()
    {
        return(
            <div {...this.props}>
                <TextField
                    id="footer"
                    hintText="Roda-pé"
                    floatingLabelText="Roda-pé"
                    fullWidth={true}
                />
            </div>
        );
    };
}

export default Footer;