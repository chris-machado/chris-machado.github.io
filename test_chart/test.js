//let url_str = "http://ec2-18-233-120-8.compute-1.amazonaws.com:8080/get?station=1111111"

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  
};




async function tides(station_id) {
    let url_str = "http://ec2-18-233-120-8.compute-1.amazonaws.com:8080/get?station=" + station_id;
    const response = await fetch(url_str);
    const data = await response.json();
      
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Water Level',
          data: data,
          borderWidth: .2,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          }
        },
        spanGaps: true,
        showLine: true,
      }
    });
}
  
tides();