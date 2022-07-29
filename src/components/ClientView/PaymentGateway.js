import React, { Component, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
// import { postData } from '../../FetchService';

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
  },
  margin: {
    marginRight: "80%",
    paddingLeft: "",
  },
  button: {
    margin: theme.spacing.unit,
  },

  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

const PaymentGateway = (props) => {
  var dispatch = useDispatch();
  var data = useSelector((state) => state.user);

  var userdata = Object.values(data);
  console.log("VAlue User", userdata);
  const [getUserData, setUserData] = useState(userdata[0]);

  var cart = useSelector((state) => state.data);
  var length = Object.keys(cart).length;
  var cartitems = Object.values(cart);
  //var total=cartitems.reduce((a,b)=>a+b.price,0);
  var total = cartitems.reduce(calculate, 0);
  function calculate(a, b) {
    var price =
      b.offerprice == 0 ? b.price * b.qtydemand : b.offerprice * b.qtydemand;
    return a + price;
  }

  var totalsaving = cartitems.reduce(calculatesavings, 0);
  function calculatesavings(a, b) {
    var price = b.price - b.offerprice;
    price = price * b.qtydemand;
    return a + price;
  }

  // const handleRazorpay=async(id)=>{
  //     let body={name:getName,
  //     email:getEmail,
  //     mobile:getMobile,
  //     amount: props.invoice_total/100,
  //     razorpayid:id
  //     }
  //     let result=await postData('userpayment/addnew',body)
  //     alert(result)
  // }

  const options = {
    key: "rzp_test_GQ6XaPC6gMPNwH",
    amount: total, //  = INR 1
    name: "CSEP Campusshala Education Pvt. Ltd.",
    // description: 'some description',
    image:
      "https://i.pinimg.com/originals/d1/d2/66/d1d26618a7876afa7b99f2afebf6c790.jpg",
    handler: function (response) {
      // handleRazorpay(response.razorpay_payment_id)
      // props.addnewrecord()
      alert(response.razorpay_payment_id);
    },
    prefill: {
      name: getUserData[0].firstname + " " + getUserData[0].lastname,
      contact: getUserData[0].mobileno,
      email: getUserData[0].emailaddress,
    },
    notes: {
      address: "some address",
    },
    theme: {
      color: "blue",
      hide_topbar: false,
    },
  };

  const openPayModal = () => {
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const { classes } = props;

  return (
    <>
      <center>
        <Button
          variant="contained"
          color="primary"
          // size="large"
          // className={classes.button}
          onClick={openPayModal}
        >
          <h3>Proceed to Pay</h3>
        </Button>
      </center>
    </>
  );
};

export default withStyles(styles)(PaymentGateway);

// class Checkout extends React.Component {
//     state = {
//       amount: 0
//     };

//     constructor() {
//       super()
//       this.changeAmount = this.changeAmount.bind(this);
//       this.openCheckout = this.openCheckout.bind(this);
//     }

//     changeAmount(e) {
//       this.setState({amount: e.target.value})
//     }

//     openCheckout() {
//       let options = {
//         "key": "rzp_live_Bwt8dZqpBj6XvO",
//         "amount": this.state.amount, // 2000 paise = INR 20, amount in paisa
//         "name": "Merchant Name",
//         "description": "Purchase Description",
//         "image": "/your_logo.png",
//         "handler": function (response){
//           alert(response.razorpay_payment_id);
//         },
//         "prefill": {
//           "name": "Harshil Mathur",
//           "email": "harshil@razorpay.com"
//         },
//         "notes": {
//           "address": "Hello World"
//         },
//         "theme": {
//           "color": "#F37254"
//         }
//       };

//       let rzp = new Razorpay(options);
//       rzp.open();
//     }

//     render () {
//       return (
//         <div>
//           <input type='text' onChange={
//              this.changeAmount
//             } />
//           <button onClick={this.openCheckout}>Pay Rs. {this.state.amount/100}</button>
//         </div>
//       )
//     }
//   }
