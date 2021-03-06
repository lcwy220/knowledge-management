/**
 * Created by Administrator on 2016/11/25.
 */
~function(){
    // 路径配置
    require.config({
        paths: {
            echarts: 'http://echarts.baidu.com/build/dist'
        }
    });
    //第一个图表
    require(
        [
            'echarts',
            'echarts/chart/force' // 使用柱状图就加载bar模块，按需加载
        ],
        function (ec) {
            // 基于准备好的dom，初始化echarts图表
            var myChart = ec.init(document.getElementById('complex'));

            var option = {
                // title : {
                //     text: '人物关系：乔布斯',
                //     subtext: '数据来自人立方',
                //     x:'right',
                //     y:'bottom'
                // },
                tooltip : {
                    trigger: 'item',
                    formatter: '{a} : {b}'
                },
                legend: {
                    x: 'left',
                    data:['家人','朋友']
                },
                series : [
                    {
                        type:'force',
                        name : "人物关系",
                        ribbonType: false,
                        categories : [
                            {
                                name: '人物'
                            },
                            {
                                name: '家人'
                            },
                            {
                                name:'朋友'
                            }
                        ],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#333'
                                    }
                                },
                                nodeStyle : {
                                    brushType : 'both',
                                    borderColor : 'rgba(255,215,0,0.4)',
                                    borderWidth : 1
                                },
                                linkStyle: {
                                    type: 'curve'
                                }
                            },
                            emphasis: {
                                label: {
                                    show: false
                                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                                },
                                nodeStyle : {
                                    //r: 30
                                },
                                linkStyle : {}
                            }
                        },
                        useWorker: false,
                        minRadius : 15,
                        maxRadius : 25,
                        gravity: 1.1,
                        scaling: 1.1,
                        roam: 'move',
                        nodes:[
                            {category:0, name: '乔布斯', value : 10, label: '乔布斯\n（主要）'},
                            {category:1, name: '丽萨-乔布斯',value : 2},
                            {category:1, name: '保罗-乔布斯',value : 3},
                        ],
                        links : [
                            {source : '丽萨-乔布斯', target : '乔布斯', weight : 1, name: '女儿'},
                            {source : '保罗-乔布斯', target : '乔布斯', weight : 2, name: '父亲'},
                            {source : '克拉拉-乔布斯', target : '乔布斯', weight : 1, name: '母亲'},
                        ]
                    }
                ]
            };
            var ecConfig = require('echarts/config');
            function focus(param) {
                var data = param.data;
                var links = option.series[0].links;
                var nodes = option.series[0].nodes;
                if (
                    data.source !== undefined
                    && data.target !== undefined
                ) { //点击的是边
                    var sourceNode = nodes.filter(function (n) {return n.name == data.source})[0];
                    var targetNode = nodes.filter(function (n) {return n.name == data.target})[0];
                    console.log("选中了边 " + sourceNode.name + ' -> ' + targetNode.name + ' (' + data.weight + ')');
                } else { // 点击的是点
                    console.log("选中了" + data.name + '(' + data.value + ')');
                }
            }
            myChart.on(ecConfig.EVENT.CLICK, focus);

            myChart.on(ecConfig.EVENT.FORCE_LAYOUT_END, function () {
                // console.log(myChart.chart.force.getPosition());
            });

            // 为echarts对象加载数据
            myChart.setOption(option);
        }
    );
}();