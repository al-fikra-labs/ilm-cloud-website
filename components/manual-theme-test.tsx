"use client"

export default function ManualThemeTest() {
  const toggleTheme = () => {
    const html = document.documentElement
    if (html.classList.contains("dark")) {
      html.classList.remove("dark")
      html.classList.add("light")
    } else {
      html.classList.remove("light")
      html.classList.add("dark")
    }
  }

  return (
    <div className="fixed bottom-4 left-4 z-[100] p-4 border rounded-lg bg-white dark:bg-gray-900 text-black dark:text-white">
      <h3 className="font-bold mb-2">Manual Theme Test</h3>
      <button onClick={toggleTheme} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Toggle Theme Manually
      </button>
      <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded">
        <p>This should change color</p>
      </div>
    </div>
  )
}
