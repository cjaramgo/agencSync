const fs = require('fs');
const path = require('path');

module.exports = async () => {
  const statePath = path.resolve(__dirname, '../../storageState.json');

  if (fs.existsSync(statePath)) {
    fs.unlinkSync(statePath);
    console.log('🧹 storageState.json has been deleted after tests.');
  } else {
    console.log('ℹ️ storageState.json was not found. Nothing to clean.');
  }
};