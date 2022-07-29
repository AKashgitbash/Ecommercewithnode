import React, { useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { useDispatch, useSelector } from "react-redux";
import { ServerURL, getData, postData } from "../FetchNodeservice";
import Footer from '../ClientView/Footer'
import MainPage from "./MainPage";


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  typography: {
    padding: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  paper: {
    padding: theme.spacing(1),
    width: 400,
  },
  center: {
    display: "flex",
    justifyContent: "flex-start",
    fontSize: 14,
    borderBottom: "1px solid #dcdde1",
  },

  hover: {
    "&:hover": {
      background: "#f1f2f6",
      transition: "all 0.5s ease 0s",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function ShowCart(props) {
  const classes = useStyles();
 
  var cart = useSelector((state) => state.data);
  var keys = Object.keys(cart);
  var length = keys.length;
  var items = Object.values(cart);

  var total = items.reduce(calculate, 0);

  function calculate(a, b) {
    var price =
      b.offerprice == 0 ? b.price * b.qtydemand : b.offerprice * b.qtydemand;
    return a + price;
  }
  var totalsaving = items.reduce(calculatesavings, 0);
  function calculatesavings(a, b) {
    var price = b.price - b.offerprice;
    price = price * b.qtydemand;
    return a + price;
  }

 
  const ShowCartItems = () => {
    return (
      <div className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <b>ORDER SUMMARY</b>
          </Grid>
          <Grid
            style={{ display: "flex", justifyContent: "flex-end" }}
            item
            xs={12}
            sm={6}
          >
            {length} item(s)
          </Grid>

          {items.map((item) => (
            <>
              <Grid item xs={12} sm={4}>
                <img
                  src={ServerURL + "/images/" + item.picture}
                  width="40%"
                  height="50%"
                  style={{ borderRadius: "2%", elevation: 20 }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                {item.productname}
              </Grid>

              <Grid
                style={{ display: "flex", justifyContent: "flex-end" }}
                item
                xs={12}
                sm={4}
              >
                <span>&#8377;</span>&nbsp;
                {item.offerprice == 0 ? item.price : item.offerprice} X{" "}
                {item.qtydemand}
              </Grid>
            </>
          ))}
          <Grid
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
            item
            xs={12}
            sm={6}
          >
            <div>
              <b>
                <span>&#8377;</span>&nbsp;{total}
              </b>
            </div>
            <small style={{ color: "#27ae60" }}>
              You save<span>&#8377;</span>&nbsp;{totalsaving}
            </small>
          </Grid>
          <Grid
            style={{ display: "flex", justifyContent: "flex-end" }}
            item
            xs={12}
            sm={6}
          >
            <Button variant="contained" color="primary">
              Show Cart
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  };

 
  useEffect(function () {
    
  }, []);

 
  return (
    <div className={classes.grow}>
        <MainPage history={props}/>
     {ShowCartItems() }
     <Footer/>
    </div>
  );
}
