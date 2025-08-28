import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export default function AI() {
const [name, setName] = useState('');
return (
<div className='p-4'>
<Card>
<p className='mb-2'>Company Name</p>
<input className='border p-2 mr-2' value={name} onChange={(e) => setName(e.target.value)} placeholder='Company name' />
<Button>Save</Button>
</Card>
</div>
);
}
