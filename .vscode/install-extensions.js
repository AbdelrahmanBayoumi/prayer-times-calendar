const fs = require('fs');
const { execSync } = require('child_process');

const EXTENSIONS_FILE = '.vscode/extensions.json';
const TAG = '[Recommended VS Code Extensions Helper]';

// Read the list of recommended extensions from the file
function readRecommendedExtensions() {
  if (fs.existsSync(EXTENSIONS_FILE)) {
    const content = fs.readFileSync(EXTENSIONS_FILE, 'utf8');
    return JSON.parse(content).recommendations || [];
  } else {
    console.error('No extensions.json file found.');
    return [];
  }
}

// Get the list of currently installed extensions
function getInstalledExtensions() {
  try {
    const installed = execSync('code --list-extensions').toString();
    return installed.split('\n').filter(Boolean); // Split by new line and filter out empty strings
  } catch (error) {
    console.error('Error listing installed extensions:', error.message);
    return [];
  }
}

// Install an extension using the VSCode CLI
function installExtension(extension) {
  try {
    console.log(`Installing: ${extension}`);
    execSync(`code --install-extension ${extension}`);
  } catch (error) {
    console.error(`Failed to install ${extension}:`, error.message);
  }
}

function main() {
  console.log(`======== ${TAG} Starting ========`);
  const recommendedExtensions = readRecommendedExtensions();
  const installedExtensions = getInstalledExtensions();
  const notInstalledExtensions = recommendedExtensions.filter(
    (extension) => !installedExtensions.includes(extension),
  );
  notInstalledExtensions.forEach((extension) => installExtension(extension));
  console.log(`Installed ${notInstalledExtensions.length} extensions.`);
  console.log(`======== ${TAG} Finished ========`);
}
main();
