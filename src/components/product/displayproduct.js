import MaterialTable, { MTableToolbar } from 'material-table';
import React,{useState,useEffect} from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import  {isEmpty} from '../Checks';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import {ServerURL,getData,postData,postDataAndImage} from '../FetchNodeservice' 



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display:'flex',
      justifyContent:'center',
      alignContent:'center',
  
    },
    
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
    maindiv:{
      display:'flex',
      justifyContent:'center',
      alignContent:'center',
      
      marginTop:'10px',
      padding:'25px',
      borderRadius:'14px'
    },
   
    input: {
        display: 'none',
      },
  }));



export default function Displayproduct(){
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [getCategorylist,setCategorylist]=useState([])
    const [getBrandlist,setBrandlist]=useState([])
    const [getModellist,setModellist]=useState([])
    const [getProductID,setProductID]=useState('')
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
    const [getpopusername,setpopusername]=useState('')
    const [getSavePicture,setSavePicture]=useState(false)
    const [getSaveAd,setSaveAd]=useState(false)
    const [getErrorPic,setErrorPic]=useState({ci:'tp.png',bi:'tp.png',mi:'tp.png',pn:'tp.png',de:'tp.png',pi:'tp.png',ad:'tp.png',pr:'tp.png',op:'tp.png',ot:'tp.png',del:'tp.png',ra:'tp.png',co:'tp.png',st:'tp.png',as:'tp.png'})


    const Picture=(event)=>{
      setPicture({fileBytes:(event.target.files[0]),fileUrl:URL.createObjectURL(event.target.files[0])})
      setSavePicture(true)
    }
    const Ad=(event)=>{
      setAd({fileBytes:(event.target.files[0]),fileUrl:URL.createObjectURL(event.target.files[0])})
      setSaveAd(true)
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


    useEffect(function(){
       
      fetchallcategory()
    },[])



    var fetchallcategory=async()=>{
      var result = await getData('category/fetchallcategory')
      setCategorylist(result)
    }
    
    var fetchallbrand=async(data)=>{
      var body = {categoryid:data}
      var result = await postData('brand/displaybrand',body)
      
      setBrandlist(result)
    }
    
    var fetchallmodel=async(data)=>{
      var body ={brandid:data}
      var result = await postData('model/displaymodel',body)
      
      setModellist(result)
    }


    const CategoryItems=()=>{
      return(getCategorylist.map((item,index)=>{
        return(
        <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        )
      })

      )
    }


      const BrandItems=()=>{
      return(getBrandlist.map((item,index)=>{
        return(
        <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
        )
      })

      )
    }
    
      const ModelItems=()=>{
      return(getModellist.map((item,index)=>{
        return(
        <MenuItem value={item.modelid}>{item.modelname}</MenuItem>
        )
      })

      )
    }

    const handlesavepicture=async()=>{
      var formData =new FormData()

      formData.append('productid',getProductID)
      formData.append('picture',getPicture.fileBytes)
      const config = {headers:{'content-type':'multipart/form-data'}}
      var result =await postDataAndImage('product/editpicture',formData,config)
      setOpen(false)
      fetchproduct()
    }
    
    const handlesavead=async()=>{
      var formData = new FormData()

      formData.append('productid',getProductID)
      formData.append('ad',getAd.fileBytes)
      const config ={headers:{'content-type':'multipart/form-data'}}
      var result = await postDataAndImage('product/editad',formData,config) 
      setOpen(false)
      fetchproduct()
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
  
    const body ={ProductID:getProductID,CategoryID:getCategoryID,BrandID:getBrandID,ModelID:getModelID,ProductName:getProductName,Description:getDescription,Price:getPrice,OfferPrice:getOfferPrice,OfferType:getOfferType,Color:getColor,AdStatus:getAdStatus,Stock:getStock,Delivery:getDelivery,Rating:getRating}
    var result = await postData('Product/UpdateProduct',body)
    fetchproduct()
    setOpen(false)
  }
    
    

    const fetchproduct =async()=>{
      const result = await getData('product/displayproduct')
      setData(result)
    }

    useEffect(function(){
      fetchproduct()
    }
  ,[])

    const handledelete=async(oldData)=>{
  
      var body = {productid:oldData.productid}
      
      var result =await postData('product/deleteproduct',body)
      alert(result.RESULT)
    }
    


    const handleEdit=(rowData)=>{
      fetchallmodel(rowData.brandid)
      alert(rowData.brandid)
      fetchallbrand(rowData.categoryid)
      
      setProductID(rowData.productid)
      setCategoryID(rowData.categoryid)
      setBrandID(rowData.brandid)
      setModelID(rowData.modelid)
      setProductName(rowData.productname)
      setDescription(rowData.description)
      setPrice(rowData.price)
      setOfferPrice(rowData.offerprice)
      setOfferType(rowData.offertype)
      setColor(rowData.color)
      setAdStatus(rowData.adstatus)
      setStock(rowData.stock)
      setDelivery(rowData.delivery)
      setRating(rowData.rating)
      setPicture({fileBytes:'',fileUrl:`${ServerURL}/images/${rowData.picture}`})
      setSavePicture(false)
      setAd({fileBytes:'',fileUrl:`${ServerURL}/images/${rowData.ad}`})
      setSaveAd(false)
      
      
      showEdit()
      setOpen(true)
    }

      const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down(''));

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const showEdit=()=>{
      return(<Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        
        <DialogContent>
          <DialogContentText>
           
          <div className={classes.root}>
        <div className={classes.subroot}>
            <h4>Edit/Delete</h4>
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
          value={getCategoryID}
        >
          {CategoryItems()}
        </Select>
        {getCategoryID}
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
          value={getBrandID}
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
          value={getModelID}
        >
          {ModelItems()}
        </Select>
        {getModelID}
      </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs ={6}>
        <img src={`${getErrorPic.pn}`} width='13px' height='13px'/>
        <TextField value={getProductName} onChange={(event)=>setProductName(event.target.value)} id="outlined-basic" label="Product Name" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs ={6}>
        <img src={`${getErrorPic.de}`} width='13px' height='13px'/>
        <TextField value={getDescription} onChange={(event)=>setDescription(event.target.value)} id="outlined-basic" label="Description" variant="outlined"  fullWidth/>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
        <img src={`${getErrorPic.pr}`} width='13px' height='13px'/>
        <TextField value={getPrice} onChange={(event)=>setPrice(event.target.value)} id="outlined-basic" label="Price" variant="outlined"fullWidth />
        </Grid>
        
        <Grid item xs>
        <img src={`${getErrorPic.op}`} width='13px' height='13px'/>
        <TextField value={getOfferPrice} onChange={(event)=>setOfferPrice(event.target.value)} id="outlined-basic" label="OfferPrice" variant="outlined"  fullWidth/>
        </Grid>
        <Grid item xs>
        <img src={`${getErrorPic.ot}`} width='13px' height='13px'/>
        <TextField value={getOfferType} onChange={(event)=>setOfferType(event.target.value)} id="outlined-basic" label="offertype" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs>
        <img src={`${getErrorPic.co}`} width='13px' height='13px'/>
        <TextField value={getColor} onChange={(event)=>setColor(event.target.value)} id="outlined-basic" label="Color"variant="outlined" fullWidth/>
       </Grid>
      </Grid>
      <Grid container spacing={3}>
      <Grid item xs>
        <img src={`${getErrorPic.as}`} width='13px' height='13px'/>
        <FormControl variant="outlined"  fullWidth>
        <InputLabel id="AdStatus">AdStatus</InputLabel>
        <Select
          labelId="AdStatus"
          id="AdStatus"
          value={getAdStatus}
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
        <TextField value={getStock} onChange={(event)=>setStock(event.target.value)} id="outlined-basic" label="Stock"variant="outlined" fullWidth />
        </Grid>
        <Grid item xs>
        <img src={`${getErrorPic.del}`} width='13px' height='13px'/>
        <TextField value={getDelivery} onChange={(event)=>setDelivery(event.target.value)} id="outlined-basic" label="Delivery" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs>
        <img src={`${getErrorPic.ra}`} width='13px' height='13px'/>
        <TextField value={getRating} onChange={(event)=>setRating(event.target.value)} id="outlined-basic" label="Rating"variant="outlined" fullWidth />
        </Grid>
        
      </Grid>
      
      <div style={{marginLeft:'200px',marginTop:'15px'}}>
      <Grid container spacing={3}>
        <Grid xs={12} sm={3}  >
        <Button style={{marginLeft:'-100px'}} onClick={()=>Submit()} variant="contained" color="primary"  >Submit</Button>    
        </Grid>
        <Grid xs={12} sm={3} style={{marginLeft:'92px'}}>
        <Button variant="contained" color="primary" >Reset</Button>    
        </Grid>
      </Grid>
      </div>
          <hr style={{marginTop:'25px'}}/>
        <div style={{marginTop:'20px'}}>
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
            <div style={{display:'flex',flexDirection:'column'}}>
            <div style={{padding:'3px',}}>
           <label htmlFor="pi">
           <img src={`${getErrorPic.pi}`} width='13px' height='13px'/>
            <Button variant="contained" color="primary" component="span">
            Picture
            </Button> 
           </label>
           </div>
            <div style={{padding:'3px',marginLeft:'20px',width:'20%'}}>
           {getSavePicture?<Button onClick={handlesavepicture} variant="contained" color="primary" autoFocus>
            Save
          </Button>:<div></div>}
            </div>
            </div>
           
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
            <div style={{padding:'3px',marginLeft:'20%'}}></div>
            <div style={{marginLeft:'10px',width:'30%'}}>
            {getSaveAd?<Button  onClick={handlesavead} variant="contained" color="primary" autoFocus>
            Save
          </Button>:<div></div>}
           </div>
           </label>
          </Grid>
          <Grid item xs={3}>
          <img src={getAd.fileUrl} width='90px' height='90px'/>
          </Grid>
      </Grid>
      </div>
    </div>

    </div>


          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      )
    }
    function Editable() {
        const { useState } = React;
      
        const [columns, setColumns] = useState([
          { title: 'ProductName', field: 'productname' },
          { title: 'Description', field: 'description', },
          { title: 'CategoryId', field: 'categoryid', },
          { title: 'BrandId',field: 'brandid',},
          { title: 'MdelId',field: 'modelid',},
          { title: 'Picture',field: 'picture',render: rowData => <img src={`${ServerURL}/images/${rowData.picture}`} style={{width: 90, height:90}}/>},
          { title: 'Price', field:'price'},
          { title:'Color',field:'color'}
        ]);
      
      
        return (<div className={classes.root}>
        <div className={classes.maindiv}>
          <MaterialTable
            title="Editable Preview"
            columns={columns}
            data={data}
            actions={[
              {
                icon:'edit',
                tooltip:'edit',
                onClick:(event,rowData)=>{
                  handleEdit(rowData)
                }
              }
            ]}
            editable={{
              onRowAdd: newData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    setData([...data, newData]);
                    
                    resolve();
                  }, 1000)
                }),
              onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setData([...dataDelete]);
                    handledelete(oldData)
                    resolve()
                  }, 1000)
                }),
            }}
          />
          </div>
          </div>
        )
      }
      



    return(<div>
        {Editable()}
        {showEdit()}
    </div>)
}