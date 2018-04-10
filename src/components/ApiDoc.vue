<template>
  <div>
    <section class="section-white">
      <div class="container">
        <div class="column">
          <h1>Documentation de l'API Sirene</h1>
          <h2>Qu'est-ce que l'API Sirene ?</h2>
          <p>
            Dans le cadre du Service Public de la Donnée, de nombreux jeux de données s'ouvrent au grand public.<br>
            La base de données SIRENE sur les entreprises et associations est donc maintenant <strong>&lt;&lt; Open data &gt;&gt;</strong>.
            Vous pouvez consulter la base de donnée librement et gratuitement !
          </p>
          <h2>Comment fonctionne Entreprise.data.gouv.fr ?</h2>
          <p>
            Ce site web interroge l'API Sirene développée par <a href="https://www.data.gouv.fr/fr/organizations/etalab/">Étalab</a>.
            Ce site web et son API sont développés en open-source : vous pouvez <a href="https://github.com/betagouv/sirene_as_api">télécharger le code sur GitHub</a>.
          </p>
          <h2>Puis-je interroger directement l'API Sirene ?</h2>
          <p>Bien sûr ! Pas besoin d'être développeur. Cette documentation est faite pour vous.</p>
        </div>
        <div class="column__icon">
          <img src="../assets/img/icons/three-gears.svg" alt="gears">
        </div>
      </div>
    </section>
    <section class="section-grey">
      <div class="container">
        <div class="column__icon">
          <img src="../assets/img/icons/computer-user.svg" alt="computer-user">
        </div>
        <div class="column__right">
          <h2>Maitrisez l'API Sirene.</h2>
          <h3>Comment interroger une API ?</h3>
          <p>
            Les développeurs utilisent des APIs, ou "Application Programming Interface", pour accéder ou modifier
            de la donnée facilement. Vous pouvez interroger notre API avec les bonnes commandes, soit depuis un terminal, soit depuis un simple
            browser web (Firefox, Chrome, Edge...)
          </p>
          <p>
            Vous devez faire pour cela une requête Web. L'adresse de notre API est : <a href="https://sirene.entreprise.api.gouv.fr/">https://sirene.entreprise.api.gouv.fr/</a><br>
            Attention, vous devez rajouter votre requête sur l'adresse !
          </p>
          <h3>Format de réponse</h3>
          <p>
            L'API vous renverra les informations demandées au format JSON (code 200).<br>
            Vous recevrez un code 404 si aucun établissement n'est trouvé, ou un 500 si notre serveur n'est pas fonctionnel (par exemple pendant une maintenance).
          </p>
        </div>
      </div>
    </section>
    <section class="section-white">
      <div class="container">
        <div class="column__full">
          <h2>Exemple de requête</h2>
          <p>
            L'adresse à taper pour une requête est : <strong>Adresse + Version + Informations</strong><br>
            Exemple : Je souhaite accéder aux informations sur la mairie de Montpellier, dont le siret est le 21340172201787. Je me rend sur <a href="https://sirene.entreprise.api.gouv.fr/v1/siret/21340172201787/">https://sirene.entreprise.api.gouv.fr/v1/siret/21340172201787</a>
          </p>
          <p>Essayez avec n'importe quel siret :</p>
          <api-doc-input :request=exempleSiret1></api-doc-input>
          <h2>Quatre moyens d'interroger l'API.</h2>
          <h3>Recherche Texte :</h3>
          <p>
            La recherche texte permet de trouver un établissement depuis son nom (raison sociale ou nom commercial), son adresse,
            son enseigne, sa commune, son activité.<br>
            <strong>Exemple de recherches possible :</strong> "Boulangerie Paris", "Charcuterie Sanzot", "20 avenue de ségur"
          </p>
          <p>
            Les résultats sont paginés : l'API renvoie par défaut les 10 premiers établissements, soit la première page avec 10 résultats par page.
            Ces valeurs peuvent être changées en précisant dans la requête les paramètres <em>page</em> et <em>per_page</em><br>  
            <strong>Exemple :</strong> je souhaite chercher les établissements de Montpellier, je tape la requête suivante :
          </p>
          <api-doc-input :request=exempleFullText1></api-doc-input>
          <p>J'obtiens les 10 premiers résultats. Je souhaite maintenant les résultats 20 à 40, je tape :</p>
          <api-doc-input :request=exempleFullText2></api-doc-input>
          <h3>Recherche par Siret :</h3>
          <p>
            La recherche par Siret permet de trouver un établissement directement depuis son numéro Siret, unique à chaque établissement.<br> 
            Exemple pour l'établissement de la Mairie de Toulouse :
          </p>
          <api-doc-input :request=exempleSiret2></api-doc-input>
          <h3>Recherche par Siren :</h3>
          <p>
            La recherche par Siren permet de trouver tous les établissement dérivés d'un Siren.<br>
            Les informations sur le siège social correspondant à ce Siren, le numéro de TVA Intracommunautaire, ainsi que des informations sur les établissements enfants,
            tels leur nombre et leur Sirets, seront renvoyées.<br>
            Exemple, encore une fois pour Toulouse :
          </p>
          <api-doc-input :request=exempleSiren></api-doc-input>
        </div>
      </div>
    </section>
    <section class="section-grey">
      <div class="container">
        <div class="column__right">
          <h2>Des recherches textes plus puissantes</h2>
          <p>
            De nombreuses options sont exploitables pour trouver exactement ce dont vous avez besoin.<br>
            Vous pouvez vous réferer au tableau suivant :
          </p>
          <table>
            <thead>
              <tr>
                <th>Filtrage désiré</th>
                <th>Paramètre requête</th> 
                <th>Valeur du paramètre</th> 
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Activité principale de l'entreprise</td>
                <td><code>activite_principale</code></td>
                <td>Le code `activité principale` désiré</td> 
              </tr>
              <tr>
                <td>Code Postal</td>
                <td><code>code_postal</code></td> 
                <td>Le code postal désiré</td>
              </tr>
              <tr>
                <td>Appartenance au champs de l'économie sociale et solidaire</td>
                <td><code>is_ess</code></td> 
                <td>`O` pour Oui, `N` pour Non, `I` pour Invalide</td>
              </tr>
              <tr>
                <td>Entreprises individuelles</td>
                <td><code>is_entrepreneur_individuel</code></td> 
                <td>`yes` pour Oui, `no` pour Non</td>
              </tr>
            </tbody>
          </table>
          <p>
            Ces options sont disponibles pour le moment uniquement sur la recherche Texte.<br>
            Notre API est en constante évolution, n'hésitez pas à nous écrire pour demander davantage d'options correspondant à vos besoins !
          </p>
        </div>
      </div>
    </section>
    <section class="section-white">
      <div class="container">
        <div class="column">
          <h2>Un cas d'utilisation avancée</h2>
          <p>
            J'ouvre un commerce (Boulangerie) dans la région de Toulon. Je souhaite vérifier où sont situés les autres commerces.<br>
            Je constitue ma requête de la manière suivante :
          </p>
          <ul class="spaced-list">
            <li>
              D'abord, l'adresse de base pour la recherche full-text :<br>
              <a href="https://sirene.entreprise.api.gouv.fr/v1/full_text">https://sirene.entreprise.api.gouv.fr/v1/full_text</a>
            </li>
            <li>Je ne me soucie pas du nom, donc je met un astérisque :<br>
            <a href="https://sirene.entreprise.api.gouv.fr/v1/full_text/*">https://sirene.entreprise.api.gouv.fr/v1/full_text/*</a><br>
              Ma requête me renvoie pour le moment tous les établissements.
            </li>
            <li>
              Je rajoute un <strong>?</strong> pour passer aux paramètres, puis les paramètres <code>activité_principale</code> et <code>code_postal</code>, séparés par un <strong>&</strong> :<br>
              <a href="https://sirene.entreprise.api.gouv.fr/v1/full_text/*?activite_principale=CODE_ACTIVITE&code_postal=MON_CODE_POSTAL">https://sirene.entreprise.api.gouv.fr/v1/full_text/*?activite_principale=CODE_ACTIVITE&code_postal=MON_CODE_POSTAL</a>
            </li>
            <li>
              Enfin, je renseigne le code activité pour les boulangeries. Je peux trouver cette information <router-link :to="{ name: 'CodesNAF'}">sur cette page</router-link>.<br>
              L'INSEE propose également un <a href="https://www.insee.fr/fr/information/2406147">moteur de recherche</a> avec des informations supplémentaires.<br>
            </li>
            <li>    
              Le code pour les boulangeries est le 1071C, et le code postal de Toulon est le 83000. Ma requête sera donc :
              <api-doc-input :request=exempleBoulangerie1></api-doc-input>
              Il y a environ 60 établissements de boulangerie à Toulon.
            </li>
            <li>
              Comme précisé plus haut, les résultats sont paginés. Je récupère par défaut les 10 premiers, mais je peux changer cela avec les paramètres
              <code>page</code> et <code>per_page</code> :<br>
              <api-doc-input :request=exempleBoulangerie2></api-doc-input>
            </li>
          </ul>
        </div>
        <div class="column__icon">
          <img src="../assets/img/icons/croissant.svg" alt="croissant">
        </div>
      </div>
    </section>
    <section class="section-grey">
      <div class="container">
        <div class="column__icon">
          <img src="../assets/img/icons/statistics-on-a-screen.svg" alt="statistics on a screen">
        </div>
        <div class="column__right">
          <h2>Découvrez les autres APIs et jeux de données Data.gouv</h2>
          <p>
            <a href="https://data.gouv.fr">Data.gouv.fr</a> met a votre disposition de nombreux jeux de données "Open Data".<br>
            Quelques exemples :
          </p>
          <ul>
            <li>
              <a href="https://www.data.gouv.fr/fr/datasets/resultats-de-lintegralite-des-elections-depuis-2001/">Les résultats électoraux</a>
            </li>
            <li>
              <a href="https://www.data.gouv.fr/fr/datasets/fichier-des-prenoms-edition-2016/">Le fichier des prénoms</a>
            </li>
            <li>
              <a href="https://www.data.gouv.fr/fr/datasets/secteurs-de-localisation-de-la-loutre-dans-le-jura/">Les secteurs de localisation de la loutre dans le Jura</a>
            </li>
          </ul>
          <p>
            Vous pouvez également consulter des réutilisations utiles de ces jeux de données.
          </p>
          <h3>La mission Etalab</h3>
          <p>
            Etalab coordonne la politique d’ouverture et de partage des données publiques (“open data”). <a href="https://www.etalab.gouv.fr/en/qui-sommes-nous">Plus d'informations.</a>
          </p>
        </div>
      </div>
    </section>
    <section class="section-white">
      <div class="container">
        <div class="column__full center">
          <h2>Découvrez l'API Entreprise, toutes les informations sur les sociétés.</h2>
          <div class="column__img">
            <img src="../assets/img/city.svg" alt="city">
          </div>
          <h3>Vous justifiez d'une mission de service public ? L'API Entreprise est pour vous.</h3>
          <p>
            Dans le respect du principe "Dites le nous une seule fois", la DINSIC a mis en place l'API Entreprise,
            l'API qui aggrège les informations sur les entreprises.<br>
            Obtenez les Greffes, Certificats, Liasses fiscales, Attestations sociales, et bien plus encore...
          </p>
          <a class="button" href="https://www.apientreprise.fr/">Demander un accès</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ApiDocInput from '@/components/apiDoc/ApiDocInput'
