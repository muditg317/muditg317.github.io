import { REDIRECTS } from '../src/data/urls/redirects';
// const REDIRECTS = require('../src/data/urls').REDIRECTS;

REDIRECTS.forEach(redirect => {
  console.log(`${redirect.title}: ${redirect.aliases} -> ${redirect.target}`);
});

export {}