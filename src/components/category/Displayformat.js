import React,{useState,useEffect}  from 'react';
import {ServerURL,getData,postData,postDataAndImage} from '../FetchNodeservice'
import MaterialTable, { MTableToolbar } from 'material-table';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import  {isEmpty} from '../Checks';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { config } from 'react-transition-group';


const useStyles = makeStyles((theme) => ({
  root: {
    display:'flex',
    alignContent:'center',
    justifyContent:'center',
  },

  headingdiv:{
    display:'flex',
    width:'auto',
    padding:5,
    border:'1 solid #000000',
    textAlign:'center',
    color:'#000000',
  }, 
  maindiv:{
      display:'flex',
      alignContent:'center',
      justifyContent:'center',
      padding:20,
      marginTop:-10,
      backgroundColor:'#D1F2EB',
      flexDirection:'column',
      border:'4px solid #7B241C',
      borderRadius:15,
  },
  input: {
    display: 'none',
  },

     large: {
    width:70,
    height: 70,
    margin:3,
  },
}));




export default function Displayformat()
{
  const classes = useStyles();
  const [getCategoryId,setCategoryId]=useState('')
  const [getCategoryName,setCategoryName]=useState('')
  const [getCategorydescription,setCategorydescription]=useState('')
  const [getCategoryIcon,setCategoryIcon]=useState({fileBytes:'',fileUrl:''})
  const [getCategoryAd,setCategoryAd]=useState({fileBytes:'',fileUrl:''})
  const [getCategoryStatus,setCategoryStatus]=useState('')
  const [getbtnSaveIcon,setbtnSaveIcon]=useState(false)
  const [getbtnSaveAd,setbtnSaveAd]=useState(false)
  const [getErrorPic,setErrorPic]=useState({cn:'tp.png',cd:'tp.png',ci:'tp.png',ca:'tp.png',cas:'tp.png'})

  const handleIcon=(event)=>{
    alert("icon")
    setCategoryIcon({fileBytes:event.target.files[0],fileUrl:URL.createObjectURL(event.target.files[0])})
    setbtnSaveIcon(true)
  }
  const handleAd=(event)=>{
    alert('ad')
    setCategoryAd({fileBytes:event.target.files[0],fileUrl:URL.createObjectURL(event.target.files[0])})
    setbtnSaveAd(true)
  }

  const handleSaveIcon=async()=>{
    
    var formData=new FormData()
  
    formData.append('icon',getCategoryIcon.fileBytes)
    formData.append('categoryid',getCategoryId)
    const config={headers:{'content-type':'multipart/form-data'}}
    var result=await postDataAndImage('category/editcategoryicon',formData,config)
    fetchData()
    setOpen(false)
    // if(result)
    // {
    //   setMessage("Record Submited...")
    // }
    // else
    // {
    //   setMessage("Fail to submit record..")
    // } 
  }

  const handleSaveAd=async()=>{
    
    var formData=new FormData()
  
    formData.append('ad',getCategoryAd.fileBytes)
    formData.append('categoryid',getCategoryId)
    const config={headers:{'content-type':'multipart/form-data'}}
    var result=await postDataAndImage('category/editcategoryad',formData,config)
    fetchData()
    setOpen(false)
    // if(result)
    // {
    //   setMessage("Record Submited...")
    // }
    // else
    // {
    //   setMessage("Fail to submit record..")
    // } 
  }



  const handleSubmit=async()=>{

    // var error = false
    // var cn = isEmpty(getCategoryName)
    // var cd = isEmpty(getCategory)
    // var ci = isEmpty(getCategoryIcon.fileBytes)
    // var ca = isEmpty(getCategoryAd.fileBytes)
    // var cas =isEmpty(getCategoryStatus)
    // if (cn.err)
    // {
    //   error = cn.err
    // }
    // if (cd.err)
    // {
    //   error = cd.err
    // }
    // if (ci.err)
    // {
    //   error = ci.err
    // }
    // if (ca.err)
    // {
    //   error = ca.err
    // }
    // if(cas.err)
    // {
    //   error = cas.err

    // }
    // alert(ci.img)
    // setErrorPic({cn:cn.img,cd:cd.img,ci:ci.img,ca:ca.img,cas:cas.img})
    
    // if(!error)
    // {
    
    var body ={categoryid:getCategoryId,categoryname:getCategoryName,description:getCategorydescription,status:getCategoryStatus}
        var result=await postData('category/updatecategory',body)
        fetchData();
         setOpen(false)
  }
  // else
  // {
  //   alert('fill all entier')
  // }
  // // }

  


    const [data, setData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  

    const fetchData = async()=>{

        var result =await getData('category/fetchallcategory')
        setData(result)   
      }

   
    const showEditContent=(rowData)=>{
      return (<Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Edit Category"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <Grid container spacing={2}>
                <Grid item xs={12}>
                <img src={`/${getErrorPic.cn}`} width='20px' height='20px' />
                <TextField id="outlined-basic" value={getCategoryName} label="Category Name" variant="outlined" fullWidth onChange={(event)=>setCategoryName(event.target.value)}/>
                </Grid>

                <Grid item xs={12}>
                <img src={`/${getErrorPic.cd}`} width='20px' height='20px' />
                <TextField onChange={(event)=>setCategorydescription(event.target.value)} value={getCategorydescription} id="outlined-basic" label="Category " variant="outlined" fullWidth />
                </Grid>    
      <Grid item xs={12}>
      <FormControl variant="outlined" fullWidth >
      <img src={`/${getErrorPic.cas}`} width='20px' height='20px' />

        <InputLabel id="demo-simple-select-outlined-label">Ad Status</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={getCategoryStatus}
          onChange={(event)=>setCategoryStatus(event.target.value)}
          label="Ad Status"
        >
          
          <MenuItem value={'No'}>No</MenuItem>
          <MenuItem value={'Yes'}>Yes</MenuItem>
        </Select>
      </FormControl>
      </Grid>
        
        <Grid xs={12} style={{display:'flex', justifyContent:'center'}}>
        <Button variant="contained" color="primary" style={{ marginTop:10, width:370,marginLeft:11,color:'white',background:'#FEB2A2'}} onClick={()=>handleSubmit()}>EDIT</Button>    
        </Grid>   
        <Grid container spacing={2} style={{marginTop:'10px'}}>
        <Grid item xs={12} sm={6} >
      <img src={`/${getErrorPic.ci}`} width='20px' height='20px' />
          <input
        accept="image/*"
        className={classes.input}
        id="icon"
        multiple
        type="file"
        onChange={(event)=>handleIcon(event)}
        />
         <div style={{display:'flex'}}>
         <div style={{padding:'3px',marginTop:'-20px'}}>
      <label htmlFor="icon">
        <Button variant="contained" style={{ marginTop:20,}} color="primary" component="span">
          UPLOAD ICON
        </Button>
      </label>
      </div>
      <div style={{padding:'3px'}}>
      {getbtnSaveIcon?<Button onClick={handleSaveIcon} color="primary" variant='contained' autoFocus>
            Save Icon
          </Button>:<div></div>}
          </div>
          </div>
      </Grid>

      <Grid style={{display:'flex', justifyContent:'center'}} item xs={12} sm={6}>
      <img src={getCategoryIcon.fileUrl}  width='120px' height='90' />
      </Grid>

      <Grid item xs={12} sm={6}>
      <img src={`/${getErrorPic.ca}`} width='20px' height='20px' />
        <input
        accept="image/*"
        className={classes.input}
        id="ad"
        multiple
        type="file"
        onChange={(event)=>handleAd(event)}
        />
      <div style={{display:'flex'}}>
      <div style={{padding:'3px',marginTop:'-20px'}}>
      <label htmlFor="ad">
        <Button variant="contained" style={{ marginTop:20,}} color="primary" component="span">
          UPLOAD AD
        </Button>
      </label>
      </div>
      <div style={{padding:'3px'}}>
      {getbtnSaveAd?<Button onClick={handleSaveAd} color="primary" variant='contained' autoFocus>
            Save Ad
          </Button>:<div></div>}
          </div>
          </div>
      </Grid>

      <Grid  style={{display:'flex', justifyContent:'center'}} item xs={12} sm={6}>
      <img src={getCategoryAd.fileUrl} width='120px' height='90' />
      </Grid>
      </Grid>

      </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose}  color="primary"  autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>)
    }




    const handleEdit=(rowData)=>
    { 
      
      setCategoryId(rowData.categoryid)
      setCategoryName(rowData.categoryname)
      setCategorydescription(rowData.description)
      setCategoryStatus(rowData.adstatus)
      setCategoryIcon({fileBytes:'',fileUrl:`${ServerURL}/images/${rowData.icon}`})
      setbtnSaveIcon(false)
      setCategoryAd({fileBytes:'',fileUrl:`${ServerURL}/images/${rowData.ad}`})
      setbtnSaveAd(false)
      showEditContent(rowData)
       setOpen(true)
    }

     const  handleDelete=async(olddata)=>{
      var body ={categoryid:olddata.categoryid}
      var result = await postData('category/categorydelete',body)
      alert(result.RESULT)
     }



    function Editable() {
        const { useState } = React;
      
        const [columns, setColumns] = useState([
          { title: 'Name', field: 'categoryname' },
          { title: 'Description', field: 'description',},
          {title:'Icon', field:'icon',render: rowData => <img src={`${ServerURL}/images/${rowData.icon}`} style={{width: 50,height:50, borderRadius: '3%'}}/>},
          {title:'Ad', field:'ad',render: rowData => <img src={`${ServerURL}/images/${rowData.ad}`} style={{width: 50, height:50, borderRadius: '3%'}}/>},
          {title:'Status', field:'adstatus'}
        ]);

      
        




    useEffect(function(){
    fetchData()
    
    },[])

    

    
    
      
        return (
          <MaterialTable
            title="Category Interface"
            columns={columns}
            data={data}

            actions={[
              {icon:'edit',
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
                    handleDelete(oldData)
                    resolve()
                  }, 1000)
                }),
            }}
          />
        )
      }
      




    return (<div>
        {Editable()}
        {showEditContent()}

        </div>)
}