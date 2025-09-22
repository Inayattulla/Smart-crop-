"use client";

import * as React from "react";
import { cn } from "./utils";
import "./progress.css";

const Progress = React.forwardRef(({ 
  className, 
  value, 
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn("progress", className)}
      {...props}
    >
      <div
        className="progress-indicator"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  );
});
Progress.displayName = "Progress";

export { Progress };