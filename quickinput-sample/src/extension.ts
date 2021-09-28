/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { window, commands, ExtensionContext } from 'vscode';
import { showQuickPick, showInputBox } from './basicInput';
import { multiStepInput } from './multiStepInput';
import { quickOpen } from './quickOpen';

export function activate(context: ExtensionContext) {
	context.subscriptions.push(commands.registerCommand('samples.quickInput', async () => {
		const options: { [key: string]: (context: ExtensionContext) => Promise<void> } = {
			showQuickPick,
			showInputBox,
			multiStepInput,
			quickOpen,
		};
		const quickPick = window.createQuickPick();
		quickPick.items = Object.keys(options).map(label => ({ label }));
		quickPick.value = 'Initial value';
		quickPick.onDidChangeSelection(([selection]) => {
			window.showInformationMessage(`Your selection was: ${selection && selection.label}`);
		});
		quickPick.onDidAccept(() => {
			window.showInformationMessage(`You entered: ${quickPick.value}`);
			quickPick.dispose();
		});
		quickPick.onDidHide(() => quickPick.dispose());
		quickPick.show();
	}));
}
