export const navConfig = {
    loggedIn: [
        {
            route: "Profile",
            link: "/account"
        },
        {
            route: "Saved pairings",
            link: "/account/saved-pairings"
        },
        {
            route: "Log out",
            link: null
        },
    ],
    loggedOut: [
        // {
        //     route: "Home",
        //     link: "/"
        // },
        {
            route: "Login",
            link: "/login"
        },
        // {
        //     route: "Register",
        //     link: "/register"
        // },
    ]
}

