
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles((theme) => ({
  mainroot: {
    width: '280px'
  },
  root: {
    position: 'relative',
    left: 50,
    marginTop: 30,
    width: 'auto',
  },
  troot: {
    margin: 10
  },
  paper: {
    background: 'white',//#fc2779
    height: 'auto',
    maxWidth: 400,
    marginRight: 50,
    elevation: 60
  },
  input: {
    padding: 800,
    background: 'red'
  },
  h2: {
    textAlign: 'left',
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 17
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    fontWeight: 'bold'
  },
  radio: {
    color: '#fc2779',
    fontSize: '10px'
  }
}));






export default function Filter() {
  const classes = useStyles();
  const [value, setValue] = React.useState('female');
  const [checked, setChecked] = React.useState(true);
  const [Range, setRange] = React.useState([100, 10000]);
  const [getFisrtValue, setFisrtValue] = React.useState('100');
  const [getSecondValue, setSecondValue] = React.useState('10000');

  const handleRadio = (event) => {
    setValue(event.target.value);
    setChecked(event.target.checked);

  }
  const handlePrice = (event, newValue) => {
    setRange(newValue);
    setFisrtValue(newValue[0]);
    setSecondValue(newValue[1]);

  };





  return (<div className={classes.mainroot}>
    <div className={classes.root}>
      <Paper className={classes.paper} variant="outlined"  >
        <h1 className={classes.h2}>Filters</h1>
        <Divider style={{ height: 2 }} />
        <h2 className={classes.h2}>Price</h2>

        <div className={classes.troot}>
          <Slider
            min={0}
            max={10000}
            value={Range}
            onChange={handlePrice}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"

            style={{ color: '#fc2779' }}
          />
          <Grid container spacing={1} style={{marginLeft:28}}>
            <Grid xs={12} sm={6} style={{ fontSize: '14px' }}>Min</Grid>
            <Grid xs={12} sm={6} style={{ fontSize: '14px' }}>Max</Grid>
            <Grid xs={12} sm={6} style={{ fontSize: '14px' }}>{getFisrtValue}</Grid>
            <Grid xs={12} sm={6} style={{ fontSize: '14px' }}>{getSecondValue}</Grid>
          </Grid>
        </div>
        <Divider />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Sort By</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl component="fieldset">
              <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleRadio}>
                <FormControlLabel value="a" control={<Radio className={classes.radio} />} label="Low to High" />
                <FormControlLabel value="b" control={<Radio className={classes.radio} />} label="High to Low" />
                <FormControlLabel value="c" control={<Radio className={classes.radio} />} label="Oldest to Newest" />
                <FormControlLabel value="d" control={<Radio className={classes.radio} />} label="Newest to Oldest" />
              </RadioGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>

        <Divider />

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Discount</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl component="fieldset">
              <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleRadio}>
                <FormControlLabel value="e" control={<Radio className={classes.radio} />} label="40% or more" />
                <FormControlLabel value="f" control={<Radio className={classes.radio} />} label="30% or more" />
                <FormControlLabel value="g" control={<Radio className={classes.radio} />} label="20% or more" />
                <FormControlLabel value="h" control={<Radio className={classes.radio} />} label="10% or more" />
              </RadioGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>


        <Divider />
        <div style={{ marginRight: '247px', marginTop: '10px' }}>
          <Typography className={classes.h2}>
            Availability
          </Typography>
        </div>
        <div style={{ marginRight: 122 }}>
          <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} style={{ color: 'red' }} />in Stock</div>

      </Paper>



    </div>

  </div>

  );
}

