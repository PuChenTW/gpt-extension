# Grammar Checker Chrome Extension
This is a Google Chrome extension that provides a quick and easy way to check the grammar of text on websites. The extension uses OpenAI's ChatGPT language model to analyze the selected text and provide suggestions for improvement.

## Getting Started
### Prerequisites
To use this extension, you will need a Google Chrome web browser and an OpenAI API key.

You can sign up for an OpenAI API key on the [OpenAI website](https://beta.openai.com/signup/).

### Installing
To install the extension, follow these steps:

1. Download the extension package from the GitHub repository.

2. Unzip the package to a local directory.

3. Open Google Chrome and navigate to the "Extensions" page by entering "chrome://extensions/" in the address bar.

4. Enable "Developer mode" in the top right corner.

5. Click "Load unpacked" button in the top left corner.

6. Select the unzipped directory of the extension.

The extension should now be installed and ready to use.

### Usage
To use the extension, simply select the text you wish to check on any website. A little icon will appear next to the selected text. Click on the icon to open a dialog with two buttons: "Grammar" and "Translate".

Clicking on "Grammar" will send the selected text to the OpenAI API to check for grammar errors. The corrected sentence and suggestions will be displayed in the dialog.

Clicking on "Translate" will send the selected text to the Google Translate API and display the translated text in the dialog.

To set your OpenAI API key, go to the extension's option page and enter your key in the designated field.

## Built With
 - OpenAI API
 - Google Translate API
 - JavaScript