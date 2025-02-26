import React, { useState } from "react";
import "../css/homepage.css"; // Make sure your spinner styles are defined here

const ImageWithLoader = ({ src, alt, className, ...props }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="image-wrapper" style={{width : '100%'}}>
      {loading && (
        <div className="image-spinner-container">
          <div className="image-spinner"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={() => setLoading(false)}
        style={loading ? { opacity: 0 } : { opacity: 1, transition: "opacity 0.5s ease-in" }}
        {...props}
      />
    </div>
  );
};

export default ImageWithLoader;
