import { Analytics } from "@vercel/analytics/react"

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Figma Make
        </h1>
        <p className="text-lg text-gray-600">
          Start building your application in src/App.tsx
        </p>
      </div>
      <Analytics />
import { SpeedInsights } from "@vercel/speed-insights/react"

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Canta Talentos
        </h1>
        <p className="text-lg text-gray-600">
          Your React + Vite + Tailwind CSS app is running!
        </p>
      </div>
      <SpeedInsights />
    </div>
  )
}