// import ApiDocOutput from '@/components/apiDoc/ApiDocOutput'

export default {
  name: 'LegalNotes',
  components: {
    'ApiDocInput': ApiDocInput
    // 'ApiDocOutput': ApiDocOutput
  },
  data () {
    const baseAdress = "https://sirene.entreprise.api.gouv.fr/v1/"
    return {
      exempleSiret1: baseAdress + "siret/<VOTRE_SIRET>",
      exempleFullText1: baseAdress + "full_text/montpellier",
      exempleFullText2: baseAdress + "full_text/montpellier?page=2&per_page=20",
      exempleSiret2: baseAdress + "siret/21310555400017",
      exempleSiren: baseAdress + "siren/213105554",
      exempleBoulangerie1: baseAdress + "full_text/*?activite_principale=1071C&code_postal=83000",
      exempleBoulangerie2: baseAdress + "full_text/*?activite_principale=1071C&code_postal=83000&per_page=70"
    }
  },
  created() {
    this.$store.dispatch('hideWelcomeText')
  }
}

</script>

<style lang="scss" scoped>

section {
  padding: 20px, 0, 20px, 0;
}

p {
  min-width: 100%
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.column {
  display: flex;
  flex-direction: column;
}

.column__full {
  display: flex;
  flex-direction: column;
  min-width: 100%;
}

.center {
  align-items: center;
  text-align: center;
}

.column__right {
  min-width: 40em;
  display: flex;
  flex-direction: column;
  text-align: right;
  align-self: flex-end;
}

.column__right > ul {
  direction:rtl;
}

.column__icon {
  width: 15em;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.column__img {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.apidoc__input {
  margin: 1em 0 1em 0;
}

.spaced-list > li {
  margin: 1em 0 1em 0;
}

h3 {
  margin-bottom: 0;
}

// Table style
table {
  margin: 25px auto;
  border-collapse: collapse;
  border: 1px solid $color-white;
  border-bottom: 2px solid $color-light-blue;
  box-shadow: 0px 0px 20px rgba(0,0,0,0.10),
     0px 10px 20px rgba(0,0,0,0.05),
     0px 20px 20px rgba(0,0,0,0.05),
     0px 30px 20px rgba(0,0,0,0.05);
  tr {
     &:hover {
      background: $color-lightest-grey;
      
      td {
        color: $color-blue;
      }
    }
  }
  th, td {
    color: $color-dark-grey;
    border: 1px solid $color-light-grey;
    padding: 12px 35px;
    border-collapse: collapse;
  }
  th {
    background: $color-light-blue;
    color: $color-white;
    text-transform: uppercase;
    font-size: 1.2em;
    &.last {
      border-right: none;
    }
  }
}
// End table style

</style>
