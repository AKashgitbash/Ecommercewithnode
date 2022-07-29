import React,{useState,useEffect} from 'react';
import Slider from "react-slick";
import {ServerURL,getData,postData} from '../FetchNodeservice'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import {useSelector,useDispatch} from "react-redux"
//import tileData from './tileData';
import MainPage from '../ClientView/MainPage'
import { makeStyles } from '@material-ui/core/styles';
import QtySpinner from '../ClientView/Qtyspinner'
import Filter from '../ClientView/Filter'
import Footer from './Footer';






const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100 %',
    //height:'auto',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function ListProducts(props) {
    const classes = useStyles();
    const [products,setProducts]=useState([])
    const [getCartRender,setCartRender]=useState(false)
    var dispatch = useDispatch();
   console.log('props',props.history.location.state.brandid)

    const fetchByBrand = async()=>{
        var body = {brandid:props.history.location.state.brandid}
        var result =await postData('Product/fetchbybrandid',body);
        setProducts(result)   
      }

      const handleChange =(value,item)=>{
        item['qtydemand']=value
      dispatch({type:'ADD_CART',payload:[item.productid,item]})
      setCartRender(!getCartRender)
    }


      useEffect(function(){
        fetchByBrand()
      },[props])


    const showProudcts=()=>{
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
          {products.map((item) => (
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
                onClick={()=>props.history.push({pathname:`/sproductview/${item.productid}`})}
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
              
              {item.productname.length >= 45 ? (
                  <div>{item.productname.substring(0, 45) + "...."}</div>
                ) : item.productname.length <= 25 ? (
                  <div>
                    <div>{item.productname}</div>
                    <div>&nbsp;</div>
                  </div>
                ) : (
                  <div>{item.productname}</div>
                )}  </div>
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
       }
       


  
return(<div>
  <MainPage props={props} />
    <Grid container spacing={2}>
    <Grid xs={12} sm={3}>
      <Filter/>
    </Grid>
    <Grid xs={12} sm={9}>
    {showProudcts()}
    </Grid>
    </Grid>
    <Footer/>
</div>)
}  