import axios from "axios"

class MovieService {

    movies = [
        {
            "id": 1,
            "nom": "Le Grand Évasion",
            "annee": "2022",
            "realisateur": "Gaêl Monfils",
            "category": "Action",
            "author": "Jean Dupont",
            "actor": "Pierre Martin",
            "duree": "1h25",
            "rating": 4,
            "image": "https://media.senscritique.com/media/000012268355/0/la_grande_evasion.jpg",
            "price": {
                "child": "5",
                "student": "8",
                "adult": "13"
            }, favorite: false
        },
        {
            "id": 2,
            "nom": "Amour et Destin",
            "category": "Romance",
            "author": "Marie Leblanc",
            "actor": "Sophie Moreau",
            "rating": 3.8,
            "image": "https://resize.elle.fr/article/var/oa/content/images/tests/original/4065_test-1670859518.jpg",
            "price": {
                "child": "5",
                "student": "8",
                "adult": "13"
            }, favorite: false
        },
        {
            "id": 3,
            "nom": "Les Mystères de Paris",
            "category": "Mystère",
            "author": "Paul Girard",
            "actor": "Luc Durand",
            "rating": 4.9,
            "image": "https://lisez0.cdnstatics.com/usuaris/libros/fotos/9782264083/m_libros/9782264082992ORI.jpg",
            "price": {
                "child": "5",
                "student": "8",
                "adult": "13"
            }, favorite: false
        },
        {
            "id": 4,
            "nom": "Le Rire d'Anna",
            "category": "Comédie",
            "author": "Julie Vernier",
            "actor": "Anna Simon",
            "rating": 4.2,
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQj93XsGWSZYjLGfQxewFaFLH3Msvp0i-46A&s",
            "price": {
                "child": "5",
                "student": "8",
                "adult": "13"
            }, favorite: false
        },
        {
            "id": 5,
            "nom": "La Guerre des Ombres",
            "category": "Science-fiction",
            "author": "Albert Lemaitre",
            "actor": "François Dubois",
            "rating": 3,
            "image": "https://m.media-amazon.com/images/I/71CZTGdF9YL._UF1000,1000_QL80_.jpg",
            "price": {
                "child": "5",
                "student": "8",
                "adult": "13"
            }, favorite: false
        },
        {
            "id": 6,
            "nom": "Le Chant de la Forêt",
            "category": "Aventure",
            "author": "Émilie Roche",
            "actor": "Nicolas Lefèvre",
            "rating": 2.3,
            "image": "https://www.advitamdistribution.com/app/uploads/2019/03/LE-CHANT-DE-LA-FORET_AFF_120-526x712.jpg",
            "price": {
                "child": "5",
                "student": "8",
                "adult": "13"
            }, favorite: false
        },
        {
            "id": 7,
            "nom": "Sous les Étoiles",
            "category": "Drame",
            "author": "Hélène Garnier",
            "actor": "Claire Fontaine",
            "rating": 4.5,
            "image": "https://www.editions-memo.fr/wp-content/uploads/bfi_thumb/SousLesEtoiles_DP_300-1-6itj62bdjk2cz2fgsodmsbhn2cdffcovbgtdyrxz403.jpg",
            "price": {
                "child": "5",
                "student": "8",
                "adult": "13"
            }, favorite: false
        },
        {
            "id": 8,
            "nom": "Le Secret du Pharaon",
            "category": "Historique",
            "author": "Gérard Petit",
            "actor": "Antoine Rousseau",
            "rating": 3.8,
            "image": "https://static.fnac-static.com/multimedia/Images/FR/NR/11/da/4d/5102097/1507-1/tsp20150602112836/Le-secret-du-pharaon.jpg",
            "price": {
                "child": "5",
                "student": "8",
                "adult": "13"
            }, favorite: false
        },
        {
            "id": 9,
            "nom": "L'Ombre du Silence",
            "category": "Thriller",
            "author": "Lucas Bernard",
            "actor": "Isabelle Roy",
            "rating": 3.6,
            "image": "https://static.fnac-static.com/multimedia/PE/Images/FR/NR/29/27/33/3352361/1540-1/tsp20240620082020/L-ombre-du-silence.jpg",
            "price": {
                "child": "5",
                "student": "8",
                "adult": "13"
            }, favorite: false
        },
        {
            "id": 10,
            "nom": "Les Voyages d'Élodie",
            "category": "Fantastique",
            "author": "Charlotte Besson",
            "actor": "Élodie Perrin",
            "rating": 2.4,
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZJezmj2m9LS3V9JzJMTb8r8RBrPF4IixF2Q&s",
            "price": {
                "child": "5",
                "student": "8",
                "adult": "13"
            }, favorite: false
        }
    ]

    getMoviesFromBackend(id = null) {
        return axios.get(`${import.meta.env.VITE_BACKEND_MOVIE_URL}/api/films${id ? "/" + id : ""}`)
    }


    getMovies(search = { id: null, nom: null, category: null, author: null, actor: null, rating: null }, page = 1, itemPerPage = 10) {
        switch (search) {
            case search.id:
                return this.movies.find((movie) => movie.id == search.id)

            case search.nom:
                return this.movies.filter((movie) => movie.nom == search.nom)

            case search.category:
                return this.movies.filter((movie) => movie.category == search.category)

            case search.author:
                return this.movies.filter((movie) => movie.author == search.author)

            case search.actor:
                return this.movies.filter((movie) => movie.actor == search.actor)

            case search.rating:
                return this.movies.sort(search.rating)

            default:
                return this.movies;
        }
    }
}

export default new MovieService()