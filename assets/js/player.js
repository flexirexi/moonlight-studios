var fileInput = document.getElementById("mp3-input"),
	playPauseBtn = document.getElementById("play-pause-btn"),
	stopBtn = document.getElementById("stop-btn");

fileInput.addEventListener("input", addDataAndRender);
playPauseBtn.addEventListener("click", togglePlaying);
stopBtn.addEventListener("click", stopPlaying);

var chart,
	audioContext,
	source,
	buttonStatus = false;

async function addDataAndRender() {
	let file = await fileInput.files[0];
	if (file) {
		chart.title.set("text", "Loading File...");

		let margin = 10,
			chunkSize = 500,
			height = chart.get("height"),
			scaleFactor = (height - margin * 2) / 2;

		audioContext = new AudioContext();

		let buffer = await file.arrayBuffer(),
			audioBuffer = await audioContext.decodeAudioData(buffer),
			float32Array = audioBuffer.getChannelData(0);

		let array = [],
			i = 0,
			length = float32Array.length;

		while (i < length) {
			array.push(
				float32Array.slice(i, (i += chunkSize)).reduce(function (total, value) {
					return Math.max(total, Math.abs(value));
				})
			);
		}
		let dps = [];
		for (let index in array) {
			dps.push({
				x: margin + Number(index),
				y: [
					height / 2 - array[index] * scaleFactor,
					height / 2 + array[index] * scaleFactor
				]
			});
		}
		chart.options.data[0].dataPoints = dps;
		chart.options.title.text = file.name;

		chart.axisY[0].set("minimum", 0, false);
		chart.axisY[0].set("maximum", dps[0].y[0] * 2, false);
		chart.axisX[0].addTo("stripLines", {
			startValue: 0,
			endValue: 0,
			showOnTop: true,
			color: "#fff",
			opacity: 0.7
		});

		source = audioContext.createBufferSource();
		source.buffer = audioBuffer;
		source.loop = false;
		source.connect(audioContext.destination);

		source.start();

		source.onended = () => {
			chart.axisX[0].stripLines[0].set("endValue", chart.axisX[0].get("maximum"));
			clearInterval(intervalId);
		};
		intervalId = setInterval(() => {
			chart.axisX[0].stripLines[0].set(
				"endValue",
				audioContext.currentTime *
					(chart.data[0].dataPoints.length / audioBuffer.duration)
			);
		}, 50);
	}
}

function togglePlaying(e) {
	if (audioContext) {
		if (audioContext.state === "running") {
			audioContext.suspend().then(() => {
				playPauseBtn.classList.toggle("is-play");
			});
		} else if (audioContext.state === "suspended") {
			audioContext.resume().then(() => {
				playPauseBtn.classList.toggle("is-play");
			});
		}
	}
}

function stopPlaying() {
	source.stop();
}


	chart = new CanvasJS.Chart("wave-chart", {
		title: {
			text: "Load MP3 File",
			fontFamily: "Trebuchet MS, Helvetica, sans-serif",
			dockInsidePlotArea: true,
			verticalAlign: "center"
		},
		axisX: {
			tickLength: 0,
			lineThickness: 0,
			labelFontSize: 0,
			labelFormatter: function (e) {
				return "";
			}
		},
		axisY: {
			tickLength: 0,
			lineThickness: 0,
			gridThickness: 0,
			labelFontSize: 0,
			labelFormatter: function (e) {
				return "";
			}
		},
		data: [
			{
				type: "rangeArea",
				toolTipContent: null,
				highlightEnabled: false,
				color: "#ff6862",
				dataPoints: []
			}
		]
	});
	chart.render();