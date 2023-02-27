// const deletePairing = document.querySelector('.delete-pairing-btn');

async function deleteFormHandler(event) {
  event.preventDefault();

  const id = document.querySelector('.pairing-id').innerHTML;

  const response = await fetch(`/api/pairing/${id}`, {
    method: "DELETE",
    body: JSON.stringify({
      id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/pairing");
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.delete-pairing-btn').addEventListener("click", deleteFormHandler);
