import { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function Settings() {
const [key, setKey] = useState('');
useEffect(() => { setKey(localStorage.getItem('api_key') || ''); }, []);
const save = () => { localStorage.setItem('api_key', key); };
return (
<div className='p-4'>
<Card>
<p className='mb-2'>API Key</p>
<input className='border p-2 mr-2' value={key} onChange={(e) => setKey(e.target.value)} />
<Button onClick={save}>Save</Button>
</Card>
</div>
);
}
