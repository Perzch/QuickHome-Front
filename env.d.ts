/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_ENCRYPT_PUBLIC_KEY:string,
    VITE_ENCRYPT_PRIVATE_KEY:string,
    VITE_BASE_URL:string,
    VITE_BASE_IMG_URL:string
    VITE_PROXY_URL:string
    VITE_PROXY_IMG_URL:string
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
