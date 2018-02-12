import { parseSizes } from 'parse-sizes/parse-sizes';

// There seem to be issues with `HTMLImageElement.natural{Width,Height}`, so we have to rely on this
// instead.
// https://bugs.chromium.org/p/chromium/issues/detail?id=760612
const getSrcWidth = (src: string) => {
    const t = new Image();
    t.src = src;
    return t.width;
}

// Note this is not run in the context of the element, so relative dimensions like percentages will
// not be calculated correctly.
const evalCssCalc = (calcStr: string) => {
    const node = document.createElement('div')
    node.style.width = calcStr;
    document.body.appendChild(node);
    const { width } = window.getComputedStyle(node);
    document.body.removeChild(node);
    return width as string;
}

export const getSizes = (imgEl: HTMLImageElement) => {
    const currentSrcWidth = getSrcWidth(imgEl.currentSrc);
    const elementWidth = imgEl.width;
    const parsedSizeRaw = parseSizes(imgEl.sizes);
    const parsedSize = parseFloat(evalCssCalc(parsedSizeRaw));
    return { currentSrcWidth, elementWidth, parsedSize }
};

const getSizesAndLog = (imgEl: HTMLImageElement) => console.log(getSizes(imgEl));

export const observeSizes = (imgEl: HTMLImageElement) => {
    getSizesAndLog(imgEl);

    const eventHandler = () => getSizesAndLog(imgEl);
    imgEl.addEventListener('load', eventHandler);
    window.addEventListener('resize', eventHandler);
};

export const hideBodyScrollBars = () => {
  // Whilst we debug image sizes, we want to hide scroll bars as they may not be accounted for in
  // our `sizes` attribute.
  document.body.style.overflow = 'hidden';
};
