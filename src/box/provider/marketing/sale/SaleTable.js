import React, {Component} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import SaleCrud from './SaleCrud';
import providerService from '../../../../service/repository/ProviderService';
import data from '../../../../service/TreatsValue';



class SaleTable extends Component {

    constructor()
    {
        super();
        this.state = { rows: [], sales: []};
    };

    componentDidMount()
    {
        this.fncGetSales();
    };

    fncGetSales = () =>
    {
        providerService.getAll()
            .then(success => this.fncSuccessRequest(success))
            .catch(error => console.log(error));
    };

    fncSuccessRequest = (success)=>
    {
        let sales = success.sales;
        this.setState({'sales': sales});
        this.fncMakeRows(sales);
    };

    fncMakeRows = (sales) =>
    {
        let rows = sales.map((sale, index) =>
            <TableRow key={index}>
                <TableRowColumn>{data.notNull(sale.name)}</TableRowColumn>
                <TableRowColumn>{data.notNull(sale.start)}</TableRowColumn>
                <TableRowColumn>{data.notNull(sale.end)}</TableRowColumn>
                <TableRowColumn>{sale.status? 'active' : 'deactivated'}</TableRowColumn>
            </TableRow>
        );

        this.setState({'rows': rows});
    };

    styles =
        {
            tableHeader: {backgroundColor: '#f1f1f1', textAlign: 'left', fontSize: '20px'},
            tableBody: {cursor: 'pointer'},
            machineRow: {width: '400px'},
        };

    render()
    {
        return (

            <div>
                <h4 className={"subTopicBack"}>Promoções</h4>
                <SaleCrud/>
                <TextField
                    hintText="Search sales"
                    floatingLabelText="Search"
                    type="text"
                    fullWidth={true}
                    style={{marginBottom:'20px',marginTop:'-20px'}}
                    ref={(input) => this.search = input}/>
                <Table>
                    <TableHeader
                        fixedHeader={true}
                        adjustForCheckbox={false}
                        enableSelectAll={false}
                        displaySelectAll={false}
                        style={this.styles.tableHeader}>
                        <TableRow>
                            <TableHeaderColumn>Sale name</TableHeaderColumn>
                            <TableHeaderColumn>Start</TableHeaderColumn>
                            <TableHeaderColumn>End</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}
                               showRowHover={true}
                               style={this.styles.tableBody}>
                        {this.state.rows}
                    </TableBody>
                </Table>
            </div>

        )
    };
}
export default SaleTable;
