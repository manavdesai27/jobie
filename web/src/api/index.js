const ret = [
    {
        data: {
          author_id: '1363523970914349060',
          created_at: '2022-07-18T01:28:00.000Z',
          id: '1548841988136779776',
          text: 'This is my GitHub Profile.\n\nhttps://t.co/Xg7XmLurmz'
        },
        includes: { 
            users: [
            {
            created_at: '2021-02-21T16:20:33.000Z',
            id: '1363523970914349060',
            name: 'Dev Sharma',
            username: 'DevShar27983396'
            }]    
        },
        matching_rules: [ { id: '1548839608431312896', tag: 'Dev Sharma Tweets' } ]
    }
];

const dataCall = () =>{
    return ret;
}

export default dataCall;