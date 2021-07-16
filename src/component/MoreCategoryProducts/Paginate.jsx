import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& > *': {
                marginTop: theme.spacing(2),
            },
        },
    }),
);

export default function BasicPagination({ products, changePageNumber, postPerPage }) {
    const classes = useStyles();
    let PaginationNumber = Math.ceil((products && products.length / postPerPage));
    return (
        <div className={classes.root}>
            <Pagination onChange={(event, page) => {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0
                changePageNumber(page);
            }} count={products && PaginationNumber} color="primary" />
        </div>
    );
}
