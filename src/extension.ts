// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { spawn } from 'child_process';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('runDH14', () => {
		console.log("Running syslog")

        const faradayToolsPath = vscode.workspace.getConfiguration().get('faradayToolsPath', 'python');

		const pythonProcess = spawn(faradayToolsPath + '/s.sh', []);
        pythonProcess.stdout.on('data', (data) => {
            // Process the data received from the Python tool
            const output = data.toString();
            // Display the output in VSCode
            vscode.window.showInformationMessage(output);
        });

        pythonProcess.stderr.on('data', (data) => {
            // Handle any error output from the Python tool
            console.error(`stderr: ${data}`);
        });

        pythonProcess.on('close', (code) => {
            // Handle the close event
            console.log(`child process exited with code ${code}`);
        });
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
