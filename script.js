var form = document.getElementById("my-form");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);

  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Merci ! Votre message a bien été envoyé.";
      status.style.color = "#D4AF37"; 
      form.reset(); 
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        } else {
          status.innerHTML = "Oups ! Il y a eu un problème lors de l'envoi."
          status.style.color = "red";
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "Oups ! Il y a eu un problème lors de l'envoi."
    status.style.color = "red";
  });
}

form.addEventListener("submit", handleSubmit);