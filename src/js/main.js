const API_KEY = "AIzaSyCvmTIoB77zPHHKwBF5vmTf5d7DdMzKenU";
const cache = {}; // Caché simple para almacenar resultados

/* Funcion para obtener los videos de una categoria especifica */
async function fetchVideos(query) {
  // Verificar si la consulta ya está en caché
  if (cache[query]) {
    return cache[query];
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&type=video&key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Error al obtener los videos");
    }
    const data = await response.json();
    cache[query] = data.items; // Guardar en caché
    return data.items;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

/* Funcion para cargar videos con lazy loading */
function lazyLoadVideos(videos, title) {
  const mainContent = document.querySelector("main.content");

  const categoryContainer = document.createElement("div");
  categoryContainer.className = "category-container";

  const categoryTitle = document.createElement("h2");
  categoryTitle.textContent = title;
  categoryContainer.appendChild(categoryTitle);

  const gridContainer = document.createElement("div");
  gridContainer.className = "video-grid";

  if (videos.length === 0) {
    const noVideosMessage = document.createElement("p");
    noVideosMessage.textContent = "No se encontraron videos.";
    categoryContainer.appendChild(noVideosMessage);
    /* mainContent.innerHTML = "<p>No de encontraron videos.</p>";
    return; */
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const iframe = entry.target;
        iframe.src = iframe.dataset.src;
        observer.unobserve(iframe);
      }
    });
  });

  videos.forEach((video) => {
    const videoWrapper = document.createElement("div");
    videoWrapper.className = "video-wrapper";

    const videoElement = document.createElement("iframe");
    videoElement.dataset.src = `https://www.youtube.com/embed/${video.id.videoId}`; // Usar data-src para lazy loading
    videoElement.width = "300";
    videoElement.height = "200";
    videoElement.frameBorder = "0";
    videoElement.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    videoElement.allowFullscreen = true;

    videoWrapper.appendChild(videoElement);
    gridContainer.appendChild(videoWrapper);
    observer.observe(videoElement);
  });

  categoryContainer.appendChild(gridContainer);
  mainContent.appendChild(categoryContainer);
}

/* Cargar las categorias al cargar la pagina */
document.addEventListener("DOMContentLoaded", async () => {
  const categories = {
    React: "curso desde cero react",
    HTML: "curso desde cero html",
    CSS: "curso desde cero css",
    JavaScript: "curso desde cero javascript",
    Node: "curso desde cero node",
  };

  for (const [title, query] of Object.entries(categories)) {
    const videos = await fetchVideos(query);
    lazyLoadVideos(videos, title);
210  }
});1
-ñ747