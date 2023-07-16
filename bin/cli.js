#!/usr/bin/env node

const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

console.log('Generating project...');

// Get the project name from the command line arguments
const projectName = process.argv[2];

// Clone the project template from GitHub
console.log('Cloning project template...');
const cloneCommand = `git clone https://github.com/Jibrilkala/create-mongo-express ${projectName}`;
try {
  execSync(cloneCommand);
} catch (error) {
  console.error('Failed to clone project template:', error);
  process.exit(1);
}

// Change to the project directory
process.chdir(projectName);

// Run npm install
console.log('Installing dependencies...');
const npmInstall = spawnSync('npm', ['install']);

if (npmInstall.status === 0) {
  console.log('Dependencies installed successfully.');

  // Ask for the MongoDB URI
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter the MongoDB URI: ', (mongoURI) => {
    rl.close();

    // Update the .env file with the MongoDB URI
    const envPath = path.join(process.cwd(), '.env');
    fs.appendFileSync(envPath, `\nDATABASE_URI=${mongoURI}`);

    console.log('Project generated successfully.');
  });
} else {
  console.error('Failed to install dependencies:', npmInstall.error);
  process.exit(1);
}
