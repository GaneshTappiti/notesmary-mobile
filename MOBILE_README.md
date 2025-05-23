
# Notex Mobile App

This project has been configured to work as both a web app and a native mobile app using Capacitor.

## Running the Mobile App

### Prerequisites
- Node.js and npm/yarn installed
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Setup Instructions

1. Clone this repository and install dependencies:
   ```
   git clone <your-repository-url>
   cd <project-folder>
   npm install
   ```

2. Build the web app:
   ```
   npm run build
   ```

3. Sync the web build with Capacitor:
   ```
   npx cap sync
   ```

### Running on Android

1. Add Android platform (if not already added):
   ```
   npx cap add android
   ```

2. Update Android platform:
   ```
   npx cap update android
   ```

3. Open Android Studio:
   ```
   npx cap open android
   ```

4. Run the app from Android Studio on an emulator or physical device

### Running on iOS (macOS only)

1. Add iOS platform (if not already added):
   ```
   npx cap add ios
   ```

2. Update iOS platform:
   ```
   npx cap update ios
   ```

3. Open Xcode:
   ```
   npx cap open ios
   ```

4. Run the app from Xcode on a simulator or physical device

## Development Workflow

1. Make changes to your React code
2. Build the web app: `npm run build`
3. Sync with Capacitor: `npx cap sync`
4. Test on the native platform

## Live Reload During Development

For a faster development experience, you can use Capacitor's live reload feature:

```
npm run dev
npx cap run android -l --external
```

or for iOS:

```
npm run dev
npx cap run ios -l --external
```

## Additional Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
