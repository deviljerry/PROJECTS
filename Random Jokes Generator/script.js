document.getElementById('get-joke').addEventListener('click', getJoke);

function getJoke() {
    const loader = document.getElementById('loader');
    const errorMessage = document.getElementById('error-message');
    const jokeText = document.getElementById('joke-text');
    const jokeDelivery = document.getElementById('joke-delivery');
    const jokeMeta = document.getElementById('joke-meta');

    loader.style.display = 'block';
    errorMessage.style.display = 'none';
    jokeText.style.display = 'none';
    jokeDelivery.style.display = 'none';
    jokeDelivery.style.opacity = '0';
    jokeMeta.innerHTML = '';

    const category = document.getElementById('category').value;
    const type = document.getElementById('type').value;
    const language = document.getElementById('language').value;

    const blacklistFlags = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        blacklistFlags.push(checkbox.value);
    });

    let url = `https://v2.jokeapi.dev/joke/${category}`;
    const params = [];
    if (type !== 'any') params.push(`type=${type}`);
    if (language) params.push(`lang=${language}`);
    if (blacklistFlags.length > 0) params.push(`blacklistFlags=${blacklistFlags.join(',')}`);

    if (params.length > 0) url += `?${params.join('&')}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            loader.style.display = 'none';
            if (data.type === 'single') {
                jokeText.textContent = data.joke;
                jokeDelivery.style.display = 'none';
            } else {
                jokeText.textContent = data.setup;
                jokeDelivery.textContent = data.delivery;
                jokeDelivery.style.display = 'block';
                setTimeout(() => jokeDelivery.style.opacity = '1', 2000);
            }
        })
        .catch(() => {
            loader.style.display = 'none';
            errorMessage.style.display = 'block';
        });
}
