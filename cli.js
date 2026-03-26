#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function promptUser() {
  return new Promise((resolve) => {
    rl.question('App name (microservice name in Cloud ex: country-demo-enterprise-app)? ', (appName) => {
      rl.question('CICD Repo URL? (CICD git URL ex: git@menterprise-cicd.git) ', (cicdRepoUrl) => {
        resolve({ appName, cicdRepoUrl });
        rl.close();
      });
    });
  });
}

async function copyDirectory(source, destination, vars) {
  // Create destination if it doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  // Read source directory
  const entries = fs.readdirSync(source, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const destPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      // Recursively copy directory
      await copyDirectory(sourcePath, destPath, vars);
    } else {
      // Copy file
      const content = fs.readFileSync(sourcePath, 'utf8');

      // Files that need variable replacement
      const filesToProcess = [
        'package.json',
        'package-lock.json',
        '.env',
        'next.config.ts',
        'image-loader.js'
      ];

      // Process all files in cicd directory - use platform-independent path checking
      const normalizedPath = sourcePath.replace(/\\/g, '/');  // Convert Windows backslashes to forward slashes
      const isCicdFile = normalizedPath.includes('/cicd/') && entry.name.endsWith('.Jenkinsfile');

      // Check if this file needs variable replacement
      if (filesToProcess.includes(entry.name) || isCicdFile) {
        console.log(`Processing template variables in: ${destPath}`);
        let processedContent = content
          .replace(/\{\{appName\}\}/g, vars.appName)
          .replace(/\{\{cicdRepoUrl\}\}/g, vars.cicdRepoUrl);

        // Verify replacement happened if expected
        if (content.includes('{{appName}}') && !processedContent.includes('{{appName}}')) {
          console.log(`  ✓ Replaced {{appName}} with ${vars.appName}`);
        }
        if (content.includes('{{cicdRepoUrl}}') && !processedContent.includes('{{cicdRepoUrl}}')) {
          console.log(`  ✓ Replaced {{cicdRepoUrl}} with ${vars.cicdRepoUrl}`);
        }

        fs.writeFileSync(destPath, processedContent);
      } else {
        // Copy file as-is without any processing
        fs.copyFileSync(sourcePath, destPath);
      }
    }
  }
}

async function main() {
  try {
    console.log('Creating a new Next.js MUX app...');
    const vars = await promptUser();

    const templateDir = path.resolve(__dirname, 'template');
    const destDir = path.resolve(process.cwd(), vars.appName);

    console.log(`Creating project in ${destDir}...`);

    if (fs.existsSync(destDir)) {
      console.error(`Error: Directory ${vars.appName} already exists.`);
      process.exit(1);
    }

    await copyDirectory(templateDir, destDir, vars);

    // Run npm install with optimizations
    console.log('\nInstalling dependencies...');
    try {
      process.chdir(destDir);

      // Use npm ci for faster installation with package-lock.json
      console.log('Using package-lock.json for faster installation...');
      execSync('npm ci --no-audit --no-fund', { stdio: 'inherit' });

      console.log('\n ✅ Dependencies installed successfully!');
    } catch (error) {
      console.error('\n ❌ Failed to install dependencies:', error.message);
      console.log('Please run "npm install" manually after navigating to your project directory.');
    }

    console.log('\nSuccess! Your Enterprise Next.js Mux app is ready.');
    console.log('\nInside that directory, you can run several commands:');
    console.log('\n  npm run dev');
    console.log('    Starts the development server');
    console.log('\n  npm run build:prod');
    console.log('    Builds the app for production');
    console.log('\n  npm start');
    console.log('    Runs the built app in production mode');

    console.log('\n ⚠️  IMPORTANT REMINDER:');
    console.log('   - Do NOT commit your .env.local file to version control');
    console.log('   - Check your .gitignore file to ensure it includes .env.local');
    console.log('   - Sensitive credentials should be stored securely, not in code');

    console.log('\nWe suggest that you begin by typing:');
    console.log(`\n  cd ${vars.appName}`);
    console.log('  npm run dev');

  } catch (error) {
    console.error('Error creating project:', error);
    process.exit(1);
  }
}

main();
