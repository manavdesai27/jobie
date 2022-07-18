import React from "react";

import { Grid } from "@mui/material";

import Card from '../Card/Card';

const List = ({Tweets})=>{
    return(
        <>
            <Grid container rowSpacing={2} columnSpacing={2}>
            {/* {Tweets?.map((tweetJSON)=>{
                    <Grid item xs={12} sm={12} md={6} xl={4}>
                        <Card tweetData={tweetJSON}></Card>
                    </Grid>
                } )} */}
                    <Grid item xs={12} sm={12} md={6} xl={4}>
                        <Card />
                    </Grid>
            </Grid>
        </>
    );
}

export default List;