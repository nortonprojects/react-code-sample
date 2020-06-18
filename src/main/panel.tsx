import React from 'react';

export default function Panel(props: {colSpan: number, children: any, style?: any}) {
  return (
    <div style={props.style} className={`bg-palette-white rounded-lg p-6 shadow-md col-span-${props.colSpan}`}>
      {props.children}
    </div>
  );
}
