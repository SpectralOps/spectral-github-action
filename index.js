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
    const scanType = core.getInput('scan-type')
    const spectralArgs = core.getInput('spectral-args')
    switch (scanType.toLowerCase()) {
        case 'ci':
            return `${process.platform === 'win32' ? 'spectral.exe scan' : 'spectral scan'} ${spectralArgs}`
        case 'audit':
            if (process.platform === win32) {
                return `spectral.exe ${spectralArgs}`
            }
            else {
                return `spectral ${spectralArgs}`
            }
        default:
            throw new Error(`Unknown scan type: ${scanType}`);
    }
}