// Compute intensities
const angles = Array(360)
  .fill()
  .map((_, i) => i);

const spinUp = angles
  .map((deg) => (deg * 2 * Math.PI) / 360)
  .map((rad) => Math.cos(rad / 2) ** 2);

const spinDown = spinUp.map((x) => 1 - x);

const canvas = document.getElementById("sg-double-chart");
Chart.defaults.color = "#000";

const chart = new Chart(canvas, {
  type: "line",
  data: {
    datasets: [
      {
        label: "Intenzita horní tečky",
        data: angles.map((i) => ({ x: i, y: spinUp[i] })),
        fill: false,
        borderColor: "hsl(130, 50%, 50%)",
      },
      {
        label: "Intenzita dolní tečky",
        data: angles.map((i) => ({ x: i, y: spinDown[i] })),
        fill: false,
        borderColor: "hsl(190, 50%, 50%)",
      },
    ],
  },
  options: {
    elements: {
      point: {
        pointStyle: false,
      },
    },
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        min: 0,
        max: 360,
      },
    },
  },
});
