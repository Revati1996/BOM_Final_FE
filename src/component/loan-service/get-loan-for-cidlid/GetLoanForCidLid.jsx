// import React from 'react';
import * as ReactBootStrap from "react-bootstrap";
import React from 'react';
import { Redirect, Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

class GetLoanForCidLid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loans: {
                loanId: 0,
                loanAmount: 0,
                balanceAmount: 0,
                tenure: 0,
                balanceTenure: 0,
                loanStatus: 0,                
            },
            isLoading: false,
            isError: false
        }
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        // console.log(" props from previous component : "+ JSON.stringify(this.props.lid));
        let customerId= 779;
        const response = await fetch("http://localhost:8085/api/customer/"+customerId+"/loans/"+this.props.lid);
        if (response.ok) {
            const loans = await response.json();
            // console.log(JSON.stringify(loans)+"<------ componentdidmount loans");
            // alert(JSON.stringify(this.state));
            this.setState({ loans, isLoading: false });
            // alert(JSON.stringify(this.state));

        } else {
            this.setState({ isError: true, isLoading: false });
        }


    }


    renderTableHeader = () => {
        // var allHeads1 = Object.keys(this.state.loans[0]).concat(["", "", "", "", "", "","View Details"]);
        // console.log(allHeads1);
        // var ths = allHeads1.map(
        //     (item, index) => {
        //         return <th key={index}>{item.toLocaleUpperCase()}</th>
        //     }
        // )
        // return (
        //     <tr>
        //         {ths}
        //     </tr>
        // )
        // return Object.keys(this.state.loans[0]).map(attr => <th key={attr}>
        //     {attr.toUpperCase()}
        // </th>)
        
        //  var allHeads = Object.keys(this.state.loans).concat(["", "", "", "", "", "", "Details"]);
        return Object.keys(this.state.loans).map(attr => <th key={attr}>
            {attr.toUpperCase()}
        </th>)

    }

    renderTableRows = () => {
        let {loans} = this.state;
            return (                
                <tr key={loans.loanId}>
                    <td>{loans.loanId}</td>
                    <td>{loans.loanAmount}</td>
                    <td>{loans.balanceAmount}</td>
                    <td>{loans.balanceTenure}</td>
                    <td>{loans.tenure}</td>
                    <td>{loans.loanStatus}</td>
                </tr>
            )        
    }

    render() {
        // console.log("render()..");
        // console.log(JSON.stringify(this.state));
        const { loans, isLoading, isError } = this.state;

        if (isLoading) {
            return <div>Loading ...</div>
        }
        if (isError) {
            return <div>Error...</div>
        } 
         return loans
            ? (

                <div className="col-md-12">
                    <h2 style={{ color: "white" }}>Customer Loan Details</h2>
                    <hr style={{ height: "2px", color: "gray", backgroundColor: "white", borderWidth: "0" }}></hr>

                    <ReactBootStrap.Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                {this.renderTableHeader()}
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableRows()}
                        </tbody>
                    </ReactBootStrap.Table>
                </div>

            ) : (
                <div>No loans..</div>
            )
    }
}
export default GetLoanForCidLid;