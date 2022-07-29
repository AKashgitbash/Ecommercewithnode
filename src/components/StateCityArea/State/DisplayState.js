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


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

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
   // background:'#ecf0f1',
    padding:'20px',
  },
  
}));

export default function DisplayState(){
    const classes = useStyles();
    const [getState,setState]=useState('')
    const [getStateId,setStateId]=useState('')
    
    
    const [data, setData] = useState([]);
    const [open, setOpen] = React.useState(false);

 

  const handleClose = () => {
    setOpen(false);
  };

  const StateSubmit=async()=>{
    //alert(statname)
    var body = {
                stateid:getStateId,
                statename: getState
               }
    var result =await postData(`statecityarea/updatestate`,body)
    //alert(result.RESULT)
    fetchState()
}
       


        const fetchState =async()=>{
            var result =await getData(`statecityarea/fetchallstate`)
            setData(result)
        }

        const handleDelete=async(oldData)=>{
          var body ={stateid:oldData.stateid}
          var result =await postData(`statecityarea/deletestate`,body)
          //alert(result.RESULT)
        }

        const handleEdit=(rowData)=>{
          setState(rowData.statename)
          setStateId(rowData.stateid)
          showEditContent(rowData)
          
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
              <DialogTitle id="alert-dialog-slide-title">{"Edit State"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                <div className={classes.root}>
            <div className={classes.subroot}>
                
            <Grid container spacing={2}>
            <Grid item xs={12} >
            <TextField  id="outlined-basic" value={getState} onChange={(event)=>setState(event.target.value)} label="Enter State" variant="outlined"fullWidth />
            </Grid>
            
            <Grid item xs={12} >
            <Button variant="contained" onClick={()=>StateSubmit()} color="primary" fullWidth  >EDIT</Button>    
            </Grid>
           </Grid>
            </div>
        </div>
                </DialogContentText>
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
            fetchState()
        },[])
      



    function Editable() {
        
        const [columns, setColumns] = useState([
          { title: 'Name', field: 'statename' },

        ]);
      
        
      
        return (
          <MaterialTable
            title="EDIT STATE"
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