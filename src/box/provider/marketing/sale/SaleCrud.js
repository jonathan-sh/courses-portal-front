import React, {Component} from "react";
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AddIco from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import DatePick from './Date';

class SaleCrud extends Component {
    constructor(props)
    {
        super(props);
        this.state =
            {
                open: false
            };
    };


    componentWillMount()
    {
        this.fncFillData();
    }

    fncFillData = () =>
    {

    };

    fncSave = () =>
    {

    };

    fncHandleOpen = () =>
    {
        this.setState({open: true});
    };

    fncHandleClose = () =>
    {
        this.setState({open: false})
    };

    fncSetData = (event, value, attribute) =>
    {

    };

    render()
    {
        const actions = [
            <FlatButton
                label={'Cancelar'}
                primary={true}
                onTouchTap={this.fncHandleClose}
            />,
            <RaisedButton
                backgroundColor="#0ac752"
                labelStyle={{color: 'white'}}
                label={'Enviar'}
                primary={true}
                onTouchTap={this.fncSave}
                style={{float: 'right', marginRight: '10px'}}/>
            ,
        ];

        return (
            <div>
                <RaisedButton
                    label={'Adicior uma promoção'}
                    backgroundColor={'#0ac752'}
                    icon={<AddIco color='#FFF'/>}
                    onTouchTap={() => this.fncHandleOpen()}
                    fullWidth={true}
                    labelStyle={{color: 'white'}}
                />

                <Dialog
                    title="Promoções"
                    autoScrollBodyContent={true}
                    actions={actions}
                    modal={true}
                    style={{margin:'0',minHeight: '450px', maxHeight: '450px'}}
                    titleStyle={{padding:'30px', marginTop:'-40px'}}
                    contentStyle={{width: '80%', maxWidth: 'none',minHeight: '450px', maxHeight: '450px'}}
                    bodyStyle={{minHeight: 'auto', maxHeight: '400px'}}
                    open={this.state.open}
                >

                    <TextField
                        hintText="informe o nome da promoção"
                        floatingLabelText="Nome"
                        fullWidth={true}
                    />
                    <TextField
                        hintText="informe o código da promoção"
                        floatingLabelText="Código"
                        fullWidth={true}
                    />
                    <br/>
                    <div style={{display: '-webkit-inline-box',marginTop:'20px'}}>
                        <div>
                            <div className={"subTopic"}>Inicio</div>
                            <DatePick/>
                        </div>
                        <div>
                            <div className={"subTopic"}>Fim</div>
                            <DatePick/>
                        </div>
                    </div>

                </Dialog>
            </div>
        );
    };

}
export default SaleCrud;