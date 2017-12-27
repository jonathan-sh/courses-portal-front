import React, {Component} from "react";
import TableFound from './TableCourse';
import NewIco from 'material-ui/svg-icons/content/add';
import BackIco from 'material-ui/svg-icons/content/reply-all';
import RaisedButton from 'material-ui/RaisedButton';
import PubSub from 'pubsub-js';
import CrudCourse from "./CrudCourse";

class Course extends Component {

    constructor()
    {
        super();
        this.state = {isCrud: false,course:null};
    };

    componentDidMount()
    {
        PubSub.publish('header-label','Pesquisar curso');
        PubSub.subscribe('go-table', this.fncGoToFind);
        PubSub.subscribe('go-crud' , this.fncGoToCrud);
    };

    fncGoToCrud = (key, course) =>
    {
        this.setState({'course': course});
        this.setState({'isCrud': true});
    };

    fncGoToFind = () =>
    {
        this.setState({'isCrud': false});
        this.setState({'course': null});
    };

    render()
    {
        return (
            <div>

                <br/>

                    <RaisedButton
                        label={(this.state.isCrud)? 'voltar para lista de cursos' : 'adicionar um curso novo'}
                        backgroundColor={(this.state.isCrud)? '#ff7500' : '#0ac752'}
                        icon={(this.state.isCrud)? <BackIco color='#FFF'/> : <NewIco color='#FFF'/>}
                        onTouchTap={(this.state.isCrud)? this.fncGoToFind : this.fncGoToCrud }
                        fullWidth={true}
                        labelStyle={{color: 'white'}}
                    />

                {this.state.isCrud ? <CrudCourse course={this.state.course} />  : <TableFound/>}

            </div>
        )
    };
}

export default Course;
