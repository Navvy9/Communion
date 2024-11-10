import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "@/lib/utils";
const Card = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("rounded-xl border border-transparent bg-card text-card-foreground shadow transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-90 card", className), ...props })));
Card.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => (_jsx("h3", { ref: ref, className: cn("font-semibold leading-none tracking-tight", className), ...props })));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => (_jsx("p", { ref: ref, className: cn("text-sm text-muted-foreground", className), ...props })));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("p-6 pt-0", className), ...props })));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("flex items-center p-6 pt-0", className), ...props })));
CardFooter.displayName = "CardFooter";
// Additional styles for border gradient effect
const borderGradientStyles = `
  .card {
    border-width: 3px; /* Adjust the border width as needed */
    border-radius: 1rem; /* Match the border radius of your card */
  }

  .card:hover {
    border-image: linear-gradient(45deg, #6ee7b7, #3b82f6); /* Adjust colors as needed */
    border-image-slice: 1;
  }
`;
// Add the styles directly to a style tag
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = borderGradientStyles;
document.head.appendChild(styleSheet);
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
