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

Set-StrictMode -Version Latest
$ErrorActionPreference = 'SilentlyContinue'

# Tracks which log file produced the final Convene URL (for user visibility)
$script:LastLogSource = $null

function Write-Info([string]$msg)  { Write-Host $msg -ForegroundColor Cyan }
function Write-Warn([string]$msg)  { Write-Host $msg -ForegroundColor Yellow }
function Write-Err ([string]$msg)  { Write-Host $msg -ForegroundColor Red }

$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
Write-Host ("Running as {0}" -f (if ($isAdmin) { "Administrator" } else { "Standard User" })) -ForegroundColor Magenta

function Prompt-YesNo([string]$prompt, [bool]$defaultYes = $false) {
    $suffix = if ($defaultYes) { "[Y/n]" } else { "[y/N]" }
    $answer = Read-Host "$prompt $suffix"
    if ([string]::IsNullOrWhiteSpace($answer)) { return $defaultYes }
    return $answer.Trim().ToLower() -eq 'y'
}

function Remove-DenyAcls([string]$filePath) {
    if (-not (Test-Path $filePath)) { return }
    try {
        $acl = Get-Acl -Path $filePath
        $denyRules = $acl.Access | Where-Object { $_.AccessControlType -eq 'Deny' -and $_.FileSystemRights -match 'Read' }
        if (-not $denyRules) { return }

        Write-Warn "Found $($denyRules.Count) deny ACE(s) on $filePath"
        if (-not (Prompt-YesNo "Remove these deny ACEs and repair permissions?" $true)) { return }

        foreach ($rule in $denyRules) {
            $id = $rule.IdentityReference.Value
            try {
                if ($id -match '^S-\d-\d+-(\d+-){1,}\d+$') {
                    $sid = New-Object System.Security.Principal.SecurityIdentifier($id)
                    $id = $sid.Translate([System.Security.Principal.NTAccount]).Value
                }
            } catch { }

            $cmd = "icacls `"$filePath`" /remove:d `"$id`" /C"
            cmd.exe /c $cmd | Out-Null
        }

        takeown /F "$filePath" | Out-Null
        icacls "$filePath" /grant Administrators:F /C | Out-Null
        Write-Info "Repaired permissions for $filePath"
    }
    catch {
        Write-Warn ("ACL inspection failed for {0}: {1}" -f $filePath, $_)
    }
}

function Fix-EngineIniIfLoggingOff([string]$iniPath) {
    if (-not (Test-Path $iniPath)) { return $false }
    try {
        $content = Get-Content $iniPath -Raw
        if ($content -notmatch '\[Core\.Log\][\r\n]+Global=(off|none)') { return $false }

        Write-Err "Logging disabled in Engine.ini at $iniPath"
        Write-Warn "We can remove the [Core.Log] section to re-enable logging. A backup will be created."
        if (-not $isAdmin) { Write-Warn "Editing Program Files may need elevation." }
        if (-not (Prompt-YesNo "Proceed with fixing Engine.ini?")) { return $true }

        $backup = "$iniPath.backup"
        Copy-Item $iniPath $backup -Force
        Write-Info "Backup saved to $backup"

        $fixed = $content -replace '\[Core\.Log\][^\[]*', ''
        Set-Content -Path $iniPath -Value $fixed
        Write-Info "Logging re-enabled. Restart the game and open Convene History before retrying."
        return $true
    }
    catch {
        Write-Warn "Could not modify Engine.ini: $_"
        return $false
    }
}

function Get-UrlFromLogs([string]$root) {
    $clientLog = Join-Path $root "Client\Saved\Logs\Client.log"
    $engineIni = Join-Path $root "Client\Saved\Config\WindowsNoEditor\Engine.ini"

    $logSeen = $false

    if (Fix-EngineIniIfLoggingOff $engineIni) {
        # user will rerun; stop further processing for this path
        return $null, $true
    }

    if (Test-Path $clientLog) {
        $logSeen = $true
        Remove-DenyAcls $clientLog
        $match = Select-String -Path $clientLog -Pattern "https://aki-gm-resources(-oversea)?\.aki-game\.(net|com)/aki/gacha/index\.html#/record[^`"]*" | Select-Object -Last 1
        if ($match) {
            $url = ($match.Line -replace '.*?(https://aki-gm-resources(-oversea)?\.aki-game\.(net|com)/aki/gacha/index\.html#/record[^`"]*).*', '$1')
            if ($url) {
                $script:LastLogSource = $clientLog
                return $url, $true
            }
        }
    }

    return $null, $logSeen
}

function Check-GameFolder([string]$path, [ref]$errors) {
    if ($path -like "*OneDrive*") {
        $errors.Value += "Skipped OneDrive path: $path`n"
        return $null, $false
    }
    if (-not (Test-Path $path)) {
        $errors.Value += "No installation at $path`n"
        return $null, $false
    }

    Write-Info "Checking $path"
    $url, $logsPresent = Get-UrlFromLogs $path

    if ($url) {
        return $url, $true
    }

    if ($logsPresent) {
        $errors.Value += "Logs present at $path but no URL. Open Convene History and retry.`n"
    }
    else {
        $errors.Value += "No logs found at $path`n"
    }

    return $null, $false
}

