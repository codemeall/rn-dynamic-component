require('dotenv/config');

const express = require('express');
const path = require('path');
const fs = require('fs');
const child_process = require('child_process');
const chalk = require('chalk');
const appRootPath = require('app-root-path');

const { ethers } = require('ethers');
const mocks = path.resolve(`${appRootPath}`, '__mocks__');

const serveTranspiledFile = wallet => async (req, res, next) => {
  try {
    const { params } = req;
    const { dynamiccomponent } = params;
    const file = path.resolve(mocks, dynamiccomponent);
    if (!fs.existsSync(file)) {
      throw new Error(`Unable to find ${file}`);
    }
    const src = child_process.execSync(
      `npx babel --presets=@babel/preset-env,@babel/preset-react ${dynamiccomponent}`,
      { cwd: `${mocks}` },
    ).toString();
    const signature = await wallet.signMessage(src);
    return res
      .status(200)
      .set({ 'X-Csrf-Token': signature })
      .send(src);
  } catch (e) {
    return next(e);
  }
};

(async () => {
  const { PORT, SIGNER_MNEMONIC } = process.env;
  const wallet = await ethers.Wallet.fromMnemonic(SIGNER_MNEMONIC);
  await new Promise(
    resolve => express()
      .get('/__mocks__/:dynamiccomponent', serveTranspiledFile(wallet))
      .listen(PORT, resolve),
  );
  console.clear();
  console.log(chalk.white.bold`🕳️ 🐛 dynamiccomponent are being served!`);
  console.log('Note, request latency will be increased since files will be lazily recompiled on every request.');
  console.log(chalk.green.bold`Port: ${PORT}`);
})();
