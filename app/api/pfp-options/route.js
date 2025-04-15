import { readdir } from 'fs/promises';
import path from 'path';

export async function GET() {
    try {
        const pfpDirectory = path.join(process.cwd(), 'public', 'pfpOptions');
        const files = await readdir(pfpDirectory);
        return new Response(JSON.stringify(files), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to read profile pictures' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}