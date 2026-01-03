document.addEventListener('DOMContentLoaded', function () {
    const titleInput = document.getElementById('id_title');
    if (!titleInput) return;

    // Create the "✨ Auto-Fill" button
    const autoFillBtn = document.createElement('button');
    autoFillBtn.type = 'button';
    autoFillBtn.innerHTML = '✨ Auto-Fill Metadata';
    autoFillBtn.style.marginLeft = '10px';
    autoFillBtn.style.padding = '5px 10px';
    autoFillBtn.style.backgroundColor = '#417690';
    autoFillBtn.style.color = '#fff';
    autoFillBtn.style.border = 'none';
    autoFillBtn.style.borderRadius = '4px';
    autoFillBtn.style.cursor = 'pointer';
    autoFillBtn.style.fontWeight = 'bold';

    // Append to title field container
    titleInput.parentNode.appendChild(autoFillBtn);

    autoFillBtn.addEventListener('click', function () {
        const title = titleInput.value;
        if (!title) {
            alert('Please enter a Movie Title or IMDb ID first!');
            return;
        }

        autoFillBtn.innerHTML = '⏳ Searching...';
        autoFillBtn.disabled = true;

        fetch(`/api/movies/fetch-metadata/?title=${encodeURIComponent(title)}`)
            .then(response => {
                if (!response.ok) throw new Error('Movie not found');
                return response.json();
            })
            .then(data => {
                // Populate Title (Important if ID was used)
                if (data.title) titleInput.value = data.title;

                // Populate Fields
                if (data.year) document.getElementById('id_year').value = data.year;
                if (data.rating) document.getElementById('id_rating').value = data.rating;
                if (data.description) document.getElementById('id_description').value = data.description;
                if (data.poster_url) document.getElementById('id_poster_url').value = data.poster_url;

                // Handle Genres (Checkboxes)
                if (data.genres && Array.isArray(data.genres)) {
                    const genreCheckboxes = document.querySelectorAll('input[name="genres"]');
                    genreCheckboxes.forEach(box => {
                        // In Django Admin, label is actually the parent or next sibling text node
                        // Structure: <label><input ...> Name</label>
                        const labelText = box.parentNode.innerText.trim();

                        const match = data.genres.some(g => g.toLowerCase().includes(labelText.toLowerCase()) || labelText.toLowerCase().includes(g.toLowerCase()));
                        if (match) box.checked = true;
                    });
                }

                // Handle Languages (Checkboxes)
                if (data.languages && Array.isArray(data.languages)) {
                    const langCheckboxes = document.querySelectorAll('input[name="languages"]');
                    langCheckboxes.forEach(box => {
                        const labelText = box.parentNode.innerText.trim();
                        const match = data.languages.some(l => l.toLowerCase().includes(labelText.toLowerCase()) || labelText.toLowerCase().includes(l.toLowerCase()));
                        if (match) box.checked = true;
                    });
                }

                autoFillBtn.innerHTML = '✅ Found!';
                setTimeout(() => {
                    autoFillBtn.innerHTML = '✨ Auto-Fill Metadata';
                    autoFillBtn.disabled = false;
                }, 2000);
            })
            .catch(err => {
                alert('Could not find movie metadata. Please check the spelling or try manual entry.');
                autoFillBtn.innerHTML = '❌ Error';
                setTimeout(() => {
                    autoFillBtn.innerHTML = '✨ Auto-Fill Metadata';
                    autoFillBtn.disabled = false;
                }, 2000);
                console.error(err);
            });
    });
});
