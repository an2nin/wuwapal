import { BANNERS } from '@/shared/constants/game/banners';

export function isGamePathValid(path: string) {
  const gamePathRegex
    = /^[a-z]:\\(?:[^\\/:*?"<>|\r\n]+\\)*[^\\/:*?"<>|\r\n]*$/i;

  return gamePathRegex.test(path);
}

export function createImportScript(gamePath: string) {
  return `$gamePath="${gamePath}";$logFile="$gamePath\\Client\\Saved\\Logs\\Client.log";if(-not(Test-Path $logFile)){Write-Host "\`nThe file '$logFile' does not exist." -ForegroundColor Red;Write-Host "Did you set your Game Installation Path properly?" -ForegroundColor Magenta;Read-Host "Press any key to exit";exit}$latestUrlEntry=Get-Content $logFile | Select-String "https://aki-gm-resources-oversea.aki-game.net" | Select-Object -Last 1;if($null -ne $latestUrlEntry){$urlPattern='url":"(.*?)"';$url=[regex]::Match($latestUrlEntry.ToString(),$urlPattern).Groups[1].Value;if($url){Write-Host"";Write-Host "Convene Record URL: $url";Set-Clipboard $url;Write-Host"";Write-Host "URL copied to clipboard. Please paste to WuWaPal.com and click the Import button." -ForegroundColor Green}else{Write-Host "No URL found."}}else{Write-Host "\`nNo matching entries found in the log file. Please open your Convene History first!" -ForegroundColor Red}`;
}

export function getStoreIdById(id: number): string | undefined {
  const banner = Object.values(BANNERS).find(banner => banner.id === id);
  return banner ? banner.store_id : undefined;
}

export function convertToProfileKey(name: string) {
  return name.toLowerCase().replace(' ', '_');
}

export function convertJsonToGachaUrl(jsonInput: string) {
  try {
    // Parse the JSON input
    const data = JSON.parse(jsonInput);

    // Construct the base URL
    const baseUrl
      = 'https://aki-gm-resources-oversea.aki-game.net/aki/gacha/index.html#/record';

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
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join('&');

    // Combine the base URL and query string
    return `${baseUrl}?${queryString}`;
  }
  catch (error) {
    console.error('Error parsing JSON or creating URL:', error);
    return null;
  }
}

export function parseUrlParams(url: string) {
  // Find the index of `#`
  const hashIndex = url.indexOf('#');
  let queryString = url.substring(hashIndex + 1);

  // Find the index of `?` after `#` and get the parameters
  const queryIndex = queryString.indexOf('?');
  if (queryIndex !== -1) {
    queryString = queryString.substring(queryIndex + 1);
  }
  else {
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

export function isConveneHistoryUrlValid(url: string) {
  const conveneHistoryUrlRegex
    = /^https:\/\/aki-gm-resources-oversea\.aki-game\.net\/aki\/gacha\/index\.html#\/record\?(?=.*\bplayer_id=\w+\b)(?=.*\brecord_id=\w+\b)(?=.*\bsvr_id=\w+\b).+$/;

  return conveneHistoryUrlRegex.test(url);
}
