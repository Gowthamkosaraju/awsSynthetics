var synthetics = require('Synthetics');
const log = require('SyntheticsLogger');
const flowBuilderBlueprint = async function () {
 let loginUrl = "https://rocketium.com/login";
 let rocketiumFrame
 let page = await synthetics.getPage();
 const username = 'username@gmail.com';
 const password = 'password';
 function delay(time) {
 return new Promise(function(resolve) { 
 setTimeout(resolve, time)
 });
 }
 async function takeScreenShot() {
 try {
 await synthetics.takeScreenshot("input", 'result');
 } catch(ex) {
 synthetics.addExecutionError('Unable to capture screenshot.', ex);
 }
 }
 // Navigate to the initial url
 await synthetics.executeStep('navigateToUrl', async function (timeoutInMillis = 20000) {
 await page.goto(loginUrl);
 takeScreenShot();
 });
 
 await synthetics.executeStep('Login', async function () {
 await page.type("[id='emailId']", username);
 try {
 await synthetics.takeScreenshot("input", 'result');
 } catch(ex) {
 synthetics.addExecutionError('Unable to capture screenshot.', ex);
 }
await page.type("[id='password']", password);
 try {
 await synthetics.takeScreenshot("input", 'result');
 } catch(ex) {
 synthetics.addExecutionError('Unable to capture screenshot.', ex);
 }
await page.waitForSelector("[type='submit']", { timeout: 30000 });
 await page.click("[type='submit']");
 try {
 await synthetics.takeScreenshot("click", 'result');
 } catch(ex) {
 synthetics.addExecutionError('Unable to capture screenshot.', ex);
 }
await Promise.all([
 page.waitForNavigation({ timeout: 30000 }),
 await page.click("[id='one-login']")
 ]);
 try {
 await synthetics.takeScreenshot("redirection", 'result');
 } catch(ex) {
 synthetics.addExecutionError('Unable to capture screenshot.', ex);
 }
 });
};
exports.handler = async () => {
 return await flowBuilderBlueprint();
};
