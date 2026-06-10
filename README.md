# ![Maryam Trading Logo](file:///C:/Users/Abubakr/.gemini/antigravity-ide/brain/6fb04760-a5e4-4453-8582-284b0503fff0/maryam_trading_logo_1781090165921.png)

# Maryam Trading

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)  
[![Python 3.10+](https://img.shields.io/badge/python-3.10%2B-blue.svg)](https://www.python.org/downloads/)

## 📖 Overview
A lightweight, maintainable Django‑based platform for managing trading data, visualising market trends and handling user accounts. Designed with clean UI, responsive layout, and easy extensibility.

## ✨ Key Features
- Secure user authentication & role‑based access
- CRUD interface for trades, portfolios, and instruments
- Interactive charts powered by Chart.js
- Responsive design with dark‑mode support
- Docker‑ready deployment

## 🛠️ Tech Stack
- **Backend:** Python 3.10, Django 4.x, SQLite (default) / PostgreSQL
- **Frontend:** HTML5, CSS3 (Tailwind‑like utilities), JavaScript (Chart.js)
- **Styling:** Modern UI with gradients, glass‑morphism, subtle animations
- **Dev Tools:** `venv`, `pip`, `Docker`, `Gunicorn`

## 🚀 Installation
```bash
# Clone the repo
git clone https://github.com/your‑username/maryam‑trading.git
cd maryam‑trading

# Create virtual environment
python -m venv venv
venv\Scripts\activate   # on Windows

# Install dependencies
pip install -r requirements.txt

# Apply migrations
python manage.py migrate

# Run the development server
python manage.py runserver
```

## 📦 Usage
Visit `http://127.0.0.1:8000/` in your browser. Register a new account, then start adding trades, creating portfolios, and exploring the live charts.

## 🐳 Docker (optional)
```bash
docker build -t maryam‑trading .
 docker run -p 8000:8000 maryam‑trading
```

## 🤝 Contributing
Contributions are welcome! Please fork the repo, create a feature branch, and submit a pull request. Follow the existing code style and run tests before pushing.

## 📄 License
This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.
