import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
  strokeWidth?: number | string;
}

const defaultProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const Zap: React.FC<IconProps> = ({ size, className, strokeWidth = 2, ...props }) => (
  <svg
    {...defaultProps}
    width={size || defaultProps.width}
    height={size || defaultProps.height}
    strokeWidth={strokeWidth}
    className={className}
    {...props}
  >
    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
  </svg>
);

export const Star: React.FC<IconProps> = ({ size, className, strokeWidth = 2, fill = 'currentColor', ...props }) => (
  <svg
    {...defaultProps}
    width={size || defaultProps.width}
    height={size || defaultProps.height}
    strokeWidth={strokeWidth}
    fill={fill}
    className={className}
    {...props}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const Sparkles: React.FC<IconProps> = ({ size, className, strokeWidth = 2, ...props }) => (
  <svg
    {...defaultProps}
    width={size || defaultProps.width}
    height={size || defaultProps.height}
    strokeWidth={strokeWidth}
    className={className}
    {...props}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

export const Award: React.FC<IconProps> = ({ size, className, strokeWidth = 2, ...props }) => (
  <svg
    {...defaultProps}
    width={size || defaultProps.width}
    height={size || defaultProps.height}
    strokeWidth={strokeWidth}
    className={className}
    {...props}
  >
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

export const ShieldCheck: React.FC<IconProps> = ({ size, className, strokeWidth = 2, ...props }) => (
  <svg
    {...defaultProps}
    width={size || defaultProps.width}
    height={size || defaultProps.height}
    strokeWidth={strokeWidth}
    className={className}
    {...props}
  >
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const Lock: React.FC<IconProps> = ({ size, className, strokeWidth = 2, ...props }) => (
  <svg
    {...defaultProps}
    width={size || defaultProps.width}
    height={size || defaultProps.height}
    strokeWidth={strokeWidth}
    className={className}
    {...props}
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const Truck: React.FC<IconProps> = ({ size, className, strokeWidth = 2, ...props }) => (
  <svg
    {...defaultProps}
    width={size || defaultProps.width}
    height={size || defaultProps.height}
    strokeWidth={strokeWidth}
    className={className}
    {...props}
  >
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    <circle cx="17" cy="18" r="2" />
    <circle cx="7" cy="18" r="2" />
  </svg>
);

export const ShoppingBag: React.FC<IconProps> = ({ size, className, strokeWidth = 2, ...props }) => (
  <svg
    {...defaultProps}
    width={size || defaultProps.width}
    height={size || defaultProps.height}
    strokeWidth={strokeWidth}
    className={className}
    {...props}
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

export const Check: React.FC<IconProps> = ({ size, className, strokeWidth = 2, ...props }) => (
  <svg
    {...defaultProps}
    width={size || defaultProps.width}
    height={size || defaultProps.height}
    strokeWidth={strokeWidth}
    className={className}
    {...props}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const Search: React.FC<IconProps> = ({ size, className, strokeWidth = 2, ...props }) => (
  <svg
    {...defaultProps}
    width={size || defaultProps.width}
    height={size || defaultProps.height}
    strokeWidth={strokeWidth}
    className={className}
    {...props}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" x2="16.65" y1="21" y2="16.65" />
  </svg>
);

export const MapPin: React.FC<IconProps> = ({ size, className, strokeWidth = 2, ...props }) => (
  <svg
    {...defaultProps}
    width={size || defaultProps.width}
    height={size || defaultProps.height}
    strokeWidth={strokeWidth}
    className={className}
    {...props}
  >
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const ArrowRight: React.FC<IconProps> = ({ size, className, strokeWidth = 2, ...props }) => (
  <svg
    {...defaultProps}
    width={size || defaultProps.width}
    height={size || defaultProps.height}
    strokeWidth={strokeWidth}
    className={className}
    {...props}
  >
    <line x1="5" x2="19" y1="12" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export const Plus: React.FC<IconProps> = ({ size, className, strokeWidth = 2, ...props }) => (
  <svg
    {...defaultProps}
    width={size || defaultProps.width}
    height={size || defaultProps.height}
    strokeWidth={strokeWidth}
    className={className}
    {...props}
  >
    <line x1="12" x2="12" y1="5" y2="19" />
    <line x1="5" x2="19" y1="12" y2="12" />
  </svg>
);

export const X: React.FC<IconProps> = ({ size, className, strokeWidth = 2, ...props }) => (
  <svg
    {...defaultProps}
    width={size || defaultProps.width}
    height={size || defaultProps.height}
    strokeWidth={strokeWidth}
    className={className}
    {...props}
  >
    <line x1="18" x2="6" y1="6" y2="18" />
    <line x1="6" x2="18" y1="6" y2="18" />
  </svg>
);
