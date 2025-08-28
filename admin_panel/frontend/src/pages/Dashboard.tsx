import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { apiFetch } from '../lib/fetch';

export default function Dashboard() {
const [pingResult, setPingResult] = useState('');
const handlePing = async () => {
try { const res = await apiFetch('http://127.0.0.1:7070/health'); setPingResult(JSON.stringify(res)); }
catch { setPingResult('error'); }
};
return (
<div className='p-4 grid gap-4'>
<Card>
<p className='mb-2'>Ping</p>
<Button onClick={handlePing}>Ping Backend</Button>
{pingResult && <p className='mt-2'>{pingResult}</p>}
</Card>
<Card>STT placeholder</Card>
<Card>TTS placeholder</Card>
<Card>Ask placeholder</Card>
</div>
);
}
