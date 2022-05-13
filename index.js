const core = require('@actions/core');
const io = require('@actions/io');
const tc = require('@actions/tool-cache');
const exec = require("@actions/exec").exec;

const workspace = process.env.GITHUB_WORKSPACE;
const spectralDsn = core.getInput('spectral-dsn')
const binDir = `${workspace}/bin`;

main().catch(error => {
    core.setFailed(error)
})

async function main() {
    switch (process.platform) {
        case 'win32':
            await installExecutable(binDir)
            break;
        case 'linux':
            await installZip(binDir, process.platform)
            break;
        case 'darwin':
            await installZip(binDir, 'mac')
            break;
        default:
            throw new Error(`Platform: ${process.platform} is not supported`);
    }

    await core.addPath(binDir)
    await runSpectral()
}

async function downloadTool(platform) {
    const url = `${spectralDsn}/latest/dl/${platform}`
    return await tc.downloadTool(url);
}

async function installZip(path, platform) {
    await io.mkdirP(path);
    const downloadPath = await downloadTool(platform)
    await tc.extractTar(downloadPath, path)
}

async function installExecutable(path) {
    await io.mkdirP(path);
    const downloadPath = await downloadTool('exe')
    await io.mv(downloadPath, `${path}/spectral.exe`)
}

async function runSpectral() {
    const scanCommand = getScanCommand()
    await exec(scanCommand)
}

function getScanCommand() {
    const spectralArgs = core.getInput('spectral-args')
    return `${process.platform === 'win32' ? 'spectral.exe' : 'spectral'} ${spectralArgs}`
}