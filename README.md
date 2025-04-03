
# AlgoViz: Algorithm Visualization Platform

<div align="center">
  <img src="public/logo.png" alt="AlgoViz Logo" width="200" />
  <p><em>Interactive algorithm visualization to master computational complexity</em></p>
  
  <div>
    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  </div>
</div>

## 🚀 Features

- **Interactive Visualizations**: Watch algorithms run in real-time with adjustable speed controls to observe behavior step-by-step.
- **Comparative Analysis**: Compare multiple algorithms side-by-side to understand performance differences across various input sizes.
- **Live Execution**: Observe algorithms as they run, with detailed metrics and step-by-step animation.
- **Time Complexity Analysis**: Visualize Big-O notation through animated graphs showing how execution time scales with input size.
- **Multiple Algorithm Types**: Explore various algorithm categories including:
  - Blind Search
  - Heuristic Search
  - Hill Climbing
  - Gradient Descent
  - Parallel Algorithms
- **Responsive Design**: Fully responsive interface that works on desktop, tablet, and mobile devices.

## 📊 Demo

![Algorithm Comparison Demo](public/demo.png)

## 🧪 Algorithm Types

AlgoViz currently supports several algorithm categories:

| Algorithm Type | Time Complexity | Space Complexity | Primary Use Case |
|---------------|----------------|-----------------|------------------|
| Blind Search | O(b^d) | O(b^d) | Graph traversal, puzzle solving |
| Heuristic Search | O(b^d) | O(b^d) | Pathfinding, optimization problems |
| Hill Climbing | Varies | O(1) | Local optimization |
| Gradient Descent | O(n·i) | O(n) | Machine learning, neural networks |
| Parallel Algorithms | O(n/p) | O(n) | Big data processing, simulations |

## 🛠️ Technologies

- **React 18**: Modern UI library for building component-based interfaces
- **TypeScript**: Type safety and enhanced developer experience
- **Vite**: Next-generation frontend tooling for fast development and optimized builds
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **shadcn/ui**: Beautifully designed components built with Radix UI and Tailwind CSS
- **Recharts**: Composable charting library for visualizing algorithm performance
- **React Router DOM**: Declarative routing for React applications
- **Lucide React**: Beautiful & consistent icons for the UI

## 📦 Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/              # Page components for routing
├── lib/                # Utilities and helper functions
├── hooks/              # Custom React hooks
└── main.tsx            # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/algoviz.git
cd algoviz
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:8080`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📬 Contact

- Project Link: [https://github.com/yourusername/algoviz](https://github.com/yourusername/algoviz)

---

<div align="center">
  <p>Built with ❤️ by the AlgoViz Team</p>
</div>
