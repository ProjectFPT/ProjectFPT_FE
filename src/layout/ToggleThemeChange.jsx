const toggleThemeChange = () => {
    if (isDark) {
      localStorage.setItem("theme", "light");
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", "light");
        setIsDark(true);
    } else {
      localStorage.setItem("theme", "dark");
      document
        .getElementsByTagName("HTML")[0]
        .setAttribute("data-theme", "dark");
        setIsDark(false);
    }
}

//...
<input
    type="checkbox"
    defaultChecked={isDark}
    onChange={() => toggleThemeChange()}
/>