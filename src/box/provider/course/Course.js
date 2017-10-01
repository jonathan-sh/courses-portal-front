import React, {Component} from "react";
import TableFound from './Table';
import NewIco from 'material-ui/svg-icons/content/add';
import BackIco from 'material-ui/svg-icons/content/reply-all';
import RaisedButton from 'material-ui/RaisedButton';
import Information from './Information';
import PubSub from 'pubsub-js';
import Crud from "./Crud";

class Course extends Component {

    constructor() {
        super();
        this.state = {isCrud: false, newCourse: false, showTable:true, course:''};
    }

    componentDidMount(){
        PubSub.publish('header-label','Pesquisar curso');
        PubSub.subscribe('switch-to-crud', this.fncInCrud);
    }

    styles = {btnCourse: {width: '100%'} };

    fncNewCourse = () => {
        PubSub.publish('header-label','Criando curso');
        this.setState({newCourse: true});
    };

    fncInCrud = (key, course) => {
        if (course !== undefined && course !==false)
        {
            this.setState({'course': course});
            this.setState({'isCrud': true});
            this.setState({'showTable': false});
        }
        else
        {
            this.fncBackToFind();
        }

    };

    fncBackToFind = () => {
        this.setState({'isCrud': false});
        this.setState({'newCourse': false});
        this.setState({'showTable': true});
    };

    fncCheck = () => {return this.state.newCourse || this.state.isCrud};

    render() {
        return (
            <div>

                <br/>

                    <RaisedButton
                        label={(this.fncCheck())? 'voltar a lista de cursos' : 'adicionar um curso novo'}
                        backgroundColor={this.fncCheck()? '#ff7500' : '#0ac752'}
                        icon={this.fncCheck()? <BackIco color='#FFF'/> : <NewIco color='#FFF'/>}
                        onTouchTap={(this.fncCheck())? this.fncBackToFind : this.fncNewCourse }
                        style={this.styles.btnCourse}
                        labelStyle={{color: 'white'}}
                    />


                {this.state.newCourse ? <Information/>  : null}

                {this.state.showTable ? <TableFound/>  : null}

                {this.state.isCrud ? <Crud course={this.state.course} />  : null}


            </div>
        )
    }
}

export default Course;
