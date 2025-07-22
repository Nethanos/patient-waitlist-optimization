import path from 'path';
import fs from 'fs';
import geolib from 'geolib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.resolve(__dirname, '../be-engineer-take-home-sample-data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

let maxDistance = 0;
let pair = null;

for (let i = 0; i < data.length; i++) {
  const locA = data[i].location;
  if (!locA || locA.latitude == null || locA.longitude == null) continue;
  const latA = parseFloat(locA.latitude);
  const lonA = parseFloat(locA.longitude);
  for (let j = i + 1; j < data.length; j++) {
    const locB = data[j].location;
    if (!locB || locB.latitude == null || locB.longitude == null) continue;
    const latB = parseFloat(locB.latitude);
    const lonB = parseFloat(locB.longitude);
    const dist = geolib.getDistance(
      { latitude: latA, longitude: lonA },
      { latitude: latB, longitude: lonB }
    );
    if (dist > maxDistance) {
      maxDistance = dist;
      pair = [data[i], data[j]];
    }
  }
}

console.log('Max distance (kilometers):', (maxDistance / 1000).toFixed(2));
if (pair) {
  console.log('Between:');
  console.log(pair[0].name, pair[0].location);
  console.log(pair[1].name, pair[1].location);
}

// Find patients without behavioral data
function printPatientsWithoutBehavioralData() {
  const noBehavioral = data.filter(
    (p) =>
      p.acceptedOffers == undefined &&
      p.canceledOffers == undefined &&
      p.averageReplyTime == undefined
  );
  console.log('Patients without behavioral data:', noBehavioral.length);
  noBehavioral.forEach((p) => {
    console.log(`${p.name} (${p.id})`, p.location);
  });
}

printPatientsWithoutBehavioralData();
