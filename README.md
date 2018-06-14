[![Maintainability](https://api.codeclimate.com/v1/badges/155b98b38add2c148346/maintainability)](https://codeclimate.com/github/betagouv/sirene_as_api_front/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/155b98b38add2c148346/test_coverage)](https://codeclimate.com/github/betagouv/sirene_as_api_front/test_coverage)

# SIRENE_as_api_front

Ce site est disponible en ligne : [Entreprise.data.gouv.fr](https://entreprise.data.gouv.fr)

Dans le cadre du SPD, (Service Public de la Donnée), certains jeux de données
dont le fichier SIRENE sont devenus publics.

Le projet SIRENE_as_api a pour vocation de mettre en valeur la donnée brute en
la servant sous forme d'API.

Le projet se découpe en trois sous-projets :

  - Une API Ruby on Rails qui importe les fichiers de données
    mis à disposition par l'INSEE : [sirene_as_api](https://github.com/sgmap/sirene_as_api)
  - Un script capable de déployer l'API automatiquement : [sirene_as_api_ansible](https://github.com/sgmap/sirene_as_api_ansible)
  - Une interface web de recherche exploitant l'API en Vue.js : [sirene_as_api_front](https://github.com/sgmap/sirene_as_api_front)

## Exécution en local

``` bash
# Aprés avoir lancé le front-end avec la commande
npm run dev

# Lancer le back-end : dans le dossier sirene_as_api, exécuter :
rails s

# Lancer le serveur SOLR :
rake sunspot:solr:start

```

## Dev

``` bash
# Lancer les tests
npm run test

# Construire pour la production
npm run build

```
## Licence

Ce projet est sous [license MIT](https://fr.wikipedia.org/wiki/Licence_MIT)
