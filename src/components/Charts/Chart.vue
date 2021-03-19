<script>
    import { Line } from "vue-chartjs";
    import ChartMethods from "./index.js";
    export default {
        name: "Chart",
        extends: Line,
        data() {
            return {
                allNotes: this.$store.getters.getAllNotes,
                lastEndpoint: 0,
            };
        },
        mounted() {
            ChartMethods.setup(this);
            setInterval(() => {
                if (this.allNotes != this.$store.getters.getAllNotes) {
                    this.allNotes = this.$store.getters.getAllNotes;
                    this.lastEndpoint = this.allNotes;
                    console.log("Changed");
                    ChartMethods.setup(this);
                }
            }, 500);
        },
        computed: {
            chartData() {
                let data = [];
                this.allNotes.forEach((note) => {
                    data.push(note.value);
                });
                return data;
            },
            chartLabels() {
                let labels = [];
                this.allNotes.forEach((note) => {
                    labels.push(note.dateCreated);
                });
                return labels;
            },
        },
    };
</script>
