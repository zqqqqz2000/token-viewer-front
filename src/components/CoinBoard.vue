<template>
  <div>
    <b-card
        tag="article"
        style="max-width: 20rem;"
        class="coin-card"
        @click="() => {
          this.show = !this.show;
          if (this.show) {
            this.drawLine();
          }
        }"
    >
      <b-card-title>
        <div>
          {{ coinName }}
          <b-badge style="float: right">
            {{ changeUsd1h }}
          </b-badge>
        </div>
      </b-card-title>
      <b-card-text>
        <div>
          当前价格
          <div class="fr" style="color: red">{{ priceUsd }} usd</div>
        </div>
        <div>
          24h涨幅
          <div class="fr">{{ changeUsd24h }} usd</div>
        </div>
        <div>
          流通量
          <div class="fr">{{ circulatingSupply }} usd</div>
        </div>
      </b-card-text>
    </b-card>
    <b-modal
        v-model="show"
        size="lg"
        :title="this.coinName + '走势'"
        header-bg-variant="dark"
        header-text-variant="light"
        body-bg-variant="dark"
        body-text-variant="light"
        footer-bg-variant="dark"
    >
      <v-chart class="chart" :option="option"/>
    </b-modal>
  </div>
</template>

<script>
import "echarts";
import {use} from "echarts/core";
import {CanvasRenderer} from "echarts/renderers";
import {LineChart} from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart, {THEME_KEY} from "vue-echarts";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

export default {
  name: "CoinBoard",
  provide: {
    [THEME_KEY]: "dark"
  },
  mounted() {
    this.getData();
    this.clock = setInterval(this.getData, 100000);
  },
  beforeDestroy() {
    clearInterval(this.clock);
  },
  components: {
    VChart
  },
  props: ["coin-name"],
  data() {
    return {
      priceUsd: "-",
      changeUsd1h: "-",
      changeUsd24h: "-",
      circulatingSupply: "-",
      show: false,
      clock: 0,
      option: {
        xAxis: [{
          name: 'time',
          data: [],
          type: 'category',
        }],
        legend: {
          data: ['price']
        },
        yAxis: {
          type: 'value',
        },
        series: [{
          name: 'price',
          data: [],
          type: 'line'
        }]
      }
    }
  },
  methods: {
    getData() {
      this.axios.get('http://127.0.0.1:5000/get_token_info/' + this.coinName).then((response) => {
        let data = response.data;
        this.priceUsd = data.priceUsd;
        this.changeUsd1h = data.changeUsd1h;
        this.changeUsd24h = data.changeUsd24h;
        this.circulatingSupply = data.circulatingSupply;
      });
    },
    drawLine() {
      this.axios.get('http://127.0.0.1:5000/get_token_infos/' + this.coinName).then((response) => {
        let data = response.data;
        this.option.series[0].data = [];
        this.option.xAxis[0].data = [];
        eval(data).filter((x) => {
          return !!x;
        }).map((x) => {
          let time, value;
          for (let item in x) {
            time = item;
            value = x[time];
          }
          this.option.series[0].data.push(value);
          this.option.xAxis[0].data.push(time);
        });
        console.log(this.option.series[0].data);
      });
    }
  }
}
</script>

<style scoped>
.coin-card {
  background-color: #0f121f;
  color: white;
  border: #0f121f 2px solid;
  transition: .3s;
  cursor: pointer;
}

.coin-card:hover {
  border: dodgerblue 2px solid;
}

.fr {
  display: inline-block;
  float: right;
}

.chart {
  height: 500px;
}

</style>
