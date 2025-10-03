import React from 'react';

const VideoTest = () => {
  const videoUrl = "https://customer-assets.emergentagent.com/job_gothic-author/artifacts/wvbjzjh1_Novi_20250917_00_48_39.mp4";
  
  return (
    <div style={{ padding: '2rem', backgroundColor: '#333', color: 'white' }}>
      <h2>Video Test Component</h2>
      <p>Video URL: {videoUrl}</p>
      
      <video 
        controls 
        width="400" 
        height="300"
        preload="metadata"
        onError={(e) => console.error('Video error:', e)}
        onLoadStart={() => console.log('Video loading started')}
        onCanPlay={() => console.log('Video can play')}
        style={{ border: '2px solid white', marginTop: '1rem' }}
      >
        <source src={videoUrl} type="video/mp4" />
        <p>Video not supported</p>
      </video>
      
      <button 
        onClick={() => {
          const video = document.querySelector('video');
          if (video) {
            video.play();
          }
        }}
        style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
      >
        Play Video
      </button>
    </div>
  );
};

export default VideoTest;