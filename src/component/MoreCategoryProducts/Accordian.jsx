import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import SelectTag from "./Feedback/SelectTag";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: "10px",
        padding: "1rem px",
        borderBottom: "none"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: "bold",
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

export default function ControlledAccordions() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [openFeedback, setFeedback] = useState(false);

    const handleChange = (panel) => {
        setExpanded(panel);
    };

    return (
        <div className={classes.root}>
            <Accordion expanded={expanded === 'panel1'}>
                <AccordionSummary
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    className={openFeedback !== false && "border-bottom"}
                >
                    <div className="feedback-div">
                        <Typography className={classes.heading}>Did you find what you were looking for?</Typography>
                        <div className="feedback-btn">
                            <Button className={openFeedback === "yes" ? "btn-active mr-3" : "mr-3"} onClick={() => {
                                handleChange("panel1");
                                setFeedback("yes");
                            }} variant="outlined">Yes</Button>

                            <Button className={openFeedback === "no" ? "btn-active" : null} onClick={() => {
                                handleChange("panel1");
                                setFeedback("no");
                            }} variant="outlined">No</Button>
                        </div>
                    </div>
                    {openFeedback !== false && <span onClick={() => setFeedback(false)} className="position-absolute right-5 font-bold">X</span>}
                </AccordionSummary>
                {
                    openFeedback !== false && <AccordionDetails>
                        <div className="flex flex-col w-full">
                            {
                                openFeedback === "yes" && <>
                                    <span className="cate-head text-muted font-light mt-4">We’d love to hear from you about our search experience. Your feedback will help us improve Flipkart for everyone.</span>
                                    <textarea className="border mt-2 w-full px-3 py-1" name="" id="" rows="5"></textarea>
                                </>
                            }
                            {
                                openFeedback === "no" && <>
                                    <span className="cate-head text-muted font-light mt-1">Choose an option that best describes your problem.</span>
                                    <SelectTag />
                                    <span className="cate-head text-muted font-light mt-4">Please share any more details around the issue. Your feedback will help us improve for everyone.</span>
                                    <textarea className="border mt-2 w-full px-3 py-1" name="" id="" rows="5"></textarea>
                                </>
                            }
                            {
                                openFeedback !== false && <div>
                                    <button className="py-3 px-5 mt-4 bg-blue-600 text-white">Submit</button>
                                </div>
                            }
                        </div>
                    </AccordionDetails>
                }
            </Accordion>
        </div>
    );
}