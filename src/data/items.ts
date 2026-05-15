import type { Item, SlotId, SlotType } from '../types'

const WH = 'https://wow.zamimg.com/images/wow/icons/large/'

export const SLOT_ICONS: Record<SlotId, string> = {
  head: WH + 'inv_helmet_334v4.jpg',
  neck: WH + 'inv_jewelry_necklace_35.jpg',
  shoulder: WH + 'inv_shoulder_333v4.jpg',
  back: WH + 'inv_cape_335v2.jpg',
  chest: WH + 'inv_chest_plate_legionendgame_d_01.jpg',
  wrist: WH + 'inv_bracer_plate_legionendgame_d_01.jpg',
  hands: WH + 'inv_glove_plate_legionendgame_d_01.jpg',
  waist: WH + 'inv_belt_plate_legionendgame_d_01.jpg',
  legs: WH + 'inv_pant_plate_legionendgame_d_01.jpg',
  feet: WH + 'inv_boot_plate_legionendgame_d_01.jpg',
  ring1: WH + 'inv_jewelry_ring_149.jpg',
  ring2: WH + 'inv_jewelry_ring_149.jpg',
  trinket1: WH + 'inv_jewelry_trinketpvp_90_alliance.jpg',
  trinket2: WH + 'inv_inscription_talenttome01.jpg',
  mainhand: WH + 'inv_sword_2h_artifactashbringertier2_d_02.jpg',
  offhand: WH + 'inv_shield_legionendgame_d_02.jpg',
}

export const SLOT_TYPE: Record<SlotId, SlotType> = {
  head: 'Armor', neck: 'Jewelry', shoulder: 'Armor', back: 'Armor',
  chest: 'Armor', wrist: 'Armor', hands: 'Armor', waist: 'Armor',
  legs: 'Armor', feet: 'Armor', ring1: 'Jewelry', ring2: 'Jewelry',
  trinket1: 'Trinket', trinket2: 'Trinket', mainhand: 'Weapon', offhand: 'Weapon',
}

export const SLOT_LABELS: Record<'en' | 'fr', Record<SlotId, string>> = {
  en: {
    head: 'Head', neck: 'Neck', shoulder: 'Shoulders', back: 'Back',
    chest: 'Chest', wrist: 'Wrists', hands: 'Hands', waist: 'Waist',
    legs: 'Legs', feet: 'Feet', ring1: 'Ring', ring2: 'Ring',
    trinket1: 'Trinket', trinket2: 'Trinket', mainhand: 'Main Hand', offhand: 'Off Hand',
  },
  fr: {
    head: 'Tête', neck: 'Cou', shoulder: 'Épaules', back: 'Dos',
    chest: 'Torse', wrist: 'Poignets', hands: 'Mains', waist: 'Ceinture',
    legs: 'Jambes', feet: 'Pieds', ring1: 'Anneau', ring2: 'Anneau',
    trinket1: 'Bibelot', trinket2: 'Bibelot', mainhand: 'Main principale', offhand: 'Main secondaire',
  },
}

