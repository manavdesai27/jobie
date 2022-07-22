import React, {useState,useEffect} from "react";

import {Card,CardActions,CardContent,Typography,Button} from "@mui/material"

const URLReplacer = (str)=>{
    let match = str.match(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.\\;]*[-A-Z0-9+&@#/%=~_\\|])/ig);
    return match;
}

const Tweet = ({tweetData})=>{

    // const FormatText = (str)=> (str.replace(new RegExp('\r?\n','g'), '<br />'));
    const [text, setText] = useState("");
    const [link,setLink] = useState("");
    const [tweetLink,setTweetLink] = useState(`#`);
    
    useEffect(() => {
        console.log(tweetData.creatorUsername);
        let tempText = tweetData.text;
        setLink(URLReplacer(tempText));
        setText(tempText.replace(URLReplacer(tempText),""));
        setTweetLink(`https://twitter.com/${tweetData.creatorUsername}/status/${tweetData.tweetId}`);

    }, [tweetData]);
    

    return (
        <>
            <Card elevation={6} >
                <CardContent>
                <Typography gutterBottom variant="h6">{text}</Typography>
                <CardActions className="actions" display="flex" justify-content="space-between">
                    <Button size="small" onClick={()=>{
                        window.open(link,'_blank');
                    }
                }>Opportunity Link</Button>
                <Button size="small" onClick={()=>{
                        window.open(tweetLink,'_blank');
                    }
                }>Tweet Link</Button>
                </CardActions>
                </CardContent>
            </Card>
        </>
    );
}

export default Tweet;
