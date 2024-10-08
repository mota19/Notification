import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface NotificationItem {
  id: number;
  value: string;
  date: string;
  priority: string,
}

interface InitialState {
  items: NotificationItem[],
}

const initialState: InitialState = {
  items: [],
};

const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{value: string, date:string, priority: string}>)=>{
      const id = Date.now();
      const {value, date, priority} = action.payload;
      state.items.push({id, value, date, priority});
    },
    removeItem: (state, action: PayloadAction<{id: number}>) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      },
    updateItem: (state, action: PayloadAction<{id:Number, value: string, date:string, priority: string}>) => {
      const { id, value, date, priority } = action.payload;
      const index = state.items.findIndex(item => item.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], value, date, priority };
      }
    },
    },
});

export const {addItem, removeItem, updateItem} = NotificationSlice.actions;

export default NotificationSlice.reducer;
