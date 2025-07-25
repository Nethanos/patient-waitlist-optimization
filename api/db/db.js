import fs from 'fs';
import path from 'path';
import process from 'process';

const sampleDataPath = path.resolve(process.cwd(), './db/be-engineer-take-home-sample-data.json');
const useCasesPath = path.resolve(process.cwd(), './db/use-cases.json');

export function getSamplePatients() {
  const fileContent = fs.readFileSync(sampleDataPath, 'utf-8');
  return JSON.parse(fileContent);
}

export function getUseCases() {
  const fileContent = fs.readFileSync(useCasesPath, 'utf-8');
  return JSON.parse(fileContent);
}
