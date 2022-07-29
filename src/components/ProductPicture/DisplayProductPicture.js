import MaterialTable, { MTableToolbar } from 'material-table';
import React,{useState, useEffect,useRef,createRef} from 'react';
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
import Slide from '@material-ui/core/Slide';
import DropzoneComponent from 'react-dropzone-component';
import {ServerURL,getData,postData,postDataAndImage} from '../FetchNodeservice' 


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

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



export default function DisplayProductPicture(){
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [getCategorylist,setCategorylist]=useState([])
    const [getBrandlist,setBrandlist]=useState([])
    const [getModellist,setModellist]=useState([])
    const [getCategoryID,setCategoryID]=useState('')
    const [getBrandID,setBrandID]=useState('')
    const [getModelID,setModelID]=useState('')
    const [getProductID,setProductID]=useState('')
    const [getDescription,setDescription]=useState('')
    const [getProductlist,setProductlist]=useState([])
    const [getMessage,setMessage]=useState('')
    const [getErrorPic,setErrorPic]=useState({ci:'tp.png',bi:'tp.png',mi:'tp.png',pn:'tp.png',de:'tp.png',pi:'tp.png',ad:'tp.png',pr:'tp.png',op:'tp.png',ot:'tp.png',del:'tp.png',ra:'tp.png',co:'tp.png',st:'tp.png',as:'tp.png'})

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  

    var dref = createRef()


    var djsConfig = {
        addRemoveLinks: true,
        acceptedFiles:"image/jpeg,image/png,image/gif",
        autoProcessQueue:false,
        uploadMultiple:true,
    };

    var componentConfig = {
        iconFiletypes: ['.jpg', '.png', '.gif'],
        showFiletypeIcon: true,
        postUrl: `${ServerURL}/productpicture/dummy`
    };


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
      fetchallproduct(event.target.value)
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

    var fetchallproduct=async(data)=>{
      var body ={modelid:data}
      var result = await postData('Product/displayproductbymodel',body)
      alert(result)
      setProductlist(result)
    }
    
      const ProductItems=()=>{
      return(getProductlist.map((item,index)=>{
        return(
        <MenuItem value={item.productid}>{item.productname}</MenuItem>
        )
      })
      
      )
    }
    const Submit=async()=>{
    
       var error = false
      var ci = isEmpty(getCategoryID)
      var bi = isEmpty(getBrandID)
      var mi = isEmpty(getModelID)
      var pi = isEmpty(getProductID)
      var de = isEmpty(getDescription)
      
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
       if(de.err)
       {
         error = de.err
       }
       if(pi.err)
       {
         error = pi.err
       }
     
       setErrorPic({ci:ci.img,bi:bi.img,mi:mi.img,de:de.img,pi:pi.img})

    if(!error)
    {
      var formData =new FormData()
      
        formData.append('CategoryID',getCategoryID)
        formData.append('BrandID',getBrandID)
        formData.append('ModelID',getModelID)
        formData.append('ProductID',getProductID)   
        formData.append('Description',getDescription)
    
        dref.current.state.files.map((file,index)=>{
          formData.append('pictures'+index,file)
        })
        var config ={headers:{'content-type':'multipart/formdata'}}
        var result = await postDataAndImage('Productpicture/addproductpicture',formData,config)

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
    


    const fetchProductPicture=async()=>{ 
    var result = await getData(`ProductPicture/displayproductpicture`)
        setData(result)    
        //alert(result[0].categoryid)
    }

    const handleEdit=(rowData)=>{
       // alert(rowData.categoryid)
       setCategoryID(rowData.categoryid)
       setBrandID(rowData.brandid)
       setModelID(rowData.modelid)
       setProductID(rowData.productid)
       setDescription(rowData.description)

        showEditContent()
        setOpen(true)
      }

    const showEditContent=()=>{
      return(  <div style={{width:800}}>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <div className={classes.root}>
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

      <Grid item xs={12}>
          <img src={`${getErrorPic.bi}`} width='13px' height='13px'/>
        <FormControl variant="outlined"  fullWidth>
        <InputLabel id="ProductID">product ID</InputLabel>
        <Select
          labelId="ProductID"
          id="ProductID"
          onChange={(event)=>setProductID(event.target.value)}
          label="ProductID"
        >
         {ProductItems()}
        </Select>
      </FormControl> 
        </Grid>
      <Grid container spacing={3}>
        
        <Grid item xs ={12}>
        <img src={`${getErrorPic.de}`} width='13px' height='13px'/>
        <TextField onChange={(event)=>setDescription(event.target.value)} id="outlined-basic" label="Description" variant="outlined"  fullWidth/>
        </Grid>
      </Grid>
      <Grid item xs ={12}>
      <DropzoneComponent  ref={dref} config={componentConfig}
                      // eventHandlers={eventHandlers}
                       djsConfig={djsConfig} />    
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

    </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>)
    }
    useEffect(function(){
        fetchProductPicture()
    },[])



    function Editable() {
        const { useState } = React;
      
        const [columns, setColumns] = useState([
          { title: 'categoryid', field: 'categoryid' },
          { title: 'Description', field: 'description', },
          { title: 'CategoryId', field: 'categoryid', },
          { title: 'BrandId',field: 'brandid',},
          { title: 'MdelId',field: 'modelid',},
          { title: 'Picture',field: 'productpicture',render: rowData => <img src={`${ServerURL}/images/${rowData.productpicture}`} style={{width: 90, height:90}}/>},
          { title: 'Price', field:'price'},
          { title:'Color',field:'color'}
        ]);
      
        const handledelete=async(oldData)=>{
         // alert(oldData.pictureid)
           var body = {pictureid:oldData.pictureid}
           //alert(body.pictureid)
           var result =await postData('ProductPicture/deleteproductpicture',body)
           alert(result.RESULT)
        } 
      
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
          {showEditContent()}
          </div>
      )

}