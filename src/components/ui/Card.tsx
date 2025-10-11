import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    children, 
    padding = 'md',
    shadow = 'md',
    rounded = 'lg',
    border = false,
    hover = false,
    ...props 
  }, ref) => {
    const baseStyles = "bg-white transition-all duration-200";
    
    const paddings = {
      sm: "p-4",
      md: "p-6",
      lg: "p-8"
    };
    
    const shadows = {
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl"
    };
    
    const roundings = {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl"
    };

    return (
      <div
        className={cn(
          baseStyles,
          paddings[padding],
          shadows[shadow],
          roundings[rounded],
          border && "border border-gray-200",
          hover && "hover:shadow-lg hover:-translate-y-1",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

// Subcomponentes para mejor composición
const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mb-4", className)}
      {...props}
    >
      {children}
    </div>
  )
);
CardHeader.displayName = "CardHeader";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("", className)}
      {...props}
    >
      {children}
    </div>
  )
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mt-4 pt-4 border-t border-gray-100", className)}
      {...props}
    >
      {children}
    </div>
  )
);
CardFooter.displayName = "CardFooter";

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-xl font-semibold text-gray-900 mb-2", className)}
      {...props}
    >
      {children}
    </h3>
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-gray-600 text-sm", className)}
      {...props}
    >
      {children}
    </p>
  )
);
CardDescription.displayName = "CardDescription";

export { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription };
export default Card; 