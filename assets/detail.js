window.onload = function() {
  const location = window.location.href;
  const url = new URL(location);
  const search_params = new URLSearchParams(url.search);

  if (!search_params.has('id') || search_params.get('id') === "") {
    window.location.href = './';
  }

  fetch(`https://api.unsplash.com/photos/${search_params.get('id')}?client_id=${API_KEY}`)
    .then(convert_to_json)
    .then(function(data) {
      loadDetail(data);
      document.getElementById('image_id').innerText = search_params.get('id');
    });
};

function loadDetail(data) {
  console.log(data);
  document.getElementById('detail_image').src = data.urls.regular;
  document.getElementById('detail_image').style.borderColor = data.color;
  document.getElementById('description_text').innerText = data.description || "No description available";
  document.getElementById('username').innerText = data.user.username;
  document.getElementById('like_count').innerText = data.likes;
  document.getElementById('view_count').innerText = data.views;
  document.getElementById('alt_description').innerText = data.alt_description || "No alternative description";
  document.getElementById('image_color').style.backgroundColor = data.color;
  document.getElementById('color_text').innerText = data.color;

  const date = new Date(data.created_at);
  const upload_date = `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
  document.getElementById('upload_date').innerText = upload_date;

  // Add an event listener to handle download on button click
  document.getElementById('download_link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    downloadImage(data.urls.full);
  });
}

function downloadImage(url) {
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'image.jpg'; // Set the download filename
      document.body.appendChild(link);
      link.click(); // Trigger the download
      document.body.removeChild(link); // Clean up the link element
    })
    .catch(error => console.error('Error downloading image:', error));
}

function convert_to_json(response) {
  return response.json();
}
