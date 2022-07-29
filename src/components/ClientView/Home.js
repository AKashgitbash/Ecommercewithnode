import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { ServerURL, getData } from "../FetchNodeservice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { useSelector, useDispatch } from "react-redux";
//import tileData from './tileData';
import MainPage from "../ClientView/MainPage";
import { makeStyles } from "@material-ui/core/styles";
import QtySpinner from "../ClientView/Qtyspinner";
import Footer from "../ClientView/Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100 %",
    //height:'auto',
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

export default function Home(props) {
  const classes = useStyles();

  const [getBrand, setBrand] = useState([]);
  const [getTopBrand, setTopBrand] = useState([]);
  const [getNewBrand, setNewBrand] = useState([]);
  const [getDiscountedProudcts, setDiscountedProudcts] = useState([]);
  const [getCartRender, setCartRender] = useState(false);

  var dispatch = useDispatch();
  const fetchBrand = async () => {
    var result = await getData("brand/fetchbrandsads");
    setBrand(result);
  };

  const fetchTopBrand = async () => {
    var result = await getData("brand/fetchtopbrands");
    setTopBrand(result);
  };

  const fetchNewBrand = async () => {
    var result = await getData("brand/fetchnewbrands");
    setNewBrand(result);
  };

  const fetchDiscountedProduct = async () => {
    var result = await getData("Product/displayproductbydiscount");
    setDiscountedProudcts(result);
  };

  useEffect(function () {
    fetchBrand();
    fetchTopBrand();
    fetchNewBrand();
    fetchDiscountedProduct();
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  const sslider = () => {
    return getBrand.map((item, index) => {
      return (
        <div>
          <img src={ServerURL + "/images/" + item.ad} width="100%" />
        </div>
      );
    });
  };

  const TopProducts = () => {
    return (
      <div className={classes.root}>
        <GridList cellHeight={350} spacing={20} className={classes.gridList}>
          {getTopBrand.map((tile) => (
            <GridListTile key={tile.brandid}>
              <img
                src={ServerURL + "/images/" + tile.ad}
                width="100%"
                height="100%"
                style={{ borderRadius: "2%" }}
                onClick={() =>
                  props.history.push({
                    pathname: "/ListProducts",
                    state: { brandid: tile.brandid },
                  })
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  };

  const NewProducts = () => {
    return (
      <div className={classes.root}>
        <GridList cellHeight={350} spacing={20} className={classes.gridList}>
          {getNewBrand.map((tile) => (
            <GridListTile key={tile.brandid}>
              <img
                src={ServerURL + "/images/" + tile.ad}
                width="100%"
                height="100%"
                style={{ borderRadius: "2%" }}
                onClick={() =>
                  props.history.push({
                    pathname: "/ListProducts",
                    state: { brandid: tile.brandid },
                  })
                }
              />
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  };

  const handleChange = (value, item) => {
    item["qtydemand"] = value;
    dispatch({ type: "ADD_CART", payload: [item.productid, item] });
    setCartRender(!getCartRender);
  };

  const showProudcts = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: 5,
          flexWrap: "wrap",
          padding: 30,
        }}
      >
        {getDiscountedProudcts.map((item) => (
          <div
            style={{
              width: 200,
              padding: 10,
              margin: 5,
              border: "0.5px solid #bdc3c7",
            }}
          >
            <img
              src={ServerURL + "/images/" + item.picture}
              width="100%"
              height="220px"
              style={{ borderRadius: "2%", elevation: 20 }}
              onClick={() =>
                props.history.push({
                  pathname: `/Sproductview/${item.productid}`,
                })
              }
            />
            <div
              style={{
                textAlign: "center",
                fontSize: 14,
                fontWeight: "normal",
                color: "#3f414d",
                lineHeight: 1.5,
              }}
            >
              {item.productname.length > 26 ? (
                <div>{item.productname.substring(0, 45) + "...."} </div>
              ) : item.productname.length <= 25 ? (
                <div>
                  <div>{item.productname}</div>
                  <div>&nbsp;</div>
                </div>
              ) : (
                <div>{item.productname}</div>
              )}{" "}
            </div>
            <div
              style={{
                textAlign: "center",

                fontSize: 14,
                fontWeight: "normal",
                color: "#3f414d",
                lineHeight: 1.5,
              }}
            >
              {item.offerpice == 0 ? (
                <div>&#8377; {item.price}</div>
              ) : (
                <div>
                  <span style={{ textDecorationLine: "line-through" }}>
                    &#8377; {item.price}
                  </span>{" "}
                  <span style={{ fontWeight: "bold" }}>
                    &#8377; {item.offerprice}
                  </span>
                  <span style={{ color: "#fc2779", fontWeight: "bold" }}>
                    {" "}
                    Save &#8377;{item.price - item.offerprice}
                  </span>
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
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <MainPage props={props} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <div style={{ width: "97%" }}>
          <div>
            <Slider {...settings}>{sslider()}</Slider>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "normal",
                  alignContent: "center",
                  fontSize: "32px",
                  color: "#000",
                  padding: "10px",
                  fontFamily: 'Georgia,Times,"Times New Roman",serif',
                  letterSpacing: "3.9px",
                }}
              >
                IN THE SPOTLIGHT
              </div>
              {TopProducts()}

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "normal",
                  alignContent: "center",
                  fontSize: "32px",
                  color: "#000",
                  padding: "10px",
                  fontFamily: 'Georgia,Times,"Times New Roman",serif',
                  letterSpacing: "3.9px",
                }}
              >
                THE NEW BRAND
              </div>

              {NewProducts()}

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "normal",
                  alignContent: "center",
                  fontSize: "32px",
                  color: "#000",
                  padding: "10px",
                  fontFamily: 'Georgia,Times,"Times New Roman",serif',
                  letterSpacing: "3.9px",
                }}
              >
                FEATURED PRODUCTS
              </div>

              {showProudcts()}

              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
