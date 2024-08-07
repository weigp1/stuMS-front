import { computed } from 'vue'
import * as NaiveUI from 'naive-ui'
import { useThemeStore } from '@/store'
import themes from '@/assets/themes'

// 管理和显示消息
function setupMessage(NMessage) {
  class Message {
    static instance
    message
    removeTimer

    constructor() {
      if (Message.instance) {
        return Message.instance
      }
      Message.instance = this
      this.message = {}
      this.removeTimer = {}
    }

    destroy(key, duration = 200) {
      setTimeout(() => {
        if (this.message[key]) {
          this.message[key].destroy()
          delete this.message[key]
        }
      }, duration)
    }

    removeMessage(key, duration = 5000) {
      this.removeTimer[key] && clearTimeout(this.removeTimer[key])
      this.removeTimer[key] = setTimeout(() => {
        this.message[key]?.destroy()
      }, duration)
    }

    showMessage(type, content, option = {}) {
      if (Array.isArray(content)) {
        return content.forEach(msg => NMessage[type](msg, option))
      }

      if (!option.key) {
        return NMessage[type](content, option)
      }

      const currentMessage = this.message[option.key]
      if (currentMessage) {
        currentMessage.type = type
        currentMessage.content = content
      }
      else {
        this.message[option.key] = NMessage[type](content, {
          ...option,
          duration: 0,
          onAfterLeave: () => {
            delete this.message[option.key]
          },
        })
      }
      this.removeMessage(option.key, option.duration)
    }

    loading(content, option = { duration: 0 }) {
      this.showMessage('loading', content, option)
    }

    success(content, option = {}) {
      this.showMessage('success', content, option)
    }

    error(content, option = {}) {
      this.showMessage('error', content, option)
    }

    info(content, option = {}) {
      this.showMessage('info', content, option)
    }

    warning(content, option = {}) {
      this.showMessage('warning', content, option)
    }
  }

  return new Message()
}

// 扩展了 NDialog 对象
// 添加了一个 confirm 方法，
// 该方法用于显示一个带有确认和取消按钮的对话框。
function setupDialog(NDialog) {
  NDialog.confirm = function (option = {}) {
    const showIcon = !!(option.title)
    return NDialog[option.type || 'warning']({
      showIcon,
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: option.confirm,
      onNegativeClick: option.cancel,
      onMaskClick: option.cancel,
      ...option,
    })
  }
  return NDialog
}

// 扩展了 NDialog 对象
// 添加了一个 confirm 方法，
// 该方法用于显示一个带有输入框、确认和取消按钮的对话框。
function setupInputDialog(NDialog) {
  NDialog.InputConfirm = function (option = {}) {
    const showIcon = !!(option.title);
    // 创建一个响应式的输入数据对象
    const inputData = ref('');

    // 在对话框中添加输入框
    const renderInput = () => {
      return h(NInput, {
        value: inputData.value,
        onUpdateValue: (value) => inputData.value = value,
        placeholder: option.inputPlaceholder || '请输入内容',
      });
    };

    // 调整onPositiveClick回调以包含输入数据
    const originalPositiveClick = option.onPositiveClick;
    option.onPositiveClick = () => {
      if (originalPositiveClick) {
        originalPositiveClick(inputData.value);
      }
    };

    return NDialog[option.type || 'warning']({
      showIcon,
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: option.onPositiveClick,
      onNegativeClick: option.cancel,
      onMaskClick: option.cancel,
      renderContent: () => {
        return [
          h('div', { style: { marginBottom: '16px' } }, option.content),
          renderInput()
        ];
      },
      ...option,
    });
  };
  return NDialog;
}

/**
 * 挂载 NaiveUI API
 */
export function setupNaiveDiscreteApi() {
  const themeStore = useThemeStore()
  const configProviderProps = computed(() => ({
    theme: themeStore.darkMode ? NaiveUI.darkTheme : undefined,
    themeOverrides: themes.themeOverrides,
  }))
  const { message, dialog, notification, loadingBar } = NaiveUI.createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar'],
    { configProviderProps },
  )

  window.$loadingBar = loadingBar
  window.$notification = notification
  window.$message = setupMessage(message)
  window.$dialog = setupDialog(dialog)
}

/**
 * 解决 naive-ui 和 unocss 样式冲突
 */
export function setupNaiveUnocss() {
  const meta = document.createElement('meta')
  meta.name = 'naive-ui-style'
  document.head.appendChild(meta)
}
