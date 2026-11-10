import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

const racine = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    // chemins relatifs : le même dist/ fonctionne sur GitHub Pages et dans Apache
    base: './',
    plugins: [tailwindcss()],
    server: {
        host: true, // le serveur répond aussi en dehors d'un conteneur
        watch: {
            // dans un conteneur : voir les modifications faites sous Windows
            usePolling: process.env.DANS_DOCKER === 'oui',
        },
    },
    build: {
        rolldownOptions: {
            input: {
                accueil: resolve(racine, 'index.html'),
                // la page projets.html sera ajoutée ici à la mission suivante
            },
        },
    },
});