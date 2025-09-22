import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "./utils";
import "./badge.css";

const Badge = React.forwardRef(({ 
  className, 
  variant = "default", 
  asChild = false, 
  ...props 
}, ref) => {
  const Comp = asChild ? Slot : "span";
  const variantClass = `badge-${variant}`;

  return (
    <Comp
      className={cn("badge", variantClass, className)}
      ref={ref}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

export { Badge };