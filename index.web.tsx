import '@expo/metro-runtime';
import { LoadSkiaWeb } from '@shopify/react-native-skia/lib/module/web';
import { App } from 'expo-router/build/qualified-entry';
import { renderRootComponent } from 'expo-router/build/renderRootComponent';

LoadSkiaWeb({
  locateFile: (arquivo) => {
    if (arquivo === 'canvaskit.wasm') {
      return '/canvaskit.wasm';
    }

    return arquivo;
  },
})
  .then(() => {
    renderRootComponent(App);
  })
  .catch((erro) => {
    console.error('Erro ao carregar o CanvasKit:', erro);
  });