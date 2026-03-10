const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env.local' });

async function testApi() {
    const secret = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
    const token = jwt.sign({ userId: 'admin-debug', role: 'admin' }, secret, { expiresIn: '1h' });

    const url = 'https://portfolio-yovogbe.vercel.app/api/admin/projects';
    console.log(`Test de l'API avec token: ${url}`);

    try {
        const res = await fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log('Status:', res.status);
        const data = await res.json();
        if (data.projects && data.projects.length > 0) {
            console.log('Premier projet ID:', data.projects[0].id);
            console.log('Premier projet Title:', data.projects[0].title);

            const ptc = data.projects.find(p => p.id === 'ptccare-mobile' || p.title.includes('PTC'));
            if (ptc) {
                console.log('Projet PTC trouvé dans la réponse API !');
                console.log(JSON.stringify(ptc, null, 2));
            } else {
                console.log('Projet PTC non trouvé avec cet ID ou titre.');
            }
        } else {
            console.log('Aucun projet retourné ou erreur:', data);
        }
    } catch (err) {
        console.error('Erreur:', err.message);
    }
}

testApi();
