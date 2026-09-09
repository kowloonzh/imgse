// 数据源：data/cross_etf_scout.sqlite / daily_quotes
// 标的：SH513310 中韩半导体ETF华泰柏瑞
// 查询区间：2026-08-09 至 2026-09-09
// 实际数据：2026-08-10 至 2026-09-09，共 23 个交易日
// 数值单位：%
option = {
  title: {
    text: '中韩半导体ETF近一个月溢价率',
    subtext: 'SH513310 | 2026-08-10 至 2026-09-09'
  },
  tooltip: {
    trigger: 'axis',
    valueFormatter: function (value) {
      return Number(value).toFixed(2) + '%';
    }
  },
  grid: {
    left: 60,
    right: 32,
    top: 85,
    bottom: 60
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    name: '日期',
    data: [
      '2026-08-10',
      '2026-08-11',
      '2026-08-12',
      '2026-08-13',
      '2026-08-14',
      '2026-08-17',
      '2026-08-18',
      '2026-08-19',
      '2026-08-20',
      '2026-08-21',
      '2026-08-24',
      '2026-08-25',
      '2026-08-26',
      '2026-08-27',
      '2026-08-28',
      '2026-08-31',
      '2026-09-01',
      '2026-09-02',
      '2026-09-03',
      '2026-09-04',
      '2026-09-07',
      '2026-09-08',
      '2026-09-09'
    ],
    axisLabel: {
      rotate: 45
    }
  },
  yAxis: {
    type: 'value',
    name: '溢价率（%）',
    scale: true,
    axisLabel: {
      formatter: '{value}%'
    },
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  series: [
    {
      name: '溢价率',
      type: 'line',
      smooth: true,
      showSymbol: true,
      symbol: 'circle',
      symbolSize: 7,
      data: [
        16.29,
        15.71,
        14.18,
        13.23,
        11.70,
        13.74,
        11.03,
        11.12,
        9.99,
        11.09,
        10.52,
        10.99,
        10.90,
        10.03,
        10.14,
        9.44,
        9.89,
        9.57,
        9.97,
        9.15,
        8.79,
        10.09,
        9.12
      ],
      lineStyle: {
        width: 3,
        color: '#5470c6'
      },
      itemStyle: {
        color: '#5470c6'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(84, 112, 198, 0.35)' },
            { offset: 1, color: 'rgba(84, 112, 198, 0.03)' }
          ]
        }
      },
      markPoint: {
        data: [
          { type: 'max', name: '最高' },
          { type: 'min', name: '最低' }
        ]
      },
      markLine: {
        symbol: 'none',
        data: [
          { type: 'average', name: '平均值' }
        ]
      }
    }
  ]
};
