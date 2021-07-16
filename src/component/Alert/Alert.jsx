import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { MainGlobalContext } from "../MainContext/Context";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
        position: "fixed",
        top: "0",
        zIndex: "100000"
    },
}));

export default function SimpleAlerts() {
    const classes = useStyles();
    const { alert } = useContext(MainGlobalContext);

    return (
        <div className={classes.root}>
            {
                alert !== null &&
                <>
                    {
                        alert.type === "error" &&
                        <Alert severity="error">{alert.message}</Alert>
                    }
                    {
                        alert.type === "success" &&
                        <Alert severity="success">{alert.message}</Alert>
                    }
                </>
            }
        </div>
    );
}