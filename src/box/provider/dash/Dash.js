import React, { Component } from "react";
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import AboutIco from 'material-ui/svg-icons/action/perm-identity';
import Marketing from 'material-ui/svg-icons/action/dashboard';
import CourseIco from 'material-ui/svg-icons/action/toc';
import RegisterIco from 'material-ui/svg-icons/content/create';
import AnaliticIco from 'material-ui/svg-icons/action/trending-up';
class Dash extends Component {

    render() {
        return (
            <div>
                <AppBar
                    title="Title"
                    showMenuIconButton={false}
                />
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
                        leftIcon={<AnaliticIco  />}
                    />
                    <Divider />

                </Drawer>

            </div>
        );
    }
}

export default Dash;


