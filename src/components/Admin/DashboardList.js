import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import Label from '@material-ui/icons/ShoppingCartOutlined';
import Arrow from '@material-ui/icons/PlayArrowOutlined';
import ForumIcon from '@material-ui/icons/Forum';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CategoryInterface from '../category/category'
import DisplayALL from '../category/DisplayALL'
import Displayformat from '../category/Displayformat'
import Brand from '../brand/Brands'
import Displaybrand from '../brand/Displaybrand'
import Model from "../model/Model"
import Displaymodule from "../model/Displaymodule"
import Product from "../product/product"
import Displayproduct from "../product/displayproduct"
import ProductPictureInterface from "../ProductPicture/ProductPictureInterface"
import DisplayProductPicture from "../ProductPicture/DisplayProductPicture"


const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    '&:hover > $content': {
     // backgroundColor: theme.palette.action.hover,
    },
    '&:focus > $content, &$selected > $content': {
      //backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: 'transparent',
    },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function DashboardList(props) {
  const classes = useStyles();

  const handleClick =(value)=>{
    props.handleView(value)
  }

  

  return (
    <TreeView
      className={classes.root}
      //defaultExpanded={['3']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >

      <StyledTreeItem nodeId="300" labelText="Categories" labelIcon={Label}>
        <StyledTreeItem
          nodeId="5"
          labelText="Add Categories"
          labelIcon={Arrow}
          color="#1a73e8"
          onClick={()=>handleClick(<CategoryInterface/>)}
          bgColor="#e8f0fe"
        />
        <StyledTreeItem
          nodeId="6"
          labelText="Display Categories"
          labelIcon={Arrow}
          color="#e3742f"
          onClick={()=>handleClick(<Displayformat/>)}
          bgColor="#fcefe3"
        />
      </StyledTreeItem>
      <StyledTreeItem nodeId="400" labelText="Brand" labelIcon={Label}>
        <StyledTreeItem
          nodeId="5"
          labelText="Add Brand"
          labelIcon={Arrow}
          color="#1a73e8"
          onClick={()=>handleClick(<Brand/>)}
          bgColor="#e8f0fe"
        />
        <StyledTreeItem
          nodeId="6"
          labelText="Display Brands"
          labelIcon={Arrow}
          color="#e3742f"
          onClick={()=>handleClick(<Displaybrand/>)}
          bgColor="#fcefe3"
        />
      </StyledTreeItem>
      <StyledTreeItem nodeId="500" labelText="Model" labelIcon={Label}>
        <StyledTreeItem
          nodeId="5"
          labelText="Add Model"
          labelIcon={Arrow}
          color="#1a73e8"
          onClick={()=>handleClick(<Model/>)}
          bgColor="#e8f0fe"
        />
        <StyledTreeItem
          nodeId="6"
          labelText="Display Model"
          labelIcon={Arrow}
          color="#e3742f"
          onClick={()=>handleClick(<Displaymodule/>)}
          bgColor="#fcefe3"
        />
      </StyledTreeItem>
      <StyledTreeItem nodeId="600" labelText="Product" labelIcon={Label}>
        <StyledTreeItem
          nodeId="5"
          labelText="Add Product"
          labelIcon={Arrow}
          color="#1a73e8"
          onClick={()=>handleClick(<Product/>)}
          bgColor="#e8f0fe"
        />
        <StyledTreeItem
          nodeId="6"
          labelText="Display Product"
          labelIcon={Arrow}
          color="#e3742f"
          onClick={()=>handleClick(<Displayproduct/>)}
          bgColor="#fcefe3"
        />
      </StyledTreeItem>
      <StyledTreeItem nodeId="700" labelText="ProductPictureInterface" labelIcon={Label}>
        <StyledTreeItem
          nodeId="8"
          labelText="Add Product"
          labelIcon={Arrow}
          color="#1a73e8"
          onClick={()=>handleClick(<ProductPictureInterface/>)}
          bgColor="#e8f0fe"
        />
        <StyledTreeItem
          nodeId="9"
          labelText="DisplayProductPicture"
          labelIcon={Arrow}
          color="#1a73e8"
          onClick={()=>handleClick(<DisplayProductPicture/>)}
          bgColor="#e8f0fe"
        />
        </StyledTreeItem>
  
      <StyledTreeItem
          nodeId="14"
          labelText="Logout"
          labelIcon={Arrow}
          color="#e3742f"
          onClick={()=>handleClick(50)}
          bgColor="#fcefe3"
        />

    </TreeView>
  );
}
