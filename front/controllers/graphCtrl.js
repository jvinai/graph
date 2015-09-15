angular.module("graph").controller('graphCtrl', function ($scope, graphService, socket) {

  var sumRicochets = 0;
  var sumRabbitJumps = 0;
  var sumMeteors = 0;

  $scope.chartConfig = {
    options: {
      chart: {
        type: 'line',
        zoomType: 'x'
      }
    },
    series: [],
    title: {
      text: 'Breaking news'
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { // don't display the dummy year
        second: '%H:%M:%S',
        minute: '%H:%M:%S',
        hour: '%H:%M:%S',
        day: '%H:%M:%S',
        week: '%H:%M:%S',
        month: '%H:%M:%S',
        year: '%H:%M:%S'
      },
      title: {
        text: 'Date'
      }
    }
  };

  $scope.pieChartConfig = {
    options: {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      }
    },
    series: [{
      data: []
    }],
    title: {
      text: 'Sum of all'
    }

  };

  socket.on('getData', function (data) {
    console.log(data);
    $scope.chartConfig.series[0].data.push([data.date, data.ricochet]);
    $scope.chartConfig.series[1].data.push([data.date, data.rabbitJump]);
    $scope.chartConfig.series[2].data.push([data.date, data.meteors]);

    sumRicochets += data.ricochet;
    $scope.pieChartConfig.series[0].data[0].y = sumRicochets;
    sumRabbitJumps += data.rabbitJump;
    $scope.pieChartConfig.series[0].data[1].y = sumRabbitJumps;
    sumMeteors += data.meteors;
    $scope.pieChartConfig.series[0].data[2].y = sumMeteors;
  });


  graphService.get().then(function (res) {
    var datas = res.data;
    $scope.chartConfig.series[0] = {
      name: 'Ricochet',
      data: datas.ricochet
    };
    $scope.chartConfig.series[1] = {
      name: 'Rabbit jump',
      data: datas.rabbitJump
    };
    $scope.chartConfig.series[2] = {
      name: 'Meteors',
      data: datas.meteors
    };

    datas.ricochet.map(function (item) {
      sumRicochets += item[1];
    });
    datas.rabbitJump.map(function (item) {
      sumRabbitJumps += item[1];
    });
    datas.meteors.map(function (item) {
       sumMeteors += item[1];
    });

    $scope.pieChartConfig.series[0].data.push({
      name: 'Ricochet',
      y: sumRicochets
    });
    $scope.pieChartConfig.series[0].data.push({
      name: 'Rabbit jumps',
      y: sumRabbitJumps
    });
    $scope.pieChartConfig.series[0].data.push({
      name: 'Meteors',
      y: sumMeteors
    });

  }, function (err) {
    console.log(err);
  });

});
