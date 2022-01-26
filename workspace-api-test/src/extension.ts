// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.commands.registerCommand('workspace-api-test.log-current-trust', () => {
		const message = `This workspace ${vscode.workspace.isTrusted ? 'is' : 'is NOT'} trusted.`;
		vscode.window.showInformationMessage(message);
	}));
	context.subscriptions.push(vscode.commands.registerCommand('workspace-api-test.request-trust', () => {
		vscode.workspace.requestWorkspaceTrust({ message: 'To see if the API works.' });
	}));
	context.subscriptions.push(vscode.workspace.onDidGrantWorkspaceTrust(() => {
		vscode.window.showInformationMessage('Workspace trust has been granted!');
	}));
}

// this method is called when your extension is deactivated
export function deactivate() { }
