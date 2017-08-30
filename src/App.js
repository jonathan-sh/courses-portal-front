import "./style/css/index.css";
import React, {Component} from "react";
import HeaderBar from "./box/home/bar/HeaderBar";
import Paper from 'material-ui/Paper';

class App extends Component {

    state = {about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fringilla sagittis purus et feugiat. Sed finibus lorem nisi, eget vestibulum urna luctus eget. Vivamus felis nisi, interdum a aliquam eu, tempus quis arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fringilla sagittis purus et feugiat. Sed finibus lorem nisi, eget vestibulum urna luctus eget. Vivamus felis nisi, interdum a aliquam eu, tempus quis arcu.'};

    render() {
        const style = {
            card:{
                margin: 'auto',
                display:'inline-block',
                marginTop: '10%',
                width: '300px',
                height: '400px'
            },
            cardDiv:{
                width:'50%',
                textAlign:'center',
                float:'left'
            }


        };

        return (
            <div>
                <div className="home">
                    <HeaderBar/>
                    <span className="subTitle">A diferença do sucesso.</span>
                </div>
                <div>
                    <h2 className="title">Sobre</h2>
                    <div className="about"> {this.state.about}</div>
                </div>
                <div className="home-plans">
                    <span className="plainTitle">Planos</span>
                    <div  style={style.cardDiv}>
                        <Paper style={style.card} zDepth={4} />
                    </div>
                    <div  style={style.cardDiv}>
                        <Paper style={style.card} zDepth={4} />
                    </div>

                </div>
            </div>
        );
    }
}

export default App;
