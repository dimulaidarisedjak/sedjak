export function useResize(
  minWidth: number = 100,
  maxWidth: number = 400,
  isRightPanel: boolean = false
) {
  const width = ref<number>(350); // Initial width
  const isResizing = ref<boolean>(false);
  const startX = ref<number>(0);
  const startWidth = ref<number>(0);

  const startResize = (e: MouseEvent): void => {
    e.preventDefault();
    isResizing.value = true;
    startX.value = e.clientX;
    startWidth.value = width.value;

    window.addEventListener("mousemove", doResize);
    window.addEventListener("mouseup", stopResize);
  };

  const doResize = (e: MouseEvent): void => {
    if (!isResizing.value) return;

    const deltaX = e.clientX - startX.value;
    const newWidth = isRightPanel
      ? startWidth.value - deltaX // Invert for right panel
      : startWidth.value + deltaX;

    if (newWidth >= minWidth && newWidth <= maxWidth) {
      width.value = newWidth;
    }
  };

  const stopResize = (): void => {
    isResizing.value = false;
    window.removeEventListener("mousemove", doResize);
    window.removeEventListener("mouseup", stopResize);
  };

  onUnmounted(() => {
    window.removeEventListener("mousemove", doResize);
    window.removeEventListener("mouseup", stopResize);
  });

  return {
    width,
    startResize,
  };
}
