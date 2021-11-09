// import React from 'react';

// import { Button, Form, Card } from "react-bootstrap";
// import { CardBody, CardSubtitle } from "reactstrap";

// const ModifyLoanAmount = () => {
//     return (

//         <>
//             <div style={{marginLeft:450,marginRight:450,marginTop:200}}>
//                 <h1 className="text-info text-center">Modify loan amount</h1>
//                 <Card className="text-center">
//                     <CardBody>
//                         <CardSubtitle className="font-weight-bold"> </CardSubtitle>
//                         <Form>
//                             <Form.Group className="mb-3" controlId="formBasicEmail">
//                                 <Form.Label>Loan id</Form.Label>
//                                 <Form.Control type="email" placeholder="Enter Loan id" />
//                             </Form.Group>
//                             <Form.Group className="mb-3" controlId="formBasicEmail">
//                                 <Form.Label>Amount</Form.Label>
//                                 <Form.Control type="email" placeholder="Enter loan amount" />
//                             </Form.Group>

//                             <Button variant="primary" type="submit">
//                                 Submit
//                             </Button>
//                         </Form>
//                     </CardBody>
//                 </Card>
//             </div>
//         </>
//     );
// };

// export default ModifyLoanAmount;


import axios from 'axios';

import React, { Component, Fragment } from 'react';

class ModifyLoanAmount extends Component {

    constructor(props){
        super(props);

        this.state = {
            loan_id: 100,
            amount: 100
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        // alert(JSON.stringify(this.state);
        //http://localhost:8085/api/customer/{customerid}/loans/{loanid}
        let modifyLoan = {
            loan_id: this.state.loan_id,
            amount: this.state.amount
        }
        // const response = fetch("http://localhost:8085/api/customer/0/loans/7");
        
        // if(response.ok){
        //     console.log("success");
        //     alert("successfully modified loan");
        // }else{
        //     console.log(response+' failed -response');            
        // }
        await axios.put("http://localhost:8085/api/customer/"+ localStorage.getItem("custId") +"/loans/7",modifyLoan)
        .then(
            response => {
                console.log(response);
                alert("Loan amount modified successfully..")
            }
        )
        .catch(
            error => {
                console.log(error);
            }

        );

        

    }

    handleOnChangeLoanId = (e) => {
         this.setState({ loan_id: e.target.value});        
    }
    
    handleOnChangeLoanAmount = (e) => {
        //alert(e.target.value);
        this.setState({amount: e.target.value});
    }



    render() {
        return (
            <div>
                <Fragment>
                    <Fragment>
                        <h2 style={{ color: "white" }}>Modify Loan Amount</h2>
                        <hr style={{ height: "2px", color: "gray", backgroundColor: "white", borderWidth: "0" }}></hr>
                    </Fragment>
                    <div className="row centered-statement-form">
                        <div className="col-xs-12 col-sm-6 col-md-6 col-sm-offset-2 col-md-offset-4">
                            <div className="panel panel-default">
                                <div className="panel-body">

                                    <form style={{ padding: "10px" }} onSubmit={this.handleSubmit}>
                                        <div className="row">
                                            <div className="col-xs-6 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Loan Id</label>
                                                    <input type="text" name="first_name"  onChange={this.handleOnChangeLoanId} id="first_name" className="form-control input-sm" placeholder="Enter loan id " />
                                                </div>
                                            </div>
                                            <div className="col-xs-6 col-sm-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Loan Amount</label>
                                                    <input type="text" name="last_name" onChange={this.handleOnChangeLoanAmount} id="last_name" className="form-control input-sm" placeholder="Enter Amount" />
                                                </div>
                                            </div>
                                        </div>

                                        <input type="submit" value="Submit" className="btn btn-info btn-block" />

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div> </Fragment>
            </div>
        );
    }
}

export default ModifyLoanAmount;