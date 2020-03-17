var items = document.getElementsByClassName('img');
var goprebtn = document.getElementById('gopre');
var gonextbtn = document.getElementById('gonext');
var points = document.getElementsByClassName('point');

var index = 0;
var time = 0;

var clearActive = function(){
	for (var i = 0; i < items.length; i++) {
		items[i].className = "img";
	}
	for (var i = 0; i < points.length; i++) {
		points[i].className = "point";
	}
}

var goIndex = function(){
	clearActive();
	points[index].className = "point active";
	items[index].className = "img active";
}

var goNext = function(){
	if(index < items.length-1){
		index++;
	}else{
		index=0;
	}
	goIndex();
}

var goPre = function(){
	if(index == 0){
		index = items.length-1
	}else{
		index--
	}
	goIndex();
}

gonextbtn.addEventListener('click',function(){
	goNext();
	time = 0;
})

goprebtn.addEventListener('click',function(){
	goPre();
	time = 0;
})

for(var i =0; i < points.length; i++) {
	points[i].addEventListener('click',function(){
		var pointIndex = this.getAttribute('date-index');
		index = pointIndex;
		goIndex();
		time = 0;
	})
}

var intervalDom= setInterval(function() {
	time++;
	if(time == 50){
		goNext();
		time = 0;
	}
}, 20)


function stop(){
	clearInterval(intervalDom);
}

function start(){     
    intervalDom = setInterval(function() {
	time++;
	if(time == 50){
		goNext();
		time = 0;
	}
},20);
}

/////////////////////////////Echarts曲线图/////////////////////////////

var myChart = echarts.init(document.getElementById('line-three'), 'walden');
myChart.showLoading();

// 异步加载数据
$.get("https://edu.telking.com/api/?type=week", function(data) {
    myChart.hideLoading();
    myChart.setOption({
        title: {
            text: ''
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: data.data.xAxis
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            barWidth: '50%',
            data: data.data.series
        }]
    });
});


///////////////////////////////饼状图///////////////////////////////////
var myChart_pie = echarts.init(document.getElementById('line-two'))

$.get("https://edu.telking.com/api/?type=week", function(data) {
    //console.log(data.data.series.length);
    var res = [];
    for(var i = 0; i < data.data.series.length; i++) {
        res.push({
            name:data.data.xAxis[i],
            value:data.data.series[i]
            });
    }
    //console.log(res)
    myChart_pie.setOption({
        series: {
            type: 'pie',
            data: res
        },
        title: {
            text: ''
        }
    });
});

///////////////////////////////////////////////////////////////////////

var myChart_line = echarts.init(document.getElementById('line'));

$.get("https://edu.telking.com/api/?type=month", function(data) {
    //console.log(data.data);
    myChart_line.hideLoading();
    myChart_line.setOption({
        title:{
            text:''
        },
        tooltip:{},
        legend:{
            data:['访客']
        },
        xAxis:{
            data:data.data.xAxis
        },
        yAxis:{
        },
        series:[{
            name:'人数',
            type:'line',
            lineStyle:{
                normal: {color: '#0000ff'}
            },
            areaStyle: {
                normal: {color: '#80ffc0'}
            },
            smooth:true,
            itemStyle : { normal: {label : {show: true}}},
            data:data.data.series
        }]
    });

});

