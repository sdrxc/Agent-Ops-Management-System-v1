// Cost Over Time Chart Data
export const costOverTimeData = {
  tooltip: {
    trigger: "axis",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderColor: "#e5e7eb",
    borderWidth: 1,
    textStyle: {
      color: "#374151",
    },
  },
  legend: {
    data: ["Cost", "Forecast"],
    bottom: 0,
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "10%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [
      "2025-01-01",
      "2025-01-02",
      "2025-01-03",
      "2025-01-04",
      "2025-01-05",
      "2025-01-06",
      "2025-01-07",
    ],
  },
  yAxis: {
    type: "value",
    axisLabel: {
      formatter: "₹{value}",
    },
  },
  series: [
    {
      name: "Cost",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        color: "#3b82f6",
      },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(59, 130, 246, 0.3)",
            },
            {
              offset: 1,
              color: "rgba(59, 130, 246, 0.1)",
            },
          ],
        },
      },
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: "Forecast",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        color: "#f59e0b",
        type: "dashed",
      },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(245, 158, 11, 0.2)",
            },
            {
              offset: 1,
              color: "rgba(245, 158, 11, 0.05)",
            },
          ],
        },
      },
      data: [220, 182, 191, 234, 290, 330, 310],
    },
  ],
};

// Stacked Cost by Entity Data
export const stackedCostData = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
    },
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderColor: "#e5e7eb",
    borderWidth: 1,
  },
  legend: {
    data: ["Agent", "Tool", "Server"],
    bottom: 0,
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "10%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: [
        "2025-01-01",
        "2025-01-02",
        "2025-01-03",
        "2025-01-04",
        "2025-01-05",
        "2025-01-06",
        "2025-01-07",
      ],
    },
  ],
  yAxis: [
    {
      type: "value",
      axisLabel: {
        formatter: "₹{value}",
      },
    },
  ],
  series: [
    {
      name: "Agent",
      type: "line",
      stack: "Total",
      smooth: true,
      areaStyle: {
        color: "#3b82f6",
      },
      emphasis: {
        focus: "series",
      },
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: "Tool",
      type: "line",
      stack: "Total",
      smooth: true,
      areaStyle: {
        color: "#f59e0b",
      },
      emphasis: {
        focus: "series",
      },
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: "Server",
      type: "line",
      stack: "Total",
      smooth: true,
      areaStyle: {
        color: "#10b981",
      },
      emphasis: {
        focus: "series",
      },
      data: [150, 232, 201, 154, 190, 330, 410],
    },
  ],
};

// Cost by Entity Bar Chart Data
export const costByEntityData = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderColor: "#e5e7eb",
    borderWidth: 1,
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: ["Agent A", "Agent B", "Tool X", "Tool Y", "Server 1"],
    axisTick: {
      alignWithLabel: true,
    },
  },
  yAxis: {
    type: "value",
    axisLabel: {
      formatter: "₹{value}",
    },
  },
  series: [
    {
      name: "Cost",
      type: "bar",
      barWidth: "60%",
      data: [
        { value: 300, itemStyle: { color: "#3b82f6" } },
        { value: 300, itemStyle: { color: "#3b82f6" } },
        { value: 200, itemStyle: { color: "#f59e0b" } },
        { value: 199, itemStyle: { color: "#f59e0b" } },
        { value: 100, itemStyle: { color: "#10b981" } },
      ],
    },
  ],
};

// Cost Split Donut Chart Data
export const costSplitData = {
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b}: ₹{c} ({d}%)",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderColor: "#e5e7eb",
    borderWidth: 1,
  },
  legend: {
    bottom: 0,
    left: "center",
  },
  series: [
    {
      name: "Cost Distribution",
      type: "pie",
      radius: ["50%", "70%"],
      center: ["50%", "45%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 20,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 600, name: "Agent", itemStyle: { color: "#3b82f6" } },
        { value: 400, name: "Tool", itemStyle: { color: "#f59e0b" } },
        { value: 200, name: "Server", itemStyle: { color: "#10b981" } },
      ],
    },
  ],
};

// Usage Heatmap Data
export const usageHeatmapData = {
  tooltip: {
    position: "top",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderColor: "#e5e7eb",
    borderWidth: 1,
  },
  grid: {
    height: "50%",
    top: "10%",
  },
  xAxis: {
    type: "category",
    data: [
      "12a",
      "1a",
      "2a",
      "3a",
      "4a",
      "5a",
      "6a",
      "7a",
      "8a",
      "9a",
      "10a",
      "11a",
      "12p",
      "1p",
      "2p",
      "3p",
      "4p",
      "5p",
      "6p",
      "7p",
      "8p",
      "9p",
      "10p",
      "11p",
    ],
    splitArea: {
      show: true,
    },
  },
  yAxis: {
    type: "category",
    data: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    splitArea: {
      show: true,
    },
  },
  visualMap: {
    min: 0,
    max: 10,
    calculable: true,
    orient: "horizontal",
    left: "center",
    bottom: "15%",
    inRange: {
      color: ["#e0f2fe", "#0369a1"],
    },
  },
  series: [
    {
      name: "Usage Intensity",
      type: "heatmap",
      data: generateHeatmapData(),
      label: {
        show: true,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};

// Generate random heatmap data
function generateHeatmapData() {
  const data = [];
  const hours = [
    "12a",
    "1a",
    "2a",
    "3a",
    "4a",
    "5a",
    "6a",
    "7a",
    "8a",
    "9a",
    "10a",
    "11a",
    "12p",
    "1p",
    "2p",
    "3p",
    "4p",
    "5p",
    "6p",
    "7p",
    "8p",
    "9p",
    "10p",
    "11p",
  ];
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  for (let i = 0; i < days.length; i++) {
    for (let j = 0; j < hours.length; j++) {
      // Simulate higher usage during business hours (8a-6p) on weekdays
      let value = Math.floor(Math.random() * 3);
      if (i < 5 && j >= 8 && j <= 18) {
        // Weekdays, business hours
        value = Math.floor(Math.random() * 7) + 4;
      }
      data.push([j, i, value]);
    }
  }
  return data;
}

// Real-time metrics data for the incident reporting charts
export const errorTrendsData = {
  tooltip: {
    trigger: "axis",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderColor: "#e5e7eb",
    borderWidth: 1,
  },
  legend: {
    data: ["Errors", "Warnings", "Critical"],
    bottom: 0,
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "10%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "Errors",
      type: "line",
      smooth: true,
      lineStyle: { color: "#f59e0b" },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(245, 158, 11, 0.3)" },
            { offset: 1, color: "rgba(245, 158, 11, 0.1)" },
          ],
        },
      },
      data: [5, 8, 12, 25, 45, 35, 20],
    },
    {
      name: "Warnings",
      type: "line",
      smooth: true,
      lineStyle: { color: "#eab308" },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(234, 179, 8, 0.3)" },
            { offset: 1, color: "rgba(234, 179, 8, 0.1)" },
          ],
        },
      },
      data: [2, 5, 8, 15, 28, 22, 12],
    },
    {
      name: "Critical",
      type: "line",
      smooth: true,
      lineStyle: { color: "#ef4444" },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(239, 68, 68, 0.3)" },
            { offset: 1, color: "rgba(239, 68, 68, 0.1)" },
          ],
        },
      },
      data: [0, 1, 2, 8, 15, 12, 5],
    },
  ],
};
