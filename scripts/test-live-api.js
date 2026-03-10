const fetch = require('node-fetch');

async function testApi() {
    const url = 'https://portfolio-yovogbe.vercel.app/api/admin/projects';
    // Note: On ne peut pas tester l'API protégée sans token, mais on peut vérifier si elle répond 401 ou 500
    console.log(`Test de l'API: ${url}`);
    try {
        const res = await fetch(url);
        console.log('Status:', res.status);
        const text = await res.text();
        console.log('Response (first 100 chars):', text.substring(0, 100));
    } catch (err) {
        console.error('Erreur:', err.message);
    }
}

testApi();
