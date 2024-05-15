import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'

const isdark = useDark()
export const useThemeStore = defineStore('theme-store', {
    persist: {
        key: 'admin_theme',
        paths: ['watermarked', 'collapsed'],
    },
    state: () => ({
        darkMode: isdark.value, // 暗夜模式
        watermarked: false, // 水印
        collapsed: false, // 侧边栏折叠        
    }),
    actions: {
        toggleDarkMode() {
            this.darkMode = !this.darkMode
        },
        toggleWatermarked() {
            this.watermarked = !this.watermarked
        },
        toggleCollapsed() {
            this.collapsed = !this.collapsed
        },
    },
})