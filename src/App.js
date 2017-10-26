import "./style/css/index.css";
import React, {Component} from "react";
import HeaderBar from "./box/home/bar/HeaderBar";
import Paper from 'material-ui/Paper';
import HttpService from './service/HttpService';

class App extends Component
{
    constructor()
    {
        super();
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
        HttpService.make().get('/home')
                .then(success => {
                    this.setItemsLocalStorage(success);
                })
                .catch(error =>
                {
                    console.log(error)
                });
    };

    createAboutComponent = () =>
    {
        const topics = this.state.topics;

        let component = topics.map((topic, index) =>
            <div key={index} className='boxAbout'>
                <h2 className="title" style={{color: '#00bcd4', fontWeight: '500'}}>{topic.header}</h2>
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
                <div className='boxTopics'>
                    {this.state.topicsComponent}
                </div>
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
