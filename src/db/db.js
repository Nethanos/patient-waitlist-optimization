import fs from 'fs';
import path from 'path';
import process from 'process';

const dataPath = path.resolve(process.cwd(), 'be-engineer-take-home-sample-data.json');

export function getSamplePatients() {
  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(fileContent);
}
