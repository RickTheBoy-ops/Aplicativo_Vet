import Constants from 'expo-constants';
import { Platform } from 'react-native';

// IP da máquina local detectado automaticamente.
// Se o seu IP mudar, atualize esta constante ou use o arquivo .env
const LOCAL_MACHINE_IP = '172.17.1.187';
const DEFAULT_PORT = '3000';

/**
 * Retorna a URL base da API dependendo do ambiente e plataforma.
 * Prioriza a variável de ambiente API_URL.
 */
const getBaseUrl = (): string => {
    // Se a URL da API estiver definida explicitamente nas variáveis de ambiente, use-a
    if (process.env.API_URL) {
        console.log(`[ApiConfig] Usando API_URL do ambiente: ${process.env.API_URL}`);
        return process.env.API_URL;
    }

    // Configuração automática para ambiente de desenvolvimento
    if (__DEV__) {
        const debuggerHost = Constants.expoConfig?.hostUri;

        if (debuggerHost) {
            const [ip] = debuggerHost.split(':');

            // Detecção de modo Tunnel (ngrok/expo.direct)
            // Quando em túnel, o hostUri é o domínio público do túnel, que não aceita porta 3000.
            // Devemos usar o IP local da máquina (LAN) como fallback.
            if (ip.includes('exp.direct') || ip.includes('ngrok.io')) {
                console.log(`[ApiConfig] Modo Tunnel detectado (${ip}). Usando IP local de fallback: ${LOCAL_MACHINE_IP}`);
                return `http://${LOCAL_MACHINE_IP}:${DEFAULT_PORT}/api`;
            }

            // Para conexões LAN (Expo Go na mesma rede), usamos o IP retornado pelo Expo
            // Isso assume que o backend está rodando na mesma máquina que o Expo Server
            console.log(`[ApiConfig] Modo LAN detectado. Usando IP do Expo: ${ip}`);
            return `http://${ip}:${DEFAULT_PORT}/api`;
        }

        // Fallbacks para simuladores quando hostUri não está disponível
        if (Platform.OS === 'android') {
            // IP padrão do host no emulador Android Studio
            console.log('[ApiConfig] Emulador Android detectado. Usando 10.0.2.2');
            return `http://10.0.2.2:${DEFAULT_PORT}/api`;
        }

        // Para iOS Simulator e Web
        console.log('[ApiConfig] iOS Simulator/Web detectado. Usando localhost');
        return `http://localhost:${DEFAULT_PORT}/api`;
    }

    // URL de produção (fallback seguro)
    return 'https://api.vetfield.com/api';
};

const BASE_URL = getBaseUrl();
console.log(`[ApiConfig] URL Base configurada: ${BASE_URL}`);

export const API_CONFIG = {
    BASE_URL,
    TIMEOUT: Number(process.env.API_TIMEOUT) || 30000,
};
