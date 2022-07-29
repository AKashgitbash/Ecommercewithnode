import React, { useEffect, useState, createRef } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Divider from "@material-ui/core/Divider";
import Place from "@material-ui/icons/Place";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
import { getData, postData, ServerURL } from "../FetchNodeservice";
import QtySpinner from "./Qtyspinner";
import MainPage from "./MainPage";
import Image from "react-image-resizer";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer"


const useStyles = makeStyles((theme) => ({
  gridRoot: {
    alignItems: "center",
    justifyContent: "center", 
    display: "flex",
    outline: "none",
    marginTop: 20,
  },
  root: {
    alignItems: "center",
    justifyContent: "center",
  },
  productdiv: {
    padding: 5,
    fontSize: 15,
  },
  gridRoot: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    outline: "none",
  },
}));
export default function SProductView(props) {
  console.log("PRRPPPPPS",props)
  const classes = useStyles();
  const [getList, setList] = useState(null);

  const [getProductPictureList, setProductPictureList] = useState([]);
  const [cartRender, setCartRender] = useState(false);
  const [images, setImages] = useState([]);
  const [getImage, setImage] = useState(null);
  const [getStatus, setStatus] = useState(false);
  const [getPincode, setPincode] = useState("");
  const [getPinStatus, setPinStatus] = useState(false);
  const [getmsgStatus, setmsgStatus] = useState("");
  const [getcolorpin, setcolorpin] = useState("red");
  const [getPincodeData, setPincodeData] = useState([]);
  var sliderRef = createRef();

  var params = useParams();
  const gotoNext = () => {
    sliderRef.current.slickNext();
  };
  const gotoPrev = () => {
    sliderRef.current.slickPrev();
  };

  var dispatch = useDispatch();
  var settings = {
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
    //vertical:true,
    //verticalSwiping:true,
  };

  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);

  useEffect(function () {
    fetchProduct();
    fetchProductPictures(params.pid);
  }, []);
  const fetchProduct = async () => {
    var list = await getData("product/fetchproductbyid/" + params.pid);
    console.log("IIIIITEM>>>>", list);
    await setList(list[0]);
    await setImage(list[0].picture);
  };

  const fetchProductPictures = async (pid) => {
    let body = { productid: pid };
    var list = await postData("productpicture/productpicturedisplaybyid", body);
    if (list.length > 4) {
      setStatus(true);
    } else {
      setStatus(false);
    }
    await setProductPictureList(list);
  };
  const handleChange = (value, item) => {
    item["qtydemand"] = value;
    dispatch({ type: "ADD_CART", payload: [item.productid, item] });
    setCartRender(!cartRender);
  };

  const checkpincode = async (locality) => {
    setPincode(locality);
    if (locality.length == 6) {
      let body = { pincode: locality };
      var list = await postData("statecityarea/checkpincode", body);
      console.log("PINNNNNNNNNNN", list);
      setPincodeData(list);
      //console.log('STATE CITY DATA = ', list);
      if (list.length == 0) {
        setmsgStatus("We are not deliver this product in your area");
        setcolorpin("red");
        //alert("We are not deliver this product in your area")
        await setPinStatus(false);
      } else {
        await setPinStatus(true);
        setcolorpin("green");
        setmsgStatus("Delivery Available in Your Area");
      }
    } else {
      //if(locality.length==6)
      //alert("Invalid Pin Code")
      setmsgStatus("Invalid Pin Code");
      setcolorpin("red");
      await setPinStatus(false);
    }
  };

  const showProductPicture = () => {
    return getProductPictureList.map(function (item, key) {
      return (
        <div className={classes.gridRoot}>
          <div
            className={classes.gridRoot}
            style={{
              width: 70,
              height: 70,
              border: "2px solid #dcdde1",
              borderRadius: 5,
              margin: 2,
              cursor: "pointer",
            }}
            onMouseEnter={() => setImage(item.productpicture)}
          >
            <Image
              width={65}
              height={65}
              src={`${ServerURL}/images/${item.productpicture}`}
            />
          </div>
        </div>
      );
    });
  };
  const showProducts = (item) => {
    return (
      <div style={{ marginTop: 10 }}>
        {item != null ? (
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <div
                  className={classes.gridRoot}
                  style={{
                    width: 300,
                    height: 300,
                    margin: "10px 5px",
                    cursor: "pointer",
                  }}
                >
                  <Image
                    width={260}
                    height={260}
                    src={`${ServerURL}/images/${getImage}`}
                  />
                </div>

                {getStatus ? (
                  <div className={classes.gridRoot}>
                    <div style={{ marginLeft: 20 }}>
                      <KeyboardArrowLeftIcon onClick={() => gotoPrev()} />
                    </div>
                    <div className={classes.gridRoot}>
                      <div style={{ width: 325 }}>
                        <Slider {...settings} ref={sliderRef}>
                          {showProductPicture()}
                        </Slider>
                      </div>
                    </div>
                    <div style={{ marginRight: 20 }}>
                      <KeyboardArrowRightIcon onClick={() => gotoNext()} />
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      padding: "30px 10px",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    {
                      showProductPicture()
                    }
                  </div>
                )}
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div style={{ fontSize: 20, padding: 5 }}>
                <b>{item.productname}</b>
              </div>
              <div className={classes.productdiv}>
                M.R.P :{" "}
                <s>
                  <b> {numberFormat(item.price)}</b>
                </s>{" "}
              </div>
              <div className={classes.productdiv}>
                Price :{" "}
                <big>
                  <b> {numberFormat(item.offerprice)}</b>
                </big>
              </div>
              <div className={classes.productdiv}>
                You Save :{" "}
                <b>
                  <font color="green">
                    {numberFormat(item.price - item.offerprice)}
                  </font>
                </b>{" "}
              </div>
              <div item xs={12} sm={12} className={classes.productdiv}>
                Inclusive of all taxes
              </div>

              <div className={classes.productdiv}>
                {item.stock == 0 ? (
                  <big>
                    <b>
                      <font color="red">Not Available</font>
                    </b>
                  </big>
                ) : item.stock >= 1 && item.stock <= 3 ? (
                  <big>
                    <b>
                      <font color="green">
                        Limited Stock {item.stock} item Avaliable
                      </font>
                    </b>
                  </big>
                ) : (
                  <big>
                    <b>
                      <font color="green">In Stock</font>
                    </b>
                  </big>
                )}
              </div>

              <div className={classes.productdiv}>
                Inaugural Offer <b>Free Shipping</b>
              </div>
              <>
                <div
                  className={classes.productdiv}
                  style={{ fontSize: 17, color: "black" }}
                >
                  <b>Delivery</b>
                </div>
                <div className={classes.productdiv}>
                  <FormControl>
                    <Input
                      id="input-with-icon-adornment"
                      startAdornment={
                        <InputAdornment position="start">
                          <Place />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <div style={{ cursor: "pointer" }}>
                            <font
                              color="red"
                              size="2"
                               onClick={() => checkpincode(getPincode)}
                            >
                              <b>CHECK</b>
                            </font>
                          </div>
                        </InputAdornment>
                      }
                      onChange={(event) => setPincode(event.target.value)}
                    />
                  </FormControl>
                </div>
                <div
                  className={classes.productdiv}
                  style={{ color: getcolorpin, fontSize: 13 }}
                >
                  {getmsgStatus}
                </div>
                <div className={classes.productdiv} style={{ fontSize: 14 }}>
                  <b>Usually delivered in 2-3 days</b>
                  <br />
                  Enter pincode for exact delivery dates
                </div>
              </>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <QtySpinner
                  value={0}
                  onChange={(value) => handleChange(value, item)}
                />
              </div>
            </Grid>
          </Grid>
        ) : (
          <></>
        )}
      </div>
    );
  };
  const showDescription = (item) => {
    if (item != null) {
      var desc = item.description;
      try {
        if (item.description.length > 0) desc = item.description;
      } catch (error) {
        desc = "";
      }
    }

    if (item != null) {
      return (
        <div>
          <Divider style={{ padding: 0.5 }} />
          <div style={{ fontSize: 20, padding: 10 }}>
            <b>Description</b>
          </div>
          <div style={{ padding: "20px 50px", fontSize: 17 }}>
            <b>{item.productname}</b>
          </div>
          <div style={{ padding: "20px 50px" }}>
            <div style={{ pointerEvents: "none" }}>{item.desc}</div>
          </div>
        </div>
      );
    }
  };
  return (
    <div className={classes.root}>
      <MainPage props={props}/>
      {showProducts(getList)}
      {showDescription(getList)}
      <Footer/>
    </div>
  );
}
