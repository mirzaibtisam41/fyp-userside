import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function CircularIndeterminate() {

    return (
        <div className="border d-flex justify-center items-center" style={{ height: "100vh" }}>
            <CircularProgress />
        </div>
    );
}