import React from "react";

export default function LookerEmbed({ semesterId }: { semesterId?: number }) {
  const lookerURL = `https://lookerstudio.google.com/embed/reporting/78e6a7fd-e7f5-434e-9007-8b48c6f81eb6/page/qHZ9E`;

  return (
    <div className="w-full h-full">
      <iframe
        title="Looker Dashboard"
        width="100%"
        height="1200px"
        src={lookerURL}
        allowFullScreen
      ></iframe>
    </div>
  );
}
