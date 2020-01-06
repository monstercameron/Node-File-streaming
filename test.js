const { spawn } = require('child_process')
const ffmpeg = `./ffmpeg`
const ffmpegFlags = `-f avfoundation -framerate 30 -video_size 640x480 -i "0:none" -t 3600 -y pipe:1`
const testArgs = `-f avfoundation -list_devices true -i `
let ls;

ls = spawn(ffmpeg, ffmpegFlags.split(' '))
console.log(`Command: ${ffmpeg} ${ffmpegFlags}`)
ls.stdout.pipe(process.stdout)

// ls.stdout.on('data', (data) => {
//     console.log(`stdout: ${data}`);
// });

ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });