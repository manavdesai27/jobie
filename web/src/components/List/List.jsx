import React from "react";

import { Grid } from "@mui/material";

import Card from '../Card/Tweet';


const List = ({Tweets})=>{
    
    return(
        <>
            <Grid container rowSpacing={2} columnSpacing={2}>
            {Tweets?.map((tweetJSON,i) => {
                return (<>
                    <Grid key={i} item xs={12} sm={12} md={6} xl={4}>
                        <Card tweetData={tweetJSON}></Card>
                    </Grid>
                </>)
                } )}
            </Grid>
        </>
    );
}

export default List;