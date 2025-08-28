import React from 'react';
type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;
export const Button: React.FC<Props> = ({ className = '', ...props }) => (
<button className={px-4 py-2 rounded bg-blue-600 text-white } {...props} />
);
