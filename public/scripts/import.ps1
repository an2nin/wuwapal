<#
🌊═══════════════════════════════════════════════════════════════════════════════🌊
                          🌟 WuWaPal Convene Extractor 🌟
🌊═══════════════════════════════════════════════════════════════════════════════🌊

  ⚡ UNLOCK YOUR WUTHERING WAVES GACHA HISTORY ⚡

  This powerful script hunts through your system like a determined Resonator,
  searching every corner to find your precious Convene History URL and unlock
  the secrets of your gacha pulls!

  🎯 WHAT IT DOES:
    • Scans your entire system for Wuthering Waves installations
    • Extracts the hidden Convene History URL from game logs
    • Automatically copies the URL to your clipboard
    • Guides you through manual setup if auto-detection fails

  🚀 Perfect for importing your gacha data to WuWaPal.com!

  ⚠️  IMPORTANT NOTES:
    • Make sure you keep Convene History in-game opened while running the script
    • Third-party mods/tools might interfere with detection
    • OneDrive installations may cause issues (we'll skip them)

  🆘 Need help? Join our community: https://discord.gg/DFKG4nqUD4

🌊═══════════════════════════════════════════════════════════════════════════════🌊
  💡 Inspired by Luzefiru's wuwa gacha url extraction script
  ❤️ Created by an2nin (Antonin) for the WuWaPal community
🌊═══════════════════════════════════════════════════════════════════════════════🌊
#>

Add-Type -AssemblyName System.Web

# Initialize variables
$gameDirectory = $null
$urlLocated = $false
$logFilesFound = $false
$directoryExists = $false
$errorMessages = ""
$searchedPaths = @()
$currentErrorAction = $ErrorActionPreference

# Suppress errors during path discovery to avoid confusing output
$ErrorActionPreference = "SilentlyContinue"

Write-Host "Starting automatic search for Convene History URL..." -ForegroundColor Cyan

# Function to check for log files and extract URL
function Find-ConveneUrl {
    param([string]$InstallPath)

    if (!(Test-Path $InstallPath)) {
        $script:directoryExists = $false
        $script:logFilesFound = $false
        $script:urlLocated = $false
        return $script:directoryExists, $script:logFilesFound, $script:urlLocated
    }
    else {
        $script:directoryExists = $true
    }

    $clientLogFile = Join-Path $InstallPath "Client\Saved\Logs\Client.log"
    $configFile = Join-Path $InstallPath "Client\Saved\Config\WindowsNoEditor\Engine.ini"

    # Check if logging is disabled in Engine.ini
    $loggingDisabled = $false
    if (Test-Path $configFile) {
        $configContent = Get-Content $configFile -Raw
        if ($configContent -match '\[Core\.Log\][\r\n]+Global=(off|none)') {
            $loggingDisabled = $true

            Write-Host "`nWARNING: Logging has been disabled in your game configuration!" -ForegroundColor Red
            Write-Host "This prevents the script from extracting your Convene History data."
            Write-Host "`nWould you like to automatically fix this issue?" -ForegroundColor Yellow
            Write-Host "We can modify your Engine.ini file to re-enable logging (backup will be created)."
            Write-Host "`nIMPORTANT: After fixing, you'll need to restart the game and visit the Convene History page again!`n"

            $userChoice = Read-Host "Proceed with the fix? (Y/N)"
            if ($userChoice -ne 'Y' -and $userChoice -ne 'y') {
                Write-Host "`nOperation cancelled. Cannot extract data with current settings." -ForegroundColor Red
                Write-Host "Press any key to exit..."
                $null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
                exit
            }

            # Check for admin privileges
            if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
                Write-Host "`nAdministrator privileges required to modify game files."
                Write-Host "Restarting PowerShell with elevated permissions..." -ForegroundColor Yellow
                Start-Process powershell.exe "-File `"$PSCommandPath`"" -Verb RunAs
                exit
            }

            # Create backup and fix the configuration
            $backupFile = $configFile + ".wuwapal.backup"
            Copy-Item -Path $configFile -Destination $backupFile -Force
            Write-Host "Configuration backup created: $backupFile" -ForegroundColor Green

            $fixedContent = $configContent -replace '\[Core\.Log\][^\[]*', ''
            Set-Content -Path $configFile -Value $fixedContent
            Write-Host "`nConfiguration fixed successfully!" -ForegroundColor Green
            Write-Host "`nNext steps:" -ForegroundColor Yellow
            Write-Host "1. Restart Wuthering Waves"
            Write-Host "2. Open the Convene History page in-game"
            Write-Host "3. Run this script again"
            Write-Host "`nPress any key to exit..."
            $null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
            exit
        }
    }

    # Search for URL in Client.log
    $clientLogUrl = $null
    if (Test-Path $clientLogFile) {
        $script:logFilesFound = $true
        $urlPattern = Get-Content $clientLogFile | Select-String -Pattern "https://aki-gm-resources(-oversea)?\.aki-game\.(net|com)/aki/gacha/index\.html#/record*" | Select-Object -Last 1
        if (![string]::IsNullOrWhiteSpace($urlPattern)) {
            $clientLogUrl = $urlPattern
        }
    }

    # Process found URL
    if ($clientLogUrl) {
        $finalUrl = $clientLogUrl -replace '.*?(https://aki-gm-resources(-oversea)?\.aki-game\.(net|com)[^"]*).*', '$1'
        Write-Host "URL discovered in: $clientLogFile" -ForegroundColor Green

        if (![string]::IsNullOrWhiteSpace($finalUrl)) {
            $script:urlLocated = $true
            Write-Host "`n✓ Convene History URL Found!" -ForegroundColor Green
            Write-Host "URL: $finalUrl" -ForegroundColor White
            Set-Clipboard $finalUrl
            Write-Host "`n✓ URL copied to clipboard!" -ForegroundColor Green
            Write-Host "Visit wuwapal.com and paste the URL to import your history." -ForegroundColor Cyan
        }
    }

    return $script:directoryExists, $script:logFilesFound, $script:urlLocated
}

# Function to perform comprehensive disk search
function Search-AllDrives {
    Write-Host "Performing comprehensive search across all available drives..." -ForegroundColor Yellow

    $driveList = Get-PSDrive -PSProvider FileSystem | Select-Object -ExpandProperty Name
    Write-Host "Scanning drives: $($driveList -join ', ')" -ForegroundColor Cyan

    foreach ($drive in [char[]](65..90)) {
        $driveRoot = "$($drive):"

        if ($drive -notin $driveList) {
            continue
        }

        Write-Host "Checking drive $driveRoot..." -ForegroundColor Gray

        # Common installation paths to check
        $possiblePaths = @(
            "$driveRoot\SteamLibrary\steamapps\common\Wuthering Waves",
            "$driveRoot\SteamLibrary\steamapps\common\Wuthering Waves\Wuthering Waves Game",
            "$driveRoot\Program Files (x86)\Steam\steamapps\common\Wuthering Waves\Wuthering Waves Game",
            "$driveRoot\Program Files (x86)\Steam\steamapps\common\Wuthering Waves",
            "$driveRoot\Program Files\Steam\steamapps\common\Wuthering Waves\Wuthering Waves Game",
            "$driveRoot\Program Files\Steam\steamapps\common\Wuthering Waves",
            "$driveRoot\Games\Steam\steamapps\common\Wuthering Waves\Wuthering Waves Game",
            "$driveRoot\Games\Steam\steamapps\common\Wuthering Waves",
            "$driveRoot\Steam\steamapps\common\Wuthering Waves\Wuthering Waves Game",
            "$driveRoot\Steam\steamapps\common\Wuthering Waves",
            "$driveRoot\Program Files\Epic Games\WutheringWavesj3oFh",
            "$driveRoot\Program Files\Epic Games\WutheringWavesj3oFh\Wuthering Waves Game",
            "$driveRoot\Program Files (x86)\Epic Games\WutheringWavesj3oFh",
            "$driveRoot\Program Files (x86)\Epic Games\WutheringWavesj3oFh\Wuthering Waves Game",
            "$driveRoot\Wuthering Waves Game",
            "$driveRoot\Wuthering Waves\Wuthering Waves Game",
            "$driveRoot\Program Files\Wuthering Waves\Wuthering Waves Game",
            "$driveRoot\Games\Wuthering Waves Game",
            "$driveRoot\Games\Wuthering Waves\Wuthering Waves Game",
            "$driveRoot\Program Files (x86)\Wuthering Waves\Wuthering Waves Game"
        )

        foreach ($path in $possiblePaths) {
            if (!(Test-Path $path)) {
                continue
            }

            Write-Host "Found potential installation: $path" -ForegroundColor Yellow

            # Skip OneDrive paths as they cause issues
            if ($path -like "*OneDrive*") {
                $script:errorMessages += "Skipped OneDrive path: $path`n"
                continue
            }

            # Skip already checked paths
            if ($path -in $script:searchedPaths) {
                $script:errorMessages += "Already checked: $path`n"
                continue
            }

            $script:searchedPaths += $path
            $dirExists, $logsFound, $urlFound = Find-ConveneUrl $path

            if ($urlFound) {
                return $true
            }
            elseif ($logsFound) {
                $script:errorMessages += "Checked: $path - No URL found in logs. Make sure you've opened Convene History in-game!`n"
            }
            elseif ($dirExists) {
                $script:errorMessages += "No log files found at: $path`n"
            }
            else {
                $script:errorMessages += "Invalid path: $path`n"
            }
        }
    }

    return $false
}

# Search Method 1: Windows MUI Cache
if (!$urlLocated) {
    $muiRegistryPath = "Registry::HKEY_CURRENT_USER\Software\Classes\Local Settings\Software\Microsoft\Windows\Shell\MuiCache"
    try {
        $muiEntries = (Get-ItemProperty -Path $muiRegistryPath -ErrorAction SilentlyContinue).PSObject.Properties | Where-Object { $_.Value -like "*wuthering*" } | Where-Object { $_.Name -like "*client-win64-shipping.exe*" }
        if ($muiEntries.Count -ne 0) {
            $errorMessages += "MUI Cache entries found: $($muiEntries.Count)`n"
            foreach ($entry in $muiEntries) {
                $extractedPath = ($entry.Name -split '\\client\\')[0]

                if ($extractedPath -like "*OneDrive*") {
                  $errorMessages += "Skipped OneDrive path: $extractedPath`n"
                  continue
                }

                if ($extractedPath -in $searchedPaths) {
                    $errorMessages += "Already checked: $extractedPath`n"
                    continue
                }

                $searchedPaths += $extractedPath
                $dirExists, $logsFound, $urlFound = Find-ConveneUrl $extractedPath
                if ($urlFound) { break }
                elseif ($logsFound) {
                    $errorMessages += "Checked: $extractedPath - No URL found. Open Convene History first!`n"
                }
                elseif ($dirExists) {
                    $errorMessages += "No logs at: $extractedPath`n"
                }
                else {
                    $errorMessages += "Invalid path: $extractedPath`n"
                }
            }
        }
        else {
            $errorMessages += "No MUI Cache entries found.`n"
        }
    }
    catch {
        $errorMessages += "MUI Cache access error: $_`n"
    }
}

# Search Method 2: Windows Firewall Rules
if (!$urlLocated) {
    $firewallRegistryPath = "Registry::HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\SharedAccess\Parameters\FirewallPolicy\FirewallRules"
    try {
        $firewallEntries = (Get-ItemProperty -Path $firewallRegistryPath -ErrorAction SilentlyContinue).PSObject.Properties | Where-Object { $_.Value -like "*wuthering*" } | Where-Object { $_.Name -like "*client-win64-shipping*" }
        if ($firewallEntries.Count -ne 0) {
            $errorMessages += "Firewall entries found: $($firewallEntries.Count)`n"
            foreach ($entry in $firewallEntries) {
                $extractedPath = (($entry.Value -split 'App=')[1] -split '\\client\\')[0]

                if ($extractedPath -like "*OneDrive*") {
                  $errorMessages += "Skipped OneDrive path: $extractedPath`n"
                  continue
                }

                if ($extractedPath -in $searchedPaths) {
                    $errorMessages += "Already checked: $extractedPath`n"
                    continue
                }

                $searchedPaths += $extractedPath
                $dirExists, $logsFound, $urlFound = Find-ConveneUrl $extractedPath
                if ($urlFound) { break }
                elseif ($logsFound) {
                    $errorMessages += "Checked: $extractedPath - No URL found. Open Convene History first!`n"
                }
                elseif ($dirExists) {
                    $errorMessages += "No logs at: $extractedPath`n"
                }
                else {
                    $errorMessages += "Invalid path: $extractedPath`n"
                }
            }
        }
        else {
            $errorMessages += "No firewall entries found.`n"
        }
    }
    catch {
        $errorMessages += "Firewall access error: $_`n"
    }
}

# Search Method 3: Windows Registry (Installed Programs)
if (!$urlLocated) {
    $registry64 = "Registry::HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*"
    $registry32 = "Registry::HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*"
    try {
        $registryPath = (Get-ItemProperty -Path $registry32, $registry64 | Where-Object { $_.DisplayName -like "*wuthering*" } | Select-Object -ExpandProperty InstallPath)
        if ($registryPath) {
            if ($registryPath -like "*OneDrive*") {
              $errorMessages += "Skipped OneDrive path: $registryPath`n"
            }
            elseif ($registryPath -in $searchedPaths) {
                $errorMessages += "Already checked: $registryPath`n"
            }
            else {
                $searchedPaths += $registryPath
                $dirExists, $logsFound, $urlFound = Find-ConveneUrl $registryPath
                if (!$urlFound) {
                    if ($logsFound) {
                        $errorMessages += "Checked: $registryPath - No URL found. Open Convene History first!`n"
                    }
                    elseif ($dirExists) {
                        $errorMessages += "No logs at: $registryPath`n"
                    }
                    else {
                        $errorMessages += "Invalid path: $registryPath`n"
                    }
                }
            }
        }
        else {
            $errorMessages += "No registry installation entries found.`n"
        }
    }
    catch {
        Write-Host "[ERROR] Registry access failed: $_" -ForegroundColor Red
        $gameDirectory = $null
    }
}

# Search Method 4: Comprehensive drive search
if (!$urlLocated) {
    $urlLocated = Search-AllDrives
}

# Restore original error preference
$ErrorActionPreference = $currentErrorAction

# Display search results
Write-Host $errorMessages -ForegroundColor DarkYellow

# Manual path input if automatic search failed
while (!$urlLocated) {
    Write-Host "`n❌ Automatic search unsuccessful!" -ForegroundColor Red
    Write-Host "Possible reasons:" -ForegroundColor Yellow
    Write-Host "• You haven't opened the Convene History page in-game yet"
    Write-Host "• Third-party tools may have interfered with game logs"
    Write-Host "• Game is installed in an unusual location"

    Write-Host @"

    ⚠️  THIRD-PARTY TOOL INTERFERENCE WARNING ⚠️
    ═══════════════════════════════════════════════════
    If you're using any third-party Wuthering Waves tools,
    mods, or utilities, they may interfere with log files.

    Try disabling such tools or consider a fresh game
    installation if the issue persists.
    ═══════════════════════════════════════════════════

"@ -ForegroundColor Red

    Write-Host "Need help? Join our Discord: https://discord.gg/DFKG4nqUD4" -ForegroundColor Cyan
    Write-Host "`nAlternatively, manually specify your game installation path:"
    Write-Host "`nCommon installation locations:" -ForegroundColor White
    Write-Host "  C:\Wuthering Waves" -ForegroundColor Yellow
    Write-Host "  C:\Wuthering Waves\Wuthering Waves Game" -ForegroundColor Yellow
    Write-Host "  C:\Program Files\Wuthering Waves\Wuthering Waves Game" -ForegroundColor Yellow
    Write-Host "`nEpic Games:" -ForegroundColor White
    Write-Host "  C:\Program Files\Epic Games\WutheringWavesj3oFh" -ForegroundColor Yellow
    Write-Host "  C:\Program Files\Epic Games\WutheringWavesj3oFh\Wuthering Waves Game" -ForegroundColor Yellow
    Write-Host "`nSteam:" -ForegroundColor White
    Write-Host "  C:\Steam\steamapps\common\Wuthering Waves" -ForegroundColor Yellow

    $manualPath = Read-Host "`nEnter installation path (or type 'exit' to quit)"

    if ($manualPath) {
        if ($manualPath.ToLower() -eq "exit") {
            Write-Host "Exiting script..." -ForegroundColor Cyan
            break
        }

        $gameDirectory = $manualPath
        Write-Host "`nTesting user-provided path: $manualPath" -ForegroundColor Cyan
        $dirExists, $logsFound, $urlFound = Find-ConveneUrl $manualPath

        if ($urlFound) {
            break
        }
        elseif ($logsFound) {
            Write-Host "✓ Path is valid but no URL found in logs." -ForegroundColor Yellow
            Write-Host "Make sure you've opened the Convene History page in-game first!" -ForegroundColor Red
            Write-Host "If you're still having issues, visit our Discord for support." -ForegroundColor Cyan
        }
        elseif ($dirExists) {
            Write-Host "✓ Directory found but no log files present." -ForegroundColor Yellow
            Write-Host "Open Convene History in-game first, then try again." -ForegroundColor Red
        }
        else {
            Write-Host "❌ Invalid path: $manualPath" -ForegroundColor Red
            Write-Host "Please verify the installation directory is correct." -ForegroundColor Yellow
        }
    }
    else {
        Write-Host "❌ No path provided. Please enter a valid installation path." -ForegroundColor Red
    }
}

if ($urlLocated) {
    Write-Host "`n🎉 Success! Your Convene History URL has been copied to clipboard." -ForegroundColor Green
    Write-Host "Visit wuwapal.com to import your data!" -ForegroundColor Cyan
}

Write-Host "`nPress any key to exit..." -ForegroundColor White
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
