import react from 'react'
import State from "./State/State"
import Cities from "./City/Cities"
import Area from "./Area/Area"
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import DisplayState from './State/DisplayState'
import DisplayCity from './City/DisplayCity'
import DisplayArea from './Area/DisplayArea'
import Showcity from './Showcity'

const useStyles = makeStyles((theme) => ({
    root: {
        
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
    },
    subroot: {
        width: '800px',
       
    },

}));




export default function Main() {
    const classes = useStyles();

    return (<div className={classes.root}>
        <div className={classes.subroot}>
            <Grid container spacing={0} >
                <Grid xs={12} >
                <DisplayState/>
                </Grid>
                <Grid xs={12} >
                <DisplayCity/>
                </Grid>
                <Grid xs={12} >
                <DisplayArea/>
                </Grid>         
            </Grid>
            {/* <Showcity/> */}
        </div>
    </div>
    )
}