import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "./utils";
import "./button.css";

const Button = React.forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  asChild = false, 
  ...props 
}, ref) => {
  const Comp = asChild ? Slot : "button";
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;

  return (
    <Comp
      className={cn("btn", variantClass, sizeClass, className)}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };