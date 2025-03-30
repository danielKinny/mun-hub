import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { Speech } from '@/app/db/types';

export async function POST(request: Request) {
    try {
        const { title, content, speechID } = await request.json();
        const newSpeech: Speech = { speechID, title, content };
        const dataFilePath = path.join(process.cwd(), 'app/db/data.json');

        let data;
        try {
            const fileContent = readFileSync(dataFilePath, 'utf-8');
            data = JSON.parse(fileContent);
        } catch (readError: any) {
            if (readError.code === 'ENOENT') {
                data = { speeches: [] };
            } else if (readError instanceof SyntaxError) {
                return new NextResponse(JSON.stringify({ message: 'Error parsing JSON in data.json' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
            } else {
                return new NextResponse(JSON.stringify({ message: 'Error reading data.json' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
            }
            if (!data) {
                return new NextResponse(JSON.stringify({ message: 'Data is undefined' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
            }
        }

        if (!data.speeches) {
            data.speeches = [];
        }
        data.speeches.push(newSpeech);

        writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

        return new NextResponse(JSON.stringify({ message: 'Speech added successfully', speech: newSpeech }), { status: 201, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        return new NextResponse(JSON.stringify({ message: 'Error adding speech' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
