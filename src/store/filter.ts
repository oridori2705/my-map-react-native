import {colors} from '@/constant/colors';
import {create} from 'zustand';

interface FilterState {
  filters: Record<string, boolean>;
  setFilters: (filters: Record<string, boolean>) => void;
  resetFilters: () => void;
}

const initialFilters = {
  [colors.PINK_400]: true,
  [colors.YELLOW_400]: true,
  [colors.GREEN_400]: true,
  [colors.BLUE_400]: true,
  [colors.PURPLE_400]: true,
  '1': true,
  '2': true,
  '3': true,
  '4': true,
  '5': true,
};

const useFilterStore = create<FilterState>(set => ({
  filters: initialFilters,
  setFilters: filters => {
    set({filters});
  },
  resetFilters: () => set({filters: initialFilters}),
}));

export default useFilterStore;
