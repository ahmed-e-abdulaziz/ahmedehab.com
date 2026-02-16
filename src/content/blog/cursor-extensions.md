---
title: 'Building and Installing VS Code Extensions in Cursor'
excerpt: 'How to compile VS Code extensions from source and install them in Cursor when they are not available in the marketplace.'
publishDate: 'Feb 16 2026'
isFeatured: true
tags: - Cursor
      - VS Code
      - Developer Tools
      - Productivity
---

![Repeating Black windows withing gray borders](/cursor-extensions-hero.webp)

While working with Cursor, I discovered a limitation that is easy to miss. Cursor allows the installation of VS Code extensions, but not every extension in VS Code is available directly within Cursor's marketplace.
This is mainly because Cursor separated from VS Code some time ago, which created compatibility issues with certain extensions.

I faced this problem while trying to install the `pgFormatter` extension. In my experience, it is the best SQL formatter available. Since it was not easily accessible or compatible through standard installation methods, I looked into building the extension from source and installing it manually.

This post explains that process.

---

## Why even do this?

Cursor is built on the VS Code extension ecosystem, which means it supports the same extension packaging format.

In theory, this lets most extensions work easily.

In practice, however, some extensions:

- Are not listed in Cursor's marketplace
- Depend on APIs or versions that differ from Cursor
- Require manual installation When this occurs, installing the extension directly from the source becomes a practical and reliable solution.

---

## What is VSIX?

VS Code extensions usually are built as .vsix files. A VSIX file is a packaged bundle that includes:

- Compiled extension code.
- Metadata describing activation and features.
- Dependency information Cursor can install `.vsix` files.

This lets developers manually compile and install extensions when they cannot use the marketplace.

---

## Building an Extension from Source

The first step is obtaining the extension source code. In this example, the goal was to build the `pgFormatter` extension locally.

After downloading the extension source, the directory structure looked like this:

```bash
package.json
src/
tsconfig.json
vsc-extension-quickstart.md
```

This indicates that the extension is written in TypeScript and must be compiled before packaging.

---

## Step 1: Install Dependencies

Navigate to the extension directory and install the required dependencies:

```bash
npm install
```

---

## Step 2: Package the Extension

Once compilation completes successfully, the extension can be packaged into a VSIX file using the VS Code Extension CLI tool.

Run:

```bash
npx vsce package
```

If the process completes successfully, it produces a `.vsix` file similar to: `pgformatter-1.33.0.vsix`

This file is the installable extension bundle.

---

## Step 3: Installing in Cursor

After generating the VSIX file, the extension can be installed easily into Cursor as follows.

### Command Palette Installation

1. Open Cursor
2. Open the Command Palette:
   - macOS: `Cmd + Shift + P`
   - Windows/Linux: `Ctrl + Shift + P`
3. Run: `Extensions: Install from VSIX...`
   ![Extensions: Install from VSIX in VS Code's Command Palette](/command-palette.webp)
4. Select the generated `.vsix` file

If the extension isn't active after installation, reloading Cursor typically resolves the issue by doing the following action: `Developer: Reload Window`

---

## When Should You Use This Approach?

Compiling extensions from source can be really handy in a few situations:

- When the extension you need isn't available in Cursor's marketplace or you ran into issues installing it
- When you want to fork and tweak or take a closer look at how an extension works

---

## Practical Considerations

While this method is reliable, there are a few things to keep in mind:

### Security Considerations

Installing extensions from source means you are responsible for verifying the code being installed. Reviewing the repository and dependencies is really recommended.

### Maintenance

Manually installed extensions do not automatically update. Doing this process again will be necessary when new versions are released.

### Conclusion

Cursor uses the same extension packaging model as VS Code, which means developers can manually compile and install extensions when they can't access the marketplace directly.

By installing the necessary dependencies, compiling the extension, packaging it into a VSIX file, and then installing it manually, we can keep using important tools like pgFormatter without getting stuck due to differences in the ecosystem.
