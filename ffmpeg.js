const { spawn } = require('child_process')
const ffmpegBin = process.env.BIN
const ffmpegArgs = process.env.ARGS
const run = ({ ffmpegExe = ffmpegBin, ffmpegArgs }) => {
    console.log(`Command: ${ffmpegExe} ${ffmpegArgs}`)
    ffmpegArgs = ffmpegArgs.split(' ') > 1 ? [ffmpegArgs] : ffmpegArgs.split(' ')
    //console.log(ffmpegArgs)
    let ffmpeg = spawn(ffmpegExe, ffmpegArgs);
    //ffmpeg.stdout.pipe(process.stdout);
    ffmpeg.stderr.on('data', (data) => {
        //console.error(`stderr: ${data}`);
    });
    ffmpeg.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
    return ffmpeg
}
module.exports = { run, ffmpegArgs };