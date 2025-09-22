import * as React from "react"
import { cn } from "./utils"
import "./card.css"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("card", className)}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("card-header", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader" // Fixed: Changed from Card.displayName

const CardTitle = React.forwardRef(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("card-title", className)}
    {...props}
  >
    {children || <span className="sr-only">Untitled</span>} {/* Added children and fallback */}
  </h3>
))
CardTitle.displayName = "CardTitle" // Fixed: Changed from Card.displayName

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("card-description", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription" // Fixed: Changed from Card.displayName

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("card-content", className)} {...props} />
))
CardContent.displayName = "CardContent" // Fixed: Changed from Card.displayName

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("card-footer", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter" // Fixed: Changed from Card.displayName

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }