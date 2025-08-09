import { 
    configureStore, 
    // combineReducers
 } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userAuthApi } from './api/users/auth';
import userSliceReducer from './api/userSlice/userSlice';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist'; // Corrected import
import { sellerApi } from './api/users/seller';
import { buyerApi } from './api/users/buyer';
import quantitySliceReducer from './api/quatitySlice/quantitySlice';

// const rootReducer = combineReducers({
//     [userAuthApi.reducerPath]: userAuthApi.reducer,
//     [sellerApi.reducerPath]: sellerApi.reducer,
//     [buyerApi.reducerPath]:buyerApi.reducer,
//     user: userSliceReducer,
//     quantity: quantitySliceReducer // Added quantity slice reducer
    
// });

// const persistConfig = {
//     key: 'root',
//     storage,
//     blacklist:['userAuthApi','sellerApi','buyerApi']
// };


// const persistantReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    // reducer: persistantReducer, // Corrected reducer assignment 
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({ 
    //         serializableCheck: false 
    //     }).concat(
    //         userAuthApi.middleware,
    //         sellerApi.middleware,
    //         buyerApi.middleware
    //     ),
    reducer:{
        [userAuthApi.reducerPath]: userAuthApi.reducer,
        [sellerApi.reducerPath]: sellerApi.reducer,
        [buyerApi.reducerPath]: buyerApi.reducer,
        user: userSliceReducer,
        quantity: quantitySliceReducer // Added quantity slice reducer
    },

        devTools: import.meta.env.NODE_ENV !== 'production', // Enable devTools only in development mode
}, 
);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);