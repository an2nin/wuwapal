 <#
 🌊═══════════════════════════════════════════════════════════════════════════════🌊
                           🌟 WuWaPal Convene Extractor 🌟
 🌊═══════════════════════════════════════════════════════════════════════════════🌊

   Unlock and export your Wuthering Waves Convene (gacha) history URL.
   This script searches for your game installation, reads the client log,
   and copies the Convene Record URL so you can import it into WuWaPal.

   🎯 MAIN FEATURES
     • Scans registry hints (MuiCache, firewall rules, uninstall entries)
     • Searches common install paths across all available drives
     • Skips known-problematic OneDrive locations
     • Reads `Client\Saved\Logs\Client.log` to find the Convene Record URL
     • Shows the exact log file path used for extraction
     • Copies the found URL directly to your clipboard
     • Offers a manual path input flow if automatic detection fails

   🛠 SAFETY & REPAIR HELPERS
     • Detects and offers to fix Engine.ini when logging is disabled
     • Detects and can remove deny ACLs that block reading Client.log
     • Suggests relaunching as Administrator when access is limited

   ⚠️ REQUIREMENTS / TIPS
     • Open the in‑game Convene History screen before running the script
     • Disable third‑party tools that might tamper with logs

   🆘 Need help? Join our community: https://discord.gg/DFKG4nqUD4

 🌊═══════════════════════════════════════════════════════════════════════════════🌊
   💡 Inspired by Luzefiru's wuwa gacha URL extraction work
   ❤️ Created by an2nin (Antonin) for the WuWaPal community
 🌊═══════════════════════════════════════════════════════════════════════════════🌊
 #>

Add-Type -AssemblyName System.Web

# Define registry paths to search
$registryPaths = @(
    "Registry::HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*",
    "Registry::HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*"
)

# Attempt to find the game installation path automatically
Write-Host "`n`nAttempting to locate the game installation directory..." -ForegroundColor Yellow
$gamePath = $null
$gachaLogPathExists = $false

function Decrypt-ClientLog {
    param (
        [byte[]]$Data
    )

    $result = New-Object byte[] $Data.Length

    for ($i = 0; $i -lt $Data.Length; $i++) {
        $b = $Data[$i]

        if ((($b -band 0x0F) % 2) -eq 1) {
            $result[$i] = $b -bxor 0xA5
        }
        else {
            $result[$i] = $b -bxor 0xEF
        }
    }

    return $result
}

function Read-SharedFileBytes {
    param (
        [string]$Path
    )

    $stream = $null

    try {
        $stream = [System.IO.File]::Open(
            $Path,
            [System.IO.FileMode]::Open,
            [System.IO.FileAccess]::Read,
            [System.IO.FileShare]::ReadWrite
        )

        $memoryStream = New-Object System.IO.MemoryStream
        $stream.CopyTo($memoryStream)
        return $memoryStream.ToArray()
    }
    finally {
        if ($stream) {
            $stream.Dispose()
        }
    }
}

# Search registry entries for game installation path
foreach ($regPath in $registryPaths) {
    try {
        $installedEntry = Get-ItemProperty -Path $regPath | Where-Object { $_.DisplayName -like "*wuthering*" }
        if ($installedEntry) {
            $gamePath = $installedEntry.InstallPath
            if (Test-Path ($gamePath + '\Client\Saved\Logs\Client.log')) {
                $gachaLogPathExists = $true
                break
            }
        }
    }
    catch {
        # Continue searching other registry paths
    }
}

# Search MUI cache for game installation path
if (!$gachaLogPathExists) {
    $muiCachePath = "Registry::HKEY_CURRENT_USER\Software\Classes\Local Settings\Software\Microsoft\Windows\Shell\MuiCache"
    $filteredEntries = (Get-ItemProperty -Path $muiCachePath).PSObject.Properties | Where-Object { $_.Value -like "*wuthering*" } | Where-Object { $_.Name -like "*client-win64-shipping.exe*" }
    if ($filteredEntries.Count -ne 0) {
        $gamePath = ($filteredEntries[0].Name -split '\\client\\')[0]
        if (Test-Path ($gamePath + '\Client\Saved\Logs\Client.log')) {
            $gachaLogPathExists = $true
        }
    }
}

