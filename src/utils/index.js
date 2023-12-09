import FileSaver from 'file-saver';

import { surpriseMePrompts } from '../constants';
import { download } from '../assets/index-11410b7';

export function getRandomPrompt(prompt)
{
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length );
    const randomPrompt = surpriseMePrompts[randomIndex];


    if (randomPrompt=== prompt) return getRandomPrompt(prompt);

    return randomPrompt;
}

export async function downloadImage(_id, photo){
 FileSaver.saveAs(photo, `download-${_id}.jpg`);
}