import React from 'react';
type Props = React.HTMLAttributes<HTMLDivElement>;
export const Card: React.FC<Props> = ({ className = '', ...props }) => (

<div className={order rounded p-4 bg-white shadow } {...props} /> ); "@
W "C:\Users\kenan\Documents\GitHub\hotel-assistant\AI_Kiosk_Project\admin_panel\frontend\src\lib\fetch.ts" @"
export async function apiFetch(url: string, options?: RequestInit) {
const res = await fetch(url, options);
if (!res.ok) throw new Error('Network error');
return res.json();
}
