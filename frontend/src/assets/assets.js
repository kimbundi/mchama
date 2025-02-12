import basket_icon from './basket_icon.png'
import search_icon from './search_icon.png'
import add_icon_white from './add_icon_white.png'
import add_icon_green from './add_icon_green.png'
import remove_icon_red from './remove_icon_red.png'
import app_store from './app_store.png'
import play_store from './play_store.png'
import linkedin_icon from './linkedin_icon.png'
import facebook_icon from './facebook_icon.png'
import twitter_icon from './twitter_icon.png'
import cross_icon from './cross_icon.png'
import selector_icon from './selector_icon.png'
import rating_starts from './rating_starts.png'
import profile_icon from './profile_icon.png'
import bag_icon from './bag_icon.png'
import logout_icon from './logout_icon.png'
import parcel_icon from './parcel_icon.png'
import logo from './logo.png';
import product_1 from './loan.png'
import product_2 from './chama.png'
import product_3 from './emergency.png'
import product_4 from './business.png'
import product_5 from './education.png'
import product_6 from './financial.png'

export const assets = {
    
    basket_icon,

    search_icon,
    rating_starts,
    add_icon_green,
    add_icon_white,
    remove_icon_red,
    app_store,
    play_store,
    linkedin_icon,
    facebook_icon,
    twitter_icon,
    cross_icon,
    selector_icon,
    profile_icon,
    logout_icon,
    bag_icon,
    parcel_icon,
    logo
    
    
}

export const product_list = [
    {
        product_name: "Bidhaa za Mikopo",
        product_image: product_1
    },
    {
        product_name: "Akiba za Kikundi/Mchama",
        product_image: product_2
    },
    {
        product_name: "Mikopo ya Dharura",
        product_image: product_3
    },
    {
        product_name: "Mikopo ya Biashara",
        product_image: product_4
    },
    {
        product_name: "Mikopo ya Elimu",
        product_image: product_5
    },
    {
        product_name: "Ushauri wa Kifedha",
        product_image: product_6
    },
];

export const services_list = [
    {
        _id: "1",
        name: "Mikopo ya Kibinafsi",
        image: product_1,
        price: 1000, // Mfano wa kiasi cha chini cha mkopo
        description: "Mikopo ya kibinafsi yenye kubadilika kukidhi mahitaji yako ya kifedha ya haraka.",
        category: "Bidhaa za Mikopo"
    },
    {
        _id: "2",
        name: "Mpango wa Akiba za Kikundi",
        image: product_2,
        price: 500, // Mfano wa amana ya chini ya akiba
        description: "Suluhisho la akiba la ushirikiano kwa usalama wa kifedha.",
        category: "Akiba za Kikundi/Mchama"
    },
    {
        _id: "3",
        name: "Mikopo ya Dharura ya Haraka",
        image: product_3,
        price: 2000,
        description: "Ugavi wa pesa za haraka kwa gharama zisizotarajiwa.",
        category: "Mikopo ya Dharura"
    },
    {
        _id: "4",
        name: "Mikopo ya Biashara Ndogo",
        image: product_4,
        price: 5000,
        description: "Suluhisho la ufadhili kukuza na kupanua biashara yako.",
        category: "Mikopo ya Biashara"
    },
    {
        _id: "5",
        name: "Mikopo ya Msaada wa Elimu",
        image: product_5,
        price: 3000,
        description: "Msaada wa kifedha kwa ada za masomo na mahitaji ya kielimu.",
        category: "Mikopo ya Elimu"
    },
    {
        _id: "6",
        name: "Huduma ya Ushauri wa Kifedha",
        image: product_6,
        price: 0, // Bure au kwa msingi wa ushauri
        description: "Mwongozo wa kifedha kutoka kwa wataalamu kukusaidia kusimamia pesa zako kwa ufanisi.",
        category: "Ushauri wa Kifedha"
    },
];
