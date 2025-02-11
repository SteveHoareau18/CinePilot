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
    adminMode: false
  }),
  getters: {
    getMenuNav: (state) => {
      return state.menuNav
    },
    isAppAdminMode: (state) => {
      return state.adminMode
    }
  },
  actions: {}
})
