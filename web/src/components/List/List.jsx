import React from "react";
import Card from '../Card/Tweet';


const List = ({Tweets})=>{
    
    return(
        <div className="flex flex-row justify-center md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4 flex-wrap py-4 mx-10">
            {Tweets?.map((tweetJSON,i) => {
                return (<Card tweetData={tweetJSON}></Card>)
                })}
        </div>
    );
}

export default List;