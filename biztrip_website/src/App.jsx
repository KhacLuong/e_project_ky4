import './App.css'
import {BrowserRouter} from "react-router-dom";
import RenderRouter from "./routes/renderRouter.jsx";
import {useEffect, useState} from "react";
import AOS from "aos";

const App = () => {
    const [theme, setTheme] = useState("light")

    // check chế độ theme ở browser
    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark')
        } else {
            setTheme('light')
        }
        AOS.init({
            duration: 1000,
            once: true,
            offset: 0,
            easing: 'ease-in-out',
            delay: 0,
            mirror: false,
            disable: false,
        })
        AOS.refresh()
    }, [])

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [theme])

    const handleThemeSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }
    return (
        <BrowserRouter>
            <RenderRouter/>
        </BrowserRouter>
    )
}

export default App
