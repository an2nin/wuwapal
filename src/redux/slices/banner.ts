import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BannerItem } from "@/redux/api/types";

interface IInitialState {
    featured_resonator: BannerItem[] | null;
    featured_weapon: BannerItem[] | null;
    standard_resonator: BannerItem[] | null;
    standard_weapon: BannerItem[] | null;
    beginner: BannerItem[] | null;
    beginner_choice: BannerItem[] | null;
}

type BannerPayload = {
    items: BannerItem[];
    name: string;
};

const initialState: IInitialState = {
    featured_resonator: null,
    featured_weapon: null,
    standard_resonator: null,
    standard_weapon: null,
    beginner: null,
    beginner_choice: null,
};

const bannerSlice = createSlice({
    name: "banner",
    initialState,
    reducers: {
        addBanner(state, action: PayloadAction<BannerPayload>) {
            const curr: any = state;
            curr[action.payload.name] = action.payload.items;
            state = curr;
        },
        clearCart: (state: IInitialState) => {
            state = initialState;
        },
    },
});

export const { addBanner, clearCart } = bannerSlice.actions;

export default bannerSlice.reducer;
