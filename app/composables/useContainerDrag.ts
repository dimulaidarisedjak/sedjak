import type { ContainerAttributes } from '~/components/CanvasObject.vue';

export function useContainerDrag(props: any, emits: any) {
  const modelValue = ref<ContainerAttributes>(props.modelValue);
  const containers = ref<ContainerAttributes[]>(props.containers);
  const isDragging = ref(false);
  const ghostPosition = ref<{ x: number; y: number } | null>(null);
  const offsetX = ref(0);
  const offsetY = ref(0);
  const startX = ref(0);
  const startY = ref(0);
  const dragThreshold = 1;
  const gridSize = 20;
  const canvasSize = 4000;
  const maxDistance = 200;

  // Precompute collision offsets once for better performance
  const collisionOffsets = (() => {
    const offsets: Array<{ dx: number; dy: number; distance: number }> = [];
    for (let dx = -maxDistance; dx <= maxDistance; dx += gridSize) {
      for (let dy = -maxDistance; dy <= maxDistance; dy += gridSize) {
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= maxDistance) {
          offsets.push({ dx, dy, distance });
        }
      }
    }
    return offsets.sort((a, b) => a.distance - b.distance);
  })();

  const checkCollision = (x: number, y: number) => {
    const newRight = x + modelValue.value.width;
    const newBottom = y + modelValue.value.height;

    return containers.value.some((container) => {
      if (container === modelValue.value) return false;
      return !(
        newRight <= container.position.x ||
        x >= container.position.x + container.width ||
        newBottom <= container.position.y ||
        y >= container.position.y + container.height
      );
    });
  };

  const resolveCollision = (x: number, y: number) => {
    const { width, height } = modelValue.value;
    const maxX = canvasSize - width;
    const maxY = canvasSize - height;

    for (const { dx, dy } of collisionOffsets) {
      let testX = x + dx;
      let testY = y + dy;
      testX = Math.max(0, Math.min(testX, maxX));
      testY = Math.max(0, Math.min(testY, maxY));

      if (!checkCollision(testX, testY)) {
        return { x: testX, y: testY };
      }
    }
    return { x, y };
  };

  const handleDrag = (event: MouseEvent) => {
    if (!isDragging.value) {
      const deltaX = Math.abs(event.clientX - startX.value);
      const deltaY = Math.abs(event.clientY - startY.value);
      if (deltaX >= dragThreshold || deltaY >= dragThreshold) {
        isDragging.value = true;
        ghostPosition.value = { ...modelValue.value.position };
      }
      return;
    }

    let newX = event.clientX / props.zoomLevel - offsetX.value;
    let newY = event.clientY / props.zoomLevel - offsetY.value;

    // Snap to grid and constrain to canvas
    newX = Math.round(newX / gridSize) * gridSize;
    newY = Math.round(newY / gridSize) * gridSize;
    newX = Math.max(0, Math.min(newX, canvasSize - modelValue.value.width));
    newY = Math.max(0, Math.min(newY, canvasSize - modelValue.value.height));

    const adjusted = resolveCollision(newX, newY);
    ghostPosition.value = adjusted;
  };

  const stopDrag = (event: MouseEvent) => {
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', stopDrag);

    if (!isDragging.value) {
      handleClick(event.shiftKey);
      return;
    }

    if (ghostPosition.value) {
      modelValue.value.position = { ...ghostPosition.value };
    }

    isDragging.value = false;
    ghostPosition.value = null;
  };

  const handleClick = (isShiftClick: boolean) => {
    modelValue.value.isSelected = !modelValue.value.isSelected;
    emits(isShiftClick ? 'click:multiple' : 'click:single');
  };

  const startDrag = (event: MouseEvent) => {
    if (isDragging.value) return;

    startX.value = event.clientX;
    startY.value = event.clientY;
    isDragging.value = false;

    offsetX.value =
      event.clientX / props.zoomLevel - modelValue.value.position.x;
    offsetY.value =
      event.clientY / props.zoomLevel - modelValue.value.position.y;

    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', stopDrag);
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

  return { startDrag, ghostPosition };
}
