import { STANDARD_RESONATORS } from "@/shared/resonators";

export function isGamePathValid(path: string) {
    const gamePathRegex =
        /^[a-zA-Z]:\\(?:[^\\/:*?"<>|\r\n]+\\)*[^\\/:*?"<>|\r\n]*$/;

    return gamePathRegex.test(path);
}

export function isConveneHistoryUrlValid(url: string) {
    const conveneHistoryUrlRegex =
        /^https:\/\/aki-gm-resources-oversea\.aki-game\.net\/aki\/gacha\/index\.html\#\/record\?(?=.*\bplayer_id=\w+\b)(?=.*\brecord_id=\w+\b)(?=.*\bsvr_id=\w+\b).*$/;

    return conveneHistoryUrlRegex.test(url);
}

export default function createImportScript(gamePath: string) {
    return `$gamePath="${gamePath}";` +
        `$logFile="$gamePath\\Client\\Saved\\Logs\\Client.log";` +
        `if(-not(Test-Path $logFile)){` +
            `Write-Host "\`nThe file '$logFile' does not exist." -ForegroundColor Red;` +
            `Write-Host "Did you set your Game Installation Path properly?" -ForegroundColor Magenta;` +
            `Read-Host "Press any key to exit";exit` +
        `}` +
        `$latestUrlEntry=Get-Content $logFile | Select-String "OpenWebView" | Select-String "https://aki-gm-resources-oversea.aki-game.net" | Select-Object -Last 1;` +
        `if($null -ne $latestUrlEntry){` +
            `$urlPattern='"url"\\s*:\\s*"([^"]+)"';` +
            `$url=[regex]::Match($latestUrlEntry.ToString(),$urlPattern).Groups[1].Value;` +
            `if($url){` +
                `Write-Host"";` +
                `Write-Host "Convene Record URL: $url" -ForegroundColor Cyan;` +
                `Set-Clipboard $url;` +
                `Write-Host"";` +
                `Write-Host "URL copied to clipboard. Please paste it into WuWaPal.com and click the Import button." -ForegroundColor Green;` +
            `}else{` +
                `Write-Host "Found a matching log line, but couldn't extract the URL." -ForegroundColor Yellow;` +
            `}` +
        `}else{` +
            `Write-Host "\`nNo matching entries found in the log file." -ForegroundColor Red;` +
            `Write-Host "Please open your Convene History in-game first, then run this script again." -ForegroundColor Magenta;` +
        `}`;
}


export function calculatePercentage(part: number, total: number) {
    return ((part / total) * 100).toFixed(2);
}

export function processBannerForStorex(banner: any, store_id: string) {
    const copyData = [...banner.data].slice().reverse();
    let pity4_last_index = 0;
    let pity5_last_index = 0;
    let last_star5_resonator = null;
    const star4s: any = [];
    const star5s: any = [];

    copyData.forEach((data: any, idx) => {
        const newItem = {
            q: data.qualityLevel,
            p: 1,
            i: "a",
            n: data.name,
            t: data.time,
            y: data.resourceType == "Weapon" ? "w" : "r",
        };

        if (data.qualityLevel == 4) {
            const pity =
                pity4_last_index == 0
                    ? idx - pity4_last_index + 1
                    : idx - pity4_last_index;

            newItem.p = pity;

            star4s.push({
                n: data.name,
                p: pity,
                t: new Date(data.time).getTime(),
                y: data.resourceType == "Weapon" ? "w" : "r",
            });

            pity4_last_index = idx;
        }

        if (data.qualityLevel == 5) {
            const pity =
                pity5_last_index == 0
                    ? idx - pity5_last_index + 1
                    : idx - pity5_last_index;

            newItem.p = pity;

            const star5_processed: any = {
                n: data.name,
                p: pity,
                t: new Date(data.time).getTime(),
                y: data.resourceType == "Weapon" ? "w" : "r",
            };

            if (store_id == "featured_resonator") {
                if (last_star5_resonator == null) {
                    star5_processed.w = !STANDARD_RESONATORS.includes(
                        data.name
                    );
                } else if (
                    last_star5_resonator != null &&
                    !STANDARD_RESONATORS.includes(last_star5_resonator)
                ) {
                    star5_processed.w = !STANDARD_RESONATORS.includes(
                        data.name
                    );
                }
            }

            star5s.push(star5_processed);

            pity4_last_index = idx;
            pity5_last_index = idx;
        }

        copyData[idx] = newItem;
    });

    return {
        bannerForStore: {
            total: copyData.length,
            store_id: store_id,
            items: copyData,
        },
        bannerForGlobalStat: {
            t: copyData.length,
            b: store_id,
            s4: star4s,
            s5: star5s,
        },
    };
}

function parseResourceType(type: string) {
    if (type == "Weapons" || type == "w" || type == "weapons") return "weapons";
    else return "resonators";
}

export function processBanner(banner: any) {
    let returnObj = null;
    if (banner && banner.items.length > 0) {
        let copyItems = [...banner.items];
        let star4_resonators: any = [];
        let star4_weapons: any = [];
        let star4_pity = 0;
        let star5s: any = [];
        let star5_pity = 0;
        let guaranteed = false;
        let pity4_last_index = 0;
        let pity5_last_index = 0;

        copyItems.forEach((item, idx) => {
            let newItem = {
                image_path: "",
                name: item.n || item.name,
                resourceType: parseResourceType(item.y || item.resourceType),
                roll: idx + 1,
                pity: 1,
                time: item.t || item.time,
                qualityLevel: item.q || item.qualityLevel,
                import_type: item.i || item.import_type,
            };

            if (newItem.qualityLevel === 4) {
                const pity =
                    pity4_last_index == 0
                        ? idx - pity4_last_index + 1
                        : idx - pity4_last_index;

                if (newItem.resourceType == "resonators") {
                    star4_resonators.push({
                        name: newItem.name,
                        pity: pity,
                        type: newItem.resourceType,
                    });
                } else {
                    star4_weapons.push({
                        name: newItem.name,
                        pity: pity,
                        type: newItem.resourceType,
                    });
                }

                newItem.pity = pity;
                pity4_last_index = idx;
            } else if (newItem.qualityLevel === 5) {
                const pity =
                    pity5_last_index == 0
                        ? idx - pity5_last_index + 1
                        : idx - pity5_last_index;

                star5s.push({
                    name: newItem.name,
                    pity: pity,
                    type: newItem.resourceType,
                });

                newItem.pity = pity;

                pity4_last_index = idx;
                pity5_last_index = idx;
            }
            // Replace the original item with the new one
            newItem.image_path =
                `/${newItem.resourceType}/` +
                newItem.name
                    .toLowerCase() // Convert all characters to lowercase
                    .replace(/:/g, "") // Remove colons
                    .replace(/ /g, "_") +
                ".webp";
            copyItems[idx] = newItem;
        });

        if (star5s.length > 0) {
            guaranteed = STANDARD_RESONATORS.includes(
                star5s[star5s.length - 1].name
            );
        }

        // console.log("pity4_last_index ", pity4_last_index);
        // console.log("pity5_last_index ", pity5_last_index);
        // console.log("total ", banner.total);

        star4_pity = banner.total - (pity4_last_index + 1);
        star5_pity =
            banner.total - (pity5_last_index == 0 ? 0 : pity5_last_index + 1);

        const star5_avg_pity =
            star5s.reduce((sum: number, obj: any) => sum + obj.pity, 0) /
            star5s.length;
        const star4_avg_pity =
            [...star4_resonators, ...star4_weapons].reduce(
                (sum: number, obj: any) => sum + obj.pity,
                0
            ) /
            (star4_resonators.length + star4_weapons.length);

        returnObj = {
            ...banner,
            star4_resonators,
            star4_weapons,
            star5s,
            star4_pity,
            star5_pity,
            guaranteed,
            star4_avg_pity,
            star5_avg_pity,
            items: copyItems.slice().reverse(),
        };
    }

    return returnObj;
}

export function parseUrlParams(url: string) {
    // Find the index of `#`
    const hashIndex = url.indexOf("#");
    let queryString = url.substring(hashIndex + 1);

    // Find the index of `?` after `#` and get the parameters
    const queryIndex = queryString.indexOf("?");
    if (queryIndex !== -1) {
        queryString = queryString.substring(queryIndex + 1);
    } else {
        // If there's no `?`, return an empty object
        return {};
    }

    const urlParams = new URLSearchParams(queryString);
    const params: any = {};
    urlParams.forEach((value, key) => {
        params[key] = value;
    });
    return params;
}

export function processAddItemToBanner(banner: any, item: any) {
    const copyBanner = { ...banner };
    copyBanner.items.push(item);
    copyBanner.total = parseInt(banner.total) + parseInt(item.p);

    return copyBanner;
}

export function processDeleteLastItemFromBanner(banner: any, item: any) {
    const copyBanner = { ...banner };
    copyBanner.items.reverse().pop();
    copyBanner.total = parseInt(copyBanner.total) - parseInt(item.pity);

    return copyBanner;
}

export function convertJsonToUrl(jsonInput: string) {
    try {
        // Parse the JSON input
        const data = JSON.parse(jsonInput);

        // Construct the base URL
        const baseUrl =
            "https://aki-gm-resources-oversea.aki-game.net/aki/gacha/index.html#/record";

        // Create an object with the query parameters
        const queryParams = {
            svr_id: data.serverId,
            player_id: data.playerId,
            lang: data.languageCode,
            resources_id: data.cardPoolId,
            record_id: data.recordId,
        };

        // Convert the query parameters object to a URL-encoded string
        const queryString = Object.entries(queryParams)
            .map(
                ([key, value]) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            )
            .join("&");

        // Combine the base URL and query string
        return `${baseUrl}?${queryString}`;
    } catch (error) {
        console.error("Error parsing JSON or creating URL:", error);
        return null;
    }
}

export function processBannersForCollection(banners: any) {
    const weapons: any = [];
    const resonators: any = [];

    if (!banners) {
        return { weapons, resonators };
    }

    Object.keys(banners).forEach((keyOfBanner: any) => {
        banners[keyOfBanner]?.items.forEach((item: any) => {
            if (
                (item.y == "w" || item.resourceType == "Weapons") &&
                (item.q > 3 || item.qualityLevel > 3)
            ) {
                weapons[item.n || item.name] =
                    (weapons[item.n || item.name] || 0) + 1;
            } else if (item.y == "r" || item.resourceType == "Resonators") {
                resonators[item.n || item.name] =
                    (resonators[item.n || item.name] || 0) + 1;
            }
        });
    });

    return {
        weapons,
        resonators,
    };
}

interface ApiItem {
    q: number; // Qyality level
    p: number; // Price or points (based on context)
    i: string; // import type; a = auto, m = manual
    n: string; // Name of the item
    t: string; // Timestamp in ISO 8601 format
    y: string; // Category; r = resonator, w = weapon
}

interface BannerData {
    total: number; // Total quantity or count
    store_id: string; // Identifier for the store
    items: ApiItem[]; // Array of items
}

export function processBannerForStore(banner: any, store_id: string) {
    const copyData = [...banner.data].slice().reverse();

    copyData.forEach((data: any, idx) => {
        const newItem = {
            q: data.qualityLevel,
            i: "a",
            n: data.name,
            t: data.time,
            y: data.resourceType == "Weapon" ? "w" : "r",
        };

        copyData[idx] = newItem;
    });

    return {
        store_id,
        items: copyData,
        total: copyData.length,
    };
}

export function processBannerForGlobalStat(banner: any, store_id: string) {
    const copyData = [...banner.items].slice();
    let pity4_last_index = 0;
    let pity5_last_index = 0;
    let last_star5_resonator = null;
    const star4s: any = [];
    const star5s: any = [];

    copyData.forEach((data: any, idx) => {
        const newItem = {
            ...data,
            p: 1,
            i: "a",
        };

        if (data.q == 4) {
            const pity =
                pity4_last_index == 0
                    ? idx - pity4_last_index + 1
                    : idx - pity4_last_index;

            newItem.p = pity;

            star4s.push({
                n: data.n,
                p: pity,
                t: new Date(data.t).getTime(),
                y: data.y,
            });

            pity4_last_index = idx;
        }

        if (data.q == 5) {
            const pity =
                pity5_last_index == 0
                    ? idx - pity5_last_index + 1
                    : idx - pity5_last_index;

            newItem.p = pity;

            const star5_processed: any = {
                n: data.n,
                p: pity,
                t: new Date(data.t).getTime(),
                y: data.y,
            };

            if (store_id == "featured_resonator") {
                if (last_star5_resonator == null) {
                    star5_processed.w = !STANDARD_RESONATORS.includes(data.n);
                } else if (
                    last_star5_resonator != null &&
                    !STANDARD_RESONATORS.includes(last_star5_resonator)
                ) {
                    star5_processed.w = !STANDARD_RESONATORS.includes(data.n);
                }
            }

            star5s.push(star5_processed);

            pity4_last_index = idx;
            pity5_last_index = idx;
        }

        copyData[idx] = newItem;
    });

    return {
        t: copyData.length,
        b: store_id,
        s4: star4s,
        s5: star5s,
    };
}

export function processBannerForGlobalStatV2(banner: any, store_id: string) {
    const copyData = [...banner.items].slice();

    const globalData: any = [];

    let pity4_last_index = 0;
    let pity5_last_index = 0;

    copyData.forEach((data: any, idx: number) => {
        const newItem: any = {
            q: data.q,
            i: "a",
            n: data.n,
            t: data.t,
            y: data.y == "w" ? "w" : "r",
        };

        if (data.q == 4) {
            const pity =
                pity4_last_index == 0
                    ? idx - pity4_last_index + 1
                    : idx - pity4_last_index;

            const { i, ...newItemForGlobal } = newItem;
            globalData.push({ ...newItemForGlobal, p: pity });

            pity4_last_index = idx;
        }

        if (data.q == 5) {
            const pity =
                pity5_last_index == 0
                    ? idx - pity5_last_index + 1
                    : idx - pity5_last_index;

            const { i, ...newItemForGlobal } = newItem;
            globalData.push({ ...newItemForGlobal, p: pity });

            pity4_last_index = idx;
            pity5_last_index = idx;
        }
    });

    return {
        store_id,
        items: globalData,
        total: globalData.length,
    };
}

export function mapBannersForGlobalStats(banners: any) {
    const bannerMap = banners.reduce((acc: any, banner: any) => {
      acc[banner.store_id] = { total: banner.total, items: banner.items };
      return acc;
    }, {} as any);

    return bannerMap;
  }



export const mergeGachaDataOptimized = (
    existingData: BannerData,
    newData: BannerData
) => {
    if (
        !existingData ||
        !existingData.items ||
        existingData.items.length === 0
    ) {
        // If no existing data, return new data directly
        return {
            ...newData,
            total: newData.items.length || 0,
        };
    }

    // Assuming both arrays are sorted by `t` (timestamp) in ascending order
    const lastExistingTimestamp =
        existingData.items[existingData.items.length - 1]?.t;

    // Find the starting point in newData where `t` exceeds `lastExistingTimestamp`
    const newItemsToAdd = newData.items.filter(
        (item) => item.t > lastExistingTimestamp
    );

    // if (newData.store_id == "featured_resonator") {
    //     console.log("lastExistingTimestamp ", lastExistingTimestamp);
    //     console.log("new items to add ", newItemsToAdd);
    // }

    // Concatenate the new items to the existing data
    const mergedItems = [...existingData.items, ...newItemsToAdd];

    // Update the total and return the merged data
    return {
        ...existingData,
        items: mergedItems,
        total: mergedItems.length,
    };
};
