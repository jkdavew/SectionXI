import React, { useEffect, useState, useRef } from 'react';
import './App.css'
import { run } from './utils/script.js'
import Schedule from './Schedule.jsx';

function App() {
  const hasRun = useRef(false);
  const [schedule, setSchedule] = useState([]);
  const [showComplete, setShowComplete] = useState(false);


  const URL = import.meta.env.VITE_SCHEDULE_URL_LIST;
  const TITLE = import.meta.env.VITE_TITLE_LIST;

  const urls = URL.split(',');
  const titles = TITLE.split(',');

  useEffect(() => {
    if (hasRun.current) return; // prevent double run (dev strict mode only)
    hasRun.current = true;

    run(urls[0], schedule, setSchedule)

    return () => {
      // cleanup
    }
  }, []);

  return (
    <>
      <span className="fixed-top" style={{ backgroundColor: '#FFF', padding: '10px', zIndex: 1000, width: '100%', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
        <select style={{ fontSize: "18px" }} onChange={(e) => run(e.target.value, schedule, setSchedule)}>
          {urls.map((url, idx) => (
            <option key={idx} value={url.trim()}>{titles[idx] ? titles[idx].trim() : `Schedule ${idx + 1}`}</option>
          ))}
        </select>


        <input style={{ marginLeft: '10px' }} type="checkbox" checked={showComplete} onChange={(e) => setShowComplete(e.target.checked)} /> Show Completed
      </span>
      <div style={{ marginTop: '50px' }}>
        <Schedule matches={schedule} showComplete={showComplete} />
      </div>
    </>
  )
}

export default App
