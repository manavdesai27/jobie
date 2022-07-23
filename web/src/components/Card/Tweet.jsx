import React, { useState, useEffect } from "react";

const URLReplacer = (str) => {
    let match = str.match(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.\\;]*[-A-Z0-9+&@#/%=~_\\|])/ig);
    return match;
}

const Tweet = ({ tweetData }) => {
    const [text, setText] = useState("");
    const [link, setLink] = useState("");
    const [tweetLink, setTweetLink] = useState(`#`);

    useEffect(() => {
        console.log(tweetData.creatorUsername);
        let tempText = tweetData.text;
        setLink(URLReplacer(tempText));
        setText(tempText.replace(URLReplacer(tempText), ""));
        setTweetLink(`https://twitter.com/${tweetData.creatorUsername}/status/${tweetData.tweetId}`);

    }, [tweetData]);


    return (
            <div className="flex justify-center w-fit h-48 border border-gray-200 rounded-lg">
                <div className="flex flex-col p-6 rounded-lg shadow-lg bg-white max-w-sm">
                    <p className="text-gray-700 text-base mb-4 flex-grow text-ellipsis overflow-hidden line-clamp-4">
                    {text}
                    </p>
                    <div className="flex flex-row gap-4">
                    <a href={link} target="_blank" rel="noopener noreferrer" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Opportunity</a>
                    <a href={tweetLink} target="_blank" rel="noopener noreferrer" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Tweet</a>
                    </div>
                </div>
            </div>
    );
}

export default Tweet;
