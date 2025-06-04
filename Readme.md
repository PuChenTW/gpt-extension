# Grammar Checker Chrome Extension

This is a Google Chrome extension that provides a quick and easy way to check the grammar of text on websites. The extension uses OpenAI's ChatGPT language model to analyze the selected text and provide suggestions for improvement.

The extension also uses Google Translate API to translate the text on websites.

## Getting Started

### Prerequisites

To use this extension, you will need a Google Chrome web browser and an OpenAI API key.

You can sign up for an OpenAI API key on the [OpenAI website](https://beta.openai.com/signup/).

### Installing

To install the extension, follow these steps:

1. Download the extension package from the GitHub repository.

2. Unzip the package to a local directory.

3. Run `npm install` inside the `react-app` directory to install the Node dependencies.
4. Open Google Chrome and navigate to the "Extensions" page by entering "chrome://extensions/" in the address bar.

5. Enable "Developer mode" in the top right corner.

6. Click "Load unpacked" button in the top left corner.

7. Select the unzipped directory of the extension.

The extension should now be installed and ready to use.

### Usage
<https://user-images.githubusercontent.com/11731323/230857781-0c60a2a6-6556-4504-b007-87180861c732.mov>

### Settings

To set your OpenAI API key, go to the extension's option page and enter your key in the designated field. You can also change the ChatGPT language model version in the options page.

## Built With

- OpenAI API
- Google Translate API
- JavaScript

## Development Instructions

To set up the development environment, follow these steps:

1. Navigate to the `react-app` directory:

   ```bash
   cd react-app
   ```

2. Install the dependencies:

   ```bash
   yarn install
   ```

3. Start the development build process (this will watch for changes and rebuild):

   ```bash
   yarn run build
   ```
