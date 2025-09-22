import * as React from "react";
import { cn } from "./utils";
import "./Input.css";

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn("input-base", className)}
      {...props}
    />
  );
}

export { Input };