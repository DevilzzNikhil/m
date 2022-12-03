const axios = require("axios");

const BaseUrl = "https://api.worldbank.org/v2" ;

async function fetchTopics()
{
    const Topics = [] ;

    await axios({
        url: BaseUrl + "/topic?format=json",
        method: 'get',
    }).then(({data})=> {
       
        let topics = data[1] ;   
        topics.map( (data) => {
            var name = data.value ;
            var id = data.id ;
            var topic = {
                id: id,
                name: name,
            }
            Topics.push(topic);
            
        })

    }).catch(function (err) {
        console.log(err) ;
    })
    console.log(Topics);
    return Topics
}

async function fetchTopicIndicator(topicId)
{
    const Indicators = [] ;

    await axios({
        url: BaseUrl + `/topic/${topicId}/indicator?format=json`,
        method: 'get',
    }).then(({data})=> {
       
        let indicators = data[1] ;   
        indicators.map( (data) => {
            var name = data.name ;
            var id = data.id
            var indicator = {
                id: id,
                name: name,
            }
            Indicators.push(indicator);
        })

    }).catch(function (err) {
        console.log(err.message) ;
    })
    console.log(Indicators)
    return Indicators 
}

async function fetchStatistics(indicator, date = "none", format= "json", perPage = 10000, page = 1)
{
    let url = BaseUrl + `/country/in/indicator/${indicator}?format=${format}&per_page=${perPage}&page=${page}`
    if(date !== "none")
    {
        url = url + `&date=${date}`
    }
    //console.log(url);
    const Stats = [] ;

    await axios({
        url: url,
        method: 'get',
    }).then(({data})=> {
       
        let stats = data[1] ;   
        //console.log(data)
        stats.map((data)=> {
            let date = data.date;
            let value = data.value;

            let stat = {
                date: date,
                value: value,
            }
            Stats.push(stat);
        })

    }).catch(function (err) {
        console.log(err.message) ;
    })
    // console.log(Stats)
    return Stats ;
}

module.exports = {fetchTopics, fetchTopicIndicator,fetchStatistics};

