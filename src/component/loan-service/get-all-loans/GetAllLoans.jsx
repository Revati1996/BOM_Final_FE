// import React from 'react';


// const GetAllLoans = () => {

//     const loans = [
//         { loan_id: 1, loan_amount: 10, balance_amount: 8, balance_tenure: 4, tenure: 10, status: "approved" },
//         { loan_id: 2, loan_amount: 20, balance_amount: 9, balance_tenure: 5, tenure: 11, status: "in-process" },
//         { loan_id: 3, loan_amount: 30, balance_amount: 10, balance_tenure: 6, tenure: 12, status: "new" }
//     ]

//     const renderLoan = (loan, index) => {
//         return (
//             <tr>
//                 <td>{loan.loan_id}</td>
//                 <td>{loan.loan_amount}</td>
//                 <td>{loan.balance_amount}</td>
//                 <td>{loan.balance_tenure}</td>
//                 <td>{loan.tenure}</td>
//                 <td>{loan.status}</td>
//             </tr>
//         )
//     }
//     return (

//         <>
//             <div style={{ marginLeft: 450, marginRight: 450, marginTop: 200 }}>
//                 <ReactBootStrap.Table striped bordered hover variant="dark">
//                     <thead>
//                         <tr>
//                             <th>Loan ID</th>
//                             <th>Loan Amount</th>
//                             <th>Balance Amount</th>
//                             <th>Balance Tenure</th>
//                             <th>Tenure</th>
//                             <th>Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {loans.map(renderLoan)}
//                     </tbody>
//                 </ReactBootStrap.Table>
//             </div>
//         </>
//     );
// };

import * as ReactBootStrap from "react-bootstrap";
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import GetLoanForCidLid from "../get-loan-for-cidlid/GetLoanForCidLid";
import { style } from "dom-helpers";
import { useHistory } from "react-router-dom";

class GetAllLoans extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loans: [],
            isLoading: false,
            isError: false
        }
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        console.log(this.state.loans+'<------------------------ loans');
        let customerId = 0;
        const response = await fetch("http://localhost:8085/api/customer/"+ localStorage.getItem("custId") +"/loans");
        if (response.ok) {
            const loans = await response.json();
            console.log(loans);
            this.setState({ loans, isLoading: false });
        } else {
            console.log(response);
            this.setState({ isError: true, isLoading: false });
        }


    }


    // handleViewDetail = (event,loanid) =>{
           
    //         console.log(loanid+' <---loan id');
        
 
    //     return <GetLoanForCidLid/>
    // }

    renderTableHeader = () => {
        // return Object.keys(this.state.loans[0]).map(attr => <th key={attr}>
        //     {attr.toUpperCase()}
        // </th>)
        // alert(JSON.stringify(Object.keys(this.state.loans[0])));
        var allHeads = Object.keys(this.state.loans[0]).concat(["Details"]);
        // alert(JSON.stringify(Object.keys(this.state.loans[0])));

        //  var ths = allHeads.map((item, index) => {
        //      console.log(item);
        //      return <th key={index}>{item.toUpperCase()}</th>;
        //  });
 
        //  return (
        //      <tr>
        //          {ths}
        //      </tr>
        //  );
        return allHeads.map(attr => <th key={attr}>
            {attr.toUpperCase()}
        </th>);

    }

    renderTableRows = () => {
        return this.state.loans.map(loan => {

            const { match } = this.props;
            // const styles = {
            //     underline: {textDecorationLine: 'underline'},
            //     bold: {fontWeight: 'bold'}
            // };
            let history = useHistory;

            return (
                
                 <Router>
                    <tr key={loan.Id}>
                        <td>   {loan.loanId}  </td>
                        <td>{loan.loanAmount}</td>
                        <td>{loan.balanceAmount}</td>
                        <td>{loan.tenure}</td>
                        <td>{loan.balanceTenure}</td>
                        <td> {loan.loanStatus}</td>
                        {/* <td  > <a href="" onClick={ (e) => {e.preventDefault();                             
                                                                }}>View Detail</a></td> */}
                                                                <td> <Link to="/getLoanForCidLid">details</Link></td>
                         <Switch>
                            <Route path="/getLoanForCidLid">
                                <GetLoanForCidLid lid={loan.loanId} cid="CID" />
                            </Route>
                        </Switch> 
                    </tr >
                 </Router>

            )
        })
    }

    render() {
        const { loans, isLoading, isError } = this.state;

        if (isLoading) {
            return <div>Loading ...</div>
        }
        if (isError) {
            return <div>Error...</div>
        }
        return loans.length > 0
            ? (

                <div className="col-md-12">
                    <h2 style={{ color: "white" }}>Customer Loan Details</h2>
                    <hr style={{ height: "2px", color: "gray", backgroundColor: "white", borderWidth: "0" }}></hr>

                    <ReactBootStrap.Table striped bordered hover variant="dark" rowevents={this.handleViewDetail}>
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
                <div>NO loans</div>
            )
    }
}
export default GetAllLoans;