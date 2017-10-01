import React, {Component} from "react";
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import AboutIco from 'material-ui/svg-icons/action/perm-identity';
import MarketingIco from 'material-ui/svg-icons/action/dashboard';
import CustomizationIco from 'material-ui/svg-icons/editor/mode-edit';
import CourseIco from 'material-ui/svg-icons/social/school';
import RegisterIco from 'material-ui/svg-icons/editor/format-align-justify';
import FinancialIco from 'material-ui/svg-icons/editor/attach-money';
import AnalyticIco from 'material-ui/svg-icons/action/trending-up';
import {Link} from 'react-router-dom';

class NavigationBar extends Component 
{
    render() {
        return (
            <div>
                <Drawer open={true} width={200}>
                    <AppBar
                        title="Title"
                        showMenuIconButton={false}
                    />
                    <Link to={'/provider/about'} className={"link-routes"}>
                        <MenuItem
                            primaryText="Sobre"
                            leftIcon={<AboutIco  />}
                        />
                    </Link>
                    <Divider />
                    <Link to={'/provider/customization'} className={"link-routes"}>
                        <MenuItem
                            primaryText="Personalização"
                            leftIcon={<CustomizationIco/>}
                        />
                    </Link>
                    <Divider />

                    <Link to={'/provider/marketing'} className={"link-routes"}>
                        <MenuItem
                            primaryText="Marketing"
                            leftIcon={<MarketingIco/>}
                        />
                    </Link>
                    <Divider />

                    <Link to={'/provider/course'} className={"link-routes"}>
                        <MenuItem
                            primaryText="Curso"
                            leftIcon={<CourseIco/>}
                        />
                    </Link>
                    <Divider />
                    <Link to={'/provider/signature'} className={"link-routes"}>
                        <MenuItem
                            primaryText="Assinatura"
                            leftIcon={<RegisterIco  />}
                        />
                    </Link>
                    <Divider />
                    <Link to={'/provider/financial'} className={"link-routes"}>
                        <MenuItem
                            primaryText="Financeiro"
                            leftIcon={<FinancialIco  />}
                        />
                    </Link>
                    <Divider />
                    <Link to={'/provider/analytical'} className={"link-routes"}>
                        <MenuItem
                            primaryText="Analitico"
                            leftIcon={<AnalyticIco  />}
                        />
                    </Link>
                    <Divider />
                </Drawer>
            </div>
        );
    }
}

export default NavigationBar;
