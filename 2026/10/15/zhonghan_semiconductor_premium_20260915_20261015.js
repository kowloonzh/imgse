// 数据源：data/cross_etf_scout.sqlite / daily_quotes
// 标的：SH513310 中韩半导体ETF华泰柏瑞
// 查询区间：2026-09-15 至 2026-10-15
// 实际数据：2026-09-15 至 2026-10-15，共 17 个交易日
// 数值单位：%
option = {
  title: {
    text: '中韩半导体ETF近一个月溢价率',
    subtext: 'SH513310 | 2026-09-15 至 2026-10-15'
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
      '2026-09-15',
      '2026-09-16',
      '2026-09-17',
      '2026-09-18',
      '2026-09-21',
      '2026-09-22',
      '2026-09-23',
      '2026-09-24',
      '2026-09-28',
      '2026-09-29',
      '2026-09-30',
      '2026-10-08',
      '2026-10-09',
      '2026-10-12',
      '2026-10-13',
      '2026-10-14',
      '2026-10-15'
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
        9.90,
        8.79,
        9.33,
        8.13,
        7.79,
        6.46,
        6.23,
        4.61,
        6.06,
        5.09,
        5.59,
        3.12,
        3.20,
        0.86,
        1.66,
        0.78,
        -2.49
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
