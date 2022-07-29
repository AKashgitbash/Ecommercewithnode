import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ServerURL, postDataAndImage, getData, postData } from '../../FetchNodeservice'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



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



export default function State() {
    const classes = useStyles();
    const [getState, setState] = useState('')
    const [getListState, setListState] = useState([])
    const [getListCity, setListCity] = useState([])
    const [getAreaName, setAreaName] = useState('')
    const [getAreaPincode, setAreaPincode] = useState('')
    const [getAreaStatus, setAreaStatus] = useState('')
    const [getSelectState, setSelectState] = useState('')
    const [getCity, setCity] = useState('')


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

    return (<div className={classes.root}>
        <div className={classes.subroot}>
            <h3 style={{fontWeight:500}}>Area</h3>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="Select State">Select State</InputLabel>
                        <Select
                            labelId="Select State"
                            id="Select State"
                            //value={'getState'}
                            onChange={(event) => SelectState(event)}
                            label="Select State"
                        >
                            {showState()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="Select City">Select City</InputLabel>
                        <Select
                            labelId="Select City"
                            id="Select City"
                            //value={'getState'}
                            onChange={(event)=>SelectCity(event)}
                            label="Select City"
                        >
                            {showCity()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="outlined-basic" onChange={(event)=>setAreaName(event.target.value)} label="Enter AreaName" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="outlined-basic" onChange={(event)=>setAreaPincode(event.target.value)} label="Enter AreaPincode" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth >
                        <InputLabel id="demo-simple-select-outlined-label">Area Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            // value={AreaStatus}
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
    </div>)

}