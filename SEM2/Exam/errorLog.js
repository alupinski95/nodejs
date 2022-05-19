const params = require("../../ExamTasks/Task5/paramChech");
const writeToFile = require("../../ExamTasks/Task6/writeToFile");

const paramValidator = [{ name: "debug", required: false }];
const fileName = "api.log";

let isDebugMode = false;

const logCallbackMiddleware = (req, res, next) => {
	if (isDebugMode) {
		logCallbackToFile(
			`Method ${req.method} URL ${req.originalUrl} Date: ${req.Date}`
		);
	}
	next();
};

function checkEntryParams() {
	let validateParams = params.checkEntryParams(process.argv, paramValidator);
	if (!validateParams) {
		logError("Something go wrong with parameters.");
		return;
	}
	if (validateParams[0]) {
		isDebugMode = true;
	}
}
function logCallbackToFile(dataToSave) {
	writeToFile.writeDataToFile(fileName, dataToSave + "\n");
}
function logError(error) {
	if (isDebugMode) {
		writeToFile.writeDataToFile(fileName, error + "\n");
	} else {
		console.log(error);
	}
}

module.exports = {
	logCallbackToFile: logCallbackToFile,
	logError: logError,
	checkEntryParams: checkEntryParams,
	errorMiddleware: logCallbackMiddleware,
};
