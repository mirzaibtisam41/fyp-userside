import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "20.5rem"
    },
}));

export default function GroupedSelect() {
    const classes = useStyles();

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="grouped-select">Please select an issue</InputLabel>
                <Select defaultValue="" id="grouped-select">
                    <ListSubheader>Issues List</ListSubheader>
                    <option className="cate-head select-option p-2 font-light" value="Sort/Filter option isn't helpful">Sort/Filter option isn't helpful</option>
                    <option className="cate-head select-option p-2 font-light" value="Above my budget">Above my budget</option>
                    <option className="cate-head select-option p-2 font-light" value="Cannot be delivered at my pincode">Cannot be delivered at my pincode</option>
                    <option className="cate-head select-option p-2 font-light" value="Not enough variety or choice">Not enough variety or choice</option>
                    <option className="cate-head select-option p-2 font-light" value="Out of stock">Out of stock</option>
                    <option className="cate-head select-option p-2 font-light" value="Irrelevant results">Irrelevant results</option>
                </Select>
            </FormControl>
        </div>
    );
}
