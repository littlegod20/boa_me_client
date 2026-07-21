# Boame Client

React Native (Expo) mobile app for **Boame** — a service marketplace that connects customers to vetted providers for domestic and commercial services, starting with car wash and home cleaning.

Built by **Asante** as a full-stack portfolio project. Pairs with the [Boame API](https://github.com/littlegod20/boa_me).

---

## What it does

Customers browse services, pick a provider, book and pay via Mobile Money or card (Paystack), then track the job and chat in realtime. Providers manage bookings, offer services, view earnings, and message customers. Role-based navigation switches the entire shell between customer and provider experiences after login.

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Expo SDK 56 + React Native | Fast iteration, EAS builds, native modules when needed |
| Language | TypeScript | Shared types with the API domain model |
| Navigation | React Navigation 7 | Stack + bottom tabs, deep linking (`boame://`) |
| Server state | TanStack Query | Caching, mutations, and loading/error UX for API calls |
| Client state | Zustand + AsyncStorage | Persisted auth session |
| Forms | React Hook Form + Zod | Schema-first validation aligned with the API |
| HTTP | Axios | JWT attach + global 401 logout |
| Realtime | Socket.io client | Chat and unread message sync |
| Maps / location | react-native-maps + expo-location | Service location on bookings |
| Auth extras | expo-auth-session + expo-web-browser | Google OAuth and Paystack checkout |
| UI | Custom theme + Lucide icons | Brand fonts (Abres, Montserrat), light/dark themes |

---

## App Architecture

```
App.tsx
├── ThemeProvider
├── QueryClientProvider
├── SocketProvider          ← connects when JWT is present
└── RootNavigator
    ├── Auth (no token)
    ├── Customer tabs (role !== provider)
    └── Provider tabs (role === provider)
```

```
UI → hooks (TanStack Query) → services (Axios) → Boame API
                ↓
         SocketContext → Socket.io (chat / unread)
                ↓
         Zustand stores (auth, unread)
```

---

## Features

### Authentication
- Email/password register → email verification → login
- Google Sign-In via Expo Auth Session
- JWT stored in Zustand, persisted with AsyncStorage
- Automatic `Authorization` header on every request
- Global logout on `401` responses
- Deep links for auth screens (`boame://login`, `register`, `verify-email`)

### Customer experience
- Home: categories and services catalogue
- Provider listing per service, then book with date/time and location
- Paystack checkout opened in an in-app browser session
- Bookings list with status filters and detail screens
- Leave reviews after completed jobs
- Realtime chat with providers
- Profile + **Become a Provider** onboarding

### Provider experience
- Dashboard for incoming and active bookings (confirm / start / complete / cancel)
- Manage offered services (add, edit, pricing)
- Earnings / transaction history
- Shared messages stack with unread badge
- Profile (hidden tab, opened from header)

### Realtime messaging
- Socket authenticated with JWT on connect
- Conversation list + chat thread UI
- Unread badge on the Messages tab (Zustand + conversation sync)

### Theming
- Light and dark palettes in `constants/theme.ts`
- Custom fonts loaded before splash hide
- Status bar follows theme

---

## Navigation Map

| Role | Tabs |
|------|------|
| **Customer** | Home · Bookings · Messages · (Profile hidden) |
| **Provider** | Dashboard · Services · Earnings · Messages · (Profile hidden) |

Stack navigators nest under tabs for detail flows (booking detail, chat, book service, add/edit service, reviews, become a provider, etc.).

---

## Project Structure

```
client/
├── App.tsx                 — providers, fonts, splash
├── app.json / eas.json     — Expo config + EAS build profiles
├── assets/                 — icons, splash, fonts
├── components/
│   ├── chat/               — bubble, input, header, date separator
│   └── shared/             — buttons, inputs, cards, badges, headers
├── constants/              — API URLs, theme tokens
├── context/                — ThemeContext, SocketContext
├── hooks/                  — React Query hooks (auth, bookings, chat, …)
├── navigation/             — root, auth, customer, provider, stacks
├── screens/
│   ├── auth/
│   ├── customer/
│   └── provider/
├── services/               — Axios API modules
├── store/                  — authStore, unreadStore
├── types/                  — shared TypeScript models
├── utils/                  — JWT parse, dates, greeting
└── validators/             — Zod schemas for forms
```

---

## Running Locally

### Prerequisites
- Node.js 18+
- Expo Go **or** a development build (`expo-dev-client` is in the project)
- Running [Boame API](../server) on a machine reachable from your phone/emulator
- For physical devices: use your LAN IP (not `localhost`) in `.env`

### Setup

```bash
cd client
npm install

cp .env.example .env
# set YOUR_LAN_IP so a physical device can reach the API

npx expo start
```

Then press `a` / `i` for Android / iOS simulator, or scan the QR code with Expo Go / your dev client.

Native scripts (when using a prebuild / local Android folder):

```bash
npm run android
npm run ios
```

### Environment Variables

Create a `.env` in `client/` (gitignored):

```env
EXPO_PUBLIC_API_URL=http://YOUR_LAN_IP:3000/api/v1
EXPO_PUBLIC_SOCKET_URL=http://YOUR_LAN_IP:3000
```

| Variable | Purpose |
|----------|---------|
| `EXPO_PUBLIC_API_URL` | REST base URL (must include `/api/v1`) |
| `EXPO_PUBLIC_SOCKET_URL` | Socket.io origin (no `/api` path) |

Restart Expo after changing env vars so Metro picks them up.

### EAS builds

Profiles in `eas.json`:

- **development** — internal distribution, development client
- **preview** — internal distribution
- **production** — auto-increment version

```bash
npx eas build --profile development --platform android
```

---

## Key Integrations

| Concern | How the client handles it |
|---------|---------------------------|
| API auth | Axios interceptor + persisted JWT |
| Google OAuth | `expo-auth-session` → backend token → store |
| Payments | Booking flow opens Paystack URL via `expo-web-browser` |
| Chat | `SocketProvider` + conversation/message services |
| Location | `expo-location` permission + maps on booking |
| Deep linking | Scheme `boame` in `app.json` |

---

## Planned / related

Backend-planned features that will land in this client over time:

- Push notifications (Expo / FCM)
- Cloudinary image uploads (provider profile / ID)
- Dispute flows
- Apple Sign-In

---

*Pairs with the Boame API — DigitalOcean (API) + Expo EAS (mobile) for deployment.*
