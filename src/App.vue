<template>
  <div>
    <div class="header">
      <hheader></hheader>
    </div>
    <div style="width: 100vw; display: flex; justify-content:center;margin-top: 10px">
      <div class="main-container">
        <div class="block">
          <h4>
            热门币种
          </h4>
          <coin-board class="coin" coin-name="btc"/>
          <coin-board class="coin" coin-name="eth"/>
          <coin-board class="coin" coin-name="eos"/>
          <coin-board class="coin" coin-name="polkadot"/>
        </div>
        <div class="block">
          <h4>
            BTC链上查询
          </h4>
          <b-input-group prepend="账号地址" class="mt-3">
            <b-form-input></b-form-input>
            <b-input-group-append>
              <b-button variant="outline-success">记录地址</b-button>
              <b-button variant="info">查询余额</b-button>
            </b-input-group-append>
          </b-input-group>
        </div>
        <div class="block">
          <h4>
            自选币种查询
          </h4>
          <div>
            <b-card title="币名称" sub-title="自选币">
              <b-card-text>
                简介
              </b-card-text>
              <a href="#" class="card-link">查看详情</a>
            </b-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CoinBoard from "./components/CoinBoard";
import Header from "./components/Header";

export default {
  name: 'App',
  components: {
    "coin-board": CoinBoard,
    "hheader": Header,
  }
}
</script>

<style>
html {
  margin: 0 !important;
  padding: 0 !important;
}

body {
  margin: 0 !important;
  padding: 0 !important;
}

.coin {
  margin: 10px 10px 10px 0;
  display: inline-block;
  width: 300px;
}

.main-container {
  width: calc(310px * 4);
  min-width: calc(310px * 4);
}

.block {
  margin-bottom: 40px;
}
</style>
