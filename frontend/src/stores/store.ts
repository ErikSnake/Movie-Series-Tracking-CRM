import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from "./users/usersSlice";
import rolesSlice from "./roles/rolesSlice";
import permissionsSlice from "./permissions/permissionsSlice";
import franchisesSlice from "./franchises/franchisesSlice";
import titlesSlice from "./titles/titlesSlice";
import seasonsSlice from "./seasons/seasonsSlice";
import episodesSlice from "./episodes/episodesSlice";
import watch_entriesSlice from "./watch_entries/watch_entriesSlice";
import watchlist_itemsSlice from "./watchlist_items/watchlist_itemsSlice";
import tagsSlice from "./tags/tagsSlice";
import title_tagsSlice from "./title_tags/title_tagsSlice";
import attachmentsSlice from "./attachments/attachmentsSlice";

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

users: usersSlice,
roles: rolesSlice,
permissions: permissionsSlice,
franchises: franchisesSlice,
titles: titlesSlice,
seasons: seasonsSlice,
episodes: episodesSlice,
watch_entries: watch_entriesSlice,
watchlist_items: watchlist_itemsSlice,
tags: tagsSlice,
title_tags: title_tagsSlice,
attachments: attachmentsSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
