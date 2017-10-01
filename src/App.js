import "./style/css/index.css";
import React, {Component} from "react";
import HeaderBar from "./box/home/bar/HeaderBar";
import Paper from 'material-ui/Paper';
import httpService from './service/HttpService';

class App extends Component
{
    constructor()
    {
        super();
        this.httpService = new httpService();
        this.state =
        {
            welcome: '',
            topics: '',
            topicsComponent: ''
        };
    };

    componentDidMount()
    {
        this.getDataForPlatform();
    };

    setItemsLocalStorage = (objects) =>
    {
        localStorage.setItem('welcome', JSON.stringify(objects.welcome));
        localStorage.setItem('topics', JSON.stringify(objects.topics));
        localStorage.setItem('grade', JSON.stringify(objects.grade));
        this.setState({'welcome': objects.welcome, 'topics': objects.topics});
        this.createAboutComponent();
    };

    getDataForPlatform = () =>
    {
        this.httpService.get('/home')
            .then(response => {
                if (response.status !== 501 )
                {
                    return response.json();
                }
                throw new Error('Falha ao carregar dados da plataforma!');
            })
            .then(success => {
                this.setItemsLocalStorage(success);
            })
            .catch(error => {console.log(error)});
    };

    createAboutComponent = () =>
    {
        const topics = this.state.topics;

        let component = topics.map((topic, index) =>
            <div key={index}>
                <h2 className="title">{topic.header}</h2>
                <div className="about">{topic.description}</div>
            </div>
        );

        this.setState({'topicsComponent': component});
    };

    render()
    {
        return (
            <div>
                <div className="home">
                    <HeaderBar/>
                    <span className="subTitle">{this.state.welcome}</span>
                </div>
                {this.state.topicsComponent}
                <div className="home-plans">
                    <span className="plainTitle">Planos</span>
                    <div  style={{width:'50%', textAlign:'center', float:'left'}}>
                        <Paper style={{margin: 'auto', display:'inline-block', marginTop: '10%', width: '300px', height: '400px'}} zDepth={4} />
                    </div>
                    <div  style={{width:'50%', textAlign:'center', float:'left'}}>
                        <Paper style={{margin: 'auto', display:'inline-block', marginTop: '10%', width: '300px', height: '400px'}} zDepth={4} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
