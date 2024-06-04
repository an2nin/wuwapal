import { standard_resonators } from "./constants";

export function processBanner(payload: any, name: string) {
    let returnObj = null;
    if (payload && payload.length > 0) {
        let reversedItems = [...payload].slice().reverse();
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

        returnObj = {
            star4_resonators,
            star4_weapons,
            star5s,
            star4_pity,
            star5_pity,
            guaranteed,
            title: name,
            total: payload.length,
            items: reversedItems.slice(0).reverse(),
        };
    }
    return returnObj;
}
