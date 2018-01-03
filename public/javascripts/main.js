// TODO: add your JavaScript here!
function main(){
  var xhttp = new XMLHttpRequest();
  const url = 'http://localhost:3000/api/places'
  xhttp.open('GET', url, true);
  xhttp.send();
  const b = document.getElementById('filterBtn');
  const a = document.getElementById('addBtn');
  b.addEventListener('click', function click(evt) {
    evt.preventDefault();
    const loc = document.forms["filter"]["location"].value
    const cui = document.forms["filter"]["cuisine"].value
    const url = 'http://localhost:3000/api/places?location='+loc+'&cuisine='+cui;
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', url, true);
    xhttp.addEventListener('load', function() {
    if (xhttp.status >= 200 && xhttp.status < 400) {
		const m = JSON.parse(xhttp.responseText);
    var pop =  document.getElementById('places-list');
    if(pop !== null){
      while (pop.firstChild) {
        pop.removeChild(pop.firstChild);
     }
   }
   		m.forEach(function(obj) {
      var places = document.getElementById('places-list')
      var tr = document.createElement('tr');
       tr.setAttribute("id", String(cui));
       places.appendChild(tr)
        var name = document.createElement('td');
        var cus = document.createElement('td');
        var loc = document.createElement('td');
        name.setAttribute("id", "name");
        cus.setAttribute("id", "cus");
        loc.setAttribute("id", "loc");
        name.innerHTML = obj["name"];
        cus.innerHTML = obj["cuisine"];
        loc.innerHTML = obj["location"];
        tr.appendChild(name)
        tr.appendChild(cus)
        tr.appendChild(loc)
		});
   };
 });
 xhttp.send();
});
a.addEventListener('click', function click(evt) {
  evt.preventDefault();
  const nam = document.forms["add"]["addname"].value
  const loc = document.forms["add"]["addlocation"].value
  const cui = document.forms["add"]["addcuisine"].value
  const url = 'http://localhost:3000/api/places/create';
  var xhttp = new XMLHttpRequest();
  xhttp.open('POST', url, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("addname="+nam+"&addlocation="+loc+"&addcuisine="+cui);
  document.getElementById("filter").reset();
  document.getElementById("filterBtn").click()
  document.getElementById("add").reset();

});
}
document.addEventListener('DOMContentLoaded', main);
