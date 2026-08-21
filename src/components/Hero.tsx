import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="hero relative w-full min-h-[calc(100svh-116px)] overflow-hidden">
      <div className="hero-video-wrapper absolute inset-0 h-full w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="hero-video w-full h-full object-cover pointer-events-none"
        >
          <source
            src="https://d2hin4uaa1z4am.cloudfront.net/wordpress-home-vdo.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </section>
  );
};