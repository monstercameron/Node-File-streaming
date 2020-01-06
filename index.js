require('dotenv').config()
const fs = require('fs')
const chalk = require('chalk')
const player = require('./player')
const { run, ffmpegArgs } = require('./ffmpeg')
const app = require('express')();
app
    .get('/', (req, res) => {
        res.send(player.play)
    })
    .get('/play', (req, res) => {
        res.send(player.play)
    })
    .get('/stream', (req, res) => {
        res.send(player.stream)
    })
    .get('/file', (req, res) => {
        const path = 'videos/bannerlord.mp4'
        const stat = fs.statSync(path)
        const fileSize = stat.size
        const range = req.headers.range
        if (range) {
            const parts = range.replace(/bytes=/, "").split("-")
            const start = parseInt(parts[0], 10)
            const end = parts[1]
                ? parseInt(parts[1], 10)
                : fileSize - 1
            const chunksize = (end - start) + 1
            const file = fs.createReadStream(path, { start, end })
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            }
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            }
            res.writeHead(200, head)
            fs.createReadStream(path).pipe(res)
        }
    })
    .get('/pipe', (req, res) => {
        console.log(`Streaming ffmpeg output`)
        const args = ffmpegArgs
        const results = run({ ffmpegArgs: args })
        res.on("close", () => {
            console.log('res closed')
            results.kill('SIGKILL')
        });
        results.stdout.pipe(res)
    })
const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started on port:${process.env.PORT}`)
});