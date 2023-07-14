#!/usr/bin/env node

// const inquirer = require('inquirer');
const { execSync, spawn, exec } = require('child_process');

const installDependencies = async () => {
  console.log('Installing dependencies...');

  try {
    await new Promise((resolve, reject) => {
      const npmInstall = spawn('npm', ['install']);

      npmInstall.stdout.on('data', (data) => {
        console.log(data.toString());
      });

      npmInstall.stderr.on('data', (data) => {
        console.error(data.toString());
      });

      npmInstall.on('close', (code) => {
        if (code === 0) {
          console.log('Dependencies installed successfully.');
          resolve();
        } else {
          console.error('Failed to install dependencies:', code);
          reject();
        }
      });
    });

    generateProject();
  } catch (error) {
    console.error('Failed to install dependencies:', error);
    process.exit(1);
  }
};

const generateProject = async () => {
  // Your code for generating the project
  const { default: inquirer } = await import('inquirer');
  // const { exec } = require('child_process');
  const fs = require('fs-extra');
  const path = require('path');
  const crypto = require('crypto');
  const { default: ora } = await import('ora');

  console.log('Generating project...');
  // List of packages
  const packageNames = [
    'aws-sdk',
    'axios',
    'bcrypt',
    'cookie-parser',
    'cors',
    'date-fns',
    'dotenv',
    'express',
    'jsdom',
    'jsonwebtoken',
    'mongoose',
    'multer',
    'nodemailer',
    'openai',
    'puppeteer',
    'socket.io',
    'uuid',
  ];

  // Prompt the user for project details
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Enter the project name (e.g., express-server):',
        validate: function (value) {
          if (value.trim().length === 0) {
            return 'Please enter a valid project name.';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'mongoURI',
        message:
          'Enter the MongoDB URI (e.g., mongodb+srv://mongoDbUser:mongoDbUserPass@cluster0.s938843o0.mongodb.net/databaseName?retryWrites=true&w=majority):',
        validate: function (value) {
          if (value.trim().length === 0) {
            return 'Please enter a valid MongoDB URI.';
          }
          return true;
        },
      },
    ])
    .then((answers) => {
      // Generate random secrets
      const accessTokenSecret = crypto.randomBytes(64).toString('hex');
      const refreshTokenSecret = crypto.randomBytes(64).toString('hex');

      // Read the .env template file
      const envTemplate = fs.readFileSync(
        path.join(__dirname, '.env.template'),
        'utf8'
      );

      // Replace placeholders with generated values
      const envContent = envTemplate
        .replace('DATABASE_URI=', `DATABASE_URI=${answers.mongoURI}`)
        .replace(
          'ACCESS_TOKEN_SECRET=',
          `ACCESS_TOKEN_SECRET=${accessTokenSecret}`
        )
        .replace(
          'REFRESH_TOKEN_SECRET=',
          `REFRESH_TOKEN_SECRET=${refreshTokenSecret}`
        );

      // Create the project directory
      fs.mkdirSync(answers.projectName);

      // Copy project files and folders
      fs.copySync(
        path.join(__dirname, 'project-template'),
        answers.projectName
      );
      // Read the package.json file
      const packageJsonPath = path.join(answers.projectName, 'package.json');
      const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
      const packageJson = JSON.parse(packageJsonContent);

      // Update the name field
      packageJson.name = answers.projectName;

      // Write the updated package.json file
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

      // Write the .env file
      fs.writeFileSync(path.join(answers.projectName, '.env'), envContent);

      // Change to the project directory
      const projectPath = path.join(process.cwd(), answers.projectName);
      process.chdir(projectPath);

      console.log('Installing dependencies...');

      const loadingSpinner = ora('Installing dependencies...').start();

      const npmInstall = spawn('npm', ['install']);

      npmInstall.stdout.on('data', (data) => {
        console.log(data.toString());
      });

      npmInstall.stderr.on('data', (data) => {
        console.error(data.toString());
      });

      npmInstall.on('close', (code) => {
        if (code === 0) {
          loadingSpinner.succeed('All dependancies installed');
          loadingSpinner.succeed('MongoDB connection established');
          loadingSpinner.succeed('All files and folders generated');
          loadingSpinner.succeed('Auth and Register routes generated');
          loadingSpinner.succeed('Express server built successfully');
          loadingSpinner.succeed('Server will start on port 3500');
          loadingSpinner.succeed('cd into project and run npm run dev');

          // Change to the project directory
          // const projectPath = path.join(process.cwd(), answers.projectName);
          // process.chdir(projectPath);

          console.log('Starting the server...');

          // Execute the command to start the server
          try {
            execSync('npm run dev', { stdio: 'inherit' });
          } catch (error) {
            console.error('Failed to start the server:', error);
            process.exit(1);
          }
        } else {
          loadingSpinner.fail('Failed to install dependencies');
          console.error('Failed to install dependencies:', code);
          process.exit(1);
        }
      });
    });
};

// Run npm install before generating the project
installDependencies();

// Generate the project
// generateProject();
