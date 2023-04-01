import React, { useState, useEffect, useRef } from 'react';
import QrScanner from 'qr-scanner';

const Scanner = () => {
  const [showScanner, setShowScanner] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (showScanner && videoRef.current) {
      const qrScanner = new QrScanner(videoRef.current, (result) => {
        setShowScanner(false);
        window.location.href = result;
      });
      qrScanner.start();
    }
  }, [showScanner, videoRef]);

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      {!showScanner && (
        <button onClick={() => setShowScanner(true)}>Open Scanner</button>
      )}
      {showScanner && (
        <div className="text-center">
          <video ref={videoRef} style={{ height: '100vh', width: '100vw' }} />
        </div>
      )}
    </div>
  );
};

export default Scanner;
