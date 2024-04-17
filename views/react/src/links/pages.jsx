const itemPage = {
    ITEM_LIST: "/items",
    ITEM_ADD: "/items/add",
    ITEM_VIEW: "/items/view",
    ITEM_UPDATE: "/items/view/update",
}

const vendPage = {
    VEND_LIST: "/vend",
    VEND_ADD: "/vend/add",
    VEND_VIEW: "/vend/view",
    VEND_UPDATE: "/vend/view/update",
}

const contactPage = {
    CONTACT_LIST: "/contact",
    CONTACT_ADD: "/contact/add",
    CONTACT_VIEW: "/contact/view",
    CONTACT_UPDATE: "/contact/view/update",
}

const customerPage = {
    CUSTOMER_LIST: "/customer",
    CUSTOMER_ADD: "/customer/add",
    CUSTOMER_VIEW: "/customer/view",
    CUSTOMER_UPDATE: "/customer/view/update",
}

const purchasePage = {
    PURCHASE_LIST: "/purchase",
    PURCHASE_ADD: "/purchase/add",
    PURCHASE_VIEW: "/purchase/view",
    PURCHASE_RETURN: "/purchase/view/return"
}

const salesPage = {
    SALES_LIST: "/sales",
    SALES_ADD: "/sales/add",
    SALES_VIEW: "/sales/view",
    SALES_RETURN: "/sales/view/return"
}

const categoryPage = {
    CATEGORY_LIST: "/category",
    CATEGORY_ADD: "/category/add",
    CATEGORY_UPDATE: "/category/update",
}


const sitePage = {
    LOGIN: "/guest",
    NEW_PASSWORD: "/guest/new-password",
    VERIFY_ACCOUNT: "/guest/verify-account",
    SIGNUP: "/guest/signup",
    FORGOT_PASSWORD: "/guest/forgot-password",
    VERIFY_TOKEN: "/guest/verify-token",
}

const pages = {
    // BASE_URL: "http://mystore.com/index.php",
    BASE_URL: "http://localhost:8080",
    // BASE_URL: "http://krishna-acharya.rf.gd/web/index.php",
    // LOCAL_URL: "http://localhost:8080",
    PROFILE: "/user",
    GUEST: "/guest",
    PROFILE_UPDATE: "/user/update",
    PROFILE_UPDATE_PASSWORD: "/user/update-password",
    HOME: "/home",
    DASHBOARD: "/dashboard",
    ...sitePage,
    ...itemPage,
    ...vendPage,
    ...contactPage,
    ...customerPage,
    ...purchasePage,
    ...categoryPage,
    ...salesPage
};

const guestPage = [
    pages.FORGOT_PASSWORD,
    pages.LOGIN,
    pages.SIGNUP,
    pages.NEW_PASSWORD,
    pages.VERIFY_ACCOUNT,
    pages.VERIFY_TOKEN
];

const getFullUrl = (page) => {
    return pages.LOCAL_URL + "#" + page;
}

export { pages, sitePage, itemPage, vendPage, guestPage, contactPage, customerPage, salesPage, purchasePage, categoryPage, getFullUrl };