import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import  {isEmpty} from './Checks';
import {ServerURL,getData,postData,postDataAndImage} from '../FetchNodeservice'



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display:'flex',
      justifyContent:'center',
      alignContent:'center',
    },
    subroot:{
      display:'flex',
      justifyContent:'center',
      alignContent:'center',
      marginTop:'40px',
      background:'#9FE2BF',
      height:'500px',
      width:'600px',
      border:'8px solid purple',
      borderRadius:'15px'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));


export default function Model(){
    const classes = useStyles();

    const [getcategoryid,setcategoryid]=useState('')
    const [getbrandid,setbrandid]=useState('')
    const [getmodelname,setmodelname]=useState('')
    const [getdescription,setdescription]=useState('')
    const [geterrpic,seterrpic]=useState('')
    const [getMessage,setMessage]=useState('')

    const categoryid=(event)=>{
      setcategoryid(event.target.value)
    }
    const brandid=(event)=>{
      setbrandid(event.target.value)
    }
    const modelname=(event)=>{
      setmodelname(event.target.value)
    }
    const description=(event)=>{
      setdescription(event.target.value)
    }


    const submit=async()=>{
      
      var error = false
      var ci = isEmpty(getcategoryid)
      var bi = isEmpty(getbrandid)
      var mn = isEmpty(getmodelname)
      var de = isEmpty(getdescription)
      
      

      if(ci.err)
      {
        error= ci.err
      }
      if(bi.bi)
      {
        error=bi.bi
      }
      if(de.err)
      {
        error=de.err
      }
      if(mn.err)
      {
        error=mn.err
      }
      
     seterrpic({ci:ci.img,bi:bi.img,de:de.img,mn:mn.img})
    


    if(!error)
    {
      var formData = new FormData()
        formData.append('categoryid',getcategoryid)
        formData.append('brandid',getbrandid)
        formData.append('description',getdescription)
        formData.append('modelname',getmodelname)
        

        const config={headers:{'content-type':'multipart/formdata'}}
        var result =await postDataAndImage('brand/brandsubmit',formData,config)

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
      alert('fill the all entries')
    }
  }

  

    return(<div className={classes.root}>
        <div class={classes.subroot}>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{marginLeft:'240px'}} >
          <h2>MODULE</h2>   
          </Grid>
          <Grid item xs={6}>
          <TextField id="outlined-basic" label="Category ID"  variant="outlined" onChange={(event)=>categoryid(event)} fullWidth />
          </Grid>
          <Grid item xs={6}>
          <TextField id="outlined-basic" label="Brand ID"  variant="outlined" onChange={(event)=>brandid(event)} fullWidth />
          </Grid>
          <Grid item xs={12}>
          <TextField id="outlined-basic" label="Model Name" variant="outlined" onChange={(event)=>modelname(event)} fullWidth />
          </Grid>
          <Grid item xs={12}>
          <TextField id="outlined-basic" label="Description" variant="outlined" onChange={(event)=>description(event)} fullWidth />
          </Grid>


          <Grid xs={12} sm={6} style={{display:'flex', justifyContent:'center', height:'35px'}}>
        <Button variant="contained" color="primary" style={{ marginTop:10,height:'35px'}} >Submit</Button>    
        </Grid>
        <Grid xs={12} sm={6} style={{display:'flex', justifyContent:'center'}}>
        <Button variant="contained" color="primary" style={{ marginTop:10,height:'35px'}}>Reset</Button>    
        </Grid>

        </Grid>
      </div>
        </div>

    )

}