import { writable } from 'svelte/store';

const visibility = writable({});

export const setModalVisible = (modalId: string, visible: boolean) => {
  visibility.update((value) => ({
    ...value,
    [modalId]: visible,
  }));
};

export default visibility;
