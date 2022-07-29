import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AiFillTag } from 'react-icons/ai';
import { MdLocalShipping } from 'react-icons/md';
import { GiLipstick } from 'react-icons/gi';
import Grid from '@material-ui/core/Grid';
import { ServerURL, getData, postData, postDataAndImage } from '../FetchNodeservice'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    background: '#8c8d94',
    color: 'white'
  },
  subroot: {
    width: 'auto',


  },
  nyk: {
    marginTop: '8px',
    marginLeft: '30px',
  },
  display: {
    '&:hover': {
      color: "#FF1493",
    },
  },
  p: {
    fontSize: "12px",
    color: "#ffffff",
    marginLeft: '30px',
    fontSize: '14px',
    marginTop: "4%",
    padding: '1px',
    '&:hover': {
      color: "#FF1493",
    },

  },

  Nicon: {

    height: '50px',
    width: '50px',
    borderRadius: '50px',
    background: "#fc2779",
    marginLeft: '40px'
  },
  icon: {
    position: 'relative',
    top: '9px',
    left: ' 4px',
    height: '32px',
    width: '40px',
  },
  move: {
    position: 'relative',
    left: '67px',
    top: '-67px',
    fontSize: 'small',
    color: "black",
    marginLeft: '40px'
  },
  paragraph: {
    position: 'relative',
    left: '428px',
    padding: '12px',
    fontSize: '11px',
    fontWeight: 'bold'

  }

}));

export default function Footer() {
  const classes = useStyles();
  const [getlist, setlist] = useState([])

  const fetchData = async () => {

    var result = await getData('category/fetchallcategory')
    setlist(result)
  }

  useEffect(function () {
    fetchData()

  }, [])

  const displaycategory = () => {
    return (

      getlist.map((item, index) => {
        return (<div>
          <p className={classes.p}>{item.categoryname}</p>
        </div>)

      })
    )
  }

  return (
    <div className={classes.root}>
      <div className={classes.subroot}>
        <Grid container spacing={24} >
          <Grid container spacing={12}>
            <Grid item style={{ padding: '20px', marginLeft: '45px', textAlign: 'left' }} sm={2.5}>
              <img src='nykaa.png' height='35px' className={classes.nyk} />
              <p className={classes.p}>WHO ARE WE?</p>
              <p className={classes.p}>AUTHENTICITY</p>
              <p className={classes.p}>PRESS</p>
              <p className={classes.p}>TESTMONIALS</p>
              <p className={classes.p}>NYKAA CSR</p>
              <p className={classes.p}>RESPONSIBLE<br />
                DISCLOSURE</p>
            </Grid>
            <Grid item style={{ padding: '20px', marginLeft: '45px', textAlign: 'left' }} sm={2.5}>
              <h4 className={classes.p}> HELP</h4>
              <p className={classes.p}>CONTACT US</p>
              <p className={classes.p}>FREQENTLY ASKED QUESTIONS</p>
              <p className={classes.p}>STORE LOCATOR</p>
              <p className={classes.p}>CANCELLATION & RETURN</p>
              <p className={classes.p}>SHIPPING & DELIVERY</p>
            </Grid>
            <Grid item style={{ padding: '20px', marginLeft: '45px', textAlign: 'left' }} sm={2.5}>
              <h4 className={classes.p}>INSPIRE ME</h4>
              <p className={classes.p}>BEAUTY BOOK</p>
              <p className={classes.p}>NYKAA TV</p>
              <p className={classes.p}>NYKAA NETWORK</p>
              <p className={classes.p}>ROUTINE FINDER</p>
              <p className={classes.p}>BUYING GUIDES</p>
            </Grid>
            <Grid item style={{ padding: '20px', marginLeft: '45px', textAlign: 'left' }} sm={2.5}>
              <h4 className={classes.p}>QUICK LINKS</h4>
              <p className={classes.p}>OFFERZONE</p>
              <p className={classes.p}>NEW LAUNCHES</p>
              <p className={classes.p}>NYKAA MAN</p>
              <p className={classes.p}>NYKAA FASHION</p>
              <p className={classes.p}>NYKAA PRO</p>
              <p className={classes.p}>NYKAA FAMINA BEAUTY<br />AWARDS WINNERS 2019</p>
              <p className={classes.p}>SITEMAP</p>
            </Grid>
            <Grid item style={{ padding: '20px', marginLeft: '45px', textAlign: 'left' }} sm={2.5}>
              <h4 className={classes.p}>TOP CATEGORY</h4>


              {displaycategory()}

            </Grid>

            <Grid container spacing={12} style={{ background: 'white', height: '150px', padding: '50px' }}>
              <Grid item xs={3}>
                <div className={classes.Nicon}><AiFillTag className={classes.icon} /></div>
                <div className={classes.move}><h4>1500+BRANDS</h4>
                  <p>Well Curated 3Lakh + Products</p>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div className={classes.Nicon}><MdLocalShipping className={classes.icon} /></div>
                <div className={classes.move}><h4>FREE SHIPPING</h4>
                  <p>For Orders Above INR 500</p>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div className={classes.Nicon}><GiLipstick className={classes.icon} /></div>
                <div className={classes.move} ><h4>GENUINE PRODUCTS</h4>
                  <p>Sourced Directly From Brands</p>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div className={classes.Nicon}><AiFillTag className={classes.icon} /></div>

              </Grid>
            </Grid>


            <Grid container spacing={12} style={{ background: '#fc2779', height: '80px' }}>

              <p className={classes.paragraph}>TERMS & CONDITIONS</p>
              <p className={classes.paragraph}>SHIPPING POLICY</p>
              <p className={classes.paragraph}>CANCELLATION POLICY</p>
              <p className={classes.paragraph}>PRIVACY POLICY</p>
              <p style={{ marginTop: '56px', marginLeft: '10px', fontSize: '13px', }}>© 2021 Nykaa E-Retail Pvt. Ltd. All Rights Reserved</p>
            </Grid>

          </Grid>
        </Grid>
      </div>
    </div>
  );
}











