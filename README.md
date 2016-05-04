![SketchingOn](https://d2v9u84ve25q69.cloudfront.net/SketchingOn@2x.png)


# SketchingOn

SketchingOn is a quick way to share your work in progress to [WorkingOn](https://www.workingon.co). Simply press `cmd + L` to share the selected object.

## Demo
![SketchingOn Example](https://d2v9u84ve25q69.cloudfront.net/sketchingon-example.gif)

## Installation

1. [Download the latest version (SketchingOn.zip)](https://github.com/WorkingOn/SketchingOn/releases/latest)
2. Copy the contents of the ZIP to your plugins folder. If you're using Sketch 3, choose **Plugins › Manage Plugins...**  then click the gear in the lower left corner of the Preference window and click **Show Plugins Folder…** to open it. If you're using Sketch 2, choose **Plugins › Custom Script…**, click the gear icon, and then choose **Open Plugins Folder**.
3. Copy your token from here: [https://www.workingon.co/plugin/sketch](https://www.workingon.co/plugin/sketch?ref=SketchingOn)
4. Open Sketch and click on the **Plugin** menu option
5. Select SketchingOn then **Update API Token**
6. Enter the token and hit **Save**

## Usage

1. Select any object or artboard
2. Hit `cmd + L` and you'll be prompted with "What are you working on?"
3. Hit `Share'
4. Hit 'Yeah' to confirm

## Customizing the keyboard shortcut

If you'd like to use a hotkey other than `cmd + L` you can do so by following these steps:

1. If you're using Sketch 3, choose **Plugins › Reveal Plugins Folder…** to open it. If you're using Sketch 2, choose **Plugins › Custom Script…**, click the gear icon, and then choose **Open Plugins Folder**
2. Open the **SketchingOn** folder
3. Open the **What are you working on?.sketchplugin** file in a text editor
4. Change the first line that says ``// (cmd l)`` here are some examples:
```
// (cmd shift w)
// (ctrl alt cmd w)
// (command option ')
// (command option r)
// (command alt r)
// (ctrl alt command m)
// (ctrl alt 5)
// (ctrl shift 0)
```

Feel free to reach out if you have any questions: hello@workingon.co


## License

The MIT License (MIT)

Copyright (c) 2015 WorkingOn, Inc

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.