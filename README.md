# SIRENE_as_api_front

Dans le cadre du SPD, (Service Public de la Donnée), certains jeux de données
dont le fichier SIRENE sont devenus publics.

Le projet SIRENE_as_api a pour vocation de mettre en valeur la donnée brute en
la servant sous forme d'API.

Le projet se découpe en trois sous-projets :

  - Une API Ruby on Rails qui importe les fichiers de données
    mis à disposition par l'INSEE : [sirene_as_api](https://github.com/sgmap/sirene_as_api)
  - Un script capable de déployer l'API automatiquement : [sirene_as_api_ansible](https://github.com/sgmap/sirene_as_api_ansible)
  - Une interface web de recherche exploitant l'API en Vue.js : [sirene_as_api_front](https://github.com/sgmap/sirene_as_api_front)


## Lancer le serveur front

Vous aurez besoin du gestionnaire de paquets npm.

``` bash
# installer les dépendances
npm install

# Lance le serveur en développement sur localhost:8080
npm run dev

# Build pour la production
npm run build

# Lancer les tests unitaires
npm run unit

# Lancer tous les tests
npm test
```
## Exécution en local

``` bash
# Aprés avoir lancé le front-end avec la commande
npm run dev

# Lancer le back-end : dans le dossier sirene_as_api, exécuter :
rails s

# Lancer le serveur SOLR :
rake sunspot:solr:start

```
