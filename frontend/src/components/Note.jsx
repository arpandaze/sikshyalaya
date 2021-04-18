import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { Route, Switch, Redirect } from "react-router-dom";
import Button from "../components/Button";
import * as yup from "yup";
import Tab from "../components/Tab";
import Grid from "@material-ui/core/Grid";
import Image from "../components/Image";
import profile from "../assets/pp.jpg";
import SideBar from "../components/SideBar";
import colorscheme from "../utils/colors";
import ProfileBar from "../components/ProfileBar";
import DashboardLayout from "../components/DashboardLayout";

const styleSheet = {
    root: {
        flexGrow: "1",
        border: "1px solid black",
        position: "relative",
        left: "0%",
        top:"20%",
        margin: "3 px auto",
        padding:"10px 10px"
        
    },
    line: {
        color: colorscheme.grey1,
        
        width :"80%",
        height:"2px",
        borderRadius:"20px",

    },
    notepad: {
        width: "750px",
        height: "750px",
        left:"10vh",
        background: colorscheme.white,
        borderRadius: "20px",
        boxShadow: "2px 2px 10px -3px rgba(0,0,0,0.2)",
        border: "1px solid black",
    },
    titleText: {
        margin:"7px auto",
        padding:"10px",
        fontWeight: "bold",
        fontSize: "1.7em",
        

    },
    contentText: {
        padding: "10px",
        border: "1px solid black",
        width:"100%",
        
        
    }

    }

const Note = ({title, content,...rest}) => {
    return (
        <div>
        <Grid container direction="row" justify="flex-end" align="flex-end"style={ styleSheet.root }>

        <div style={styleSheet.notepad}>
            
            <Grid item xs={3}  container direction="column" justify="flex-end" align="flex-end">
                        <a style={styleSheet.titleText}>hey</a>
                        <div style={styleSheet.line}></div>
        
                    </Grid >
                    <Grid item xs={8} >
                        <a style={styleSheet.contentText}>mog jsdhaskjakshdkjashdkjasd</a>
                    </Grid>
        </div>
         </Grid >


</div>
    );
    
};

export default Note;