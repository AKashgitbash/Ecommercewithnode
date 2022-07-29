import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { pink} from '@material-ui/core/colors'


 /*
 nykaa button box-shadow: 0px 2px 3px 0 rgb(0 0 0 / 10%),
    border-radius: "3px",
    background-color: "#fc2779",
    font-family: "SourceSansPro-Semibold, sans-serif",
    min-width: "222px",
    margin-top: 0,
    margin-bottom: 0,
    padding-top: "13px",
    padding-bottom: "13px",
 */



const useStyles = makeStyles((theme) => ({

    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        color: theme.palette.getContrastText(pink[500]),
        backgroundColor: pink[500],
      },
      btn:{
        boxShadow: "0px 2px 3px 0 rgb(0 0 0 / 10%)",
        borderRadius: "3px",
        backgroundColor: "#fc2779",
        fontFamily: "SourceSansPro-Semibold, sans-serif",
        minWidth: "200px",
        marginTop: 0,
        marginBottom: 0,
        paddingTop: "13px",
        paddingBottom: "13px",
        color:'white'
      }
    
  }));

 export default function Qtyspinner(props){
    const classes = useStyles();
    const [value,setvalue]=useState(props.value);
    
    /* 
    const handleclick =() =>{
        setvalue(1)
    }
    */ 

    const increment = () =>{
        var qty = value+1
        setvalue(qty)
        props.onChange(qty)
        
    }

    const decrement=()=>{
        if(value>0)
        {
        var qty= value-1
        setvalue(qty)
        props.onChange(qty)
        }
    }

return( 
    <div style={{display:'flex',flexDirection:'row'}}>
      {value ==0?(<button className={classes.btn} onClick={()=>increment()}  /*onClick={()=>handleclick()}*/>
      ADD TO CART
      </button>):(<><Avatar className={classes.small} onClick={()=>increment()}>
                                +
                    </Avatar>
    <div style={{fontWeight:'bold',marginLeft:15,marginRight:15,marginTop:0}}>
        {value}
    </div>
    <Avatar className={classes.small} onClick={()=>decrement()}>
        -
    </Avatar></>)}
    </div>

)

 }