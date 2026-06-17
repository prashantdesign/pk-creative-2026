import React from 'react';

const iconComponents: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  figma: (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M15 3.75H9C6.10051 3.75 3.75 6.10051 3.75 9V15C3.75 17.8995 6.10051 20.25 9 20.25H15C17.8995 20.25 20.25 17.8995 20.25 15V9C20.25 6.10051 17.8995 3.75 15 3.75Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9.375 16.125C10.8449 16.125 12 14.97 12 13.5C12 12.03 10.8449 10.875 9.375 10.875C7.90508 10.875 6.75 12.03 6.75 13.5C6.75 14.97 7.90508 16.125 9.375 16.125Z" fill="currentColor"/>
      <path d="M9.375 9.375C10.8449 9.375 12 8.22492 12 6.75C12 5.27508 10.8449 4.125 9.375 4.125C7.90508 4.125 6.75 5.27508 6.75 6.75C6.75 8.22492 7.90508 9.375 9.375 9.375Z" fill="currentColor"/>
      <path d="M14.625 9.375C16.0949 9.375 17.25 8.22492 17.25 6.75C17.25 5.27508 16.0949 4.125 14.625 4.125C13.1551 4.125 12 5.27508 12 6.75C12 8.22492 13.1551 9.375 14.625 9.375Z" fill="currentColor"/>
      <path d="M14.625 16.125C16.0949 16.125 17.25 14.97 17.25 13.5C17.25 12.03 16.0949 10.875 14.625 10.875C13.1551 10.875 12 12.03 12 13.5C12 14.97 13.1551 16.125 14.625 16.125Z" fill="currentColor"/>
      <path d="M9.375 12C10.8449 12 12 10.8449 12 9.375V6.75C12 5.27508 10.8449 4.125 9.375 4.125C7.90508 4.125 6.75 5.27508 6.75 6.75V9.375C6.75 10.8449 7.90508 12 9.375 12Z" fill="currentColor"/>
    </svg>
  ),
  photoshop: (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M21 4H3C2.44772 4 2 4.44772 2 5V19C2 19.5523 2.44772 20 3 20H21C21.5523 20 22 19.5523 22 19V5C22 4.44772 21.5523 4 21 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.5 14.5H10.5C11.6046 14.5 12.5 13.6046 12.5 12.5V11.5C12.5 10.3954 11.6046 9.5 10.5 9.5H8.5V14.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.5 9.5L14 14.5L17 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  illustrator: (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M21 4H3C2.44772 4 2 4.44772 2 5V19C2 19.5523 2.44772 20 3 20H21C21.5523 20 22 19.5523 22 19V5C22 4.44772 21.5523 4 21 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 9.5L8.5 14.5H11.5L10 9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 14.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.5 14.5H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'after-effects': (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M21 4H3C2.44772 4 2 4.44772 2 5V19C2 19.5523 2.44772 20 3 20H21C21.5523 20 22 19.5523 22 19V5C22 4.44772 21.5523 4 21 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.5 14.5L7 9.5L10 9.5L11.5 14.5M15.5 14.5C16.6046 14.5 17.5 13.6046 17.5 12.5C17.5 11.3954 16.6046 10.5 15.5 10.5H14V14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  spline: (props) => (
     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 8C14.9391 8 13.9217 8.42143 13.1716 9.17157C12.4214 9.92172 12 10.9391 12 12C12 13.0609 11.5786 14.0783 10.8284 14.8284C10.0783 15.5786 9.06087 16 8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
};

export const Icons = ({ name, ...props }: { name: string } & React.SVGProps<SVGSVGElement>) => {
  const IconComponent = iconComponents[name.toLowerCase()];
  return IconComponent ? <IconComponent {...props} /> : null;
};
