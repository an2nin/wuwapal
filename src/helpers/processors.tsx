import { standard_resonators, star_4_resonators } from "./constants";

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
    return `$gamePath="${gamePath}";$logFile="$gamePath\\Client\\Saved\\Logs\\Client.log";if(-not(Test-Path $logFile)){Write-Host "\`nThe file '$logFile' does not exist." -ForegroundColor Red;Write-Host "Did you set your Game Installation Path properly?" -ForegroundColor Magenta;Read-Host "Press any key to exit";exit}$latestUrlEntry=Get-Content $logFile | Select-String "https://aki-gm-resources-oversea.aki-game.net" | Select-Object -Last 1;if($null -ne $latestUrlEntry){$urlPattern='url":"(.*?)"';$url=[regex]::Match($latestUrlEntry.ToString(),$urlPattern).Groups[1].Value;if($url){Write-Host"";Write-Host "Convene Record URL: $url";Set-Clipboard $url;Write-Host"";Write-Host "URL copied to clipboard. Please paste to WuWaPal.com and click the Import button." -ForegroundColor Green}else{Write-Host "No URL found."}}else{Write-Host "\`nNo matching entries found in the log file. Please open your Convene History first!" -ForegroundColor Red}`;
}

export function calculatePercentage (part: number, total: number) {
    return ((part / total) * 100).toFixed(2);
}

export function processBannerForStore(banner: any, store_id: string) {
    const copyData = [...banner.data].slice().reverse();
    let pity4_last_index = 0;
    let pity5_last_index = 0;
    let last_star5_resonator = null;
    const star4s: any = [];
    const star5s: any = [];

    copyData.forEach((data: any, idx) => {
        const newItem = { ...data, roll: idx + 1, pity: 1, import: "auto" };
        if (newItem.qualityLevel == 4) {
            const pity =
                pity4_last_index == 0
                    ? idx - pity4_last_index + 1
                    : idx - pity4_last_index;

            newItem.pity = pity;

            star4s.push({
                n: newItem.name,
                p: pity,
                t: new Date(newItem.time).getTime(),
                y: newItem.resourceType == "Weapons" ? "w" : "r",
            });

            pity4_last_index = idx;
        }

        if (newItem.qualityLevel == 5) {
            const pity =
                pity5_last_index == 0
                    ? idx - pity5_last_index + 1
                    : idx - pity5_last_index;

            newItem.pity = pity;

            const star5_processed: any = {
                n: newItem.name,
                p: pity,
                t: new Date(newItem.time).getTime(),
                y: newItem.resourceType == "Weapons" ? "w" : "r",
            };

            if (store_id == "featured_resonator") {
                if (last_star5_resonator == null) {
                    star5_processed.w = !standard_resonators.includes(
                        newItem.name
                    );
                } else if (
                    last_star5_resonator != null &&
                    !standard_resonators.includes(last_star5_resonator)
                ) {
                    star5_processed.w = !standard_resonators.includes(
                        newItem.name
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
                ...item,
                image_path: "",
            };

            if (newItem.qualityLevel === 4) {
                if (newItem.resourceType == "Resonators") {
                    star4_resonators.push({
                        name: newItem.name,
                        pity: newItem.pity,
                    });
                } else {
                    star4_weapons.push({
                        name: newItem.name,
                        pity: newItem.pity,
                    });
                }
                pity4_last_index = newItem.roll;
            } else if (newItem.qualityLevel === 5) {
                star5s.push({
                    name: newItem.name,
                    pity: newItem.pity,
                });

                pity4_last_index = newItem.roll;
                pity5_last_index = newItem.roll;
            }
            // Replace the original item with the new one
            newItem.image_path =
                `/${item.resourceType.toLowerCase()}/` +
                item.name
                    .toLowerCase() // Convert all characters to lowercase
                    .replace(/:/g, "") // Remove colons
                    .replace(/ /g, "_") +
                ".webp";
            copyItems[idx] = newItem;
        });

        if (star5s.length > 0) {
            guaranteed = standard_resonators.includes(
                star5s[star5s.length - 1].name
            );
        }

        star4_pity = banner.total - pity4_last_index;
        star5_pity = banner.total - pity5_last_index;

        returnObj = {
            ...banner,
            star4_resonators,
            star4_weapons,
            star5s,
            star4_pity,
            star5_pity,
            guaranteed,
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
    copyBanner.total = parseInt(banner.total) + parseInt(item.pity);

    return copyBanner;
}

export function processDeleteLastItemFromBanner(banner: any, item: any) {
    const copyBanner = { ...banner };
    copyBanner.items.reverse().pop();
    copyBanner.total = parseInt(copyBanner.total) - parseInt(item.pity);

    return copyBanner;
}
