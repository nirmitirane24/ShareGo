import React, { useState } from 'react';
import './WelcomePage.css'; 

const WelcomePage = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [fileURL, setFileURL] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [toEmail, setToEmail] = useState('');
  const [uploadComplete, setUploadComplete] = useState(false);

  // Simulated file upload progress
  const simulateUpload = () => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setUploadComplete(true);
          // Simulate generating file URL (replace with actual backend logic)
          const generatedURL = `https://fileshare.com/${file.name}`;
          setFileURL(generatedURL);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 300); // Adjust interval for faster/slower progress simulation
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setProgress(0); // Reset progress for a new file
      setUploadComplete(false);
      simulateUpload(); // Start upload progress
    }
  };

  const handleEmailSend = (e) => {
    e.preventDefault();
    // Logic to send file via email
    alert(`File sent from ${fromEmail} to ${toEmail}`);
  };

  return (
    <div className="main-container">
      {/* Left Container - File Upload and Link Display */}
      <div className="upload-container">
        {!uploadComplete ? (
          <>
            <div className="drop-zone" onClick={() => document.getElementById('fileInput').click()}>
              <div className="title">Drop your Files here or, <span id="browseBtn">browse</span></div>
              <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>

            {/* Progress Bar */}
            <div className="progress-container">
              <div className="bg-progress" style={{ width: `${progress}%` }}></div>
              <div className="inner-container">
                <div className="status">
                  {progress < 100 ? 'Uploading...' : 'Upload Complete!'}
                </div>
                <div className="percent-container">
                  <span className="percentage">{progress}</span>%
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="link-container">
            <p className="expire">Link expires in 24 hrs</p>
            <div className="file-link">{fileURL}</div>
          </div>
        )}
      </div>

      {/* Right Container - Email Form */}
      <div className="sharing-container">
        <form classname="email-form"id="emailForm" onSubmit={handleEmailSend}  >
          <div className="filed">
            <label htmlFor="fromEmail">Your email</label>
            <input
              type="email"
              name="from-email"
              id="fromEmail"
              required
              value={fromEmail}
              onChange={(e) => setFromEmail(e.target.value)}
            />
          </div>

          <div className="filed">
            <label htmlFor="toEmail">Receiver's email</label>
            <input
              type="email"
              name="to-email"
              id="toEmail"
              required
              value={toEmail}
              onChange={(e) => setToEmail(e.target.value)}
            />
          </div>

          <div className="send-btn-container">
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WelcomePage;
