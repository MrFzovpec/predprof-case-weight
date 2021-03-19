import zoom from "chartjs-plugin-zoom";
export default {

    setup(context) {
        context.addPlugin(zoom);
        context.renderChart({
            datasets: [{
                backgroundColor: "rgba(54, 162, 235, 0.3)",
                borderColor: "#36a2eb",
                label: "Масса пользователя, кг",
                data: context.chartData,
            }, ],
            labels: context.chartLabels,


        }, {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            responsive: true,
            maintainAspectRatio: false,

        }, );
    },
}