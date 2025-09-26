export interface DrawerState {
  open: boolean
  openDrawer: () => void
  closeDrawer: () => void
}

export interface User {
  id: number
  name: string
  email: string
}

export interface AuthState {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

export interface ChangeLanguage {
  language: string
  changeLanguage: (x: string) => void
}
