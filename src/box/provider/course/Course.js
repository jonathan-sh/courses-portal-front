import React, {Component} from "react";
import TableFound from './Table';
import NewIco from 'material-ui/svg-icons/content/add';
import BackIco from 'material-ui/svg-icons/content/reply-all';
import RaisedButton from 'material-ui/RaisedButton';
import PubSub from 'pubsub-js';
import Crud from "./Crud";

class Course extends Component {

    constructor()
    {
        super();
        this.state = {isCrud: false};
    }

    componentDidMount(){
        PubSub.publish('header-label','Pesquisar curso');
        PubSub.subscribe('switch-to-crud', this.fncInCrud);
    }

    fncGoToCrud = () => this.setState({'isCrud': true});

    fncGoToFind = () => this.setState({'isCrud': false});

    fncInCrud = (key, course) => {
        if (course !== undefined && course !==false)
        {
            this.setState({'course': course});
            this.setState({'isCrud': true});
            this.setState({'showTable': false});
        }
        else
        {
            this.fncGoToFind();
        }

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
                        onTouchTap={(this.fncCheck())? this.fncGoToFind : this.fncGoToCrud }
                        fullWidth={true}
                        labelStyle={{color: 'white'}}
                    />

                {this.state.isCrud ? <Crud course={false}/>  : <TableFound/>}

            </div>
        )
    }
}

export default Course;
