var slider = document.getElementById("myRange");
var output = document.getElementById("wynik");
output.innerHTML = slider.value;
let tabela = [];

slider.oninput = function() {
  output.innerHTML = this.value;
}

google.charts.load('current', {'packages':['line']});
google.charts.setOnLoadCallback(drawChart);


function symulacja() {
  let liczsymulacji = output.innerHTML;
  let temp = 0;
  let counter_o = 0;
  let counter_r = 0;
  let seria_o = 0;
  let seria_r = 0;
  let seria_o2 = 0;
  let seria_r2 = 0;
  for (i=0; i<liczsymulacji; i++){
    let rzut = Math.floor(Math.random() * 2);
    if (rzut == 0){rzut = (-1); counter_r += 1} else {counter_o += 1};
    if (rzut == 1){seria_o += 1; seria_r = 0; if(seria_o > seria_o2){seria_o2 = seria_o}};
    if (rzut == (-1)){seria_r += 1; seria_o = 0; if(seria_r > seria_r2){seria_r2 = seria_r}};
    temp = temp + rzut;
    tabela[i] = temp;
  }
  let tabelafinal = [[],[]];
  let tabelafinal2 = [[0,0]];
  for (j=1; j<=tabela.length; j++){
    tabelafinal[j,0] = j;
    tabelafinal[j,1] = tabela[j-1];
    tabelafinal2.push([tabelafinal[0],tabelafinal[1]])
  }
  console.log(tabela);
  document.getElementById("liczorly").innerHTML = counter_o;
  document.getElementById("liczreszki").innerHTML = counter_r;
  document.getElementById("seriaorly").innerHTML = seria_o2;
  document.getElementById("seriareszki").innerHTML = seria_r2;
  drawChart(tabelafinal2);
  tabela = [];
}


function drawChart(x) {

var data = new google.visualization.DataTable();

data.addColumn('number', 'Liczba rzutów');
data.addColumn('number', 'Wynik');

data.addRows(x);


var options = {
            };

var chart = new google.charts.Line(document.getElementById('main'));

chart.draw(data, options);
}


$(window).resize(function(){
  drawChart();
});