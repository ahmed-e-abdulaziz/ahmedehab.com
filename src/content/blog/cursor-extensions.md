---
title: 'Building and Installing VS Code Extensions in Cursor'
excerpt: 'How to compile VS Code extensions from source and install them in Cursor when they are not available in the marketplace.'
publishDate: 'Feb 16 2026'
isFeatured: true
tags:
  - Cursor
  - VS Code
  - Developer Tools
  - Productivity
seo:
  image:
    src: '/cursor-extensions-hero.webp'
    alt: Repeating Black windows withing gray borders
---

![Repeating Black windows withing gray borders](/cursor-extensions-hero.webp)

While working with Cursor, I discovered a serious limitation to what Cursor can do.

Cursor allows the installation of VS Code extensions, but not every extension in VS Code is available directly within Cursor's marketplace.
This is mainly because Cursor was separated from VS Code some time ago, which created compatibility issues with certain extensions.

Since it was not easily accessible or compatible through standard installation methods, I looked into building the extension from source and installing it manually.

I faced this problem while trying to install the `pgFormatter` extension. Which I will use as an example.

---

## Why does this happen?

Cursor is built on the VS Code source code, and subsequently, its extension ecosystem. So, that means it supports the same extension packaging format.

However, the reality is some extensions:

- Are not listed in Cursor's marketplace
- Depend on APIs or versions that differ from Cursor

---

## What is VSIX?

VS Code extensions usually are compiled and built as .vsix files. A VSIX file is a packaged bundle that includes:

- Compiled extension code.
- Metadata and dependency information.

---

## Building an Extension from Source

The first step is obtaining the extension source code. In this example, the goal was to build the `pgFormatter` extension locally.

After downloading the extension source (mostly it will be on GitHub), the directory structure looked like this:

```bash
package.json
src/
tsconfig.json
vsc-extension-quickstart.md
```

### Step 1: Install Dependencies

Go to the extension directory and install the required dependencies by running this command:

```bash
npm install
```

### Step 2: Package the Extension

Once the installation finishes, package the extension into a VSIX file using the VS Code Extension CLI tool.
Run the following command to do this:

```bash
npx vsce package
```

If the process completes successfully, it produces a `.vsix` file similar to: `pgformatter-1.33.0.vsix`

### Step 3: Installing in Cursor

After generating the VSIX file, the extension can be installed easily into Cursor as follows.

**Command Palette Installation:**

1. Open Cursor
2. Open the Command Palette:
   - macOS: `Cmd + Shift + P`
   - Windows/Linux: `Ctrl + Shift + P`
3. Run: `Extensions: Install from VSIX...`
   ![Extensions: Install from VSIX in VS Code's Command Palette](/command-palette.webp)
4. Select the generated `.vsix` file
5. (Optional) If the extension isn't active yet, you can reload Cursor by doing the following action: `Developer: Reload Window`

---

## Practical Considerations

While this method works fine, there are a few things to keep in mind:

### Security Considerations

Installing extensions from source means you are responsible for verifying the code being installed. Reviewing the repository and dependencies is really recommended.
I can't stress this enough, extensions with bad intentions and malicious code can seriously harm or compromise your code base or your system or your users.

### Maintenance

Manually installed extensions do not automatically update. Doing this process again will be necessary when new versions are released.

### Conclusion

Cursor uses the same extension packaging model as VS Code, which means developers can manually compile and install extensions when they can't access the marketplace directly.

By generating a VSIX file from the extension, and then installing it manually, we can keep using important extensions like pgFormatter without getting stuck due to differences in the ecosystem.
