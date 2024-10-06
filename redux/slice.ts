import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface CodeState {
  title: string;
  pseudoCode: string;
  contractCode: string;
  loading: boolean;
  messages: Message[];
}

const initialState: CodeState = {
  title: '',
  pseudoCode: '',
  contractCode: '',
  loading: false,
  messages: [],
};

const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setPseudoCode: (state, action: PayloadAction<string>) => {
      state.pseudoCode = action.payload;
    },
    setContractCode: (state, action: PayloadAction<string>) => {
      state.contractCode = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    addMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = [...state.messages, ...action.payload];
    },
  },
});

export const { setTitle, setPseudoCode, setContractCode, setLoading, addMessages } = codeSlice.actions;

export default codeSlice.reducer;