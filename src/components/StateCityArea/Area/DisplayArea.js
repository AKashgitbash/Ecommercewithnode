import MaterialTable, { MTableToolbar } from 'material-table';
import React,{useState,useEffect} from 'react'
import {ServerURL,getData,postData,postDataAndImage} from '../../FetchNodeservice' 
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
  },
  subroot: {
      width: '800px',
      border: '25px',
      borderColor: 'pink',
      background: '#ecf0f1',
      padding: '20px',
      color:'black',

  },

}));


export default function DisplayArea(){
  const classes = useStyles();
  const [getState, setState] = useState('')
  const [getListState, setListState] = useState([])
  const [getListCity, setListCity] = useState([])
  const [getAreaName, setAreaName] = useState('')
  const [getAreaPincode, setAreaPincode] = useState('')
  const [getAreaStatus, setAreaStatus] = useState('')
  const [getSelectState, setSelectState] = useState('')
  const [getCity, setCity] = useState('')
  const [getCities, setCities] = useState('')
  
  
  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };    


  
  const SelectState = (event) => {
    // alert(event.target.value)
     setState(event.target.value)
     fetchCity(event.target.value)
 }

 const SelectCity=(event)=>{
     setCity(event.target.value)
 }


 const fetchState = async () => {
     const result = await getData(`statecityarea/fetchallstate`)
     //alert(result)
     setListState(result)
 }

 const fetchCity = async (event) => {
     //alert(event)
     var body={stateid:event}
     var result = await postData(`statecityarea/fetchallsubcity`,body)
     setListCity(result)
     //alert(result)
 }

 useEffect(function () {
     fetchState()

 }, [])


 const showState = () => {
     return (getListState.map((item, index) => {
         return (<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
     })
     )
 }

 const showCity = () => {
     return (getListCity.map((item, index) => {
         return (<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)
     })
     )
 }


 const AreaSubmit=async()=>{
     var body = {stateid:getState,
                 cityid:getCity,
                 areaname:getAreaName,
                 areapincode:getAreaPincode,
                 areastatus:getAreaStatus
             }
     var result =await postData(`statecityarea/addarea`,body)
     //alert(result.RESULT)

 }









  const handelEdit=(rowData)=>{
    //alert(rowData.cityid)
    setSelectState(rowData.stateid)
    setState(rowData.stateid)
    setCity(rowData.cityid)
    fetchCity(rowData.stateid)
    //setCities(rowData.cityid)
    setAreaName(rowData.areaname)
    setAreaPincode(rowData.pincode)
    setAreaStatus(rowData.status)
    showEditContent()
    setOpen(true)
  }


    const showEditContent=()=>{
      return( <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"EDIT"}</DialogTitle>
          <DialogContent>
          <div className={classes.root}>
        <div className={classes.subroot}>
            <h3 style={{fontWeight:500}}>Area</h3>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="Select State">Select State</InputLabel>
                        <Select
                            labelId="Select State"
                            id="Select State"
                            value={getState}
                            onChange={(event) => SelectState(event)}
                            label="Select State"
                        >
                            {showState()}
                        </Select>
                    </FormControl>
                    {getSelectState}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="Select City">Select City</InputLabel>
                        <Select
                            labelId="Select City"
                            id="Select City"
                            value={getCity}
                            onChange={(event)=>SelectCity(event)}
                            label="Select City"
                        >
                            {showCity()}
                        </Select>
                    </FormControl>
                    {getCities}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="outlined-basic" value={getAreaName} onChange={(event)=>setAreaName(event.target.value)} label="Enter AreaName" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="outlined-basic" value={getAreaPincode} onChange={(event)=>setAreaPincode(event.target.value)} label="Enter AreaPincode" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth >
                        <InputLabel id="demo-simple-select-outlined-label">Area Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                             value={getAreaStatus}
                            onChange={(event=>setAreaStatus(event.target.value))}
                            label="Area Status"
                        >
                            <MenuItem value={'Yes'}>Yes</MenuItem>
                            <MenuItem value={'No'}>No</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} >
                    <Button variant="contained" onClick={()=>AreaSubmit()} color="primary" fullWidth >Submit</Button>
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



    function Editable() {
        const { useState } = React;
        const [data, setData] = useState([]);
       


        const fetchState =async()=>{
            var result =await getData(`statecityarea/fetchallarea`)
            setData(result)
        }

        const handleDelete=async(oldData)=>{
            var body={areaid:oldData.areaid}
            var result = await postData('statecityarea/deletearea',body)
            alert(result.RESULT)
        }

        useEffect(function(){
            fetchState()
        },[])
      
        const [columns, setColumns] = useState([
          { title: 'StateName', field: 'stateid' },
          { title: 'CityName', field: 'cityid',  },
          { title: 'AreaName', field: 'areaname'},
          { title: 'AreaPincode', field: 'pincode'},
          { title: 'Status', field: 'status'},
            
        ]);
      
        
      
        return (
          <MaterialTable
            title="Editable Preview"
            columns={columns}
            data={data}
            actions={[
              {
                icon: 'edit',
                tooltip: 'edit ',
                onClick: (event, rowData) => {
                  handelEdit(rowData)
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
      
    
    
    
    
    
    
    return(<div>
        {Editable()}
        {showEditContent()}

           </div>)
}