function Scan-KnownPaths([ref]$errors) {
    $driveLetters = (Get-PSDrive -PSProvider FileSystem | Select-Object -ExpandProperty Name)
    $roots = @()
    foreach ($letter in $driveLetters) {
        $roots += @(
            "$letter`:\SteamLibrary\steamapps\common\Wuthering Waves",
            "$letter`:\SteamLibrary\steamapps\common\Wuthering Waves\Wuthering Waves Game",
            "$letter`:\Program Files (x86)\Steam\steamapps\common\Wuthering Waves",
            "$letter`:\Program Files (x86)\Steam\steamapps\common\Wuthering Waves\Wuthering Waves Game",
            "$letter`:\Program Files\Steam\steamapps\common\Wuthering Waves",
            "$letter`:\Program Files\Steam\steamapps\common\Wuthering Waves\Wuthering Waves Game",
            "$letter`:\Program Files\Epic Games\WutheringWavesj3oFh",
            "$letter`:\Program Files\Epic Games\WutheringWavesj3oFh\Wuthering Waves Game",
            "$letter`:\Program Files (x86)\Epic Games\WutheringWavesj3oFh",
            "$letter`:\Program Files (x86)\Epic Games\WutheringWavesj3oFh\Wuthering Waves Game",
            "$letter`:\Wuthering Waves",
            "$letter`:\Wuthering Waves Game",
            "$letter`:\Games\Wuthering Waves",
            "$letter`:\Games\Wuthering Waves Game"
        )
    }

    foreach ($p in $roots) {
        $url, $ok = Check-GameFolder $p ([ref]$errors.Value)
        if ($url) { return $url }
    }
    return $null
}

function Scan-RegistryMuiCache([ref]$errors) {
    $path = "Registry::HKEY_CURRENT_USER\Software\Classes\Local Settings\Software\Microsoft\Windows\Shell\MuiCache"
    try {
        $entries = (Get-ItemProperty -Path $path -ErrorAction SilentlyContinue).PSObject.Properties |
                   Where-Object { $_.Value -like "*wuthering*" -and $_.Name -like "*client-win64-shipping.exe*" }
        foreach ($entry in $entries) {
            $candidate = ($entry.Name -split '\\client\\')[0]
            $url, $ok = Check-GameFolder $candidate ([ref]$errors.Value)
            if ($url) { return $url }
        }
    }
    catch {
        $errors.Value += "MuiCache access failed: $_`n"
    }
    return $null
}

function Scan-RegistryFirewall([ref]$errors) {
    $path = "Registry::HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\SharedAccess\Parameters\FirewallPolicy\FirewallRules"
    try {
        $entries = (Get-ItemProperty -Path $path -ErrorAction SilentlyContinue).PSObject.Properties |
                   Where-Object { $_.Value -like "*wuthering*" -and $_.Name -like "*client-win64-shipping*" }
        foreach ($entry in $entries) {
            $candidate = (($entry.Value -split 'App=')[1] -split '\\client\\')[0]
            $url, $ok = Check-GameFolder $candidate ([ref]$errors.Value)
            if ($url) { return $url }
        }
    }
    catch {
        $errors.Value += "Firewall registry access failed: $_`n"
    }
    return $null
}

function Scan-RegistryUninstall([ref]$errors) {
    $paths = @(
        "Registry::HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*",
        "Registry::HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*"
    )
    try {
        $installPaths = Get-ItemProperty -Path $paths |
            Where-Object { $_.DisplayName -like "*wuthering*" } |
            Select-Object -ExpandProperty InstallPath -ErrorAction SilentlyContinue
        foreach ($candidate in $installPaths) {
            $url, $ok = Check-GameFolder $candidate ([ref]$errors.Value)
            if ($url) { return $url }
        }
    }
    catch {
        $errors.Value += "Uninstall registry access failed: $_`n"
    }
    return $null
}

function Prompt-Manual([ref]$errors) {
    while ($true) {
        Write-Warn "Automatic detection failed."
        $path = Read-Host "Enter the game install path (or type 'exit' to quit)"
        if ([string]::IsNullOrWhiteSpace($path)) { continue }
        if ($path.Trim().ToLower() -eq 'exit') { break }

        $url, $ok = Check-GameFolder $path ([ref]$errors.Value)
        if ($url) { return $url }
    }
    return $null
}

$errorLog = ""

Write-Info "Searching registry hints..."
$url = Scan-RegistryMuiCache ([ref]$errorLog)
if (-not $url) { $url = Scan-RegistryFirewall ([ref]$errorLog) }
if (-not $url) { $url = Scan-RegistryUninstall ([ref]$errorLog) }

if (-not $url) {
    Write-Info "Scanning common install paths across available drives..."
    $url = Scan-KnownPaths ([ref]$errorLog)
}

if (-not $url -and -not $isAdmin) {
    Write-Warn "Some folders might require admin rights to read."
    if (Prompt-YesNo "Relaunch with elevation and retry?") {
        $cmd = '-NoProfile -Command "iwr -UseBasicParsing https://wuwapal.com/scripts/import.ps1 | iex"'
        Start-Process powershell.exe -ArgumentList $cmd -Verb RunAs
        exit
    }
}

if (-not $url) {
    Write-Info $errorLog
    $url = Prompt-Manual ([ref]$errorLog)
}

if ($url) {
    Write-Host "`nConvene Record URL:" -ForegroundColor Green
    Write-Host $url
    if ($script:LastLogSource) {
        Write-Info ("Source log file: {0}" -f $script:LastLogSource)
    }
    try {
        Set-Clipboard $url
        Write-Info "URL copied to clipboard. Paste into your importer."
    }
    catch {
        Write-Warn "Could not copy to clipboard: $_"
    }
    Write-Host "Press any key to close..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

Write-Err "Unable to locate the Convene History URL."
Write-Info $errorLog
Write-Info "Open the in-game Convene History, then rerun this script."
Write-Host "Press any key to close..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
