import * as cheerio from 'cheerio';

async function getRequest(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const body = await response.text();
        return body;
    } catch (error) {
        console.error('Request failed:', error);
        return "";
    }
}

const parseSchedule = (schedule, setSchedule, body) => {
    let cells;
    const $ = cheerio.load(body);
    $('tbody tr').each((ctr, elem) => {
        let event = {};
        event.isDone=false;

        cells = $(elem).find('td');
        cells.each((cell_ctr, cell) => {
            switch (cell_ctr) {
                case 0:
                    event.date = cellPrep($, cell);

                    var dateEvent=new Date(event.date);
                    var dateNow=new Date();
                    if (dateEvent < dateNow){
                        event.isDone=true;
                    }
                    break;
                case 4:
                    event.homeTeam = cellPrep($, cell);
                    break;
                case 5:
                    event.awayTeam = cellPrep($, cell);
                    break;
                case 6:
                    event.facility = cellPrep($, cell);
                    break;
                default:
                    break;
            }
        });
        
        setSchedule(prev=>[...prev, event]);
    })
}

const cellPrep=($, cell)=>{
    let prep=$(cell).html().replace('<br>', ' ');
    prep=prep.replace('(Junior Varsity)', '');
    prep=prep.replace('(Varsity)', '');
    prep=prep.replace('High School', 'HS');
    
    return prep;
}

export const run = (URL, schedule, setSchedule) => {
    setSchedule([]); // clear existing schedule
    getRequest(URL)
        .then(body => {
            parseSchedule(schedule, setSchedule, body);
        });

}
