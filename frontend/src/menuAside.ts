import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },
  
  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ?? icon.mdiTable,
    permissions: 'READ_USERS'
  },
  {
    href: '/roles/roles-list',
    label: 'Roles',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountVariantOutline ?? icon.mdiTable,
    permissions: 'READ_ROLES'
  },
  {
    href: '/permissions/permissions-list',
    label: 'Permissions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountOutline ?? icon.mdiTable,
    permissions: 'READ_PERMISSIONS'
  },
  {
    href: '/franchises/franchises-list',
    label: 'Franchises',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiMovieOpenStar' in icon ? icon['mdiMovieOpenStar' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_FRANCHISES'
  },
  {
    href: '/titles/titles-list',
    label: 'Titles',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiMovie' in icon ? icon['mdiMovie' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_TITLES'
  },
  {
    href: '/seasons/seasons-list',
    label: 'Seasons',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiTelevisionClassic' in icon ? icon['mdiTelevisionClassic' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_SEASONS'
  },
  {
    href: '/episodes/episodes-list',
    label: 'Episodes',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiPlayBoxMultiple' in icon ? icon['mdiPlayBoxMultiple' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_EPISODES'
  },
  {
    href: '/watch_entries/watch_entries-list',
    label: 'Watch entries',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiCheckCircleOutline' in icon ? icon['mdiCheckCircleOutline' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_WATCH_ENTRIES'
  },
  {
    href: '/watchlist_items/watchlist_items-list',
    label: 'Watchlist items',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiPlaylistPlay' in icon ? icon['mdiPlaylistPlay' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_WATCHLIST_ITEMS'
  },
  {
    href: '/tags/tags-list',
    label: 'Tags',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiTagMultiple' in icon ? icon['mdiTagMultiple' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_TAGS'
  },
  {
    href: '/title_tags/title_tags-list',
    label: 'Title tags',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiTagOutline' in icon ? icon['mdiTagOutline' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_TITLE_TAGS'
  },
  {
    href: '/attachments/attachments-list',
    label: 'Attachments',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiPaperclip' in icon ? icon['mdiPaperclip' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_ATTACHMENTS'
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },

 
  {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS'
  },
]

export default menuAside
