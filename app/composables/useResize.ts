import type { ContainerAttributes } from '~/components/CanvasObject.vue';

export function useResize(
  props: any,
  emits: any,
  contentRef: Ref<HTMLElement | null>,
) {
  const modelValue = ref<ContainerAttributes>(props.modelValue);
  const isDragging = ref(false);
  const ghostOffsetX = ref(0);
  const ghostOffsetY = ref(0);
  const startX = ref(0);
  const startY = ref(0);
  const dragThreshold = 1;
  const gridSize = 10;
  const canvasSize = 4000;
  const ghostDimensions = ref<{ width: number; height: number } | null>(null);

  let activeResizeType: string | null = null;

  function getPointPosition(typeArray: string[]) {
    const pointPosition = { x: null, y: null } as {
      x: number | null;
      y: number | null;
    };
    const target = ref<any[]>(['x', 'y']);

    if (typeArray.includes('top'))
      pointPosition.y = modelValue.value.position.y;
    if (typeArray.includes('left'))
      pointPosition.x = modelValue.value.position.x;
    if (typeArray.includes('bottom'))
      pointPosition.y = modelValue.value.position.y + modelValue.value.height;
    if (typeArray.includes('right'))
      pointPosition.x = modelValue.value.position.x + modelValue.value.width;

    if (pointPosition.x === null) {
      pointPosition.x = modelValue.value.position.x;
      target.value = target.value.filter((t: string) => t !== 'x');
    }
    if (pointPosition.y === null) {
      pointPosition.y = modelValue.value.position.y;
      target.value = target.value.filter((t: string) => t !== 'y');
    }

    return {
      pointPosition: pointPosition,
      target: target.value,
    };
  }

  const handleDrag = (event: MouseEvent) => {
    if (!isDragging.value) {
      const deltaX = Math.abs(event.clientX - startX.value);
      const deltaY = Math.abs(event.clientY - startY.value);
      if (deltaX >= dragThreshold || deltaY >= dragThreshold) {
        isDragging.value = true;
      }
      return;
    }

    if (!activeResizeType || !contentRef.value) return;

    const canvas = contentRef.value;
    const rect = (canvas as any).$el.getBoundingClientRect();
    const canvasLeft = rect.left;
    const canvasTop = rect.top;

    const { pointPosition, target } = getPointPosition(
      activeResizeType.split('-'),
    );

    const oldPosition: any = pointPosition;
    const oldScaledPosition: any = {
      x: Math.round(oldPosition.x * props.zoomLevel),
      y: Math.round(oldPosition.y * props.zoomLevel),
    };

    console.log('oldPosition', oldPosition, oldScaledPosition);

    const newPosition: any = {
      x: modelValue.value.width,
      y: modelValue.value.height,
    };
    const newScaledPosition: any = {
      x: Math.round(newPosition.x * props.zoomLevel),
      y: Math.round(newPosition.y * props.zoomLevel),
    };

    if (target.includes('x')) {
      const mouseX = event.clientX - canvasLeft;
      newScaledPosition.x =
        Math.round((mouseX - ghostOffsetX.value) / gridSize) * gridSize;

      newScaledPosition.x = Math.max(
        0,
        Math.min(newScaledPosition.x, canvasSize),
      );
      console.log('newX', newScaledPosition.x, oldScaledPosition.x);
    }

    if (target.includes('y')) {
      const mouseY = event.clientY - canvasTop;
      newScaledPosition.y =
        Math.round((mouseY - ghostOffsetY.value) / gridSize) * gridSize;

      newScaledPosition.y = Math.max(
        0,
        Math.min(newScaledPosition.y, canvasSize),
      );
      console.log('newY', newScaledPosition.y, oldScaledPosition.y);
    }

    console.log('newPosition', newPosition, newScaledPosition);
    ghostDimensions.value = {
      width:
        Math.round(newScaledPosition.x / props.zoomLevel / gridSize) * gridSize,
      height:
        Math.round(newScaledPosition.y / props.zoomLevel / gridSize) * gridSize,
    };

    // console.log('On Dynamic', ghostDimensions.value);
  };

  const stopDrag = () => {
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', stopDrag);

    if (ghostDimensions.value) {
      console.log('On Stop Drag', ghostDimensions.value);

      modelValue.value.width = ghostDimensions.value.width;
      modelValue.value.height = ghostDimensions.value.height;
    }

    isDragging.value = false;
    ghostDimensions.value = null;
    activeResizeType = null;
  };

  const startResize = (event: MouseEvent, type: string) => {
    startX.value = event.clientX;
    startY.value = event.clientY;
    isDragging.value = false;
    activeResizeType = type;

    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', stopDrag, { once: true });
  };

  watch(
    modelValue,
    (newValue) => {
      emits('update:modelValue', newValue);
    },
    { deep: true },
  );

  onUnmounted(() => {
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', stopDrag);
  });

  return { startResize, ghostDimensions };
}
