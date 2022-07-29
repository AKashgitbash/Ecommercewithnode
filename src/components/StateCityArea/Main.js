import react from 'react'
import State from "./State/State"
import Cities from "./City/Cities"
import Area from "./Area/Area"
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import DisplayState from './State/DisplayState'
import DisplayCity from './City/DisplayCity'
import DisplayArea from './Area/DisplayArea'

const useStyles = makeStyles((theme) => ({
    root: {
        
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
    },
    subroot: {
        width: '800px',
        border: '1px solid #636e72',
        borderRadius:'15px',
        background: '#b2bec3',
        marginTop:'25px'
    },

}));




export default function Main() {
    const classes = useStyles();

    return (<div className={classes.root}>
        <div className={classes.subroot}>
            <Grid container spacing={0} >
                <Grid xs={12} sm={6}>
                    <State />
                </Grid>
                <Grid xs={12} sm={6}>
                    <Cities />
                </Grid>
                <Grid xs={12} >
                    <Area />
                </Grid>
            </Grid>
        </div>
    </div>
    )
}