function genAllBIS(): Item[] {
  const pool: { slot: SlotId; items: [string, string, Item['q'], number, Item['mode']][] }[] = [
    { slot: 'head', items: [
      // Raid – Midnight
      ["Capuche à plumes de traque-ronces", "Lu'ashal", 'epic', 197, 'raid'],
      ["Cabasset de commandement de l'ost", "Lu'ashal", 'epic', 197, 'raid'],
      ["Masque de l'intention la plus sombre", 'Glas de minuit', 'epic', 197, 'raid'],
      ["Semblance de l'oubli", 'Glas de minuit', 'epic', 197, 'raid'],
      ['Visage de la nuit dévorante', 'Imperator Averzian', 'epic', 197, 'raid'],
      ['Semonce de frénésie', 'Vorasius', 'epic', 197, 'raid'],
      ['Couronne du tyran brisé', 'Roi déchu Salhadaar', 'epic', 197, 'raid'],
      ['Regard de la déchaînée', 'Couronne du cosmos', 'epic', 197, 'raid'],
      // M+ – ilvl 108 (scale avec le niveau de clé)
      ['Halo aube-de-ronces', 'Flèche de Coursevent', 'epic', 108, 'mythicplus'],
      ["Mézail terni de l'archère", 'Flèche de Coursevent', 'epic', 108, 'mythicplus'],
      ['Ombremasque mâchesort', 'Terrasse des Magistères', 'epic', 108, 'mythicplus'],
      ['Visage du vortex', 'Terrasse des Magistères', 'epic', 108, 'mythicplus'],
      ['Grand heaume de tentation', "L'Allée du meurtre", 'epic', 108, 'mythicplus'],
      ['Cauchemar de Nalorakk', 'Antre de Nalorakk', 'epic', 108, 'mythicplus'],
      ['Couronne vile fétide', 'Cavernes de Maisara', 'epic', 108, 'mythicplus'],
      ['Canopée de racine du monde', 'Le val Aveuglant', 'epic', 108, 'mythicplus'],
      ['Couronne marquée par le Vide', 'Arène de la Cicatrice du Vide', 'epic', 108, 'mythicplus'],
      ['Visière des prédations', 'Arène de la Cicatrice du Vide', 'epic', 108, 'mythicplus'],
      ['Diadème de surveillance', 'Arène de la Cicatrice du Vide', 'epic', 108, 'mythicplus'],
      // Gouffres
      ['Casque du pilleur des gouffres', 'Gouffres de Midnight', 'epic', 108, 'delves'],
      ["Heaume des profondeurs d'ombre", 'Gouffres de Midnight', 'epic', 108, 'delves'],
    ]},
    { slot: 'neck', items: [
      // Raid
      ["Chaîne d'observation ancienne", 'Pincombe', 'epic', 197, 'raid'],
      ["Amulette de l'hymne abyssal", 'Glas de minuit', 'epic', 197, 'raid'],
      ['Ruban de malveillance enroulée', 'Roi déchu Salhadaar', 'epic', 197, 'raid'],
      ["Chaîne éternelle de Chantevide", 'Couronne du cosmos', 'epic', 197, 'raid'],
      ["Bague d'espoir sin'dorei", "Belo'ren, enfant d'Al'ar", 'epic', 197, 'raid'],
      // M+
      ['Pendentif de chagrin lancinant', 'Flèche de Coursevent', 'epic', 108, 'mythicplus'],
      ["Joug de l'ours coureur", 'Antre de Nalorakk', 'epic', 108, 'mythicplus'],
      // Gouffres
      ['Pendentif des abysses du gouffre', 'Gouffres de Midnight', 'epic', 108, 'delves'],
    ]},
    { slot: 'shoulder', items: [
      // Raid
      ["Mantelet du Vide résonnant", "Belo'ren, enfant d'Al'ar", 'epic', 197, 'raid'],
      ["Spallières jugées par la Lumière", 'Imperator Averzian', 'epic', 197, 'raid'],
      ["Épaulettes d'effroi de marchenéant", 'Vaelgor et Ezzorak', 'epic', 197, 'raid'],
      ["Spallières en lumécorce fleurie", 'Avant-garde lumaveuglée', 'epic', 197, 'raid'],
      // M+
      ['Mantelet de sombre dévotion', 'Flèche de Coursevent', 'epic', 108, 'mythicplus'],
      ['Mantelet du grunt déchu', 'Flèche de Coursevent', 'epic', 108, 'mythicplus'],
      ["Spallières du vol de la flèche", 'Flèche de Coursevent', 'epic', 108, 'mythicplus'],
      ['Gangrépaulettes cliquetantes', "L'Allée du meurtre", 'epic', 108, 'mythicplus'],
      ['Spallières de pillage', 'Antre de Nalorakk', 'epic', 108, 'mythicplus'],
      ['Spallières incendiaires', 'Point-nexus Xenas', 'epic', 108, 'mythicplus'],
      ["Harnais d'amalgame", 'Cavernes de Maisara', 'epic', 108, 'mythicplus'],
      ["Épines d'os ensorcelées", 'Cavernes de Maisara', 'epic', 108, 'mythicplus'],
      ['Poids de réanimation', 'Cavernes de Maisara', 'epic', 108, 'mythicplus'],
      ['Collerette racine-de-fer', 'Le val Aveuglant', 'epic', 108, 'mythicplus'],
      ['Mantelet de Nysarra', 'Point-nexus Xenas', 'epic', 108, 'mythicplus'],
      ['Spallières sombres', 'Arène de la Cicatrice du Vide', 'epic', 108, 'mythicplus'],
      ["Espauliers de l'empoisonneuse", 'Arène de la Cicatrice du Vide', 'epic', 108, 'mythicplus'],
      // Gouffres
      ['Épaulières des profondeurs du gouffre', 'Gouffres de Midnight', 'epic', 108, 'delves'],
    ]},
    { slot: 'back', items: [
      // Raid
      ["Bannière de l'imperator", 'Imperator Averzian', 'epic', 197, 'raid'],
      ['Cape du Néant draconique', 'Vaelgor et Ezzorak', 'epic', 197, 'raid'],
      // M+
      ['Voile clandestin', "L'Allée du meurtre", 'epic', 108, 'mythicplus'],
      ["Voile de la chasseuse d'âmes", 'Cavernes de Maisara', 'epic', 108, 'mythicplus'],
      ['Burnous épine-sanglante', 'Le val Aveuglant', 'epic', 108, 'mythicplus'],
      ['Cape tisseflux', 'Point-nexus Xenas', 'epic', 108, 'mythicplus'],
      ['Drapé de défense réfractaire', 'Terrasse des Magistères', 'epic', 108, 'mythicplus'],
      // Gouffres
      ['Manteau des explorateurs du gouffre', 'Gouffres de Midnight', 'epic', 108, 'delves'],
    ]},
    { slot: 'chest', items: [
      // Raid
      ["Robe dorée d'étude abjecte", "Lu'ashal", 'epic', 197, 'raid'],
      ["Pourpoint soigne-étreinte radieux", "Belo'ren, enfant d'Al'ar", 'epic', 197, 'raid'],
      ["Robe de l'oubli infini", 'Glas de minuit', 'epic', 197, 'raid'],
      ['Robe de lien du Vide', 'Imperator Averzian', 'epic', 197, 'raid'],
      ['Grande tenue despotique', 'Roi déchu Salhadaar', 'epic', 197, 'raid'],
      ['Cuirasse liée par le soleil', 'Couronne du cosmos', 'epic', 197, 'raid'],
      // M+
      ['Gilet de la trombe hurlante', 'Flèche de Coursevent', 'epic', 108, 'mythicplus'],
      ['Coque de gardien arcanique', 'Terrasse des Magistères', 'epic', 108, 'mythicplus'],
      ['Cotte de limon déformée par le Vide', 'Terrasse des Magistères', 'epic', 108, 'mythicplus'],
      ["Vareuse d'ascendance ombreuse", 'Terrasse des Magistères', 'epic', 108, 'mythicplus'],
      ['Baudrier des moissons détournées', 'Antre de Nalorakk', 'epic', 108, 'mythicplus'],
      ['Prix de défi de la citadelle', 'Antre de Nalorakk', 'epic', 108, 'mythicplus'],
      ["Habits de l'épreuve guerrière", 'Antre de Nalorakk', 'epic', 108, 'mythicplus'],
      ['Cuirasse putréfiée', 'Cavernes de Maisara', 'epic', 108, 'mythicplus'],
      ['Protège-côtes de racine pivotante', 'Le val Aveuglant', 'epic', 108, 'mythicplus'],
      ['Gilet maudissant', 'Point-nexus Xenas', 'epic', 108, 'mythicplus'],
      ['Peau de pestilence', 'Arène de la Cicatrice du Vide', 'epic', 108, 'mythicplus'],
      ['Gilet de manipulation', 'Arène de la Cicatrice du Vide', 'epic', 108, 'mythicplus'],
      // Gouffres
      ['Plastron des récupérateurs du gouffre', 'Gouffres de Midnight', 'epic', 108, 'delves'],
      ["Armure de l'éclaireur des abysses", 'Gouffres de Midnight', 'epic', 108, 'delves'],
    ]},
    { slot: 'wrist', items: [
      // Raid
      ['Brassards de marche de la Lumière', 'Imperator Averzian', 'epic', 197, 'raid'],
      ['Crispins du roi déchu', 'Roi déchu Salhadaar', 'epic', 197, 'raid'],
      // M+
      ['Vareuse de chasse au Troll', 'Cavernes de Maisara', 'epic', 108, 'mythicplus'],
      ['Brassards ambrefronde', 'Flèche de Coursevent', 'epic', 108, 'mythicplus'],
      ['Crispins de détention', 'Terrasse des Magistères', 'epic', 108, 'mythicplus'],
      ['Vareuse du courroux vigilant', 'Terrasse des Magistères', 'epic', 108, 'mythicplus'],
      ['Bracières mordilleuses', "L'Allée du meurtre", 'epic', 108, 'mythicplus'],
      ['Protège-bras du surveillant', "L'Allée du meurtre", 'epic', 108, 'mythicplus'],
      ['Bracelets empennés de fureur', "L'Allée du meurtre", 'epic', 108, 'mythicplus'],
      ["Brassards d'accolade de l'hiver", 'Antre de Nalorakk', 'epic', 108, 'mythicplus'],
      ['Brassards garde-racines', 'Le val Aveuglant', 'epic', 108, 'mythicplus'],
      ['Brassards plaie-des-cédraptors', 'Le val Aveuglant', 'epic', 108, 'mythicplus'],
      ['Manchettes de Kasreth', 'Point-nexus Xenas', 'epic', 108, 'mythicplus'],
      ['Crispins de garde-cœur', 'Point-nexus Xenas', 'epic', 108, 'mythicplus'],
      // Gouffres
      ['Brassards des plongeurs du gouffre', 'Gouffres de Midnight', 'epic', 108, 'delves'],
    ]},
    { slot: 'hands', items: [
      // Raid
      ["Poignées nées des braises", "Belo'ren, enfant d'Al'ar", 'epic', 197, 'raid'],
      ["Poignes de l'aumônière de guerre", 'Avant-garde lumaveuglée', 'epic', 197, 'raid'],
      ['Poignes de la berserker détachée', 'Couronne du cosmos', 'epic', 197, 'raid'],
      // M+
      ['Poignées bosquet-de-braise', 'Flèche de Coursevent', 'epic', 108, 'mythicplus'],
      ["Poignes d'honneur oublié", 'Flèche de Coursevent', 'epic', 108, 'mythicplus'],
      ['Gants de gelée visqueuse', 'Terrasse des Magistères', 'epic', 108, 'mythicplus'],
      ['Gantelets de défense effrénée', "L'Allée du meurtre", 'epic', 108, 'mythicplus'],
      ['Pognes contrefaites', "L'Allée du meurtre", 'epic', 108, 'mythicplus'],
      ['Gantelets de changement des saisons', 'Antre de Nalorakk', 'epic', 108, 'mythicplus'],
      ['Gants en maille pulvérisants', 'Le val Aveuglant', 'epic', 108, 'mythicplus'],
      ['Liens de maléfice vil', 'Cavernes de Maisara', 'epic', 108, 'mythicplus'],
      ['Gantelets fleur d\'épines', 'Le val Aveuglant', 'epic', 108, 'mythicplus'],
      ['Choc de forge-cœur', 'Point-nexus Xenas', 'epic', 108, 'mythicplus'],
      ['Mitaines fracturées', 'Point-nexus Xenas', 'epic', 108, 'mythicplus'],
      ['Liens des hash\'ura', 'Antre de Nalorakk', 'epic', 108, 'mythicplus'],
      ['Gantelets découragés', 'Arène de la Cicatrice du Vide', 'epic', 108, 'mythicplus'],
      // Gouffres
      ['Gantelets des fouilleurs du gouffre', 'Gouffres de Midnight', 'epic', 108, 'delves'],
    ]},
    { slot: 'waist', items: [
      // Raid
      ["Ceinture de Shul'ka marquée par le dédain", 'Chimaerus, la divinité ineffable', 'epic', 197, 'raid'],
      ['Sangle fléau-du-dédain', 'Chimaerus, la divinité ineffable', 'epic', 197, 'raid'],
      ["Écharpe gravée de murmures", "Belo'ren, enfant d'Al'ar", 'epic', 197, 'raid'],
      ['Baudrier de la marche infinie', 'Imperator Averzian', 'epic', 197, 'raid'],
      ["Écharpe du Crépuscule dénaturé", 'Roi déchu Salhadaar', 'epic', 197, 'raid'],
      ["Lien d'obscurité d'Ezzorak", 'Vaelgor et Ezzorak', 'epic', 197, 'raid'],
      ['Corde cintrée du jugement', 'Avant-garde lumaveuglée', 'epic', 197, 'raid'],
      ['Sangle en anneaux liée par la haine', 'Couronne du cosmos', 'epic', 197, 'raid'],
      // M+
      ['Cordelière claquevigne', 'Flèche de Coursevent', 'epic', 108, 'mythicplus'],
      ['Defenseur crochéventre', 'Flèche de Coursevent', 'epic', 108, 'mythicplus'],
      ["Fermoir d'exécution", 'Terrasse des Magistères', 'epic', 108, 'mythicplus'],
      ['Solécharpe de Cinglesoleil', 'Terrasse des Magistères', 'epic', 108, 'mythicplus'],
      ['Ceinturon scinde-ombre', 'Terrasse des Magistères', 'epic', 108, 'mythicplus'],
      ["Ceinture de don de l'automne", 'Antre de Nalorakk', 'epic', 108, 'mythicplus'],
      ['Corde de défense tribale', 'Antre de Nalorakk', 'epic', 108, 'mythicplus'],
      ['Cordelière de fauconnerie', 'Cavernes de Maisara', 'epic', 108, 'mythicplus'],
      ['Cordelière lumiflore', 'Le val Aveuglant', 'epic', 108, 'mythicplus'],
      ["Ceinture d'arpente-racine", 'Le val Aveuglant', 'epic', 108, 'mythicplus'],
      ['Lien-du-Néant éthérien', 'Arène de la Cicatrice du Vide', 'epic', 108, 'mythicplus'],
      ['Baudrier de béhémoth', 'Arène de la Cicatrice du Vide', 'epic', 108, 'mythicplus'],
      // Gouffres
      ['Ceinturon des excavateurs du gouffre', 'Gouffres de Midnight', 'epic', 108, 'delves'],
    ]},
    { slot: 'legs', items: [
      // Raid
      ['Hauts-de-chausses de voltige dévorants', "Lu'ashal", 'epic', 197, 'raid'],
      ["Gardécaille de la flamme éternelle", "Belo'ren, enfant d'Al'ar", 'epic', 197, 'raid'],
      ["Garde-jambes d'extinction", 'Glas de minuit', 'epic', 197, 'raid'],
      ["Jambières de l'avancée dévorante", 'Imperator Averzian', 'epic', 197, 'raid'],
      ['Grèves sangrelumes', 'Avant-garde lumaveuglée', 'epic', 197, 'raid'],
      ['Culotte de lamenuit', 'Couronne du cosmos', 'epic', 197, 'raid'],
      // M+
      ["Jambards d'héritages persistants", 'Flèche de Coursevent', 'epic', 108, 'mythicplus'],
      ['Braies délavées du commandant', 'Flèche de Coursevent', 'epic', 108, 'mythicplus'],
      ['Jambières de conduite exemplaire', 'Terrasse des Magistères', 'epic', 108, 'mythicplus'],
      ['Cuissards de la pénombre rémanente', 'Terrasse des Magistères', 'epic', 108, 'mythicplus'],
      ['Braies des transactions habiles', "L'Allée du meurtre", 'epic', 108, 'mythicplus'],
      ['Garde-jambes du rêve forestier', 'Antre de Nalorakk', 'epic', 108, 'mythicplus'],
      ['Chausses en tisse-mal', 'Cavernes de Maisara', 'epic', 108, 'mythicplus'],
      ['Braies de roche mère', 'Le val Aveuglant', 'epic', 108, 'mythicplus'],
      ['Jambières lumsporeuses', 'Le val Aveuglant', 'epic', 108, 'mythicplus'],
      ['Jambières des lignes telluriques', 'Point-nexus Xenas', 'epic', 108, 'mythicplus'],
      ['Cuissières marquées par la Lumière', 'Point-nexus Xenas', 'epic', 108, 'mythicplus'],
      ['Grèves de la ruse divine', 'Point-nexus Xenas', 'epic', 108, 'mythicplus'],
      // Gouffres
      ['Jambières des plongeurs du gouffre', 'Gouffres de Midnight', 'epic', 108, 'delves'],
      ["Grèves de l'arpenteur des abysses", 'Gouffres de Midnight', 'epic', 108, 'delves'],
    ]},
    { slot: 'feet', items: [
      // Raid
      ['Cuissardes brûlées par le Rêve', 'Chimaerus, la divinité ineffable', 'epic', 197, 'raid'],
      ["Grèves de l'informe", 'Chimaerus, la divinité ineffable', 'epic', 197, 'raid'],
      ['Bottines marchobscure', "Belo'ren, enfant d'Al'ar", 'epic', 197, 'raid'],
      ["Solerets d'obscurcissement", 'Imperator Averzian', 'epic', 197, 'raid'],
      ['Frappe-tibias réclamés par le Vide', 'Imperator Averzian', 'epic', 197, 'raid'],
      ['Mules de la flamme de minuit', 'Vaelgor et Ezzorak', 'epic', 197, 'raid'],
      ['Bottillons de marche-canopée', 'Couronne du cosmos', 'epic', 197, 'raid'],
      // M+
      ['Solerets fouette-bobine', 'Flèche de Coursevent', 'epic', 108, 'mythicplus'],
      ['Solerets de revanche furieuse', 'Flèche de Coursevent', 'epic', 108, 'mythicplus'],
      ['Croquenots assermentés', 'Terrasse des Magistères', 'epic', 108, 'mythicplus'],
      ['Bottines redoutables du Domanaar', 'Terrasse des Magistères', 'epic', 108, 'mythicplus'],
      ['Semelles imbibée de corruption', "L'Allée du meurtre", 'epic', 108, 'mythicplus'],
      ['Sandales tempétueuses', "L'Allée du meurtre", 'epic', 108, 'mythicplus'],
      ['Protège-tibias de la tribu oubliée', 'Antre de Nalorakk', 'epic', 108, 'mythicplus'],
      ["Jambards d'exploration arctique", 'Antre de Nalorakk', 'epic', 108, 'mythicplus'],
      ['Traqueurs nocteproie', 'Cavernes de Maisara', 'epic', 108, 'mythicplus'],
      ["Bottillons d'infortune", 'Cavernes de Maisara', 'epic', 108, 'mythicplus'],
      ["Espadrilles de l'éclipse", 'Point-nexus Xenas', 'epic', 108, 'mythicplus'],
      ['Croquenots érodés par la faille', 'Arène de la Cicatrice du Vide', 'epic', 108, 'mythicplus'],
      // Gouffres
      ['Bottes des éclaireurs du gouffre', 'Gouffres de Midnight', 'epic', 108, 'delves'],
    ]},
    { slot: 'ring1', items: [
      // Raid
      ["Chevalière d'ombre envahissante", 'Prédaxas', 'epic', 197, 'raid'],
      ["Bague d'espoir sin'dorei", "Belo'ren, enfant d'Al'ar", 'epic', 197, 'raid'],
      ["Œil de minuit", 'Glas de minuit', 'epic', 197, 'raid'],
      ['Chevalière de la bête affamée', 'Vorasius', 'epic', 197, 'raid'],
      ['Lien de Lumière', 'Avant-garde lumaveuglée', 'epic', 197, 'raid'],
      // M+
      ['Omission de la Lumière', 'Point-nexus Xenas', 'epic', 108, 'mythicplus'],
      ['Bague de bifurcation', 'Terrasse des Magistères', 'epic', 108, 'mythicplus'],
      ['Chevalière de servitude teigneuse', "L'Allée du meurtre", 'epic', 108, 'mythicplus'],
      ['Bague précieuse chapardée', 'Antre de Nalorakk', 'epic', 108, 'mythicplus'],
      ['Lien de gardelumière', 'Le val Aveuglant', 'epic', 108, 'mythicplus'],
      ['Occlusion du Vide', 'Point-nexus Xenas', 'epic', 108, 'mythicplus'],
      // Gouffres
      ['Anneau des gardiens du gouffre', 'Gouffres de Midnight', 'epic', 108, 'delves'],
    ]},
    { slot: 'ring2', items: [
      // M+
      ['Bague des profondeurs du gouffre', 'Gouffres de Midnight', 'epic', 108, 'delves'],
    ]},
    { slot: 'trinket1', items: [
      // Raid
      ["Insigne pérégrin perdu", "Lu'ashal", 'epic', 197, 'raid'],
      ["Regard de prophète d'Aln", 'Chimaerus, la divinité ineffable', 'epic', 197, 'raid'],
      ['Vestige suintant de la divinité ineffable', 'Chimaerus, la divinité ineffable', 'epic', 197, 'raid'],
      ['Plume rayonnante', "Belo'ren, enfant d'Al'ar", 'epic', 197, 'raid'],
      ["L'œuf éternel", "Belo'ren, enfant d'Al'ar", 'epic', 197, 'raid'],
      ['Lumière du crescendo cosmique', 'Glas de minuit', 'epic', 197, 'raid'],
      ['Ombre du requiem empyréen', 'Glas de minuit', 'epic', 197, 'raid'],
      ['Guidon de la compagnie de la Lumière', 'Imperator Averzian', 'epic', 197, 'raid'],
      ['Cœur de faim ancienne', 'Vorasius', 'epic', 197, 'raid'],
      ['Bandelettes de folie cosmique', 'Roi déchu Salhadaar', 'epic', 197, 'raid'],
      ['Saturateur du Vide instable', 'Roi déchu Salhadaar', 'epic', 197, 'raid'],
      ["Écaille-d'effroi de tristegerbe", 'Vaelgor et Ezzorak', 'epic', 197, 'raid'],
      ['Ultime regard de Vaelgor', 'Vaelgor et Ezzorak', 'epic', 197, 'raid'],
      ['Litanie de courroux lumaveuglé', 'Avant-garde lumaveuglée', 'epic', 197, 'raid'],
      ["Ruban de l'Arpenteur des ombres", 'Couronne du cosmos', 'epic', 197, 'raid'],
      ['Insigne iridescent de capitaine des forestiers', 'Couronne du cosmos', 'epic', 197, 'raid'],
      // M+
      ['Plume de braisaile', 'Flèche de Coursevent', 'epic', 108, 'mythicplus'],
      ['Marque de Lumière', "L'Allée du meurtre", 'epic', 108, 'mythicplus'],
      ['Réplication de gelée', 'Cavernes de Maisara', 'epic', 108, 'mythicplus'],
      ['Flamme de lien de Cœur-de-Mana', "L'Allée du meurtre", 'epic', 108, 'mythicplus'],
      ['Essence de pergélisol', 'Antre de Nalorakk', 'epic', 108, 'mythicplus'],
      ["Tumeur de l'essaim", 'Cavernes de Maisara', 'epic', 108, 'mythicplus'],
      ['Orbe de ravitaillement', 'Flèche de Coursevent', 'epic', 108, 'mythicplus'],
      ['Remède mycolique', 'Terrasse des Magistères', 'epic', 108, 'mythicplus'],
      // Gouffres
      ['Pierre de résonance des gouffres', 'Gouffres de Midnight', 'epic', 108, 'delves'],
      ['Cristal des profondeurs abyssales', 'Gouffres de Midnight', 'epic', 108, 'delves'],
    ]},
    { slot: 'trinket2', items: [
      // Gouffres
      ['Amulette des récupérateurs du gouffre', 'Gouffres de Midnight', 'epic', 108, 'delves'],
    ]},
    { slot: 'mainhand', items: [
      // Raid
      ["Fendoir de bête d'aube agitée", "Lu'ashal", 'epic', 197, 'raid'],
      ["Sceptre de la Lumière déliée", "Lu'ashal", 'epic', 197, 'raid'],
      ['Daguortie boudeuse', "Thorm'belan", 'epic', 197, 'raid'],
      ['Lame-épine florissante', "Thorm'belan", 'epic', 197, 'raid'],
      ['Florapointe bestiale', "Thorm'belan", 'epic', 197, 'raid'],
      ["Tranche-âmes de l'avant-garde dévorante", 'Prédaxas', 'epic', 197, 'raid'],
      ["Flèche d'arque-Vide", 'Prédaxas', 'epic', 197, 'raid'],
      ['Arc long brutal de sentinelle forestière', 'Pincombe', 'epic', 197, 'raid'],
      ["Flèche rejetée d'Aln", 'Chimaerus, la divinité ineffable', 'epic', 197, 'raid'],
      ["Serre rapide de Belo'ren", "Belo'ren, enfant d'Al'ar", 'epic', 197, 'raid'],
      ["Belo'melorn la Serre brisée", "Belo'ren, enfant d'Al'ar", 'epic', 197, 'raid'],
      ["Alah'endal, la chantelaube", 'Glas de minuit', 'epic', 197, 'raid'],
      ['Brasero de la complainte dissonante', 'Glas de minuit', 'epic', 197, 'raid'],
      ['Poids du commandement', 'Imperator Averzian', 'epic', 197, 'raid'],
      ['Fusil frappe-soleil', 'Imperator Averzian', 'epic', 197, 'raid'],
      ['Allonge inéluctable', 'Vorasius', 'epic', 197, 'raid'],
      ['Victoire affamée', 'Vorasius', 'epic', 197, 'raid'],
      ['Lame du Crépuscule final', 'Roi déchu Salhadaar', 'epic', 197, 'raid'],
      ['Lames de poings du tourmenteur', 'Roi déchu Salhadaar', 'epic', 197, 'raid'],
      ['Solglaive blasonné', 'Vaelgor et Ezzorak', 'epic', 197, 'raid'],
      ['Caresse des frères de couvée', 'Vaelgor et Ezzorak', 'epic', 197, 'raid'],
      ['Jugement final de Bellamy', 'Avant-garde lumaveuglée', 'epic', 197, 'raid'],
      ['Lame du verdict aveugle', 'Avant-garde lumaveuglée', 'epic', 197, 'raid'],
      ['Arc à double courbure létal de la capitaine des forestiers', 'Couronne du cosmos', 'epic', 197, 'raid'],
      ['Faux écho de Turalyon', 'Couronne du cosmos', 'epic', 197, 'raid'],
      // M+
      ['Rameau de garde-racines', 'Flèche de Coursevent', 'epic', 108, 'mythicplus'],
      ["Championne d'Aube-de-Braise", 'Flèche de Coursevent', 'epic', 108, 'mythicplus'],
      ["Casse-tête d'excavation", 'Flèche de Coursevent', 'epic', 108, 'mythicplus'],
      ['Fendoir usé par la guerre', 'Flèche de Coursevent', 'epic', 108, 'mythicplus'],
      ["Cœur de l'ouragan", 'Flèche de Coursevent', 'epic', 108, 'mythicplus'],
      ['Masse du méfait', 'Terrasse des Magistères', 'epic', 108, 'mythicplus'],
      ['Runeglaive résolu', 'Terrasse des Magistères', 'epic', 108, 'mythicplus'],
      ['Aiguillon scinde-voile', 'Terrasse des Magistères', 'epic', 108, 'mythicplus'],
      ['Fendoir du Vide tournoyant', 'Terrasse des Magistères', 'epic', 108, 'mythicplus'],
      ['Trancheuse entaille-ombre', 'Terrasse des Magistères', 'epic', 108, 'mythicplus'],
      ["Bâton d'entraînement de Mordicus", "L'Allée du meurtre", 'epic', 108, 'mythicplus'],
      ['Tristelame', "L'Allée du meurtre", 'epic', 108, 'mythicplus'],
      ['Fendoir de Xathuux', "L'Allée du meurtre", 'epic', 108, 'mythicplus'],
      ['Lame surgelée de la victoire', 'Antre de Nalorakk', 'epic', 108, 'mythicplus'],
      ['Bâton de mandataire déchu', 'Antre de Nalorakk', 'epic', 108, 'mythicplus'],
      ['Serre de traîtrise', 'Cavernes de Maisara', 'epic', 108, 'mythicplus'],
      ['Malégriffes du berserker', 'Cavernes de Maisara', 'epic', 108, 'mythicplus'],
      ["Sabre d'abordage d'éventre-âme", 'Cavernes de Maisara', 'epic', 108, 'mythicplus'],
      ['Arc-putride de tromperie', 'Cavernes de Maisara', 'epic', 108, 'mythicplus'],
      ['Fendoir fléau-de-l\'âme', 'Cavernes de Maisara', 'epic', 108, 'mythicplus'],
      ['Laméfice de cérémonie', 'Cavernes de Maisara', 'epic', 108, 'mythicplus'],
      ['Lame-épine', 'Le val Aveuglant', 'epic', 108, 'mythicplus'],
      ["Lance d'élagage", 'Le val Aveuglant', 'epic', 108, 'mythicplus'],
      ['Tranchant serre-épine', 'Le val Aveuglant', 'epic', 108, 'mythicplus'],
      ["Allonge d'Amirdrassil", 'Le val Aveuglant', 'epic', 108, 'mythicplus'],
      ['Vilpétale', 'Le val Aveuglant', 'epic', 108, 'mythicplus'],
      ['Branche de la fierté', 'Le val Aveuglant', 'epic', 108, 'mythicplus'],
      ['Réponse épineuse', 'Le val Aveuglant', 'epic', 108, 'mythicplus'],
      ['Outil multifonction de noyétincelle', 'Point-nexus Xenas', 'epic', 108, 'mythicplus'],
      ['Gourdin du fléau-d\'effroi', 'Point-nexus Xenas', 'epic', 108, 'mythicplus'],
      ['Trancheuse radieuse', 'Point-nexus Xenas', 'epic', 108, 'mythicplus'],
      ["Lame cosmique de Taz'Rah", 'Arène de la Cicatrice du Vide', 'epic', 108, 'mythicplus'],
      ['Hache courte massive', 'Arène de la Cicatrice du Vide', 'epic', 108, 'mythicplus'],
      ['Croc de contagion', 'Arène de la Cicatrice du Vide', 'epic', 108, 'mythicplus'],
      ['Croissant de Charonus', 'Arène de la Cicatrice du Vide', 'epic', 108, 'mythicplus'],
      ['Trancheuse de singularité', 'Arène de la Cicatrice du Vide', 'epic', 108, 'mythicplus'],
      // Gouffres
      ['Lame des fouilleurs du gouffre', 'Gouffres de Midnight', 'epic', 108, 'delves'],
      ['Bâton des récupérateurs des abysses', 'Gouffres de Midnight', 'epic', 108, 'delves'],
    ]},
    { slot: 'offhand', items: [
      // Raid
      ["Sceptre des Chants éternels rayonnant", "Lu'ashal", 'epic', 197, 'raid'],
      ['Rempart garde-combe', 'Pincombe', 'epic', 197, 'raid'],
      ["Tome de regret rejeté d'Aln", 'Chimaerus, la divinité ineffable', 'epic', 197, 'raid'],
      ['Garde-aube thalassien', "Belo'ren, enfant d'Al'ar", 'epic', 197, 'raid'],
      ['Barricade de noble détermination', 'Imperator Averzian', 'epic', 197, 'raid'],
      ['Grimoire de la Lumière éternelle', 'Vorasius', 'epic', 197, 'raid'],
      // M+
      ['Cachet du cœur fébrile', 'Flèche de Coursevent', 'epic', 108, 'mythicplus'],
      ['Bouclier du brise-sort', 'Terrasse des Magistères', 'epic', 108, 'mythicplus'],
      ['Refuge de la tempête', 'Antre de Nalorakk', 'epic', 108, 'mythicplus'],
      ['Pousse luminescente', 'Le val Aveuglant', 'epic', 108, 'mythicplus'],
      ['Sacrifice de Teldrassil', 'Le val Aveuglant', 'epic', 108, 'mythicplus'],
      ['Réflecteur de reflux', 'Point-nexus Xenas', 'epic', 108, 'mythicplus'],
      // Gouffres
      ['Bouclier des gardiens du gouffre', 'Gouffres de Midnight', 'epic', 108, 'delves'],
    ]},
  ]

  let id = 1
  const items: Item[] = []
  pool.forEach(group => {
    group.items.forEach(([name, source, q, ilvl, mode]) => {
      items.push({ id: id++, slot: group.slot, name, source, q, ilvl, mode })
    })
  })
  return items
}

export const ALL_ITEMS = genAllBIS()

export const SLOT_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'Armor', label: '🛡 Armor' },
  { id: 'Jewelry', label: '💍 Jewelry' },
  { id: 'Trinket', label: '🔮 Trinket' },
  { id: 'Weapon', label: '⚔️ Weapon' },
  { id: 'head', label: 'Head' }, { id: 'neck', label: 'Neck' },
  { id: 'shoulder', label: 'Shoulders' }, { id: 'chest', label: 'Chest' },
  { id: 'legs', label: 'Legs' }, { id: 'feet', label: 'Feet' },
  { id: 'back', label: 'Back' }, { id: 'wrist', label: 'Wrists' },
  { id: 'hands', label: 'Hands' }, { id: 'waist', label: 'Waist' },
  { id: 'ring1', label: 'Ring' }, { id: 'trinket1', label: 'Trinket' },
  { id: 'mainhand', label: 'Main Hand' }, { id: 'offhand', label: 'Off Hand' },
]
