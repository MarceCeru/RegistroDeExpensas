let chartBarsContainer = document.querySelector('.chart__bars-container');

fetch('./data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('error');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);

        let values = []

        data.forEach(element => {
            values.push(element.amount)
            chartBarsContainer.innerHTML += `
         <div class="chart__bar">
          <div class="chart__bar--label">${element.amount}</div>
          <div class="chart__bar--date">${element.day}</div>
        </div>`
        });

        console.log(values);

        let alturaMaxBarpx = 150;
        let maxValue = Math.max(...values);

        console.log(maxValue);

        /*
     52.36 => 200px
     17.45 => x
     
      x  = (17.45*200px)/52.36

      alturaActualpx = ( nuevoValor * alturaMaxBarpx ) / maxValue

     */

        let bars = document.querySelectorAll('.chart__bar');
        bars = [...bars]

        bars.forEach(bar => {

            let nuevoValor = parseFloat(bar.childNodes[1].innerText);
            console.log(nuevoValor)
            let alturaActualpx = (nuevoValor * alturaMaxBarpx) / maxValue

            bar.style.height = `${alturaActualpx}px`

            //pintar de azul la mas grande
            if (nuevoValor == maxValue) {
                bar.style.backgroundColor = 'hsl(186, 34%, 60%)';
            }

            bar.addEventListener('mouseover', event => {
                if (event.target.className == 'chart__bar') {
                    let labelElement = event.target.childNodes[1];
                    labelElement.style.display = 'block';
                }
            });
            bar.addEventListener('mouseout', event => {
                if (event.target.className == 'chart__bar') {
                    let labelElement = event.target.childNodes[1];
                    labelElement.style.display = 'none';
                }
            })
        })
    })
    .catch(error => {
        console.error('error', error);
    });


