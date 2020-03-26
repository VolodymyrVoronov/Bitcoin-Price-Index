// get response from server
getResponse = async () => {
  const endpoint = 'https://api.coindesk.com/v1/bpi/historical/close.json';

  const response = await fetch(endpoint);
  const data = await response.json();
  const newData = Object.entries(data.bpi);

  return newData;
}

// get and format a date, get and round rate of bitcoin
getDate = (array) => newArray = array.map(item => moment(item[0]).format("Do MMM YYYY"));
getRate = (array) => newArray = array.map(item => item[1].toFixed(2));

// draw a graph
drawGraph = (newData) => {
  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',
      // The data for our dataset
      data: {        
          labels: getDate(newData),
          datasets: [{
              label: 'Bitcoin',
              pointBackgroundColor: 'rgb(32, 102, 146)',
              pointBorderColor: 'rgba(32, 102, 146, 1)',
              backgroundColor: 'rgba(192, 222, 241, 0.5)',
              borderColor: 'rgba(42, 131, 188, 1)',
              borderWidth: 2,
              data: getRate(newData),
              pointStyle: 'cirlce',
              hitRadius: 10,
          }]
      },
      // Configuration options go here
      options: {
        scales: {
            yAxes: [{
                stacked: false
            }]
        },
        legend: {
          display: false
        },
      },
  });
}

// call function
getResponse()
  .then(newData => drawGraph(newData))
  .then(error => console.log(error));
