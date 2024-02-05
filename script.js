const accordionElement = document.querySelector(".accordion");

async function getPosts() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error("Something went wrong while fetching data");
    }

    const data = await response.json();

    data.slice(0, 4).forEach((post, index) => {
      const titleElement = document.getElementById(`Question${index + 1}`);
      titleElement.textContent = `Question ${index + 1}`;

      const toggleBtn = document.createElement("button");
      toggleBtn.classList.add("toggle-btn");
      toggleBtn.textContent = "+";
      titleElement.insertBefore(toggleBtn, titleElement.firstChild);

      titleElement.addEventListener("click", () =>
        toggleDescription(titleElement)
      );

      const descriptionElement = titleElement.nextElementSibling;
      descriptionElement.textContent = post.body;
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

document.addEventListener("DOMContentLoaded", getPosts);

function toggleDescription(titleElement) {
  titleElement.classList.toggle("active");
  const descriptionElement = titleElement.nextElementSibling;
  descriptionElement.classList.toggle("show");

  const toggleBtn = titleElement.querySelector(".toggle-btn");
  toggleBtn.textContent = toggleBtn.textContent === "+" ? "-" : "+";
}
