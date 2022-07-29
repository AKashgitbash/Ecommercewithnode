import MaterialTable, { MTableToolbar } from "material-table";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import {
  ServerURL,
  getData,
  postData,
  postDataAndImage,
} from "../FetchNodeservice";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { isEmpty } from "../Checks";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  maindiv: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    width: "65%",
    marginTop: "10px",
    background: "#bebebe",
    padding: "15px",
    borderRadius: "14px",
  },
  heading: {
    marginLeft: "42%",
    color: "#6a5acd",
    borderRadius: "5px",
  },
  input: {
    display: "none",
  },
}));

export default function Displaymodule() {
  const classes = useStyles();
  const [getlist, setlist] = useState([]);
  const [getbrandlist, setbrandlist] = useState([]);
  const [getcategoryid, setcategoryid] = useState("");
  const [getbrandid, setbrandid] = useState("");
  const [getmodelname, setmodelname] = useState("");
  const [getdescription, setdescription] = useState("");
  const [geterrpic, seterrpic] = useState("");
  const [getMessage, setMessage] = useState("");

  const [data, setData] = useState([]);

  const categoryid = (event) => {
    setcategoryid(event.target.value);
    fetchbrand(event.target.value);
  };
  const brandid = (event) => {
    setbrandid(event.target.value);
  };
  const modelname = (event) => {
    setmodelname(event.target.value);
  };
  const description = (event) => {
    setdescription(event.target.value);
  };
  const fetchcategory = async () => {
    var result = await getData("category/fetchallcategory");
    setlist(result);
  };

  useEffect(function () {
    fetchcategory();
    fetchbrand();
  }, []);

  const categoryItems = () => {
    return getlist.map((item, index) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };

  const fetchbrand = async (data) => {
    var body = { categoryid: data };
    var result = await postData("brand/displaybrand", body);
    setbrandlist(result);
  };

  const fetchCategoryByBrand = async (brandid) => {
    var body = { brandid: brandid };
    var result = await postData("brand/fetchcategorybybrand", body);
    await setcategoryid(result[0].categoryid);
    await fetchbrand(result[0].categoryid);
  };

  const brandItems = () => {
    return getbrandlist.map((item, index) => {
      return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>;
    });
  };

  const submit = async () => {
    var error = false;
    var ci = isEmpty(getcategoryid);
    var bi = isEmpty(getbrandid);
    var mn = isEmpty(getmodelname);
    var de = isEmpty(getdescription);

    if (ci.err) {
      error = ci.err;
    }
    if (bi.bi) {
      error = bi.bi;
    }
    if (de.err) {
      error = de.err;
    }
    if (mn.err) {
      error = mn.err;
    }

    seterrpic({ ci: ci.img, bi: bi.img, de: de.img, mn: mn.img });

    if (!error) {
      // var formData = new FormData()
      //   formData.append('categoryid',getcategoryid)
      //   formData.append('brandid',getbrandid)
      //   formData.append('modelname',getmodelname)
      //   formData.append('description',getdescription)

      var body = {
        brandid: getbrandid,
        modelname: getmodelname,
        description: getdescription,
      };
      var result = await postData("model/modelsubmit", body);

      if (result) {
        console.log(result);
        setMessage("Record Submited...");
      } else {
        console.log(result);
        setMessage("Fail to submit record...");
      }
    } else {
      alert("fill the all entries");
    }
  };

  var fetchData = async () => {
    var result = await getData("model/displaymodel");
    setData(result);
  };

  useEffect(function () {
    fetchData();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDelete = async (oldData) => {
    var body = { modelid: oldData.modelid };
    var result = await postData("model/deletemodel", body);
  };

  const handleEdit = (rowData) => {
    fetchbrand(getcategoryid);
    fetchCategoryByBrand(rowData.brandid);
    setbrandid(rowData.brandid);
    setdescription(rowData.description);
    setmodelname(rowData.modelname);
    setOpen(true);
  };
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const showEdit = () => {
    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <Grid item xs={12} style={{ marginLeft: "230px" }}>
            <b>MODEL</b>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="categoryid">Category ID</InputLabel>
                <Select
                  labelId="categoryid"
                  id="categoryid"
                  value={getcategoryid}
                  onChange={(event) => categoryid(event)}
                  label="categoryid"
                >
                  {categoryItems()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="brandid">Brand ID</InputLabel>
                <Select
                  labelId="brandid"
                  id="brandid"
                  value={getbrandid}
                  onChange={(event) => brandid(event)}
                  label="brandid"
                >
                  {brandItems()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                value={getmodelname}
                label="Model Name"
                variant="outlined"
                onChange={(event) => modelname(event)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                value={getdescription}
                label="Description"
                variant="outlined"
                onChange={(event) => description(event)}
                fullWidth
              />
            </Grid>

            <Grid
              xs={12}
              sm={6}
              style={{
                display: "flex",
                justifyContent: "center",
                height: "35px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => submit()}
                style={{ marginTop: 10, height: "35px" }}
              >
                Submit
              </Button>
            </Grid>
            <Grid
              xs={12}
              sm={6}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: 10, height: "35px" }}
              >
                Reset
              </Button>
            </Grid>
            <h1>{getMessage}</h1>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  function Editable() {
    const { useState } = React;

    const [columns, setColumns] = useState([
      { title: "ModelID", field: "modelid" },
      {
        title: "ModelName",
        field: "modelname",
        initialEditValue: "initial edit value",
      },
      { title: "Description", field: "description", type: "numeric" },
    ]);

    return (
      <div className={classes.root}>
        <div className={classes.maindiv}>
          <MaterialTable
            title="Editable Preview"
            columns={columns}
            data={data}
            actions={[
              {
                icon: "edit",
                tooltip: "edit",
                onClick: (event, rowData) => {
                  handleEdit(rowData);
                },
              },
            ]}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    setData([...data, newData]);

                    resolve();
                  }, 1000);
                }),

              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setData([...dataDelete]);
                    handleDelete(oldData);
                    resolve();
                  }, 1000);
                }),
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      {Editable()}
      {showEdit()}
    </div>
  );
}
