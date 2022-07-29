import React, { useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";

import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/ShoppingCart";
import MoreIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Divider from "@material-ui/core/Divider";
import Footer from "./Footer";
import Avatar from "@material-ui/core/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { ServerURL, getData, postData } from "../FetchNodeservice";
import Popper from "@material-ui/core/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import Drawer from "@material-ui/core/Drawer";
import QtySpinner from "./Qtyspinner";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  typography: {
    padding: theme.spacing(2),
  },
  list: {
    width: 415,
  },
  fullList: {
    width: "auto",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  paper: {
    padding: theme.spacing(1),
    marginTop: 20,
    width: 400,
  },
  center: {
    display: "flex",
    justifyContent: "flex-start",
    fontSize: 14,
    borderBottom: "1px solid #dcdde1",
  },

  hover: {
    "&:hover": {
      background: "#f1f2f6",
      transition: "all 0.5s ease 0s",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function MainPage(props) {
  console.log("HISTORY", props.props.history);
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  var dispatch = useDispatch();
  const [cartRender, setCartRender] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [getList, setList] = useState([]);
  const [getBrand, setBrand] = useState([]);
  const [anchorMM, setAnchorMM] = React.useState(null);
  var cart = useSelector((state) => state.data);
  var keys = Object.keys(cart);
  var length = keys.length;
  var items = Object.values(cart);

  var total = items.reduce(calculate, 0);

  function calculate(a, b) {
    var price =
      b.offerprice == 0 ? b.price * b.qtydemand : b.offerprice * b.qtydemand;
    return a + price;
  }
  var totalsaving = items.reduce(calculatesavings, 0);
  function calculatesavings(a, b) {
    var price = b.price - b.offerprice;
    price = price * b.qtydemand;
    return a + price;
  }
  const handleClick = (event) => {
    //alert(event.currentTarget.value);
    setAnchorMM(event.currentTarget);
    fetchBrand(event.currentTarget.value);
  };
  const cartData = () => {
    return (
      <PopupState variant="popper" popupId="demo-popup-popper">
        {(popupState) => (
          <div>
            <IconButton
              aria-label="show 17 new notifications"
              color="inherit"
              {...bindToggle(popupState)}
            >
              <Badge badgeContent={keys.length} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <Popper {...bindPopper(popupState)} transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper>{ShowCartItems()}</Paper>
                </Fade>
              )}
            </Popper>
          </div>
        )}
      </PopupState>
    );
  };

  const ShowCartItems = () => {
    return (
      <div className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <b>ORDER SUMMARY</b>
          </Grid>
          <Grid
            style={{ display: "flex", justifyContent: "flex-end" }}
            item
            xs={12}
            sm={6}
          >
            {length} item(s)
          </Grid>

          {items.map((item) => (
            <>
              <Grid item xs={12} sm={4}>
                <img
                  src={ServerURL + "/images/" + item.picture}
                  width="40%"
                  height="50%"
                  style={{ borderRadius: "2%", elevation: 20 }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                {item.productname}
              </Grid>

              <Grid
                style={{ display: "flex", justifyContent: "flex-end" }}
                item
                xs={12}
                sm={4}
              >
                <span>&#8377;</span>&nbsp;
                {item.offerprice == 0 ? item.price : item.offerprice} X{" "}
                {item.qtydemand}
              </Grid>
            </>
          ))}
          <Grid
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
            item
            xs={12}
            sm={6}
          >
            <div>
              <b>
                <span>&#8377;</span>&nbsp;{total}
              </b>
            </div>
            <small style={{ color: "#27ae60" }}>
              You save<span>&#8377;</span>&nbsp;{totalsaving}
            </small>
          </Grid>
          <Grid
            style={{ display: "flex", justifyContent: "flex-end" }}
            item
            xs={12}
            sm={6}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={toggleDrawer("right", true)}
            >
              Show Cart
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  };
  const handleClickProceed = () => {
    console.log("Whhhhat:",props)
    if(props.props.history.location.pathname==="/ShowCartWithAddress")
    {
    props.props.history.push({ pathname: "/ShowCartWithAddress" });}
    else
    
    props.props.history.push({ pathname: "/signinclient" });
    
  };
  const handleChange = (value, item) => {
    item["qtydemand"] = value;
    dispatch({ type: "ADD_CART", payload: [item.productid, item] });
    setCartRender(!cartRender);
  };
  const ShowCartItemsDrawer = () => {
    return (
      <div className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item xs={12} style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ padding: "5", marginRight: 10 }}>
              <b>ORDER SUMMARY</b>
            </div>
            <div style={{ padding: "5" }}>({length}) item(s)</div>
          </Grid>
        </Grid>
        {items.map((item) => (
          <>
            <div
              style={{
                padding: 20,
                display: "flex",
                borderRadius: "10",
                flexDirection: "row",
                background: "#FFF",
                border: "0.5px solid #dfe6e9",
              }}
            >
              <Grid container>
                <Grid item xs={12} sm={3}>
                  <img
                    src={ServerURL + "/images/" + item.picture}
                    width="30%"
                    height="50%"
                    style={{ borderRadius: "2%", elevation: 20 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {item.productname}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={3}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <DeleteOutlineOutlinedIcon style={{ color: "red" }} />
                </Grid>
              </Grid>
            </div>

            <Divider />
            <div
              style={{
                background: "#FFF",
                display: "flex",
                flexDirection: "row",
                padding: 10,
              }}
            >
              <Grid container>
                <Grid item xs={12} sm={4}>
                  <QtySpinner
                    value={item.qtydemand}
                    onChange={(value) => handleChange(value, item)}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <span>&#8377;</span>&nbsp;
                  {item.offerprice == 0 ? item.price : item.offerprice} X{" "}
                  {item.qtydemand}
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={4}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <span>&#8377;</span>&nbsp;
                  {item.offerprice == 0
                    ? item.price * item.qtydemand
                    : item.offerprice * item.qtydemand}
                </Grid>
              </Grid>
            </div>
          </>
        ))}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 18,
            fontWeight: "bold",
            letterSpacing: 2,
            padding: 16,
          }}
        >
          Payment Details
        </div>
        <div
          style={{
            background: "#FFF",
            display: "flex",
            flexDirection: "row",
            padding: 10,
          }}
        >
          <Grid container>
            <Grid item xs={12} sm={6}>
              Cart Total
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <b>
                <span>&#8377;</span>&nbsp;{total}
              </b>
            </Grid>

            <Grid item xs={12} sm={6}>
              Shipping Charge
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <b>
                <span>&#8377;</span>&nbsp;{0}
              </b>
            </Grid>
            <Grid item xs={12} style={{ paddingTop: 10, paddingBottom: 10 }}>
              <Divider />
            </Grid>
            <Grid item xs={12} sm={6}>
              Grand Total
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <b>
                <span>&#8377;</span>&nbsp;{total}
              </b>
            </Grid>

            <Grid item xs={12} sm={6}>
              <div style={{ color: "#27ae60" }}>You save</div>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <div style={{ color: "#27ae60" }}>
                <span>&#8377;</span>&nbsp;{totalsaving}
              </div>
            </Grid>
            <Grid item xs={12} style={{ paddingTop: 10, paddingBottom: 10 }}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => handleClickProceed()}
              >
                Proceed
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      style={{ background: "#ecf0f1" }}
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      //onKeyDown={toggleDrawer(anchor, false)}
    >
      {ShowCartItemsDrawer()}
    </div>
  );

  const handleClose = () => {
    setAnchorMM(null);
  };

  const fetchData = async () => {
    var result = await getData("category/fetchallcategory");
    setList(result);
  };

  const fetchBrand = async (cid) => {
    var body = { categoryid: cid };
    var result = await postData("brand/displaybrand", body);
    setBrand(result);
  };

  const mainMenu = () => {
    return getList.map((item, index) => {
      return (
        <div>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            value={item.categoryid}
            onClick={(event) => handleClick(event)}
          >
            {item.categoryname} <KeyboardArrowDownIcon />
          </Button>
        </div>
      );
    });
  };

  const handleMenuClick = (brandid) => {
    props.props.history.push({
      pathname: "/ListProducts",
      state: { brandid: brandid },
    });
  };

  const subMenu = () => {
    return (
      <div style={{ width: 350, outline: "none" }}>
        <Grid container spacing={1} style={{ cursor: "pointer" }}>
          {getBrand.map((item, index) => {
            return (
              <>
                {getBrand.length > 5 ? (
                  <Grid
                    className={[classes.center, classes.hover]}
                    style={{ padding: "5px 20px" }}
                    item
                    xs={12}
                    sm={6}
                    onClick={() => handleMenuClick(item.brandid)}
                  >
                    <Avatar
                      alt={item.brandname}
                      src={`${ServerURL}/images/${item.picture}`}
                    />{" "}
                    <span style={{ margin: 8 }}>{item.brandname}</span>
                  </Grid>
                ) : (
                  <Grid
                    className={[classes.center, classes.hover]}
                    style={{ padding: "5px 20px" }}
                    item
                    xs={12}
                    sm={12}
                    onClick={() => handleMenuClick(item.brandid)}
                  >
                    <Avatar
                      alt={item.brandname}
                      src={`${ServerURL}/images/${item.picture}`}
                    />{" "}
                    <span style={{ margin: 8 }}>{item.brandname}</span>
                  </Grid>
                )}
              </>
            );
          })}
        </Grid>
      </div>
    );
  };

  useEffect(function () {
    fetchData();
  }, []);
  const handleClickHome = () => {
    props.props.history.push({
      pathname: "/home",
    });
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
        >
          <MenuIcon />
        </IconButton>
        <img
          src="/nykaa.svg"
          width="80"
          height="80"
          onClick={() => handleClickHome()}
        />
        {mainMenu()}
        <Menu
          id="simple-menu"
          anchorEl={anchorMM}
          keepMounted
          open={Boolean(anchorMM)}
          onClose={handleClose}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          style={{ width: 450 }}
        >
          <Grid container spacing={1}>
            {subMenu()}
          </Grid>
        </Menu>

        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          {cartData()}
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </div>
        <div className={classes.sectionMobile}>
          <IconButton
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </div>
      </Toolbar>

      {renderMobileMenu}
      {renderMenu}
      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </AppBar>
  );
}
