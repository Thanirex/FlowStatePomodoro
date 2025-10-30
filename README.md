# Flow Mode

> A serene Pomodoro timer inspired by Japanese minimalism. Find your focus, stay in flow.

<div align="center">

![Flow Mode Preview](https://via.placeholder.com/900x500/6B7F5C/FFFFFF?text=🌿+Flow+Mode+Timer)

*A minimalist productivity companion designed to help you enter—and stay in—your flow state*

### ✨ [Live Demo](#) • 🚀 [Deploy Your Own](https://vercel.com/new)

![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=flat-square&logo=next.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=flat-square&logo=typescript)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16-0055FF?style=flat-square)

</div>

---

## 🌸 Why Flow Mode?

In a world full of distractions, **Flow Mode** offers a peaceful sanctuary for focused work. Inspired by the Japanese philosophy of *wabi-sabi* (finding beauty in imperfection and simplicity), this timer helps you embrace deep work sessions without the visual noise.

<table>
<tr>
<td width="50%">

### Perfect for:
- 🎨 Creative professionals seeking uninterrupted focus
- 💻 Developers diving into deep work sessions
- 📚 Students preparing for exams
- ✍️ Writers crafting their next masterpiece
- 🧘 Anyone practicing mindful productivity

</td>
<td width="50%">

### Design Philosophy:
- 🍃 Calming olive-green palette
- 🎋 Clean, distraction-free interface
- 🌊 Smooth, natural animations
- 🎐 Gentle audio notifications
- 🪷 Inspired by Japanese minimalism

</td>
</tr>
</table>

---

## ✨ Features

<table>
<tr>
<td width="33%">

### ⏱️ Smart Timer
Customizable Pomodoro sessions with default 90-minute work periods, 10-minute short breaks, and 60-minute long breaks

</td>
<td width="33%">

### 🎯 Accurate Tracking
Timestamp-based timer remains precise even when switching tabs or minimizing the window

</td>
<td width="33%">

### 📊 Session Counter
Keep track of completed work sessions to celebrate your productivity achievements

</td>
</tr>
<tr>
<td width="33%">

### ⚙️ Flexible Settings
Adjust timer durations on the fly to match your workflow (resets to defaults on reload)

</td>
<td width="33%">

### 🔔 Audio Alerts
Gentle sound notifications signal the end of each session without being jarring

</td>
<td width="33%">

### 📱 Responsive Design
Works beautifully on desktop, tablet, and mobile devices

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

| Technology | Purpose |
|:----------:|:-------:|
| **[Next.js 14](https://nextjs.org/)** | React framework with App Router |
| **[TailwindCSS 3.4](https://tailwindcss.com/)** | Utility-first CSS framework |
| **[Framer Motion](https://www.framer.com/motion/)** | Smooth animations & transitions |
| **[TypeScript](https://www.typescriptlang.org/)** | Type-safe JavaScript |
| **Inter & Noto Sans JP** | Beautiful, readable fonts |

</div>

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd flow-mode
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
flow-mode/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main timer page
│   └── globals.css         # Global styles
├── components/
│   └── PomodoroTimer.tsx   # Core timer component
├── public/
│   └── notification.mp3    # Timer completion sound
├── package.json
└── README.md
```

---

## 🎨 Customization

### Changing Colors

Edit the olive-green color palette in `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      'flow-green': '#6B7F5C',  // Main accent color
      'flow-dark': '#4A5842',   // Darker shade
      // ... add your colors
    }
  }
}
```

### Adjusting Default Timer Durations

Modify the initial state in `components/PomodoroTimer.tsx`:

```typescript
const [settings, setSettings] = useState({
  work: 90,        // 90 minutes
  shortBreak: 10,  // 10 minutes
  longBreak: 60,   // 60 minutes
});
```

---

## 🌟 Screenshots

<div align="center">

### Work Session
![Work Session](https://via.placeholder.com/700x400/6B7F5C/FFFFFF?text=Work+Session+View)

### Break Time
![Break Time](https://via.placeholder.com/700x400/8FA97A/FFFFFF?text=Break+Time+View)

### Settings Panel
![Settings](https://via.placeholder.com/700x400/5C6B51/FFFFFF?text=Settings+View)

</div>

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

- 🐛 Report bugs
- 💡 Suggest new features
- 🔧 Submit pull requests
- ⭐ Star this repository if you find it helpful

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Inspired by the Pomodoro Technique® by Francesco Cirillo
- Design philosophy influenced by Japanese minimalism and *wabi-sabi*
- Built for the Flow State people

---

<div align="center">

### 🍃 Enter your flow. Stay focused. Achieve more.

**Made with 💚 for mindful productivity**

[⬆ Back to Top](#-flow-mode)

</div>
