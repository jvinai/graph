angular.module("graph").controller('graphCtrl', function ($scope, graphService, socket) {

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

  socket.on('getData', function (data) {
    console.log(data);
    $scope.chartConfig.series[0].data.push([data.date, data.ricochet]);
    $scope.chartConfig.series[1].data.push([data.date, data.rabbitJump]);
    $scope.chartConfig.series[2].data.push([data.date, data.meteors]);
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

  }, function (err) {
    console.log(err);
  });

});
