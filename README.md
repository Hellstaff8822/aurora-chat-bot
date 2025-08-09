# 🌟 Aurora - AI Chat Assistant

Aurora - це сучасний веб-додаток для спілкування з AI асистентом, побудований з використанням React та Google Gemini AI. Проект включає автентифікацію користувачів, збереження історії чатів та адаптивний дизайн.

## ✨ Основні функції

- 🤖 **AI Асистент** - Інтеграція з Google Gemini AI для розумних відповідей
- 🔐 **Автентифікація** - Вхід через email/пароль або Google OAuth
- 💬 **Управління чатами** - Створення, видалення та перейменування чатів
- 🌍 **Мультимовність** - Підтримка української та англійської мов
- 📱 **Адаптивний дизайн** - Оптимізовано для мобільних та десктопних пристроїв
- ✨ **Spotlight ефекти** - Сучасні візуальні ефекти на картці входу
- 📝 **Markdown підтримка** - Форматування повідомлень з підсвічуванням коду
- 💾 **Збереження сесій** - Автоматичне збереження стану користувача

## 🛠️ Технології

### Frontend
- **React 19** - Основний фреймворк
- **Redux Toolkit** - Управління станом
- **React Router DOM** - Маршрутизація
- **Tailwind CSS** - Стилізація та адаптивний дизайн
- **Vite** - Інструмент збірки та розробки

### Backend & Services
- **Firebase Auth** - Автентифікація користувачів
- **Firestore** - База даних для чатів та повідомлень
- **Google Gemini AI** - Штучний інтелект для відповідей

### UI/UX Бібліотеки
- **Lucide React** - Іконки
- **React Spinners** - Анімації завантаження
- **React Markdown** - Рендеринг Markdown
- **React Syntax Highlighter** - Підсвічування коду
- **Formik + Yup** - Обробка форм та валідація

## 🚀 Встановлення та запуск

### Передумови
- Node.js (версія 18 або вище)
- npm або yarn

### 1. Клонування репозиторію
```bash
git clone https://github.com/your-username/aurora.git
cd aurora
```

### 2. Встановлення залежностей
```bash
npm install
```

### 3. Налаштування змінних середовища
Створіть файл `.env` в корені проекту:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Google Gemini AI
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 4. Налаштування Firebase

1. Створіть проект у [Firebase Console](https://console.firebase.google.com)
2. Увімкніть Authentication (Email/Password та Google)
3. Створіть Firestore базу даних
4. Налаштуйте правила безпеки Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 5. Отримання Gemini API ключа
1. Перейдіть до [Google AI Studio](https://aistudio.google.com)
2. Створіть API ключ для Gemini
3. Додайте його до `.env` файлу

### 6. Запуск додатку
```bash
npm run dev
```

Додаток буде доступний за адресою `http://localhost:5173`

## 📁 Структура проекту

```
aurora/
├── public/                 # Статичні файли
│   └── aurora-*.png       # Логотипи та іконки
├── src/
│   ├── app/               # Головний компонент додатку
│   ├── components/        # React компоненти
│   │   ├── Auth/         # Компоненти автентифікації
│   │   ├── Chat/         # Компоненти чату
│   │   ├── common/       # Загальні компоненти
│   │   └── Login/        # Компоненти входу
│   ├── features/         # Redux слайси
│   │   └── slices/       # Управління станом
│   ├── hooks/            # Кастомні React хуки
│   ├── lib/              # Утиліти та сервіси
│   │   ├── auth.js       # Автентифікація
│   │   ├── ChatService.js # AI та Firestore сервіси
│   │   └── firebase.js    # Firebase конфігурація
│   ├── pages/            # Сторінки додатку
│   ├── store/            # Redux store
│   ├── styles/           # CSS файли
│   └── utils/            # Допоміжні функції
├── .env                  # Змінні середовища
├── package.json          # Залежності та скрипти
└── vite.config.js        # Конфігурація Vite
```

## 🎯 Основні можливості

### Автентифікація
- Реєстрація та вхід через email/пароль
- Вхід через Google OAuth
- Збереження сесії користувача
- Автоматичне перенаправлення

### Чати
- Створення нових чатів
- Автоматичне генерування назв чатів
- Видалення та перейменування чатів
- Збереження історії повідомлень

### AI Асистент
- Розумні відповіді від Google Gemini
- Підтримка різних мов
- Форматування відповідей з Markdown
- Емодзі та структуровані відповіді

## 🔧 Доступні скрипти

- `npm run dev` - Запуск у режимі розробки
- `npm run build` - Збірка для продакшену
- `npm run preview` - Попередній перегляд збірки
- `npm run lint` - Перевірка коду ESLint

## 🌐 Деплой

### Vercel (рекомендовано)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Завантажте папку dist на Netlify
```

## 👨‍💻 Автор

**Derevyanko Dmytro** - dmytro.derevyanko47@gmail.com


Project Link: https://github.com/Hellstaff8822/aurora-chat-bot
