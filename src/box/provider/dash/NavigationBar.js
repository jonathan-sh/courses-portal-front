import React, {Component} from "react";
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import AboutIco from 'material-ui/svg-icons/action/perm-identity';
import Marketing from 'material-ui/svg-icons/action/dashboard';
import CourseIco from 'material-ui/svg-icons/social/school';
import RegisterIco from 'material-ui/svg-icons/content/create';
import AnalyticIco from 'material-ui/svg-icons/action/trending-up';
class NavigationBar extends Component {


    render() {
        return (
            <div>
                <Drawer open={true}>
                    <AppBar
                        title="Title"
                        showMenuIconButton={false}
                    />
                    <MenuItem
                        primaryText="Sobre"
                        leftIcon={<AboutIco  />}
                    />
                    <Divider />
                    <MenuItem
                        primaryText="Marketing"
                        leftIcon={<Marketing/>}
                    />
                    <Divider />
                    <MenuItem
                        primaryText="Curso"
                        leftIcon={<CourseIco/>}
                    />
                    <Divider />
                    <MenuItem
                        primaryText="Matricula"
                        leftIcon={<RegisterIco  />}
                    />
                    <Divider />
                    <MenuItem
                        primaryText="Analitico"
                        leftIcon={<AnalyticIco  />}
                    />
                    <Divider />

                </Drawer>
            </div>
        );
    }
}

export default NavigationBar;
