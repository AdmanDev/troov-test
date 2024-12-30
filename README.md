# Troov test

Application web de recherche d'objets perdus

## Tester l'application

Pour tester l'applicatio, vous pouvez :
    - Accéder directement au site sur [troov.admandev.fr](https://troov.admandev.fr/)
    - Ou lancer le projet en local, en suivant les étapes ci-dessous

## Serveur NodeJS

### Installation des dépendances du backend

```bash
cd troov-test-api

# npm
npm install

# yarn
yarn
```

### Variables d'environnement du backend

Créez un fichier `.env` dans le dossier `troov-test-api` et ajoutez les variables suivantes :

```bash
WEBSITEURL=http://localhost:3000 # URL de votre frontend
DB_URI= # URI de connexion à la base de données MongoDB
JWT_SECRET_KEY= # Clé de cryptage JWT
ACCESS_TOKEN_EXPIRE_IN=1d # Durée de validité du token JWT
AUTH_COOKIE_NAME=authToken # Nom du cookie d'authentification
AUTH_COOKIE_MAX_AGE=86400000 # Durée de validité du cookie d'authentification en ms
```

### Lancement du serveur

```bash
# npm
npm run dev

# yarn
yarn dev
```

Vous devriez voir, dans la console, un message indiquant que le serveur est en cours d'execution et que la connexion à la base de données a été établie.

## Application NuxtJs

### Installation des dépendances du frontend

```bash
cd troov-test-portal

# npm
npm install

# yarn
yarn
```

### Variables d'environnement du frontend

Créez un fichier `.env` dans le dossier `troov-test-portal` et ajoutez les variables suivantes :

```bash
API_BASE_URL=http://localhost:3001/api # URL de votre API
```

### Lancement de l'application

```bash
# npm
npm run dev

# yarn
yarn dev
```

L'application devrait s'être lancée sur `http://localhost:3000`.

> Note : Si vous rencontrez l'erreur `No Stackbar provided`, il sufit de relancer l'application.

## Compte utilisateur

Pour pouvoir tester les foncionnalités de l'application, vous devez creéer un compte utilisateur.
