import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {PostDataAndImage,ServerURL, postDataAndImage,getData,postData} from '../FetchNodeservice'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { config } from 'react-transition-group';
import Axios from 'axios';
import  {isEmpty} from '../Checks';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display:'flex',
    justifyContent:'center',
    alignContent:'center',
  },
  subroot:{
    width:'900px',
    border:'25px',
    borderColor:'pink',
    background:'#FFF0F5	',
    marginTop:'25px',
    padding:'25px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  input: {
    display: 'none',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));



export default function Product(){
    const classes = useStyles();
    const [getCategorylist,setCategorylist]=useState([])
    const [getBrandlist,setBrandlist]=useState([])
    const [getModellist,setModellist]=useState([])
    const [getCategoryID,setCategoryID]=useState('')
    const [getBrandID,setBrandID]=useState('')
    const [getModelID,setModelID]=useState('')
    const [getProductName,setProductName]=useState('')
    const [getDescription,setDescription]=useState('')
    const [getPicture,setPicture]=useState({fileBytes:'',fileUrl:'product.png'})
    const [getAd,setAd]=useState({fileBytes:'',fileUrl:'product.png'})
    const [getPrice,setPrice]=useState('')
    const [getOfferPrice,setOfferPrice]=useState('')
    const [getOfferType,setOfferType]=useState('')
    const [getDelivery,setDelivery]=useState('')
    const [getRating,setRating]=useState('')
    const [getColor,setColor]=useState('')
    const [getStock,setStock]=useState('')
    const [getAdStatus,setAdStatus]=useState('')
    const [getMessage,setMessage]=useState('')
    const [getErrorPic,setErrorPic]=useState({ci:'tp.png',bi:'tp.png',mi:'tp.png',pn:'tp.png',de:'tp.png',pi:'tp.png',ad:'tp.png',pr:'tp.png',op:'tp.png',ot:'tp.png',del:'tp.png',ra:'tp.png',co:'tp.png',st:'tp.png',as:'tp.png'})


    const Picture=(event)=>{
      setPicture({fileBytes:(event.target.files[0]),fileUrl:URL.createObjectURL(event.target.files[0])})
    }
    const Ad=(event)=>{
      setAd({fileBytes:(event.target.files[0]),fileUrl:URL.createObjectURL(event.target.files[0])})
    }
    const CategoryID=(event)=>{
      setCategoryID(event.target.value)
      fetchallbrand(event.target.value)

    }
    const BrandID=(event)=>{
      setBrandID(event.target.value)
      fetchallmodel(event.target.value)
    }
    const ModelID=(event)=>{
      setModelID(event.target.value)
    }


    var fetchallcategory=async()=>{
      var result = await getData('category/fetchallcategory')
      setCategorylist(result)
    }
    useEffect(function(){
       
      fetchallcategory()
    },[])
      const CategoryItems=()=>{
      return(getCategorylist.map((item,index)=>{
        return(
        <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        )
      })

      )
    }

    var fetchallbrand=async(data)=>{
      var body = {categoryid:data}
      var result = await postData('brand/displaybrand',body)
      
      setBrandlist(result)
    }
    // useEffect(function(){
       
    //   fetchallbrand()
    // },[])
      const BrandItems=()=>{
      return(getBrandlist.map((item,index)=>{
        return(
        <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
        )
      })

      )
    }


    var fetchallmodel=async(data)=>{
      var body ={brandid:data}
      var result = await postData('model/displaymodel',body)
      
      setModellist(result)
    }
    
      const ModelItems=()=>{
      return(getModellist.map((item,index)=>{
        return(
        <MenuItem value={item.modelid}>{item.modelname}</MenuItem>
        )
      })

      )
    }
    const Submit=async()=>{
    
      var error = false
      var ci = isEmpty(getCategoryID)
      var bi = isEmpty(getBrandID)
      var mi = isEmpty(getModelID)
      var pn = isEmpty(getProductName)
      var de = isEmpty(getDescription)
      var pi = isEmpty(getPicture.fileUrl)
      var ad = isEmpty(getAd.fileUrl)
      var pr = isEmpty(getPrice)
      var op = isEmpty(getOfferPrice)
      var ot = isEmpty(getOfferType)
      var del = isEmpty(getDelivery)
      var ra = isEmpty(getRating)
      var co = isEmpty(getColor)
      var st = isEmpty(getStock)
      var as = isEmpty(getAdStatus)

     var  error=false
       if(ci.err)
       {
         error = ci.err
       }
       if(bi.err)
       {
         error = bi.err
       }
       if(mi.err)
       {
         error = mi.err
       }
       if(pn.err)
       {
         error = pn.err
       }
       if(de.err)
       {
         error = de.err
       }
       if(pr.err)
       {
         error = pr.err
       }
       if(op.err)
       {
         error = op.err
       }
       if(ot.err)
       {
         error = ot.err
       }
       if(del.err)
       {
         error = del.err
       }
       if(ra.err)
       {
         error = ra.err
       }
       if(co.err)
       {
         error = co.err
       }
       if(st.err)
       {
         error = st.err
       }
       if(as.err)
       {
         error = as.err
       }

       setErrorPic({ci:ci.img,bi:bi.img,mi:mi.img,pn:pn.img,de:de.img,pi:pi.img,ad:ad.img,pr:pr.img,op:op.img,ot:ot.img,del:del.img,ra:ra.img,co:co.img,st:st.img,as:as.img})

    if(!error)
    {
      var formData =new FormData()
      
        formData.append('CategoryID',getCategoryID)
        formData.append('BrandID',getBrandID)
        formData.append('ModelID',getModelID)
        formData.append('ProductName',getProductName)
        formData.append('Description',getDescription)
        formData.append('Picture',getPicture.fileBytes)
        formData.append('Ad',getAd.fileBytes)
        formData.append('Price',getPrice)
        formData.append('OfferPrice',getOfferPrice)
        formData.append('OfferType',getOfferType)
        formData.append('Delivery',getDelivery)
        formData.append('Rating',getRating)
        formData.append('Color',getColor)
        formData.append('Stock',getStock)
        formData.append('AdStatus',getAdStatus)
      
        var config ={headers:{'content-type':'multipart/formdata'}}
        var result = await postDataAndImage('Product/ProductSubmit',formData,config)

        if(result)
        {
          console.log(result)
          setMessage('Record Submited...')
        }
        else
        {
          console.log(result)
          setMessage('Fail to submit record...')
        }
    }

    else
    {
      alert('fill all blank entry')
    } 
    }
    
  
  
  
  
    return(<div className={classes.root}>
        <div className={classes.subroot}>
            <h2>Product</h2>
            <hr/>
      <Grid container spacing={3}>
        <Grid item xs>
          <img src={`${getErrorPic.ci}`} width='13px' height='13px'/>
        <FormControl variant="outlined"  fullWidth>
        <InputLabel id="CategoryID">CategoryID</InputLabel>
        <Select
          labelId="CategoryID"
          id="CategoryID"
          onChange={(event)=>CategoryID(event)}
          label="CategoryID"
        >
          {CategoryItems()}
        </Select>
        
      </FormControl>
        </Grid>
        <Grid item xs>
          <img src={`${getErrorPic.bi}`} width='13px' height='13px'/>
        <FormControl variant="outlined"  fullWidth>
        <InputLabel id="BrandID">BrandID</InputLabel>
        <Select
          labelId="BrandID"
          id="BrandID"
          onChange={(event)=>BrandID(event)}
          label="BrandID"
        >
         {BrandItems()}
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs>
        <img src={`${getErrorPic.mi}`} width='13px' height='13px'/>
        <FormControl variant="outlined"  fullWidth>
        <InputLabel id="ModelID">ModelID</InputLabel>
        <Select
          labelId="ModelID"
          id="ModelID"
          onChange={(event)=>ModelID(event)}
          label="ModelID"
        >
          {ModelItems()}
        </Select>
      </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs ={6}>
        <img src={`${getErrorPic.pn}`} width='13px' height='13px'/>
        <TextField onChange={(event)=>setProductName(event.target.value)} id="outlined-basic" label="Product Name" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs ={6}>
        <img src={`${getErrorPic.de}`} width='13px' height='13px'/>
        <TextField onChange={(event)=>setDescription(event.target.value)} id="outlined-basic" label="Description" variant="outlined"  fullWidth/>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
      <Grid item xs={3} style={{marginTop:'26px',}}>
          <input
            accept="image/*"
            className={classes.input}
            id="pi"
            multiple
            type="file"
             onChange={(event)=>Picture(event)}
            />
           <label htmlFor="pi">
           <img src={`${getErrorPic.pi}`} width='13px' height='13px'/>
            <Button variant="contained" color="primary" component="span">
            Picture
            </Button>
           </label>
         
          </Grid>
          <Grid item xs={3}>
            <img src={getPicture.fileUrl} width='90px' height='90px'/>
          </Grid>
          <Grid item xs={3}  style={{marginTop:'26px',}}>
          <input
            accept="image/*"
            className={classes.input}
            id="ad"
            multiple
            type="file"
             onChange={(event)=>Ad(event)}
            />
           <label htmlFor="ad">
           <img src={`${getErrorPic.ad}`} width='13px' height='13px'/>
            <Button variant="contained" color="primary" component="span">
            Ad
            </Button>
           </label>
          </Grid>
          <Grid item xs={3}>
          <img src={getAd.fileUrl} width='90px' height='90px'/>
          </Grid>

      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
        <img src={`${getErrorPic.pr}`} width='13px' height='13px'/>
        <TextField onChange={(event)=>setPrice(event.target.value)} id="outlined-basic" label="Price" variant="outlined"fullWidth />
        </Grid>
        <Grid item xs>
        <img src={`${getErrorPic.op}`} width='13px' height='13px'/>
        <TextField onChange={(event)=>setOfferPrice(event.target.value)} id="outlined-basic" label="OfferPrice" variant="outlined"  fullWidth/>
        </Grid>
        <Grid item xs>
        <img src={`${getErrorPic.ot}`} width='13px' height='13px'/>
        <TextField onChange={(event)=>setOfferType(event.target.value)} id="outlined-basic" label="offertype" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs>
        <img src={`${getErrorPic.co}`} width='13px' height='13px'/>
        <TextField onChange={(event)=>setColor(event.target.value)} id="outlined-basic" label="Color"variant="outlined" fullWidth/>
       </Grid>
      </Grid>
      <Grid container spacing={3}>
      <Grid item xs={6}>
        <img src={`${getErrorPic.as}`} width='13px' height='13px'/>
        <FormControl variant="outlined"  fullWidth>
        <InputLabel id="AdStatus">AdStatus</InputLabel>
        <Select
          labelId="AdStatus"
          id="AdStatus"
          
          onChange={(event)=>setAdStatus(event.target.value)}
          label="AdStatus"
        >
          <MenuItem value={'Yes'}>Yes</MenuItem>
          <MenuItem value={'No'}>No</MenuItem>
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs>
        <img src={`${getErrorPic.st}`} width='13px' height='13px'/>
        <TextField onChange={(event)=>setStock(event.target.value)} id="outlined-basic" label="Stock"variant="outlined" fullWidth />
        </Grid>
        <Grid item xs>
        <img src={`${getErrorPic.del}`} width='13px' height='13px'/>
        <TextField onChange={(event)=>setDelivery(event.target.value)} id="outlined-basic" label="Delivery" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs>
        <img src={`${getErrorPic.ra}`} width='13px' height='13px'/>
        <TextField onChange={(event)=>setRating(event.target.value)} id="outlined-basic" label="Rating"variant="outlined" fullWidth />
        </Grid>
        
      </Grid>
      
      <Grid container spacing={3}>
      <Grid xs={12} sm={3} style={{display:'flex', justifyContent:'center', height:'35px'}}>
        <Button onClick={()=>Submit()} variant="contained" color="primary"  style={{ marginTop:25,height:'35px',width:'160px',marginLeft:'55px'}} >Submit</Button>    
        </Grid>
        <Grid xs={12} sm={3}  style={{marginLeft:'155px',marginTop:'10px'}}><h4>{getMessage}</h4></Grid>
        <Grid xs={12} sm={3} style={{display:'flex', justifyContent:'center'}}>
        <Button variant="contained" color="primary" style={{ marginTop:25,height:'35px',width:'160px'}}>Reset</Button>    
        </Grid>
    
        </Grid>
    </div>

    </div>)
}



