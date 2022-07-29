import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {ServerURL, postDataAndImage,getData,postData} from '../../FetchNodeservice'


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display:'flex',
      justifyContent:'center',
      alignContent:'center',
    },
    subroot:{
      width:'400px',
      borderTopLeftRadius:'15px',
      background:'#ecf0f1',
      padding:'20px',
    },
    
  }));
  


export default function State(){
    const classes = useStyles();
    const [getState,setState]=useState('')
    


    const StateSubmit=async()=>{
        //alert(statname)
        var body = {statename:getState}
        var result =await postData(`statecityarea/addstate`,body)
        alert(result.RESULT)
    }
    
    
    

   


    

return( <div className={classes.root}>
            <div className={classes.subroot}>
                <h3 style={{fontWeight:500}}>STATE</h3>
            <Grid container spacing={2}>
            <Grid item xs={12} >
            <TextField  id="outlined-basic" onChange={(event)=>setState(event.target.value)} label="Enter State" variant="outlined"fullWidth />
            </Grid>
            
            <Grid item xs={12} >
            <Button variant="contained" onClick={()=>StateSubmit()} color="primary" fullWidth  >Submit</Button>    
            </Grid>
           </Grid>
            </div>
        </div>)

}