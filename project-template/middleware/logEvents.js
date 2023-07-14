const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, filePath) => {
  const dateTime = `${format(new Date(), 'yyyy-MM-dd	HH:mm:ss')}`;
  const logItem = `${dateTime}	${uuid()}	${message}`;
  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, 'logs'));
    }
    await fsPromises.appendFile(
      path.join(__dirname, '..', 'logs', filePath),
      logItem + '\n',
      'utf-8'
    );
  } catch (error) {
    console.error(error);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
  next();
};

module.exports = { logEvents, logger };