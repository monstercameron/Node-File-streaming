module.exports = {
    play: `
<div>Video Stream Tester</div></p>
<div><a href='/stream'>stream</a> | <a href='/play'>play</a></div></p>
<div>
    <video id="videoPlayer" controls>
        <source src="http://localhost:3000/file" type="video/mp4">
    </video>
</div>
`,
    stream: `
<div>Video Stream Tester</div></p>
<div><a href='/stream'>stream</a> | <a href='/play'>play</a></div></p>
<div>
    <video id="videoPlayer" controls autoplay>
        <source src="http://localhost:3000/pipe" type="video/mp4">
    </video>
</div>
`}