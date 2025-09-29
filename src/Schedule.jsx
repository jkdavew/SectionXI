import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';

function Schedule({ error, url, title, matches, showComplete }) {
  if (error!="") {
    return (
      <div className="container-fluid">
        <h2 style={{ textAlign: 'center' }}>Unable to load the schedule</h2>
        <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
        <p style={{ textAlign: 'center' }}><a target="_blank" href={url}>View Schedule Directly (new tab)</a></p>
      </div>
    );
  }

  if (matches.length === 0) {
    return 'Loading...';
  }

  return (
    <div className="container-fluid">
      <h2 style={{ textAlign: 'center' }}>{title}</h2>
      <div className="card-container">
        {matches.map((match, cnt) => {
          let backgroundColor = (match.isDone) ? "#CCC" : "#FFF"
          let hideTile = showComplete || !match.isDone ? 'block' : 'none';

          // set border color based on when date is.  if today, then green.  if tomorrow then yellow, else normal
          let matchDate=moment(match.date).format('MMMM Do YYYY');
          let matchDOW=moment(match.date).format('ddd');
          let nowDate=moment().format('MMMM Do YYYY');
          let tomorrowDate=moment().add(1, 'days').format('MMMM Do YYYY');
          let borderHighlightClass="";
          let textHighlightClass="";
          if (matchDate===nowDate) {
            borderHighlightClass="border-success";
            textHighlightClass="text-success";
          }else if (matchDate===tomorrowDate) {
            borderHighlightClass="border-warning";
            textHighlightClass="text-warning";
          }

          return (
            <div className={`card clearfix ${borderHighlightClass}`} style={{ display: hideTile, backgroundColor, margin: '5px' }} key={cnt}>
              <div className="card-body">
                <div className={`card-sub-title ${textHighlightClass}`}>{matchDOW} {match.date} {match.isDone}</div>
                Venue: {match.facility}<br />
                {match.awayTeam} @ {match.homeTeam}<br />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Schedule;
