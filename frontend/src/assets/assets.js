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
        product_name: "Loan Products",
        product_image: product_1
    },
    {
        product_name: "Group Savings/Mchama",
        product_image: product_2
    },
    {
        product_name: "Emergency Loans",
        product_image: product_3
    },
    {
        product_name: "Business Loans",
        product_image: product_4
    },
    {
        product_name: "Education Loans",
        product_image: product_5
    },
    {
        product_name: "Financial Advisory",
        product_image: product_6
    },
];


export const services_list = [
    {
        _id: "1",
        name: "Personal Loan",
        image: product_1,
        price: 1000, // Example minimum loan amount
        description: "A flexible personal loan to meet your urgent financial needs.",
        category: "Loan Products"
    },
    {
        _id: "2",
        name: "Group Savings Plan",
        image: product_2,
        price: 500, // Example minimum savings deposit
        description: "A collaborative savings solution for financial security.",
        category: "Group Savings/Mchama"
    },
    {
        _id: "3",
        name: "Emergency Quick Loan",
        image: product_3,
        price: 2000,
        description: "Fast cash disbursement for unexpected expenses.",
        category: "Emergency Loans"
    },
    {
        _id: "4",
        name: "Small Business Loan",
        image: product_4,
        price: 5000,
        description: "Funding solutions to grow and expand your business.",
        category: "Business Loans"
    },
    {
        _id: "5",
        name: "Education Support Loan",
        image: product_5,
        price: 3000,
        description: "Financial assistance for tuition fees and academic needs.",
        category: "Education Loans"
    },
    {
        _id: "6",
        name: "Financial Advisory Service",
        image: product_6,
        price: 0, // Free or consultation-based
        description: "Expert financial guidance to help you manage money effectively.",
        category: "Financial Advisory"
    },
];


