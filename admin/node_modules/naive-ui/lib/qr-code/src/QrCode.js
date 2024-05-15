"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.qrCodeProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
const styles_1 = require("../styles");
const qrcodegen_1 = __importDefault(require("./qrcodegen"));
const ERROR_CORRECTION_LEVEL = {
    L: qrcodegen_1.default.QrCode.Ecc.LOW,
    M: qrcodegen_1.default.QrCode.Ecc.MEDIUM,
    Q: qrcodegen_1.default.QrCode.Ecc.QUARTILE,
    H: qrcodegen_1.default.QrCode.Ecc.HIGH
};
exports.qrCodeProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { value: String, color: {
        type: String,
        default: '#000'
    }, backgroundColor: {
        type: String,
        default: '#FFF'
    }, iconSrc: String, iconSize: {
        type: Number,
        default: 40
    }, iconBackgroundColor: {
        type: String,
        default: '#FFF'
    }, iconBorderRadius: {
        type: Number,
        default: 4
    }, size: {
        type: Number,
        default: 100
    }, padding: {
        type: [Number, String],
        default: 12
    }, errorCorrectionLevel: {
        type: String,
        default: 'M'
    } });
// For retina display
const UPSCALE_RATIO = 2;
exports.default = (0, vue_1.defineComponent)({
    name: 'QrCode',
    props: exports.qrCodeProps,
    setup(props) {
        const { mergedClsPrefixRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('QrCode', '-qr-code', index_cssr_1.default, styles_1.qrcodeLight, props, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            return {
                '--n-border-radius': themeRef.value.self.borderRadius
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('qr-code', undefined, cssVarsRef, props)
            : undefined;
        const canvasRef = (0, vue_1.ref)();
        const qr = (0, vue_1.computed)(() => {
            var _a;
            const errorCorrectionLevel = ERROR_CORRECTION_LEVEL[props.errorCorrectionLevel];
            return qrcodegen_1.default.QrCode.encodeText((_a = props.value) !== null && _a !== void 0 ? _a : '-', errorCorrectionLevel);
        });
        (0, vue_1.onMounted)(() => {
            const imageLoadedTrigger = (0, vue_1.ref)(0);
            let loadedIcon = null;
            (0, vue_1.watchEffect)(() => {
                void imageLoadedTrigger.value;
                drawCanvas(qr.value, props.size, props.color, props.backgroundColor, loadedIcon
                    ? {
                        icon: loadedIcon,
                        iconBorderRadius: props.iconBorderRadius,
                        iconSize: props.iconSize,
                        iconBackgroundColor: props.iconBackgroundColor
                    }
                    : null);
            });
            (0, vue_1.watchEffect)(() => {
                const { iconSrc } = props;
                if (iconSrc) {
                    let aborted = false;
                    const img = new Image();
                    img.src = iconSrc;
                    img.onload = () => {
                        if (aborted)
                            return;
                        loadedIcon = img;
                        imageLoadedTrigger.value++;
                    };
                    return () => {
                        aborted = true;
                    };
                }
            });
        });
        function drawCanvas(qr, size, foregroundColor, backgroundColor, iconConfig) {
            const canvas = canvasRef.value;
            if (!canvas)
                return;
            const canvasWidth = size * UPSCALE_RATIO;
            const width = qr.size;
            const scale = canvasWidth / width;
            canvas.width = canvasWidth;
            canvas.height = canvasWidth;
            const ctx = canvas.getContext('2d');
            if (!ctx)
                return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let y = 0; y < qr.size; y++) {
                for (let x = 0; x < qr.size; x++) {
                    ctx.fillStyle = qr.getModule(x, y) ? foregroundColor : backgroundColor;
                    const startX = Math.floor(x * scale);
                    const endX = Math.ceil((x + 1) * scale);
                    const startY = Math.floor(y * scale);
                    const endY = Math.ceil((y + 1) * scale);
                    ctx.fillRect(startX, startY, endX - startX, endY - startY);
                }
            }
            if (iconConfig) {
                const { icon, iconBackgroundColor, iconBorderRadius, iconSize } = iconConfig;
                const finalIconSize = iconSize * UPSCALE_RATIO;
                const centerX = (canvas.width - finalIconSize) / 2;
                const centerY = (canvas.height - finalIconSize) / 2;
                ctx.fillStyle = iconBackgroundColor;
                ctx.beginPath();
                ctx.roundRect(centerX, centerY, finalIconSize, finalIconSize, iconBorderRadius * UPSCALE_RATIO);
                ctx.fill();
                const aspectRatio = icon.width / icon.height;
                const scaledWidth = aspectRatio >= 1 ? finalIconSize : finalIconSize * aspectRatio;
                const scaledHeight = aspectRatio <= 1 ? finalIconSize : finalIconSize / aspectRatio;
                const left = centerX + (finalIconSize - scaledWidth) / 2;
                const top = centerY + (finalIconSize - scaledHeight) / 2;
                ctx.drawImage(icon, left, top, scaledWidth, scaledHeight);
            }
        }
        return {
            canvasRef,
            mergedClsPrefix: mergedClsPrefixRef,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass
        };
    },
    render() {
        const { mergedClsPrefix, backgroundColor, padding, cssVars, themeClass, size } = this;
        return ((0, vue_1.h)("div", { class: [`${mergedClsPrefix}-qr-code`, themeClass], style: Object.assign({ padding: typeof padding === 'number' ? `${padding}px` : padding, backgroundColor, width: `${size}px`, height: `${size}px` }, cssVars) },
            (0, vue_1.h)("canvas", { ref: "canvasRef", style: {
                    width: `${size}px`,
                    height: `${size}px`
                } })));
    }
});
