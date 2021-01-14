const BASE_URL = 'https://reqres.in/api/users/';
const POSTMAN_URL = 'https://httpbin.org/post';

//Código principal dentro del evento load
// para asegurar la carga de los componentes
window.addEventListener('load', (ev) => {
  let numsecs = document.getElementById('numsecs');
  let user = document.getElementById('user');
  let boton = document.querySelector('button');

  boton.addEventListener('click', (ev) => {
    ev.preventDefault();
    clearFields();
    procesarFetch(numsecs.value, user.value);
  });
});
//Borrar camps
function clearFields() {
  document.querySelectorAll('span').forEach((element) => {
    element.innerHTML = '';
    console.log(element);
  });
}


//construcció de la url
function construUrl(url, parameters) {
  let values = '?';
  for (i in parameters) {
    values += i + '=' + parameters[i];
    values += '&';
  }
  values = values.slice(0, -1);
  url += values;
  return url;
}
//exer1
function procesarFetch(numsecs, user) {
  setTimeout(function () {
    let parameters = { id: user };
    const options = {
      method: 'GET',
    };
    fetch(construUrl(BASE_URL, parameters), options)
      .then((response) => {
        if (response.ok) {
          document.getElementById('status').innerHTML = response.status;
          return response.text();
        } else {
          throw new Error(response.status);
        }
      })
      .then((data) => {
        let response = JSON.parse(data);
        let usuari = response.data;
        postUser(usuari);
        document.getElementById('id').innerHTML = usuari.id;
        document.getElementById('email').innerHTML = usuari.email;
        document.getElementById('name').innerHTML = usuari.first_name;
      })
      .catch((err) => {
        document.getElementById('status').innerHTML = err.message;
        console.error('ERROR: ', err.message);
      });
  }, numsecs * 1000);
}
//exer2
async function postUser(user) {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'aplication/json;charset=UTF-8',
    },
    body: JSON.stringify(user),
  };
  fetch(POSTMAN_URL, options)
    .then((res) => res.json())
    .catch((error) => console.log('Error:', error))
    .then((response) => {
      console.log('user:' + user.first_name);
      document.getElementById('userBD').innerHTML = user.first_name;
      document.getElementById('statusBD').innerHTML = '200';
    });
}