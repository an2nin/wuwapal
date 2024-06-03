import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BannerItem } from "@/redux/api/types";
import { standard_resonators } from "@/helpers/constants";

interface IInitialState {
    featured_resonator: any | null;
    featured_weapon: any | null;
    standard_resonator: any | null;
    standard_weapon: any | null;
    beginner: any | null;
    beginner_choice: any | null;
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
            if (action.payload.items && action.payload.items.length > 0) {
                let reversedItems = [...action.payload.items].slice().reverse();
                let star4_resonators: any = [];
                let star4_weapons: any = [];
                let star4_pity = 0;
                let star5s: any = [];
                let star5_pity = 0;
                let guaranteed = false;
                let pity4_last_index = 0;
                let pity5_last_index = 0;

                reversedItems.forEach((item, idx) => {
                    // Create a shallow copy of the item to avoid modification issues
                    let newItem = {
                        ...item,
                        roll: idx + 1,
                        pity: 1,
                        image_path: "",
                    };
                    if (newItem.qualityLevel === 4) {
                        if (newItem.resourceType == "Resonators") {
                            star4_resonators.push({
                                name: newItem.name,
                                pity:
                                    pity4_last_index == 0
                                        ? idx - pity4_last_index + 1
                                        : idx - pity4_last_index,
                            });
                        } else {
                            star4_weapons.push({
                                name: newItem.name,
                                pity:
                                    pity4_last_index == 0
                                        ? idx - pity4_last_index + 1
                                        : idx - pity4_last_index,
                            });
                        }
                        newItem.pity =
                            pity4_last_index == 0
                                ? idx - pity4_last_index + 1
                                : idx - pity4_last_index;
                        pity4_last_index = idx;
                    } else if (newItem.qualityLevel === 5) {
                        star5s.push({
                            name: newItem.name,
                            pity:
                                pity5_last_index == 0
                                    ? idx - pity5_last_index + 1
                                    : idx - pity5_last_index,
                        });

                        newItem.pity =
                            pity5_last_index == 0
                                ? idx - pity5_last_index + 1
                                : idx - pity5_last_index;

                        pity4_last_index = idx;
                        pity5_last_index = idx;
                    }
                    // Replace the original item with the new one
                    newItem.image_path =
                        `/images/${item.resourceType.toLowerCase()}/` +
                        item.name
                            .toLowerCase() // Convert all characters to lowercase
                            .replace(/:/g, "") // Remove colons
                            .replace(/ /g, "_") +
                        ".webp";
                    reversedItems[idx] = newItem;
                });

                guaranteed = standard_resonators.includes(
                    reversedItems[pity5_last_index].name
                );

                star4_pity = reversedItems.length - 1 - pity4_last_index;
                star5_pity = reversedItems.length - 1 - pity5_last_index;

                
                curr[action.payload.name] = {
                    star4_resonators,
                    star4_weapons,
                    star5s,
                    star4_pity,
                    star5_pity,
                    guaranteed,
                    title: action.payload.name,
                    total: action.payload.items.length,
                    items: reversedItems.slice(0).reverse(),
                };

            }else{
                curr[action.payload.name] = null;
            }

            state = curr;
        },
        clearBanner: (state: IInitialState) => {
            state = initialState;
        },
    },
});

export const { addBanner, clearBanner } = bannerSlice.actions;

export default bannerSlice.reducer;
