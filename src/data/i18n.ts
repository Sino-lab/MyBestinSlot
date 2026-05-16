import type { Lang } from '../types'

const I18N: Record<Lang, Record<string, string>> = {
  en: {
    nav_all: 'All BiS', nav_reco: 'Recommendations', nav_mylist: 'My List', nav_guild: 'My Roster',
    allbis_title: 'All BiS', lbl_class: 'Class', lbl_spec: 'Spec',
    welcome_title: 'Choose your class',
    reco_desc: 'Select a class and spec to get your prioritized BiS. Click "Add to My List" on any item.',
    reco_title: 'Recommendations', reco_sub: 'Sorted by upgrade score for your spec',
    mylist_title: 'My List', export_btn: 'Export / Share',
    overall_progress: 'Overall', obtained: 'Obtained', items_tracked: 'Items tracked',
    filter_by: 'Filter', all: 'All', to_get: 'To get', obtained_f: 'Obtained',
    ml_empty: 'Your list is empty. Browse All BiS or Recommendations to add items.',
    guild_title: 'My Roster', loots_recv: 'Loots', bis_drops: 'BiS drops',
    by_boss: 'By Boss', by_player: 'By Player', mode_del: 'Delves',
    export_title: 'Export my list', copy_text: 'Copy text', save_img: 'Save image', cancel: 'Cancel',
    add_to_list: '+ My List', in_my_list: '✓ In list',
    role_dps: 'DPS', role_tank: 'Tank', role_healer: 'Healer',
  },
  fr: {
    nav_all: 'Tous les BiS', nav_reco: 'Recommandations', nav_mylist: 'Ma Liste', nav_guild: 'My Roster',
    allbis_title: 'Tous les BiS', lbl_class: 'Classe', lbl_spec: 'Spé',
    welcome_title: 'Choisissez votre classe',
    reco_desc: 'Sélectionnez une classe et une spé pour voir vos BiS. Cliquez "+ Ma Liste" pour ajouter.',
    reco_title: 'Recommandations', reco_sub: 'Classées par score pour votre spé',
    mylist_title: 'Ma Liste', export_btn: 'Exporter / Partager',
    overall_progress: 'Global', obtained: 'Obtenus', items_tracked: 'Items suivis',
    filter_by: 'Filtrer', all: 'Tous', to_get: 'À obtenir', obtained_f: 'Obtenus',
    ml_empty: 'Votre liste est vide. Parcourez Tous les BiS ou les Recommandations.',
    guild_title: 'My Roster', loots_recv: 'Loots', bis_drops: 'Drops BiS',
    by_boss: 'Par Boss', by_player: 'Par Joueur', mode_del: 'Gouffre',
    export_title: 'Exporter ma liste', copy_text: 'Copier texte', save_img: 'Image', cancel: 'Annuler',
    add_to_list: '+ Ma liste', in_my_list: '✓ Dans ma liste',
    role_dps: 'DPS', role_tank: 'Tank', role_healer: 'Soigneur',
  },
}

export function t(key: string, lang: Lang): string {
  return (I18N[lang] ?? I18N.en)[key] ?? key
}