# Search firewall rules for game installation path
if (!$gachaLogPathExists) {
    $firewallPath = "Registry::HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\SharedAccess\Parameters\FirewallPolicy\FirewallRules"
    $filteredEntries = (Get-ItemProperty -Path $firewallPath).PSObject.Properties | Where-Object { $_.Value -like "*wuthering*" } | Where-Object { $_.Name -like "*client-win64-shipping*" }
    if ($filteredEntries.Count -ne 0) {
        $gamePath = (($filteredEntries[0].Value -split 'App=')[1] -split '\\client\\')[0]
        if (Test-Path ($gamePath + '\Client\Saved\Logs\Client.log')) {
            $gachaLogPathExists = $true
        }
    }
}

# Search common installation paths
if (!$gachaLogPathExists) {
    $diskLetters = (Get-PSDrive).Name -match '^[a-z]$'
    foreach ($diskLetter in $diskLetters) {
        $commonPaths = @(
            "$diskLetter`:\Wuthering Waves Game",
            "$diskLetter`:\Wuthering Waves\Wuthering Waves Game",
            "$diskLetter`:\Program Files\Epic Games\WutheringWavesj3oFh\Wuthering Waves Game",
            "$diskLetter`:\SteamLibrary\steamapps\common\Wuthering Waves"
        )

        foreach ($path in $commonPaths) {
            if (Test-Path ($path + '\Client\Saved\Logs\Client.log')) {
                $gamePath = $path
                $gachaLogPathExists = $true
                break
            }
        }

        if ($gachaLogPathExists) {
            break
        }
    }
}

# Prompt user for manual input if game installation path not found
while (!$gachaLogPathExists) {
    Write-Host "Game installation directory not found or log files missing. Please enter the game installation path or join our Discord server for assistance: https://discord.gg/DFKG4nqUD4"
    Write-Host "Common installation paths:" -ForegroundColor Yellow
    Write-Host "  C:\Wuthering Waves"
    Write-Host "  C:\Wuthering Waves\Wuthering Waves Game"
    Write-Host "  C:\Program Files\Epic Games\WutheringWavesj3oFh"
    $manualPath = Read-Host "Path"

    if ($manualPath) {
        $gamePath = $manualPath
        if (Test-Path ($gamePath + '\Client\Saved\Logs\Client.log')) {
            $gachaLogPathExists = $true
        }
        else {
            Write-Host "Could not find log files in the specified path. Please try again or join our Discord server for assistance." -ForegroundColor Red
        }
    }
    else {
        Write-Host "Invalid path entered. Please try again or join our Discord server for assistance." -ForegroundColor Red
    }
}

# Define log file paths
$gachaLogPath = $gamePath + '\Client\Saved\Logs\Client.log'

# Search for Convene History URL in log files
$gachaUrlEntry = $null

if (Test-Path $gachaLogPath) {
    try {
        $encryptedBytes = Read-SharedFileBytes $gachaLogPath
        $decryptedBytes = Decrypt-ClientLog $encryptedBytes
    }
    catch {
        Write-Host "`nUnable to read the log file while the game is running. Close the game and try again, or rerun after the log is flushed." -ForegroundColor Red
        $decryptedBytes = $null
    }

    if ($decryptedBytes) {
        $text = [System.Text.Encoding]::UTF8.GetString($decryptedBytes)

        $gachaUrlEntry = [regex]::Matches(
            $text,
            'https://aki-gm-resources-oversea\.aki-game\.(?:net|com)[^\s"<>]+'
        ) |
            Select-Object -Last 1
    }
}

# Determine which URL to use and copy to clipboard
if ($gachaUrlEntry) {
    $urlToCopy = $gachaUrlEntry.Value

    if ([string]::IsNullOrWhiteSpace($urlToCopy)) {
        Write-Host "`nConvene History URL not found in the log files. Please ensure that Convene History is open in game" -ForegroundColor Red
    }
    else {
        Write-Host "`nThe Convene History URL was found inside the game's log file:"
        Write-Host "$gachaLogPath" -ForegroundColor Cyan

        Write-Host "`nConvene History URL:"
        Write-Host "$urlToCopy" -ForegroundColor Cyan
        Set-Clipboard $urlToCopy
        Write-Host "`nURL copied to clipboard. You can now paste it into https://wuwapal.com/convene/import and click the 'Import' button." -ForegroundColor Green
    }
}
else {
    Write-Host "`nConvene History URL not found in the log files. Please ensure that Convene History is open in game." -ForegroundColor Red
}

Write-Host "`n"
