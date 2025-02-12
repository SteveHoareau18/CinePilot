import { defineStore } from 'pinia'
import { useToast } from 'primevue'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      firstname: "ùsejfnmsoe",
      lastname: "kjsbemfije",
      username: "KIIIi",
      email: "msiuehfiushef@ooo.com",

    },
    favMovie: []
  }),
  getters: {
    getUser: (state) => {
      return Object.keys(state.user).length == 0 ? null : state.user
    },
    getUserFullname: (state) => {
      return `${state.user.lastname.toUpperCase()} ${state.user.firstname}`
    },
    getFavMovies: (state) => {
      return state.favMovie
    },
  },
  actions: {
    setFavMovies(movies) {
      const toast = useToast()

      if (Array.isArray(movies)) {
        this.favMovie = movies
      } else {
        toast.add({
          life: 5000,
          summary: "Erreur des favoris",
          detail: "Quelque chose d'inatendu s'est produit",
          severity: "error"
        })
      }
    },
    setUser({ firstname, lastname, username, email, token, tkExpireDate}) {
      this.user = {
        firstname: firstname ?? this.user.firstname,
        lastname: lastname ?? this.user.lastname,
        username: username ?? this.user.username,
        email: email ?? this.user.email,
        token: token ?? this.user.token,
        tkExpireDate: tkExpireDate ?? this.user.tkExpireDate,
      }
    }
  }
})
