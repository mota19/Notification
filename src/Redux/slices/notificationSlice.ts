import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface InitialState {
  id: string;
  items: string[],

}

const initialState: InitialState = {
  id: '',
  items: [],
};

const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addItem:{
      
    }
  },
});

export default NotificationSlice.reducer;
