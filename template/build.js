const fs = require('fs-extra');

const sourceDirStandalone = '.next/standalone';
const targetDirStandalone = 'dist';
const sourceDirStatic = '.next/static';
const targetDirStatic = 'dist/.next/static';
const sourceDirPublic = 'public';
const targetDirPublic = 'dist/public';
const cacheDir = 'dist/.next/cache';
const fetchCacheDir = 'dist/.next/cache/fetch-cache';
const newRelicFile = 'newrelic.js';
const targetNewRelicFile = 'dist/newrelic.js';
const sourceDirScript = 'apm';
const targetDirScript = 'dist/apm';

async function build() {
  try {
    await fs.ensureDir(cacheDir);
    console.log(`Cache: ${cacheDir} directory created successfully.`);
    await fs.ensureDir(fetchCacheDir);
    console.log(`Fetch Cache: ${fetchCacheDir} directory created successfully.`);
    await fs.copy(sourceDirStandalone, targetDirStandalone, { overwrite: true, dot: true });
    console.log(`Build: ${sourceDirStandalone} is copied to ${targetDirStandalone} successfully.`);
    await fs.copy(sourceDirStatic, targetDirStatic, { overwrite: true, dot: true });
    console.log(`Static Resources: ${sourceDirStatic} is copied to ${targetDirStatic} successfully.`);
    await fs.copy(sourceDirPublic, targetDirPublic, { overwrite: true, dot: true });
    console.log(`Public: ${sourceDirPublic} is copied to ${targetDirPublic} successfully.`);
    await fs.copy(newRelicFile, targetNewRelicFile, { overwrite: true, dot: true });
    console.log(`NewRelic config: ${newRelicFile} is copied to ${targetNewRelicFile} successfully.`);
    await fs.copy(sourceDirScript, targetDirScript, { overwrite: true, dot: true });
    console.log(`Monitoring scripts: ${sourceDirScript} is copied to ${targetDirScript} successfully.`);
  } catch (err) {
    console.error('Error copying files:', err);
  }
}

build();