# Freshman+ Mobile (React Native 0.76, bare)

## One-time native setup
This repo contains the JS app. The native `android/` and `ios/` projects must be generated once
(they can't be authored by hand):

```bash
# from a scratch folder
npx @react-native-community/cli@latest init FreshmanPlus --version 0.76.5 --skip-install
# copy ONLY the native folders into the monorepo app
cp -r FreshmanPlus/android FreshmanPlus/ios <repo>/apps/mobile/
```

Then, from the repo root:

```bash
pnpm install
pnpm build                                  # builds @freshman-plus/* packages first
cd apps/mobile/ios && pod install && cd -   # iOS only
pnpm dev:mobile                             # Metro
pnpm --filter @freshman-plus/mobile android # or ios
```

### Required native config
- **iOS `Info.plist`**: `NSPhotoLibraryUsageDescription` — "Freshman+ needs your photo library so you can upload payment screenshots."
- **Android**: nothing extra for the image picker on API 33+ (system photo picker). For API ≤ 32 add `READ_EXTERNAL_STORAGE`.
- **react-native-linear-gradient / svg / screens / safe-area-context** autolink; run `pod install` on iOS.
- **Android emulator → API**: use `http://10.0.2.2:4000` (see `MOBILE_API_URL` in `.env.example`).

## What is mocked
All data and services are **mock implementations behind stable interfaces**:

| Mock | Replace with |
|---|---|
| `src/services/auth` | `sdk` → `POST /auth/login`, `/auth/register` |
| `src/services/catalog` | `sdk` → universities / courses / exams / quizzes endpoints |
| `src/services/payments/screenshotPaymentService.ts` | `sdk` → `POST /payments`, `POST /payments/:id/screenshot`, `GET /payments/:id` |
| `src/data/mock/*` | Admin-managed data from the API |

The payment mock **auto-approves 20 s after a screenshot is submitted** so you can walk the whole
flow (Submitted → Awaiting Approval → Access Granted) without the admin portal.

## Assets still needed for pixel-exact fidelity
- Onboarding illustrations (currently composed from icon tiles) → `assets/onboarding/`
- University crests (currently coloured discs with the abbreviation)
- Payment provider logos (Telebirr, CBE Birr, M-PESA, Kacha, Yaya, Chapa)
- Inter font files → `assets/fonts/` then `npx react-native-asset`
