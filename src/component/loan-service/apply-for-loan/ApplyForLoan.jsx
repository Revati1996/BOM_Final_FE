// import React from 'react';

// import { Button, Form, FormControl } from "react-bootstrap";
// import { CardBody, Card } from "reactstrap";


// export const ApplyForLoan = (props) => {
//     return (

//         <>
//         <div></div>
//             <div id="content" style={{ marginLeft: 450, marginRight: 450, marginTop: 200 }} >

//                 <h1 className="text-info text-center">Enter Loan Details </h1>
//                 <Card className="text-center">
//                     <CardBody>
//                         <Form >
//                             <Form.Group className="mb-3" controlId="formBasicEmail" >
//                                 <Form.Label>Account Id</Form.Label>
//                                 <Form.Control type="email" placeholder="Enter Account Id" />
//                             </Form.Group>
//                             <Form.Group className="mb-3" controlId="formBasicEmail" >
//                                 <Form.Label>Loan Amount</Form.Label>
//                                 <Form.Control type="email" placeholder="Enter Loan Amount" />
//                             </Form.Group>
//                             <Form.Group className="mb-3" controlId="formBasicEmail">
//                                 <Form.Label>Tenure</Form.Label>
//                                 <Form.Control type="email" placeholder="Enter tenure" />
//                             </Form.Group>           Loan Status
//                             <Form.Select aria-label="Default select example">
//                                 <option>Select loan status</option>
//                                 <option value="1">NEW</option>
//                                 <option value="2">APPROVED</option>
//                                 <option value="3">IN-PROCESS</option>
//                                 <option value="4">DECLINED</option>
//                                 <option value="5">CLOSED</option>

//                             </Form.Select>

//                             <Button variant="primary" type="submit" >
//                                 Apply
//                             </Button>
//                         </Form>
//                     </CardBody>
//                 </Card>
//             </div>

//         </>
//     );
// };

// export default ApplyForLoan;


import React, { Component, Fragment } from 'react';
import axios from 'axios';

class ApplyForLoan extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loan: {
                account_id: 100,
                loan_amount: 100,
                tenure: 100,
                status: "new"
            }
         }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify(this.state.loan) + "-------");
        await axios.post("http://localhost:8085/api/loans",this.state.loan)
        .then(
            response => {
                console.log(response);
                alert("applied for loan successfully...")
            }
        )
        .catch(
            error => {
                alert("could not apply for loan ...")

                console.log(error);
            }
        );
    }

    handleOnchangeAccountid = (e) => {

         var acct = e.target.value;
        var tempLoan = { ...this.state.loan };
        tempLoan.account_id = acct;
       // alert(JSON.stringify(tempLoan));
        this.setState({
            loan: tempLoan
        });
        //alert(JSON.stringify(tempLoan));

    }

    handleOnchangeLoanAmount = (e) => {
       
        var tempLoan = {...this.state.loan};
        tempLoan.loan_amount = e.target.value;
        // alert(JSON.stringify(tempLoan));
        this.setState({
            loan: tempLoan
        });
        // alert(JSON.stringify(tempLoan));

    }

    handleOnchangeTenure = (e) => {
        
        var tempLoan = {...this.state.loan};
        tempLoan.tenure = e.target.value;
        // alert(JSON.stringify(tempLoan));
        this.setState({
            loan: tempLoan
        });
        // alert(JSON.stringify(tempLoan));
    }

    handleOnchangeStatus = (e) => {
       
        var tempLoan = {...this.state.loan};
        tempLoan.status = e.target.value;
        // alert(JSON.stringify(tempLoan));
        this.setState({
            loan: tempLoan
        });
        // alert(JSON.stringify(tempLoan));
    }

    render() {
        return (
            <div>
                <Fragment>
                    <Fragment>
                        <h2 style={{ color: "white" }}>Apply For Loan</h2>
                        <hr style={{ height: "2px", color: "gray", backgroundColor: "white", borderWidth: "0" }}></hr>
                    </Fragment>
                    <div className="row centered-statement-form">
                        <div className="col-xs-12 col-sm-6 col-md-6 col-sm-offset-2 col-md-offset-4">
                            <div className="panel panel-default">
                                <div className="panel-body">

                                    <form style={{ padding: "10px" }} onSubmit={this.handleSubmit}  >
                                        <div className="row">
                                            <div className="col-xs-6 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Account Id</label>
                                                    <input type="text" name="accountId" onChange={this.handleOnchangeAccountid} id="first_name" className="form-control input-sm" placeholder="Account Number" />
                                                </div>
                                            </div>
                                            <div className="col-xs-6 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Loan Amount</label>
                                                    <input type="text" name="loanAmount" onChange={this.handleOnchangeLoanAmount} id="last_name" className="form-control input-sm" placeholder="Enter Amount" />
                                                </div>
                                            </div>
                                            <div className="col-xs-6 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Tenure</label>
                                                    <input type="text" name="tenure" onChange={this.handleOnchangeTenure} id="last_name" className="form-control input-sm" placeholder="Enter Amount" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-6 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Loan Status</label>
                                                    <select className="form-control" id="sortOrder" onChange={this.handleOnchangeStatus} name="loanStatus">
                                                        <option value="1">--NONE--</option>
                                                        <option value="NEW">NEW</option>
                                                        <option value="APPROVED">APPROVED</option>
                                                        <option value="IN-PROCES">IN-PROCESS</option>
                                                        <option value="DECLINED">DECLINED</option>
                                                        <option value="CLOSED">CLOSED</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="btn btn-info btn-block" >Apply</button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div> </Fragment>
            </div>
        );
    }
}

export default ApplyForLoan;