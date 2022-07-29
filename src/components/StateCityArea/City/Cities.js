import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { PostDataAndImage, ServerURL, postDataAndImage, getData, postData } from '../../FetchNodeservice'
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
        width: '400px',
        border: '25px',
        borderTopRightRadius:'15px',
        background: '#ecf0f1',
        padding: '20px',
        color:'black',
        fontWeight:500
    },

}));



export default function State() {
    const classes = useStyles();
    const [getListState, setListState] = useState([])
    const [getSelectState, setSelectState] = useState('')
    const [getcity, setcity] = useState('')

    const SelectState = (event) => {
        //alert(event.target.value)
        setSelectState(event.target.value)

    }



    const StateCitySubmit = async () => {
        var body = { stateid: getSelectState, cityname: getcity }
        // alert(body[0].stateid)
        var result = await postData(`statecityarea/addcity`, body)
       // alert(result.RESULT)
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


    return (<div className={classes.root}>
        <div className={classes.subroot}>
        <h3 style={{fontWeight:500}}>CITY</h3>
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
                    <TextField id="outlined-basic" onChange={(event) => setcity(event.target.value)} label="Enter City" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} >
                    <Button variant="contained" onClick={() => StateCitySubmit()} color="primary" fullWidth >Submit</Button>
                </Grid>
            </Grid>
        </div>
    </div>)

}