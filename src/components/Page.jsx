import React from "react";

export default function Page({ children, title }) {
  return (
    <div className="page">
      <div className="page-face page-front">
        <div className="page-inner">
          <div className="page-title text-indigo-600">{title}</div>
          <div className="content text-sm text-slate-700">{children}</div>
        </div>
      </div>

      <div className="page-face page-back">
        <div className="page-inner">
          <div className="page-title text-indigo-600">{title} (back)</div>
          <div className="content text-sm text-slate-700">
            {/* by default back will display the same content area; you can customize */}
            {children}
          </div>
        </div>
      </div>

      <div className="edge"></div>
    </div>
  );
}
