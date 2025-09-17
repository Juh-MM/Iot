<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Gráfico do ThingSpeak</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body>
  <canvas id="grafico" width="600" height="400"></canvas>

  <script>
    const channelId = '2943258'; 
    const apiKey = 'G3BDQS6I5PRGFEWR'; 
    const url = `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${apiKey}&results=20`;

    axios.get(url)
      .then(response => {
        const feeds = response.data.feeds;

        // Extrai os dados
        const labels = feeds.map(feed => feed.created_at);
        const valoresUmidade = feeds.map(feed => parseFloat(feed.field1));
        const valoresTemperatura = feeds.map(feed => parseFloat(feed.field2));

        // Cria o gráfico
        const ctx = document.getElementById('grafico').getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Umidade',
              data: valores,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
              tension: 0.3
            }]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Data'
                }
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Valor'
                }
              }
            }
          }
        });
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
      });
  </script>
</body>
</html>
