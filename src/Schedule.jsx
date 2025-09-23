import React, { useEffect, useState, useRef } from 'react';

function Schedule({ matches, showComplete }) {
  if (matches.length === 0) {
    return 'Loading...';
  }

  return (
    <div className="container-fluid">
      <div className="card-container">
        {matches.map((match, cnt) => {
          let backgroundColor = (match.isDone) ? "#CCC" : "#FFF"
          let hideTile = showComplete || !match.isDone ? 'block' : 'none';
          return (
            <div style={{ display: hideTile, backgroundColor, margin: '5px' }} className="card" key={cnt}>
              <div className="card-body">
                <div className="card-title">{match.date} {match.isDone}</div>
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
