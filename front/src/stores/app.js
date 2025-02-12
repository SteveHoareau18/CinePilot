import { defineStore } from 'pinia'

export const useAppStore = defineStore('store', {
  state: () => ({
    menuNav: [
      {
        label: 'Accueil',
        icon: 'pi pi-home'
      },
      {
        label: 'Mes films',
        icon: 'pi pi-heart-fill',
        color: 'text-red-500'
      },
      {
        label: 'En vedette',
        icon: 'pi pi-star-fill',
        color: 'text-yellow-500'
      },
      {
        label: 'Catégories',
        icon: 'pi pi-list',
        items: [
          {
            label: 'Action',
          },
          {
            label: 'Comédie',
          },
          {
            label: 'Horreur',
          },
        ]
      },
    ],
    adminNav: [{
      label: 'Administration',
      icon: 'pi pi-wrench',
      items: [
        {
          label: 'Films',
          items: [
            {
              label: "Créer",
              icon: 'pi pi-plus',
              route: '/movie/create'
            },
            {
              label: "Modifier",
              icon: 'pi pi-pencil',
              route: '/movie/edit'
            },
            {
              label: "Supprimer",
              icon: 'pi pi-trash',
              route: '/movie/delete'
            },
          ]
        },
        {
          label: 'Salles',
          items: [
            {
              label: "Créer",
              icon: 'pi pi-plus',
            },
            {
              label: "Modifier",
              icon: 'pi pi-pencil',
            },
            {
              label: "Supprimer",
              icon: 'pi pi-trash',
            },
          ]
        },
      ]
    },],
    adminMode: false
  }),
  getters: {
    getMenuNav: (state) => {
      if (state.adminMode) return [...state.menuNav, ...state.adminNav]
      return state.menuNav
    },
    isAppAdminMode: (state) => {
      return state.adminMode
    }
  },
  actions: {
    setAppMode(admin) {
      this.adminMode = admin
    }
  }
})
