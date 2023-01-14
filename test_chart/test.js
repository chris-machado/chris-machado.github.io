//let url_str = "http://ec2-18-233-120-8.compute-1.amazonaws.com:8080/get?station=1111111"

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  
};

/*
const tides = fetch(url_str, requestOptions)
  .then((response) => response.json())
  .then((user) => {
    return user.tides;
  });

  const printtides = () => {
    tides.then((a) => {
      console.log(a);
    });
  };
  


printtides();


var obj;
fetch("http://ec2-18-233-120-8.compute-1.amazonaws.com:8080/get?station=1111111", requestOptions)
  .then(response => response.json())
  .then(data => {
    obj = data;
   })
  .then(result => console.log(obj))
  .catch(error => console.log('error', error));

*/


  async function tides(station) {
      let url_str = "http://ec2-18-233-120-8.compute-1.amazonaws.com:8080/get?station=" + station;
      const response = await fetch(url_str);
      const data = await response.json();
      
      // const {time, water_level} = data;
     
      //document.getElementsById('time').textContent = time;
      //document.getElementsById('data').textContent = data;
      // console.log(k);
     // return k //, Object.values(obj);


   // console.log(k)

const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: 'Water Level',
      data: data,
      //borderWidth: .2,
      borderColor: 'red'
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
    backgroundColor: 'red',
    yAxisID: 'MLLW Level',
    animations: true,

  }
});
}
  
tides(8638610);