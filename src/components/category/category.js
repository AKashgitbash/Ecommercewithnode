import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {postDataAndImage,ServerURL} from '../FetchNodeservice'
import { borderRadius, textAlign } from '@material-ui/system';
//import './Example.css'
import  {isEmpty} from '../Checks';
import { is } from '@babel/types';





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
      backgroundColor:'#dfe6e9',
      flexDirection:'column',
      // border:'4px solid #7B241C',
      borderRadius:2,
      width:'600px'
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

export default function Category(props)
{
    const classes = useStyles();
    const [getCategoryName,setCategoryName]=useState('')
    const [getCategorydiscription,setCategorydiscription]=useState('')
    const [getCategoryIcon,setCategoryIcon]=useState({fileBytes:'',fileUrl:''})
    const [getCategoryAd,setCategoryAd]=useState({fileBytes:'',fileUrl:''})
    const [getCategoryStatus,setCategoryStatus]=useState('')
    const [getMessage,setMessage]=useState()
    const [getErrorPic,setErrorPic]=useState({cn:'tp.png',cd:'tp.png',ci:'tp.png',ca:'tp.png',cas:'tp.png'})

    const checkStorage =()=>{
      if(!localStorage.getItem("ADMIN"))
      {
        props.history.replace({pathname:'\adminlogin'})
      }}

      useEffect(function(){
        checkStorage()
      },[])



    const handleIcon=(event)=>{
      alert("icon")
      setCategoryIcon({fileBytes:event.target.files[0],fileUrl:URL.createObjectURL(event.target.files[0])})
    }
    const handleAd=(event)=>{
      alert('ad')
      setCategoryAd({fileBytes:event.target.files[0],fileUrl:URL.createObjectURL(event.target.files[0])})
    }

    const handleSubmit=async()=>{

      var error = false
      var cn = isEmpty(getCategoryName)
      var cd = isEmpty(getCategorydiscription)
      var ci = isEmpty(getCategoryIcon.fileBytes)
      var ca = isEmpty(getCategoryAd.fileBytes)
      var cas =isEmpty(getCategoryStatus)
      if (cn.err)
      {
        error = cn.err
      }
      if (cd.err)
      {
        error = cd.err
      }
      if (ci.err)
      {
        error = ci.err
      }
      if (ca.err)
      {
        error = ca.err
      }
      if(cas.err)
      {
        error = cas.err

      }
      alert(ci.img)
      setErrorPic({cn:cn.img,cd:cd.img,ci:ci.img,ca:ca.img,cas:cas.img})
      
      if(!error)
      {
      var formData=new FormData()
      formData.append('categoryname',getCategoryName)
      formData.append('categorydiscription',getCategorydiscription)
      formData.append('icon',getCategoryIcon.fileBytes)
      formData.append('ad',getCategoryAd.fileBytes)
      formData.append('adstatus',getCategoryStatus)
      const config={headers:{'content-type':'multipart/form-data'}}
      var result=await postDataAndImage('category/categorysubmit',formData,config)
      if(result)
      {
        setMessage("Record Submited...")
      }
      else
      {
        setMessage("Fail to submit record..")
      }
    }
    else
    {
      alert('fill all entier')
    }
    }
    return(
          <div className={classes.root}>
            <div className={classes.maindiv}>
            <div className=''>
                <div className={classes.headingdiv}>
                    <h1>Category Interface</h1>
                </div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <img src={`/${getErrorPic.cn}`} width='20px' height='20px' />
                <TextField id="outlined-basic" label="Category Name" variant="outlined" fullWidth onChange={(event)=>setCategoryName(event.target.value)}/>
                </Grid>

                <Grid item xs={12}>
                <img src={`/${getErrorPic.cd}`} width='20px' height='20px' />
                <TextField onChange={(event)=>setCategorydiscription(event.target.value)} id="outlined-basic" label="Category description" variant="outlined" fullWidth />
                </Grid>
            
      <Grid item xs={12} sm={6}>
      <img src={`/${getErrorPic.ci}`} width='20px' height='20px' />
          <input
        accept="image/*"
        className={classes.input}
        id="icon"
        multiple
        type="file"
        onChange={(event)=>handleIcon(event)}
        />
      <label htmlFor="icon">
        <Button variant="contained" style={{ marginTop:20,}} color="primary" component="span">
          UPLOAD ICON
        </Button>
      </label>
      </Grid>

      <Grid style={{display:'flex', justifyContent:'center'}} item xs={12} sm={6}>
      <Avatar src={getCategoryIcon.fileUrl} variant='rounded'  className={classes.large} />
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
      <label htmlFor="ad">
        <Button variant="contained" style={{ marginTop:20,}} color="primary" component="span">
          UPLOAD AD
        </Button>
      </label>
      </Grid>

      <Grid  style={{display:'flex', justifyContent:'center'}} item xs={12} sm={6}>
      <Avatar src={getCategoryAd.fileUrl} variant ='rounded' className={classes.large} />
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
        
        <Grid xs={12} sm={6} style={{display:'flex', justifyContent:'center'}}>
        <Button variant="contained" color="primary" style={{ marginTop:10,}} onClick={()=>handleSubmit()}>Submit</Button>    
        </Grid>
        <Grid xs={12} sm={6} style={{display:'flex', justifyContent:'center'}}>
        <Button variant="contained" color="primary" style={{ marginTop:10,}}>Reset</Button>    
        </Grid>   
            
      </Grid>
             <b>{getMessage}</b>
                </div>
        </div>
        </div>
    )
}