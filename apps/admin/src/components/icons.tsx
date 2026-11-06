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

export const Palette: React.FC<IconProps> = ({ size, className, strokeWidth = 2, ...props }) => (
  <svg
    {...defaultProps}
    width={size || defaultProps.width}
    height={size || defaultProps.height}
    strokeWidth={strokeWidth}
    className={className}
    {...props}
  >
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
);

export const Tag: React.FC<IconProps> = ({ size, className, strokeWidth = 2, ...props }) => (
  <svg
    {...defaultProps}
    width={size || defaultProps.width}
    height={size || defaultProps.height}
    strokeWidth={strokeWidth}
    className={className}
    {...props}
  >
    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
    <path d="M7 7h.01" />
  </svg>
);

export const Eye: React.FC<IconProps> = ({ size, className, strokeWidth = 2, ...props }) => (
  <svg
    {...defaultProps}
    width={size || defaultProps.width}
    height={size || defaultProps.height}
    strokeWidth={strokeWidth}
    className={className}
    {...props}
  >
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

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

export const Sun: React.FC<IconProps> = ({ size, className, strokeWidth = 2, ...props }) => (
  <svg
    {...defaultProps}
    width={size || defaultProps.width}
    height={size || defaultProps.height}
    strokeWidth={strokeWidth}
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

export const Leaf: React.FC<IconProps> = ({ size, className, strokeWidth = 2, ...props }) => (
  <svg
    {...defaultProps}
    width={size || defaultProps.width}
    height={size || defaultProps.height}
    strokeWidth={strokeWidth}
    className={className}
    {...props}
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

export const Shield: React.FC<IconProps> = ({ size, className, strokeWidth = 2, ...props }) => (
  <svg
    {...defaultProps}
    width={size || defaultProps.width}
    height={size || defaultProps.height}
    strokeWidth={strokeWidth}
    className={className}
    {...props}
  >
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  </svg>
);

export const AlertCircle: React.FC<IconProps> = ({ size, className, strokeWidth = 2, ...props }) => (
  <svg
    {...defaultProps}
    width={size || defaultProps.width}
    height={size || defaultProps.height}
    strokeWidth={strokeWidth}
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
);

export const AlertTriangle: React.FC<IconProps> = ({ size, className, strokeWidth = 2, ...props }) => (
  <svg
    {...defaultProps}
    width={size || defaultProps.width}
    height={size || defaultProps.height}
    strokeWidth={strokeWidth}
    className={className}
    {...props}
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" x2="12" y1="9" y2="13" />
    <line x1="12" x2="12.01" y1="17" y2="17" />
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

export const ExternalLink: React.FC<IconProps> = ({ size, className, strokeWidth = 2, ...props }) => (
  <svg
    {...defaultProps}
    width={size || defaultProps.width}
    height={size || defaultProps.height}
    strokeWidth={strokeWidth}
    className={className}
    {...props}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" x2="21" y1="14" y2="3" />
  </svg>
);
