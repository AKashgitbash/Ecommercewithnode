import MaterialTable, { MTableToolbar } from 'material-table';
import React,{useState,useEffect} from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { PostDataAndImage, ServerURL, postDataAndImage, getData, postData } from '../../FetchNodeservice'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="bottom" ref={ref} {...props} />;
});



const useStyles = makeStyles((theme) => ({
  root: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
  },
  subroot: {
      width: '400px',
      border: '25px',
      borderTopRightRadius:'15px',
      //background: '#ecf0f1',
      padding: '20px',
      color:'black',
      fontWeight:500
  },

}));
 
export default function DisplayCity(){
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [getListState, setListState] = useState([])
  const [getState, setState] = useState('')
  const [getCity, setCity] = useState('')

  const SelectState = (event) => {
      alert(event.target.value)
      setState(event.target.value)

  }



  const handleSubmit = async () => {
      var body = { stateid: getState, cityname: getCity }
      // alert(body[0].stateid)
      var result = await postData(`statecityarea/addcity`, body)
      alert(result.RESULT)
  }


  const fetchState = async () => {
      const result = await getData(`statecityarea/fetchallstate`)
      //alert(result)
      setListState(result)
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



  

  const handleClose = () => {
    setOpen(false);
  };


    const handleEdit=(rowData)=>{
      //alert(rowData.stateid)
      setState(rowData.stateid)
      setCity(rowData.cityname)
      showEditContent(rowData)
      setOpen(true)
    }

    const showEditContent=(rowData)=>{
     //console.log(rowData[0].cityid)
      return( <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"Edit"}</DialogTitle>
          <div className={classes.root}>
        <div className={classes.subroot}>
        <h3 style={{fontWeight:500}}>CITY</h3>
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
                    
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField id="outlined-basic" value={getCity} onChange={(event) => setCity(event.target.value)} label="Enter City" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} >
                    <Button variant="contained" onClick={() => handleSubmit()} color="primary" fullWidth >Submit</Button>
                </Grid>
            </Grid>
        </div>
    </div>
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
            var result =await getData(`statecityarea/fetchallcity`)
            setData(result)
        }

        const handleDelete=async(oldData)=>{
            var body = {cityid:oldData.cityid}
            var result = await postData(`statecityarea/deletecity`,body)
           // alert(result.RESULT)
        }

        useEffect(function(){
            fetchState()
        },[])
      
        const [columns, setColumns] = useState([
          { title: 'StateName', field: 'stateid' },
          { title: 'CiyName', field: 'cityname', initialEditValue: 'initial edit value' },
         
        ]);
      
        
      
        return (
          <MaterialTable
            title="Editable Preview"
            columns={columns}
            data={data}
            actions={[
              {
                icon: 'edit',
                tooltip: 'edit',
                onClick: (event, rowData) => {
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
      
    
    
    
    
    
    
    return(<div>
        {Editable()}
        {showEditContent()}

           </div>)
}